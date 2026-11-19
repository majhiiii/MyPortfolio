"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sliders, Copy, Check, Box, Eye, Layers, AlertTriangle, ShieldCheck, RefreshCw, ZoomIn, ZoomOut, Package } from "lucide-react";

/* ================= CANTILEVER ENGINEERING CAPACITY TABLES ================= */
const ARM_CAPACITY_TABLE: Record<string, Record<string, number>> = {
  "24": { C3X35: 1575, C4X45: 2500, C5X67: 3500, S3X57: 4000, S4X77: 5000 },
  "36": { C3X35: 1000, C4X45: 1800, C5X67: 2800, S3X57: 3200, S4X77: 4000 },
  "48": { C3X35: 700,  C4X45: 1300, C5X67: 2000, S3X57: 2500, S4X77: 3800 },
  "60": { C3X35: 500,  C4X45: 1000, C5X67: 1500, S3X57: 2000, S4X77: 2500 },
  "72": { C3X35: 350,  C4X45: 800,  C5X67: 1200, S3X57: 1600, S4X77: 2000 },
};

const COLUMN_CAPACITY_TABLE: Record<string, Record<string, number>> = {
  "W6-9": {
    "96": 8625, "120": 7500, "144": 6500, "168": 5500, "192": 4500,
  },
  "W6-15": {
    "96": 10500, "120": 9500, "144": 8500, "168": 7500, "192": 6500,
  },
  "W8-18": {
    "120": 12000, "144": 11000, "168": 10000, "192": 9000, "216": 8000, "240": 7000, "264": 6000, "288": 5000, "300": 4500,
  },
  "W10-22": {
    "120": 12500, "144": 12500, "168": 12500, "192": 18315, "216": 18315, "240": 18315, "264": 18315, "288": 18315, "300": 18315,
  },
};

const ARM_SCALING_FACTORS: Record<string, number> = {
  "24": 1.0, "36": 1.0, "48": 1.0, "60": 1.0, "72": 1.0,
};

export function CpqConfigurator() {
  const mountRef = useRef<HTMLDivElement>(null);

  // System Selector: Cantilever Rack vs Selective Pallet Rack
  const [rackSystem, setRackSystem] = useState<"cantilever" | "pallet">("cantilever");
  const [showPalletLoad, setShowPalletLoad] = useState<boolean>(true);

  // Cantilever Parameters
  const [height, setHeight] = useState<string>("144"); // 12 ft
  const [armLength, setArmLength] = useState<string>("36"); // 3 ft
  const [levels, setLevels] = useState<number>(3);
  const [sideType, setSideType] = useState<"One-Sided" | "Two-Sided">("One-Sided");
  const [bays, setBays] = useState<number>(1);
  const [bayWidth, setBayWidth] = useState<string>("48"); // 4 ft
  const [bundleLength, setBundleLength] = useState<number>(96); // 8 ft
  const [bundleWeight, setBundleWeight] = useState<number>(4000); // 4,000 lbs

  // Pallet Rack Parameters
  const [palletHeight, setPalletHeight] = useState<string>("144"); // 12 ft
  const [palletDepth, setPalletDepth] = useState<string>("42"); // 42 in
  const [palletBeamLength, setPalletBeamLength] = useState<string>("96"); // 96 in (standard 2 pallets)
  const [palletLevels, setPalletLevels] = useState<number>(3);
  const [palletBays, setPalletBays] = useState<number>(2);
  const [palletWeight, setPalletWeight] = useState<number>(2200); // 2,200 lbs per pallet

  const [cameraMode, setCameraMode] = useState<"3d" | "2d">("3d");
  const [activeTab, setActiveTab] = useState<"bom" | "apex">("bom");
  const [copied, setCopied] = useState<boolean>(false);

  // Three.js instances ref
  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    targetCameraPos: THREE.Vector3;
    targetControlsTarget: THREE.Vector3;
  } | null>(null);

  /* ================= CANTILEVER ENGINEERING SOLVER ================= */
  const cantileverSolved = useMemo(() => {
    const isTwoSided = sideType === "Two-Sided";
    const numCols = bays + 1;
    const bayW = +bayWidth || 48;

    const armsSupporting = Math.min(numCols, Math.max(2, Math.floor(bundleLength / bayW) + 1));
    const requiredArmCap = bundleWeight / armsSupporting;
    const totalUprightLoad = levels * requiredArmCap * (isTwoSided ? 2.0 : 1.0);

    const systems = ["W6-9", "W6-15", "W8-18", "W10-22"];
    let selectedSystem = "W6-9";
    let maxSafeColCap = 0;
    let colSystemFound = false;

    const armFactor = ARM_SCALING_FACTORS[armLength] || 1.0;

    for (const sys of systems) {
      const sysTable = COLUMN_CAPACITY_TABLE[sys];
      let baseCap = sysTable[height];

      if (baseCap === undefined) {
        const keys = Object.keys(sysTable).map(Number).sort((a, b) => a - b);
        if (keys.length > 0) {
          const hVal = +height;
          const closestKey = keys.reduce((prev, curr) => (Math.abs(curr - hVal) < Math.abs(prev - hVal) ? curr : prev));
          baseCap = sysTable[closestKey];
        } else {
          baseCap = 0;
        }
      }

      if (baseCap > 0) {
        const colCap = baseCap * armFactor * (isTwoSided ? 2.0 : 1.0);
        if (colCap >= totalUprightLoad) {
          selectedSystem = sys;
          maxSafeColCap = colCap;
          colSystemFound = true;
          break;
        }
      }
    }

    if (!colSystemFound) {
      selectedSystem = "W10-22";
      const sysTable = COLUMN_CAPACITY_TABLE["W10-22"];
      let baseCap = sysTable[height];
      if (baseCap === undefined) {
        const keys = Object.keys(sysTable).map(Number).sort((a, b) => a - b);
        const closestKey = keys.reduce((prev, curr) => (Math.abs(curr - +height) < Math.abs(prev - +height) ? curr : prev));
        baseCap = sysTable[closestKey] || 12500;
      }
      maxSafeColCap = baseCap * armFactor * (isTwoSided ? 2.0 : 1.0);
    }

    const armRow = ARM_CAPACITY_TABLE[armLength] || ARM_CAPACITY_TABLE["36"];
    const armTypes = ["C3X35", "C4X45", "C5X67", "S3X57", "S4X77"];
    let selectedArm = "C3X35";
    let maxSafeArmCap = 0;
    let armFound = false;

    for (const aType of armTypes) {
      const cap = armRow[aType] || 0;
      if (cap >= requiredArmCap) {
        selectedArm = aType;
        maxSafeArmCap = cap;
        armFound = true;
        break;
      }
    }

    if (!armFound) {
      selectedArm = "S4X77";
      maxSafeArmCap = armRow["S4X77"] || 4000;
    }

    const isArmOverloaded = requiredArmCap > maxSafeArmCap;
    const isColOverloaded = totalUprightLoad > maxSafeColCap;

    return {
      system: selectedSystem,
      armType: selectedArm,
      armsSupporting,
      loadPerArm: Math.round(requiredArmCap),
      totalUprightLoad: Math.round(totalUprightLoad),
      maxSafeArmCap,
      maxSafeColCap,
      isCapacityExceeded: isArmOverloaded || isColOverloaded,
      calculatedMaxCapacity: Math.round(maxSafeColCap),
    };
  }, [bays, bayWidth, bundleLength, bundleWeight, levels, sideType, height, armLength]);

  /* ================= PALLET RACK ENGINEERING SOLVER ================= */
  const palletSolved = useMemo(() => {
    const palletsPerLevel = 2; // Standard 96" or 108" beam holds two 40"x48" pallets
    const totalPalletsPerBay = palletLevels * palletsPerLevel;
    const totalPallets = palletBays * totalPalletsPerBay;
    const beamPairLoad = palletsPerLevel * palletWeight; // e.g. 2 x 2,200 = 4,400 lbs
    const ratedBeamCapacity = +palletBeamLength === 96 ? 5000 : 4500; // 4" face step beam
    const totalBayWeight = palletLevels * beamPairLoad;
    const ratedFrameCapacity = 19300; // 42"x144" teardrop frame at 48" beam spacing

    const isBeamOverloaded = beamPairLoad > ratedBeamCapacity;
    const isFrameOverloaded = totalBayWeight > ratedFrameCapacity;

    return {
      palletsPerLevel,
      totalPallets,
      beamPairLoad,
      ratedBeamCapacity,
      totalBayWeight,
      ratedFrameCapacity,
      isCapacityExceeded: isBeamOverloaded || isFrameOverloaded,
      isBeamOverloaded,
      isFrameOverloaded,
    };
  }, [palletLevels, palletBays, palletWeight, palletBeamLength]);

  /* ================= BILL OF MATERIALS (BOM) GENERATOR ================= */
  const bom = useMemo(() => {
    if (rackSystem === "cantilever") {
      const isTwoSided = sideType === "Two-Sided";
      const numCols = bays + 1;
      const numBases = numCols;
      const totalArms = numCols * levels * (isTwoSided ? 2 : 1);
      const heightFeet = Math.round(+height / 12);

      const colSku = `RCL-${cantileverSolved.system.replace("-", "")}${heightFeet}H${isTwoSided ? "D" : "S"}`;
      const baseSku = `RCL-BAS-${cantileverSolved.system.replace("-", "")}-${armLength}`;
      const armSku = `RCL-ARM-${cantileverSolved.armType}-${armLength}`;
      const braceSku = `RCL-BRC-${bayWidth}`;
      const horizontalSku = `RCL-HRZ-${bayWidth}`;

      const hasXBrace = +height >= 144;
      let horizQty = 0;
      let diagQty = 0;

      if (+height <= 144) {
        horizQty = bays * 2;
        diagQty = Math.ceil(bays / 2) * 2;
      } else if (+height <= 192) {
        horizQty = bays * 3;
        diagQty = Math.ceil(bays / 2) * 2;
      } else {
        horizQty = bays * 4;
        diagQty = Math.ceil(bays / 2) * 4;
      }

      const shimQty = numCols * 2 + numBases * 2;
      const anchorQty = numCols * 2 + numBases * 2;
      const hardwareQty = numBases * 6 + totalArms * 4 + horizQty * 2 + diagQty * 2;

      const list = [
        {
          sku: colSku,
          description: `Structural Cantilever Column, ${cantileverSolved.system} System, ${heightFeet} ft. H, ${isTwoSided ? "Double" : "Single"}-Sided`,
          componentType: "Column",
          quantity: numCols,
          unitCost: 350,
        },
        {
          sku: baseSku,
          description: `Structural Cantilever Base, ${cantileverSolved.system} System, ${armLength}" L`,
          componentType: "Base",
          quantity: numBases,
          unitCost: 185,
        },
        {
          sku: armSku,
          description: `Structural Cantilever Arm, ${cantileverSolved.armType} Series, ${armLength}" L (2° Safety Slant)`,
          componentType: "Arm",
          quantity: totalArms,
          unitCost: 85,
        },
        {
          sku: braceSku,
          description: `${bayWidth}" Structural Cantilever Knockdown ${hasXBrace ? "X-Bracing" : "Diagonal Bracing"}`,
          componentType: "Bracing",
          quantity: diagQty,
          unitCost: 110,
        },
        {
          sku: horizontalSku,
          description: `${bayWidth}" Structural Cantilever Horizontal Bracing Struts`,
          componentType: "Bracing",
          quantity: horizQty,
          unitCost: 70,
        },
        {
          sku: `RCL-${cantileverSolved.system.replace("-", "")}SHM`,
          description: `Structural Leveling Shims for ${cantileverSolved.system} Column Bases`,
          componentType: "Accessory",
          quantity: shimQty,
          unitCost: 12,
        },
        {
          sku: "RCL-ANC-1",
          description: 'Structural Concrete Anchor Bolt 1/2" x 4-1/2"',
          componentType: "Accessory",
          quantity: anchorQty,
          unitCost: 6,
        },
        {
          sku: "RCL-HDW-1",
          description: "Grade 5 Assembly Bolt, Nut & Washer Set",
          componentType: "Accessory",
          quantity: hardwareQty,
          unitCost: 3.5,
        },
      ];

      return list.filter((i) => i.quantity > 0);
    } else {
      // Selective Pallet Rack BOM
      const numFrames = palletBays + 1;
      const beamPairs = palletBays * palletLevels;
      const totalBeams = beamPairs * 2;
      const totalDecks = beamPairs * 2;
      const safetyPins = totalBeams * 2;
      const anchors = numFrames * 4;
      const rowSpacers = palletBays * 2;

      return [
        {
          sku: `PR-UPR-${palletDepth}${palletHeight}`,
          description: `Teardrop Pallet Rack Upright Frame, ${palletDepth}" D x ${palletHeight}" H, Blue Enamel`,
          componentType: "Upright Frame",
          quantity: numFrames,
          unitCost: 245,
        },
        {
          sku: `PR-BM-${palletBeamLength}40`,
          description: `High-Strength Step Beam, ${palletBeamLength}" L x 4" Face (5,000 lbs Rating / Pair), Safety Orange`,
          componentType: "Step Beam",
          quantity: totalBeams,
          unitCost: 68,
        },
        {
          sku: `PR-DK-${palletDepth}46`,
          description: `Galvanized Waterfall Wire Mesh Decking Panel, ${palletDepth}" D x 46" W`,
          componentType: "Wire Decking",
          quantity: totalDecks,
          unitCost: 34,
        },
        {
          sku: "PR-PIN-01",
          description: "Universal Drop-In Safety Beam Locking Pin (Zinc Plated)",
          componentType: "Safety Accessory",
          quantity: safetyPins,
          unitCost: 1.5,
        },
        {
          sku: "PR-ANC-05",
          description: 'Heavy Duty Concrete Floor Anchor Bolt 1/2" x 4-1/4"',
          componentType: "Accessory",
          quantity: anchors,
          unitCost: 5,
        },
        {
          sku: "PR-ROW-12",
          description: '12" Rigid Row Spacer for Back-to-Back Pallet Rack Frames',
          componentType: "Accessory",
          quantity: rowSpacers,
          unitCost: 16,
        },
      ];
    }
  }, [rackSystem, bays, sideType, levels, height, cantileverSolved, armLength, bayWidth, palletBays, palletLevels, palletDepth, palletHeight, palletBeamLength]);

  const totalPrice = useMemo(() => {
    return Math.round(bom.reduce((sum, i) => sum + i.quantity * i.unitCost, 0));
  }, [bom]);

  /* ================= THREE.JS 3D ENGINE INITIALIZATION ================= */
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const h = 330;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0d1a);

    const camera = new THREE.PerspectiveCamera(45, width / h, 0.5, 5000);
    camera.position.set(160, 160, 320);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 30, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x1f2937, 1.2));

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.15);
    dirLight.position.set(120, 240, 150);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.45);
    fillLight.position.set(-120, 120, -120);
    scene.add(fillLight);

    const grid = new THREE.GridHelper(500, 50, 0xf59e0b, 0x1e293b);
    grid.position.y = 0.02;
    scene.add(grid);

    const targetCameraPos = new THREE.Vector3(160, 160, 320);
    const targetControlsTarget = new THREE.Vector3(0, 30, 0);

    threeRef.current = {
      scene,
      camera,
      renderer,
      controls,
      targetCameraPos,
      targetControlsTarget,
    };

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (controls) controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  /* ================= 3D GEOMETRY REBUILD HOOK ================= */
  useEffect(() => {
    const inst = threeRef.current;
    if (!inst) return;
    const { scene } = inst;

    // Clear previous dynamic parts
    const parts: THREE.Object3D[] = [];
    scene.traverse((o) => {
      if (o.userData?.isPart) parts.push(o);
    });
    parts.forEach((p) => scene.remove(p));

    const scale = 0.5;

    // Reusable 3D Wooden Pallet Builder with shrink-wrapped cargo
    const create3DPallet = (pWidth: number, pLength: number, pHeight: number) => {
      const palletGroup = new THREE.Group();

      const woodMat = new THREE.MeshLambertMaterial({ color: 0xd4a373 });
      const cargoMat = new THREE.MeshLambertMaterial({ color: 0xf1f5f9 });
      const strapMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });

      // 1. Bottom Runner Slats (3 boards)
      const runnerGeo = new THREE.BoxGeometry(pWidth * 0.95, 0.6 * scale, 3.5 * scale);
      for (const zOffset of [-pLength * 0.42, 0, pLength * 0.42]) {
        const runner = new THREE.Mesh(runnerGeo, woodMat);
        runner.position.set(0, 0.3 * scale, zOffset);
        runner.castShadow = true;
        palletGroup.add(runner);
      }

      // 2. Center Stringer Blocks (3 stringers)
      const stringerGeo = new THREE.BoxGeometry(2.5 * scale, 2.5 * scale, pLength * 0.96);
      for (const xOffset of [-pWidth * 0.42, 0, pWidth * 0.42]) {
        const stringer = new THREE.Mesh(stringerGeo, woodMat);
        stringer.position.set(xOffset, (0.6 + 1.25) * scale, 0);
        stringer.castShadow = true;
        palletGroup.add(stringer);
      }

      // 3. Top Deck Boards (5 slats)
      const slatGeo = new THREE.BoxGeometry(pWidth * 0.96, 0.6 * scale, (pLength / 7) * scale);
      for (let s = -2; s <= 2; s++) {
        const slat = new THREE.Mesh(slatGeo, woodMat);
        slat.position.set(0, (0.6 + 2.5 + 0.3) * scale, s * ((pLength * 0.22) * scale));
        slat.castShadow = true;
        palletGroup.add(slat);
      }

      // 4. Shrink-Wrapped Freight Cargo Box on Top
      const cargoH = pHeight * 0.85;
      const cargoGeo = new THREE.BoxGeometry(pWidth * 0.88, cargoH, pLength * 0.88);
      const cargo = new THREE.Mesh(cargoGeo, cargoMat);
      const cargoBaseY = (0.6 + 2.5 + 0.6) * scale + cargoH / 2;
      cargo.position.set(0, cargoBaseY, 0);
      cargo.castShadow = true;
      palletGroup.add(cargo);

      // Strapping Bands
      const strapGeo = new THREE.BoxGeometry(pWidth * 0.89, cargoH * 1.01, 0.4 * scale);
      const strap1 = new THREE.Mesh(strapGeo, strapMat);
      strap1.position.set(0, cargoBaseY, -pLength * 0.25 * scale);
      palletGroup.add(strap1);

      const strap2 = new THREE.Mesh(strapGeo, strapMat);
      strap2.position.set(0, cargoBaseY, pLength * 0.25 * scale);
      palletGroup.add(strap2);

      palletGroup.userData = { isPart: true };
      return palletGroup;
    };

    if (rackSystem === "cantilever") {
      /* ---------------- CANTILEVER RACK BUILDER ---------------- */
      const colHeight = +height * scale;
      const armLen = +armLength * scale;
      const bayW = +bayWidth * scale;
      const isTwoSided = sideType === "Two-Sided";

      let colThick = 2.5;
      if (cantileverSolved.system === "W6-15") colThick = 3.2;
      else if (cantileverSolved.system === "W8-18") colThick = 4.2;
      else if (cantileverSolved.system === "W10-22") colThick = 5.2;
      colThick *= scale;

      const colMat = new THREE.MeshPhongMaterial({ color: 0x22c55e, shininess: 50 });
      const armMat = new THREE.MeshPhongMaterial({ color: 0xe8a317, shininess: 90 });
      const braceMat = new THREE.MeshPhongMaterial({ color: 0x16a34a, shininess: 40 });
      const cableMat = new THREE.MeshPhongMaterial({ color: 0x94a3b8, shininess: 100 });

      // Helper: Create I-Beam Column
      const createIBeam = (l: number, w: number, d: number) => {
        const group = new THREE.Group();
        const flangeThick = w * 0.18;
        const webThick = w * 0.14;
        const webDepth = d - flangeThick * 2;

        const ffGeo = new THREE.BoxGeometry(w, l, flangeThick);
        const ff = new THREE.Mesh(ffGeo, colMat);
        ff.position.set(0, 0, d / 2 - flangeThick / 2);
        ff.castShadow = true;
        group.add(ff);

        const bf = new THREE.Mesh(ffGeo, colMat);
        bf.position.set(0, 0, -(d / 2 - flangeThick / 2));
        bf.castShadow = true;
        group.add(bf);

        const webGeo = new THREE.BoxGeometry(webThick, l, webDepth);
        const web = new THREE.Mesh(webGeo, colMat);
        web.castShadow = true;
        group.add(web);

        const holeGeo = new THREE.BoxGeometry(w * 0.12, 0.7 * scale, 0.02);
        const holeMat = new THREE.MeshBasicMaterial({ color: 0x05070a });
        for (let y = -l / 2 + 4 * scale; y <= l / 2 - 4 * scale; y += 4 * scale) {
          const leftHole = new THREE.Mesh(holeGeo, holeMat);
          leftHole.position.set(-w * 0.22, y, d / 2 + 0.01);
          group.add(leftHole);
          const rightHole = new THREE.Mesh(holeGeo, holeMat);
          rightHole.position.set(w * 0.22, y, d / 2 + 0.01);
          group.add(rightHole);
        }

        group.userData = { isPart: true };
        return group;
      };

      const realH = +height;
      const realYStart = realH <= 144 ? realH * 0.3 : realH * 0.22;
      const realBraceH = realH - realYStart - 12;
      const realSpacing = Math.round(realBraceH / Math.max(levels - 1, 1) / 4) * 4;

      for (let i = 0; i <= bays; i++) {
        const x = i * bayW - (bays * bayW) / 2;

        const col = createIBeam(colHeight, colThick, colThick * 1.5);
        col.position.set(x, colHeight / 2, 0);
        scene.add(col);

        const baseLen = armLen + 4 * scale;
        const baseH = colThick * 1.1;
        const base = createIBeam(isTwoSided ? baseLen * 2 : baseLen, colThick, baseH);
        base.rotation.x = Math.PI / 2;
        const baseZ = isTwoSided ? 0 : baseLen / 2 - colThick * 0.75;
        base.position.set(x, baseH / 2, baseZ);
        scene.add(base);

        for (let j = 1; j <= levels; j++) {
          const realY = realYStart + (j - 1) * realSpacing;
          const y = realY * scale;

          // Front Arm (2° upward pitch)
          const armGroupF = new THREE.Group();
          armGroupF.position.set(x, y, colThick * 0.75);
          armGroupF.rotation.x = (-2 * Math.PI) / 180;

          const plateGeo = new THREE.BoxGeometry(colThick * 1.25, colThick * 1.45, 0.4 * scale);
          const plateF = new THREE.Mesh(plateGeo, colMat);
          plateF.position.set(0, 0, -0.2 * scale);
          plateF.castShadow = true;
          armGroupF.add(plateF);

          const armGeo = new THREE.BoxGeometry(colThick * 0.7, colThick * 0.7, armLen);
          const armF = new THREE.Mesh(armGeo, armMat);
          armF.position.set(0, 0, armLen / 2);
          armF.castShadow = true;
          armGroupF.add(armF);

          const tipGeo = new THREE.BoxGeometry(colThick * 0.7, colThick * 1.5, 1 * scale);
          const tipF = new THREE.Mesh(tipGeo, armMat);
          tipF.position.set(0, colThick * 0.4, armLen);
          armGroupF.add(tipF);

          armGroupF.userData = { isPart: true };
          scene.add(armGroupF);

          // Rear Arm if Two-Sided
          if (isTwoSided) {
            const armGroupB = new THREE.Group();
            armGroupB.position.set(x, y, -colThick * 0.75);
            armGroupB.rotation.x = (2 * Math.PI) / 180;

            const plateB = new THREE.Mesh(plateGeo, colMat);
            plateB.position.set(0, 0, 0.2 * scale);
            armGroupB.add(plateB);

            const armB = new THREE.Mesh(armGeo, armMat);
            armB.position.set(0, 0, -armLen / 2);
            armB.castShadow = true;
            armGroupB.add(armB);

            const tipB = new THREE.Mesh(tipGeo, armMat);
            tipB.position.set(0, colThick * 0.4, -armLen);
            armGroupB.add(tipB);

            armGroupB.userData = { isPart: true };
            scene.add(armGroupB);
          }
        }

        // Bracing between columns
        if (i < bays) {
          const nextX = (i + 1) * bayW - (bays * bayW) / 2;
          const midX = (x + nextX) / 2;
          const braceWidth = Math.abs(nextX - x);
          const yStart = realYStart * scale;
          const bHeight = realBraceH * scale;

          const drawHoriz = (posY: number) => {
            const sGeo = new THREE.BoxGeometry(braceWidth, 1.4, 1.4);
            const s = new THREE.Mesh(sGeo, braceMat);
            s.position.set(midX, posY, 0);
            s.userData = { isPart: true };
            scene.add(s);
          };

          const drawX = (y1: number, y2: number) => {
            const dY = Math.abs(y2 - y1);
            const diagLen = Math.sqrt(braceWidth * braceWidth + dY * dY);
            const angle = Math.atan2(dY, braceWidth);
            const cGeo = new THREE.BoxGeometry(diagLen, 0.45, 0.45);

            const c1 = new THREE.Mesh(cGeo, cableMat);
            c1.position.set(midX, (y1 + y2) / 2, -0.2);
            c1.rotation.z = angle;
            c1.userData = { isPart: true };
            scene.add(c1);

            const c2 = new THREE.Mesh(cGeo, cableMat);
            c2.position.set(midX, (y1 + y2) / 2, 0.2);
            c2.rotation.z = -angle;
            c2.userData = { isPart: true };
            scene.add(c2);
          };

          drawHoriz(yStart);
          drawHoriz(yStart + bHeight);
          drawX(yStart, yStart + bHeight);
        }
      }

      // Render Wooden Pallets with Cargo across Cantilever Arms
      if (showPalletLoad) {
        for (let i = 0; i < bays; i++) {
          const x1 = i * bayW - (bays * bayW) / 2;
          const x2 = (i + 1) * bayW - (bays * bayW) / 2;
          const midX = (x1 + x2) / 2;

          for (let j = 1; j <= levels; j++) {
            const realY = realYStart + (j - 1) * realSpacing;
            const y = realY * scale + colThick * 0.7;

            // Front Pallet
            const pFront = create3DPallet(36 * scale, armLen * 0.85, 28 * scale);
            pFront.position.set(midX, y, armLen * 0.5);
            scene.add(pFront);

            // Rear Pallet if Two-Sided
            if (isTwoSided) {
              const pRear = create3DPallet(36 * scale, armLen * 0.85, 28 * scale);
              pRear.position.set(midX, y, -armLen * 0.5);
              scene.add(pRear);
            }
          }
        }
      }
    } else {
      /* ---------------- SELECTIVE PALLET RACK BUILDER ---------------- */
      const frameH = +palletHeight * scale;
      const frameD = +palletDepth * scale;
      const beamL = +palletBeamLength * scale;
      const totalBaysW = palletBays * beamL;

      const frameMat = new THREE.MeshPhongMaterial({ color: 0x1d4ed8, shininess: 60 }); // Industrial Blue
      const beamMat = new THREE.MeshPhongMaterial({ color: 0xea580c, shininess: 70 });  // Safety Orange
      const wireDeckMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        wireframe: true,
        roughness: 0.4,
      });

      // 1. Build Upright Frames (Front & Rear tubular columns with diagonal lacing)
      const postW = 3 * scale;
      const postD = 3 * scale;

      for (let b = 0; b <= palletBays; b++) {
        const x = b * beamL - totalBaysW / 2;

        const frameGroup = new THREE.Group();
        frameGroup.position.set(x, 0, 0);

        // Front Post
        const frontPostGeo = new THREE.BoxGeometry(postW, frameH, postD);
        const frontPost = new THREE.Mesh(frontPostGeo, frameMat);
        frontPost.position.set(0, frameH / 2, frameD / 2);
        frontPost.castShadow = true;
        frameGroup.add(frontPost);

        // Rear Post
        const rearPost = new THREE.Mesh(frontPostGeo, frameMat);
        rearPost.position.set(0, frameH / 2, -frameD / 2);
        rearPost.castShadow = true;
        frameGroup.add(rearPost);

        // Footplates
        const footGeo = new THREE.BoxGeometry(postW * 1.8, 0.4 * scale, postD * 1.8);
        const footF = new THREE.Mesh(footGeo, frameMat);
        footF.position.set(0, 0.2 * scale, frameD / 2);
        frameGroup.add(footF);

        const footR = new THREE.Mesh(footGeo, frameMat);
        footR.position.set(0, 0.2 * scale, -frameD / 2);
        frameGroup.add(footR);

        // Diagonal & Horizontal Frame Lacings
        const lacingMat = new THREE.MeshPhongMaterial({ color: 0x2563eb });
        const numLaces = Math.max(3, Math.floor(+palletHeight / 36));
        const laceStep = frameH / numLaces;

        for (let l = 0; l < numLaces; l++) {
          const y1 = l * laceStep;
          const y2 = (l + 1) * laceStep;

          // Horizontal strut
          const hGeo = new THREE.BoxGeometry(1.2 * scale, 1.2 * scale, frameD);
          const hStrut = new THREE.Mesh(hGeo, lacingMat);
          hStrut.position.set(0, y1, 0);
          frameGroup.add(hStrut);

          // Diagonal strut
          const diagLen = Math.sqrt(frameD * frameD + laceStep * laceStep);
          const diagGeo = new THREE.BoxGeometry(1 * scale, 1 * scale, diagLen);
          const diagMesh = new THREE.Mesh(diagGeo, lacingMat);
          diagMesh.position.set(0, (y1 + y2) / 2, 0);
          diagMesh.rotation.x = Math.atan2(frameD, laceStep) * (l % 2 === 0 ? 1 : -1);
          frameGroup.add(diagMesh);
        }

        frameGroup.userData = { isPart: true };
        scene.add(frameGroup);
      }

      // 2. Build Step Beams & Wire Decking per Bay per Level
      const beamHeight = 4.5 * scale;
      const beamThick = 2 * scale;
      const levelSpacing = (frameH - 12 * scale) / Math.max(palletLevels, 1);

      for (let b = 0; b < palletBays; b++) {
        const midX = b * beamL - totalBaysW / 2 + beamL / 2;

        for (let lev = 1; lev <= palletLevels; lev++) {
          const beamY = lev * levelSpacing;

          // Front Step Beam
          const frontBeamGeo = new THREE.BoxGeometry(beamL, beamHeight, beamThick);
          const frontBeam = new THREE.Mesh(frontBeamGeo, beamMat);
          frontBeam.position.set(midX, beamY, frameD / 2);
          frontBeam.castShadow = true;
          frontBeam.userData = { isPart: true };
          scene.add(frontBeam);

          // Rear Step Beam
          const rearBeam = new THREE.Mesh(frontBeamGeo, beamMat);
          rearBeam.position.set(midX, beamY, -frameD / 2);
          rearBeam.castShadow = true;
          rearBeam.userData = { isPart: true };
          scene.add(rearBeam);

          // Wire Mesh Decking (2 waterfall deck panels per bay)
          const deckGeo = new THREE.BoxGeometry(beamL * 0.98, 0.4 * scale, frameD * 0.98);
          const deck = new THREE.Mesh(deckGeo, wireDeckMat);
          deck.position.set(midX, beamY + beamHeight / 2 + 0.2 * scale, 0);
          deck.userData = { isPart: true };
          scene.add(deck);

          // 3. Render 3D Pallets with Freight Loads on each level (2 pallets per bay)
          if (showPalletLoad) {
            const palletGap = (beamL - 2 * (40 * scale)) / 3;

            // Pallet 1 (Left in bay)
            const p1 = create3DPallet(40 * scale, 48 * scale, 34 * scale);
            const p1X = midX - 20 * scale - palletGap / 2;
            p1.position.set(p1X, beamY + beamHeight / 2 + 0.4 * scale, 0);
            scene.add(p1);

            // Pallet 2 (Right in bay)
            const p2 = create3DPallet(40 * scale, 48 * scale, 34 * scale);
            const p2X = midX + 20 * scale + palletGap / 2;
            p2.position.set(p2X, beamY + beamHeight / 2 + 0.4 * scale, 0);
            scene.add(p2);
          }
        }
      }
    }

    // Auto-fit camera view
    if (cameraMode === "3d") {
      const box = new THREE.Box3();
      scene.traverse((o) => {
        if (o.userData?.isPart) box.expandByObject(o);
      });
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = inst.camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.6;
      inst.camera.position.set(center.x + cameraZ * 0.45, center.y + cameraZ * 0.25, center.z + cameraZ * 0.95);
      inst.controls.target.copy(center);
      inst.controls.update();
    } else {
      inst.camera.position.set(0, 70, 240);
      inst.controls.target.set(0, 60, 0);
      inst.controls.update();
    }
  }, [
    rackSystem,
    showPalletLoad,
    height,
    armLength,
    levels,
    sideType,
    bays,
    bayWidth,
    cantileverSolved,
    palletHeight,
    palletDepth,
    palletBeamLength,
    palletLevels,
    palletBays,
    palletSolved,
    cameraMode,
  ]);

  const handleCopyApexPayload = () => {
    const payload =
      rackSystem === "cantilever"
        ? {
            action: "CantileverRackController.createQuoteAndLines",
            opportunityId: "0065g000001XyZaABC",
            closeDate: new Date().toISOString().split("T")[0],
            engineeringSpecs: {
              systemType: "Cantilever Storage Rack",
              solvedColumnSystem: cantileverSolved.system,
              solvedArmSeries: cantileverSolved.armType,
              rackHeightInches: +height,
              armLengthInches: +armLength,
              levelsPerColumn: levels,
              baysCount: bays,
              bayWidthInches: +bayWidth,
              sideType,
              bundleLengthInches: bundleLength,
              bundleWeightLbs: bundleWeight,
              armsSupporting: cantileverSolved.armsSupporting,
              loadPerArmLbs: cantileverSolved.loadPerArm,
              maxSafeCapacityLbs: cantileverSolved.calculatedMaxCapacity,
              isCapacityExceeded: cantileverSolved.isCapacityExceeded,
            },
            calculatedTotalWholesalePriceUSD: totalPrice,
            bomLines: bom.map((item) => ({
              sku: item.sku,
              description: item.description,
              componentType: item.componentType,
              quantity: item.quantity,
              unitCost: item.unitCost,
              extendedCost: item.quantity * item.unitCost,
            })),
          }
        : {
            action: "PalletRackController.createQuoteAndLines",
            opportunityId: "0065g000002WzBcDEF",
            closeDate: new Date().toISOString().split("T")[0],
            engineeringSpecs: {
              systemType: "Selective Pallet Rack (Teardrop)",
              uprightFrameHeightInches: +palletHeight,
              uprightFrameDepthInches: +palletDepth,
              beamLengthInches: +palletBeamLength,
              beamLevelsCount: palletLevels,
              baysCount: palletBays,
              totalPalletCapacity: palletSolved.totalPallets,
              ratedBeamCapacityLbs: palletSolved.ratedBeamCapacity,
              actualBeamPairLoadLbs: palletSolved.beamPairLoad,
              ratedFrameCapacityLbs: palletSolved.ratedFrameCapacity,
              totalRackWeightLbs: palletSolved.totalBayWeight,
              isCapacityExceeded: palletSolved.isCapacityExceeded,
            },
            calculatedTotalWholesalePriceUSD: totalPrice,
            bomLines: bom.map((item) => ({
              sku: item.sku,
              description: item.description,
              componentType: item.componentType,
              quantity: item.quantity,
              unitCost: item.unitCost,
              extendedCost: item.quantity * item.unitCost,
            })),
          };

    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOverloaded = rackSystem === "cantilever" ? cantileverSolved.isCapacityExceeded : palletSolved.isCapacityExceeded;

  return (
    <div className="space-y-4 font-mono text-xs text-white/90">
      
      {/* Top Bar: System Selector + View Modes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        
        {/* Left: System Selector Pills */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/50 hidden md:inline">Storage Type:</span>
          <div className="flex rounded-lg border border-white/20 bg-[#0F1326] p-1 gap-1">
            <button
              onClick={() => setRackSystem("cantilever")}
              className={`px-3 py-1 rounded-[6px] text-xs font-semibold transition-all cursor-pointer ${
                rackSystem === "cantilever"
                  ? "bg-[#E8A317] text-[#100C09] shadow-xs"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Cantilever Rack
            </button>
            <button
              onClick={() => setRackSystem("pallet")}
              className={`px-3 py-1 rounded-[6px] text-xs font-semibold transition-all cursor-pointer ${
                rackSystem === "pallet"
                  ? "bg-[#E8A317] text-[#100C09] shadow-xs"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Selective Pallet Rack
            </button>
          </div>
        </div>

        {/* Right: Solver Status + Pallet Load Toggle + Camera Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Overload Alert Pill */}
          {isOverloaded ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500 text-rose-300 text-[11px] font-bold animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>
                OVERLOAD:{" "}
                {rackSystem === "cantilever"
                  ? `Exceeds ${cantileverSolved.calculatedMaxCapacity.toLocaleString()} lbs`
                  : `Exceeds ${palletSolved.ratedBeamCapacity.toLocaleString()} lbs/beam`}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {rackSystem === "cantilever"
                  ? `Solved: ${cantileverSolved.system} · ${cantileverSolved.armType} Arms`
                  : `Solved: ${palletSolved.totalPallets} Pallets · 5K Step Beams`}
              </span>
            </div>
          )}

          {/* Toggle Pallet Loads */}
          <button
            onClick={() => setShowPalletLoad(!showPalletLoad)}
            className={`px-2.5 py-1 rounded border text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer ${
              showPalletLoad
                ? "bg-amber-400/20 border-amber-400 text-amber-300 font-bold"
                : "border-white/20 bg-white/5 text-white/70 hover:text-white"
            }`}
            title="Toggle 3D Wooden Pallets & Cargo"
          >
            <Package className="w-3.5 h-3.5 text-[#E8A317]" />
            <span>{showPalletLoad ? "Pallets: Loaded" : "Pallets: Off"}</span>
          </button>

          {/* 3D / 2D Camera Toggle */}
          <button
            onClick={() => setCameraMode(cameraMode === "3d" ? "2d" : "3d")}
            className="px-2.5 py-1 rounded border border-white/20 bg-white/5 hover:bg-white/15 text-[11px] text-white flex items-center gap-1.5 cursor-pointer"
          >
            <Box className="w-3 h-3 text-[#E8A317]" />
            <span>{cameraMode === "3d" ? "3D Orbit" : "2D Ortho"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls vs 3D View & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: Parametric Controls */}
        <div className="lg:col-span-5 space-y-3 bg-[#14182E] border border-white/15 p-4 rounded-[14px]">
          <div className="text-[10px] uppercase font-bold text-white/60 tracking-wider flex items-center justify-between">
            <span>{rackSystem === "cantilever" ? "Cantilever Specifications" : "Pallet Rack Specifications"}</span>
            <span className="text-[#E8A317]">Engineering CAD Engine</span>
          </div>

          {rackSystem === "cantilever" ? (
            /* ================= CANTILEVER CONTROLS ================= */
            <>
              {/* Single / Double Sided */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-white/50 block text-[10px] mb-1">Configuration</span>
                  <div className="flex rounded border border-white/15 overflow-hidden">
                    <button
                      onClick={() => setSideType("One-Sided")}
                      className={`flex-1 py-1 text-center transition-colors cursor-pointer ${
                        sideType === "One-Sided" ? "bg-white text-[#14182E] font-bold" : "text-white/60"
                      }`}
                    >
                      Single
                    </button>
                    <button
                      onClick={() => setSideType("Two-Sided")}
                      className={`flex-1 py-1 text-center transition-colors cursor-pointer ${
                        sideType === "Two-Sided" ? "bg-white text-[#14182E] font-bold" : "text-white/60"
                      }`}
                    >
                      Double
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-white/50 block text-[10px] mb-1">Column Height</span>
                  <select
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-[#0F1326] border border-white/15 rounded px-2 py-1 text-white text-[11px] focus:outline-hidden cursor-pointer"
                  >
                    <option value="96">8 ft. (96&quot;)</option>
                    <option value="120">10 ft. (120&quot;)</option>
                    <option value="144">12 ft. (144&quot;)</option>
                    <option value="168">14 ft. (168&quot;)</option>
                    <option value="192">16 ft. (192&quot;)</option>
                    <option value="240">20 ft. (240&quot;)</option>
                  </select>
                </div>
              </div>

              {/* Arm Length & Arm Levels */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-white/50 block text-[10px] mb-1">Arm Length</span>
                  <select
                    value={armLength}
                    onChange={(e) => setArmLength(e.target.value)}
                    className="w-full bg-[#0F1326] border border-white/15 rounded px-2 py-1 text-white text-[11px] focus:outline-hidden cursor-pointer"
                  >
                    <option value="24">24&quot; (2 ft.)</option>
                    <option value="36">36&quot; (3 ft.)</option>
                    <option value="48">48&quot; (4 ft.)</option>
                    <option value="60">60&quot; (5 ft.)</option>
                    <option value="72">72&quot; (6 ft.)</option>
                  </select>
                </div>

                <div>
                  <span className="text-white/50 block text-[10px] mb-1">Levels / Column</span>
                  <div className="flex items-center gap-1">
                    {[2, 3, 4, 5].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setLevels(lvl)}
                        className={`flex-1 py-1 rounded border text-center transition-colors cursor-pointer ${
                          levels === lvl
                            ? "bg-[#E8A317] border-[#E8A317] text-[#100C09] font-bold"
                            : "border-white/15 text-white/60 hover:text-white"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bays & Bay Spacing */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-white/50 block text-[10px] mb-1">Bays Count</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((b) => (
                      <button
                        key={b}
                        onClick={() => setBays(b)}
                        className={`flex-1 py-1 rounded border text-center transition-colors cursor-pointer ${
                          bays === b
                            ? "bg-[#E8A317] border-[#E8A317] text-[#100C09] font-bold"
                            : "border-white/15 text-white/60 hover:text-white"
                        }`}
                      >
                        {b} Bay{b > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-white/50 block text-[10px] mb-1">Bay Width (C-C)</span>
                  <select
                    value={bayWidth}
                    onChange={(e) => setBayWidth(e.target.value)}
                    className="w-full bg-[#0F1326] border border-white/15 rounded px-2 py-1 text-white text-[11px] focus:outline-hidden cursor-pointer"
                  >
                    <option value="48">48&quot; (4 ft.)</option>
                    <option value="60">60&quot; (5 ft.)</option>
                    <option value="72">72&quot; (6 ft.)</option>
                    <option value="96">96&quot; (8 ft.)</option>
                  </select>
                </div>
              </div>

              {/* Bundle Weight Slider */}
              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-white/60">Load Weight:</span>
                  <span className="font-bold text-[#E8A317]">{bundleWeight.toLocaleString()} lbs</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={10000}
                  step={500}
                  value={bundleWeight}
                  onChange={(e) => setBundleWeight(+e.target.value)}
                  className="w-full accent-[#E8A317] cursor-pointer"
                />
              </div>

              {/* Solved Summary Box */}
              <div className="pt-2 border-t border-white/10 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-white/50">Load Per Arm:</span>
                  <span className="font-semibold text-white">{cantileverSolved.loadPerArm.toLocaleString()} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Max Frame Safe Capacity:</span>
                  <span className="font-semibold text-emerald-400">{cantileverSolved.calculatedMaxCapacity.toLocaleString()} lbs</span>
                </div>
              </div>
            </>
          ) : (
            /* ================= PALLET RACK CONTROLS ================= */
            <>
              {/* Frame Height & Depth */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-white/50 block text-[10px] mb-1">Frame Height</span>
                  <select
                    value={palletHeight}
                    onChange={(e) => setPalletHeight(e.target.value)}
                    className="w-full bg-[#0F1326] border border-white/15 rounded px-2 py-1 text-white text-[11px] focus:outline-hidden cursor-pointer"
                  >
                    <option value="96">8 ft. (96&quot;)</option>
                    <option value="120">10 ft. (120&quot;)</option>
                    <option value="144">12 ft. (144&quot;)</option>
                    <option value="192">16 ft. (192&quot;)</option>
                  </select>
                </div>

                <div>
                  <span className="text-white/50 block text-[10px] mb-1">Frame Depth</span>
                  <select
                    value={palletDepth}
                    onChange={(e) => setPalletDepth(e.target.value)}
                    className="w-full bg-[#0F1326] border border-white/15 rounded px-2 py-1 text-white text-[11px] focus:outline-hidden cursor-pointer"
                  >
                    <option value="42">42&quot; (Standard GMA)</option>
                    <option value="48">48&quot; (Deep Pallet)</option>
                  </select>
                </div>
              </div>

              {/* Beam Length & Beam Levels */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-white/50 block text-[10px] mb-1">Beam Length</span>
                  <select
                    value={palletBeamLength}
                    onChange={(e) => setPalletBeamLength(e.target.value)}
                    className="w-full bg-[#0F1326] border border-white/15 rounded px-2 py-1 text-white text-[11px] focus:outline-hidden cursor-pointer"
                  >
                    <option value="96">96&quot; (2 Pallets / Bay)</option>
                    <option value="108">108&quot; (2 Oversize Pallets)</option>
                  </select>
                </div>

                <div>
                  <span className="text-white/50 block text-[10px] mb-1">Beam Levels</span>
                  <div className="flex items-center gap-1">
                    {[2, 3, 4].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setPalletLevels(lvl)}
                        className={`flex-1 py-1 rounded border text-center transition-colors cursor-pointer ${
                          palletLevels === lvl
                            ? "bg-[#E8A317] border-[#E8A317] text-[#100C09] font-bold"
                            : "border-white/15 text-white/60 hover:text-white"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bays Count */}
              <div>
                <span className="text-white/50 block text-[10px] mb-1">Bays Count</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((b) => (
                    <button
                      key={b}
                      onClick={() => setPalletBays(b)}
                      className={`flex-1 py-1 rounded border text-center transition-colors cursor-pointer ${
                        palletBays === b
                          ? "bg-[#E8A317] border-[#E8A317] text-[#100C09] font-bold"
                          : "border-white/15 text-white/60 hover:text-white"
                      }`}
                    >
                      {b} Bay{b > 1 ? "s" : ""} ({b * 2 * palletLevels} Pallets)
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Per Pallet Slider */}
              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-white/60">Pallet Load Weight:</span>
                  <span className="font-bold text-[#E8A317]">{palletWeight.toLocaleString()} lbs / pallet</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={3500}
                  step={200}
                  value={palletWeight}
                  onChange={(e) => setPalletWeight(+e.target.value)}
                  className="w-full accent-[#E8A317] cursor-pointer"
                />
              </div>

              {/* Pallet Rack Solved Metrics */}
              <div className="pt-2 border-t border-white/10 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-white/50">Total Pallet Capacity:</span>
                  <span className="font-semibold text-white">{palletSolved.totalPallets} GMA Pallets</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Beam Pair Load vs Rating:</span>
                  <span className={`font-semibold ${palletSolved.isBeamOverloaded ? "text-rose-400" : "text-emerald-400"}`}>
                    {palletSolved.beamPairLoad.toLocaleString()} / {palletSolved.ratedBeamCapacity.toLocaleString()} lbs
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Wholesale Total */}
          <div className="flex justify-between items-baseline pt-2.5 border-t border-white/10">
            <span className="text-white/70 font-semibold">Total Wholesale Price:</span>
            <span className="text-base font-bold text-emerald-400">${totalPrice.toLocaleString()} USD</span>
          </div>

        </div>

        {/* Right Column: Three.js 3D Viewport & Output Tabs */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Three.js 3D Viewport */}
          <div className="rounded-[14px] bg-[#0A0D1A] border border-white/15 overflow-hidden shadow-inner relative">
            <div className="absolute top-2.5 left-3 text-[10px] text-white/60 flex items-center gap-2 z-10 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {rackSystem === "cantilever" ? "Cantilever 3D WebGL" : "Selective Pallet Rack 3D WebGL"} · Drag to rotate, scroll to zoom
              </span>
            </div>

            <div ref={mountRef} className="w-full h-80 cursor-grab active:cursor-grabbing" />
          </div>

          {/* BOM & Apex Payload Tabs */}
          <div className="bg-[#14182E] border border-white/15 p-3.5 rounded-[14px] space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setActiveTab("bom")}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    activeTab === "bom" ? "bg-white/15 text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  Bill of Materials ({bom.length})
                </button>
                <button
                  onClick={() => setActiveTab("apex")}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    activeTab === "apex" ? "bg-white/15 text-white font-bold" : "text-white/50 hover:text-white"
                  }`}
                >
                  Apex Quote Payload
                </button>
              </div>

              <button
                onClick={handleCopyApexPayload}
                className="flex items-center gap-1 text-[11px] text-[#E8A317] hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied JSON" : "Copy Payload"}</span>
              </button>
            </div>

            {/* Tab 1: BOM Table */}
            {activeTab === "bom" ? (
              <div className="max-h-48 overflow-y-auto divide-y divide-white/10 text-[11px] pr-1">
                {bom.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between gap-3">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white truncate">{item.sku}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-white/70">
                          {item.componentType}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/50 truncate">{item.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-semibold text-white">Qty: {item.quantity}</span>
                      <span className="text-[10px] text-emerald-400 block font-mono">
                        ${(item.quantity * item.unitCost).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Tab 2: Apex Quote Payload Preview */
              <pre className="max-h-48 overflow-y-auto font-mono text-[10px] text-emerald-400/90 leading-relaxed bg-[#0A0D1A] p-2.5 rounded-[8px] border border-white/10">
                {JSON.stringify(
                  rackSystem === "cantilever"
                    ? {
                        action: "CantileverRackController.createQuoteAndLines",
                        opportunityId: "0065g000001XyZaABC",
                        engineeringSpecs: {
                          solvedSystem: cantileverSolved.system,
                          solvedArm: cantileverSolved.armType,
                          height: +height,
                          bays,
                          levels,
                          sideType,
                          loadPerArm: cantileverSolved.loadPerArm,
                          wholesaleTotalUSD: totalPrice,
                        },
                        bomLinesCount: bom.length,
                      }
                    : {
                        action: "PalletRackController.createQuoteAndLines",
                        opportunityId: "0065g000002WzBcDEF",
                        engineeringSpecs: {
                          frameHeight: +palletHeight,
                          frameDepth: +palletDepth,
                          beamLength: +palletBeamLength,
                          levels: palletLevels,
                          bays: palletBays,
                          totalPallets: palletSolved.totalPallets,
                          wholesaleTotalUSD: totalPrice,
                        },
                        bomLinesCount: bom.length,
                      },
                  null,
                  2
                )}
              </pre>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
