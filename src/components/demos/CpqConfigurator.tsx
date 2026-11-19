"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sliders, Copy, Check, Box, Eye, Layers, AlertTriangle, ShieldCheck, RefreshCw, ZoomIn, ZoomOut } from "lucide-react";

// Rated arm capacities (lbs) per arm length
const ARM_CAPACITY_TABLE: Record<string, Record<string, number>> = {
  "24": { C3X35: 1575, C4X45: 2500, C5X67: 3500, S3X57: 4000, S4X77: 5000 },
  "36": { C3X35: 1000, C4X45: 1800, C5X67: 2800, S3X57: 3200, S4X77: 4000 },
  "48": { C3X35: 700,  C4X45: 1300, C5X67: 2000, S3X57: 2500, S4X77: 3800 },
  "60": { C3X35: 500,  C4X45: 1000, C5X67: 1500, S3X57: 2000, S4X77: 2500 },
  "72": { C3X35: 350,  C4X45: 800,  C5X67: 1200, S3X57: 1600, S4X77: 2000 },
};

// Base column capacities (lbs) for 36" arm length (Single Sided)
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

  // Configuration Parameters
  const [height, setHeight] = useState<string>("144"); // 12 ft
  const [armLength, setArmLength] = useState<string>("36"); // 3 ft
  const [levels, setLevels] = useState<number>(3);
  const [sideType, setSideType] = useState<"One-Sided" | "Two-Sided">("One-Sided");
  const [bays, setBays] = useState<number>(1);
  const [bayWidth, setBayWidth] = useState<string>("48"); // 4 ft
  const [bundleLength, setBundleLength] = useState<number>(96); // 8 ft
  const [bundleWeight, setBundleWeight] = useState<number>(4000); // 4,000 lbs
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

  /* ================= DYNAMIC ENGINEERING SOLVER ================= */
  const solved = useMemo(() => {
    const isTwoSided = sideType === "Two-Sided";
    const numCols = bays + 1;
    const bayW = +bayWidth || 48;

    // 1. Spanning Columns Calculation
    const armsSupporting = Math.min(numCols, Math.max(2, Math.floor(bundleLength / bayW) + 1));
    const requiredArmCap = bundleWeight / armsSupporting;
    const totalUprightLoad = levels * requiredArmCap * (isTwoSided ? 2.0 : 1.0);

    // 2. Column System Selection
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

    // 3. Arm Type Selection
    const armTypes = ["C3X35", "C4X45", "C5X67", "S3X57", "S4X77"];
    let selectedArmType = "C3X35";
    let maxSafeArmCap = 0;
    let armTypeFound = false;

    const armRow = ARM_CAPACITY_TABLE[armLength] || {};

    for (const type of armTypes) {
      const armCap = armRow[type] || 0;
      if (armCap >= requiredArmCap) {
        selectedArmType = type;
        maxSafeArmCap = armCap;
        armTypeFound = true;
        break;
      }
    }

    if (!armTypeFound) {
      selectedArmType = "S4X77";
      maxSafeArmCap = armRow["S4X77"] || 2000;
    }

    // 4. Safe Capacity limits
    const maxBundleColWeight = (maxSafeColCap / levels) * armsSupporting;
    const maxBundleArmWeight = maxSafeArmCap * armsSupporting;
    const calculatedMaxCap = Math.round(Math.min(maxBundleColWeight, maxBundleArmWeight));

    return {
      system: selectedSystem,
      armType: selectedArmType,
      armsSupporting,
      loadPerArm: Math.round(requiredArmCap),
      calculatedMaxCapacity: calculatedMaxCap,
      isCapacityExceeded: bundleWeight > calculatedMaxCap,
    };
  }, [height, armLength, levels, sideType, bays, bayWidth, bundleLength, bundleWeight]);

  /* ================= BILL OF MATERIALS (BOM) & SKU GENERATION ================= */
  const bom = useMemo(() => {
    const numCols = bays + 1;
    const isTwoSided = sideType === "Two-Sided";
    const numBases = numCols * (isTwoSided ? 2 : 1);
    const armsPerCol = levels * (isTwoSided ? 2 : 1);
    const totalArms = numCols * armsPerCol;
    const heightFeet = Math.round(+height / 12);

    // 1. Column SKU
    let colSku = `RCL-${solved.system}CL-${heightFeet}`;
    if (solved.system === "W6-9") {
      if (heightFeet === 8 || heightFeet === 12) {
        colSku = `RCL-W69CL-${heightFeet}${isTwoSided ? "D" : "S"}`;
      }
    } else if (solved.system === "W8-18") {
      if ((heightFeet === 16 || heightFeet === 20) && !isTwoSided) {
        colSku = `RCL-W818CL-${heightFeet}S`;
      }
    }

    // 2. Base SKU
    const baseSku = `RCL-${solved.system}BS-${armLength}`;

    // 3. Arm SKU
    const armSku = `RCL-${solved.armType}-${armLength}`;

    // 4. Bracing SKUs
    const horizontalSku = `RCL-HB${bayWidth}`;
    const hasXBrace = ["48", "60", "72", "84", "96"].includes(bayWidth);
    const braceSku = hasXBrace ? `RCL-XB${bayWidth}` : `RCL-DB${bayWidth}`;

    let diagQty = 0;
    let horizQty = 0;
    const heightVal = +height;

    if (heightVal <= 144) {
      horizQty = bays * 2;
      diagQty = Math.ceil(bays / 2) * 2;
    } else if (heightVal <= 192) {
      horizQty = bays * 3;
      diagQty = Math.ceil(bays / 2) * 2;
    } else {
      horizQty = bays * 4;
      diagQty = Math.ceil(bays / 2) * 4;
    }

    // 5. Leveling Shims & Anchors
    const shimQty = numCols * 2 + numBases * 2;
    const anchorQty = numCols * 2 + numBases * 2;
    const hardwareQty = numBases * 6 + totalArms * 4 + horizQty * 2 + diagQty * 2;

    const list = [
      {
        sku: colSku,
        description: `Structural Cantilever Column, ${solved.system} System, ${heightFeet} ft. H, ${isTwoSided ? "Double" : "Single"}-Sided`,
        componentType: "Column",
        quantity: numCols,
        unitCost: 350,
      },
      {
        sku: baseSku,
        description: `Structural Cantilever Base, ${solved.system} System, ${armLength}" L`,
        componentType: "Base",
        quantity: numBases,
        unitCost: 185,
      },
      {
        sku: armSku,
        description: `Structural Cantilever Arm, ${solved.armType} Series, ${armLength}" L (2° Safety Slant)`,
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
        sku: `RCL-${solved.system.replace("-", "")}SHM`,
        description: `Structural Leveling Shims for ${solved.system} Column Bases`,
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
  }, [bays, sideType, levels, height, solved, armLength, bayWidth]);

  const totalPrice = useMemo(() => {
    return Math.round(bom.reduce((sum, i) => sum + i.quantity * i.unitCost, 0));
  }, [bom]);

  /* ================= THREE.JS 3D ENGINE ================= */
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const h = 320;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0d1a);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / h, 0.5, 5000);
    camera.position.set(160, 160, 320);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 30, 0);

    // Studio Lighting
    scene.add(new THREE.HemisphereLight(0xffffff, 0x1f2937, 1.2));

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight.position.set(120, 240, 150);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.4);
    fillLight.position.set(-120, 120, -120);
    scene.add(fillLight);

    // Engineering Ground Grid
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

  // Rebuild 3D Rack on Parameter Change
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
    const colHeight = +height * scale;
    const armLen = +armLength * scale;
    const bayW = +bayWidth * scale;
    const isTwoSided = sideType === "Two-Sided";

    // Structural scale based on system
    let colThick = 2.5;
    if (solved.system === "W6-15") colThick = 3.2;
    else if (solved.system === "W8-18") colThick = 4.2;
    else if (solved.system === "W10-22") colThick = 5.2;
    colThick *= scale;

    // Materials
    const colMat = new THREE.MeshPhongMaterial({
      color: 0x22c55e, // Industrial Safety Green
      shininess: 50,
    });
    const armMat = new THREE.MeshPhongMaterial({
      color: 0xe8a317, // Turmeric Orange Arm
      shininess: 90,
    });
    const braceMat = new THREE.MeshPhongMaterial({
      color: 0x16a34a,
      shininess: 40,
    });
    const cableMat = new THREE.MeshPhongMaterial({
      color: 0x94a3b8,
      shininess: 100,
    });

    // Helper: Create I-Beam Column with Slot Punch Holes
    const createIBeam = (l: number, w: number, d: number) => {
      const group = new THREE.Group();
      const flangeThick = w * 0.18;
      const webThick = w * 0.14;
      const webDepth = d - flangeThick * 2;

      // Front Flange
      const ffGeo = new THREE.BoxGeometry(w, l, flangeThick);
      const ff = new THREE.Mesh(ffGeo, colMat);
      ff.position.set(0, 0, d / 2 - flangeThick / 2);
      ff.castShadow = true;
      group.add(ff);

      // Back Flange
      const bf = new THREE.Mesh(ffGeo, colMat);
      bf.position.set(0, 0, -(d / 2 - flangeThick / 2));
      bf.castShadow = true;
      group.add(bf);

      // Center Web
      const webGeo = new THREE.BoxGeometry(webThick, l, webDepth);
      const web = new THREE.Mesh(webGeo, colMat);
      web.castShadow = true;
      group.add(web);

      // 4" spacing punch holes on front flange
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

    // Build Columns, Bases, and Arms
    for (let i = 0; i <= bays; i++) {
      const x = i * bayW - (bays * bayW) / 2;

      // Upright Column
      const col = createIBeam(colHeight, colThick, colThick * 1.5);
      col.position.set(x, colHeight / 2, 0);
      scene.add(col);

      // Base I-Beam
      const baseLen = armLen + 4 * scale;
      const baseH = colThick * 1.1;
      const base = createIBeam(isTwoSided ? baseLen * 2 : baseLen, colThick, baseH);
      base.rotation.x = Math.PI / 2;
      const baseZ = isTwoSided ? 0 : baseLen / 2 - colThick * 0.75;
      base.position.set(x, baseH / 2, baseZ);
      scene.add(base);

      // Arm Placements with 2° Upward Safety Angle
      const realH = +height;
      const realYStart = realH <= 144 ? realH * 0.3 : realH * 0.22;
      const realBraceH = realH - realYStart - 12;
      const realSpacing = Math.round(realBraceH / Math.max(levels - 1, 1) / 4) * 4;

      for (let j = 1; j <= levels; j++) {
        const realY = realYStart + (j - 1) * realSpacing;
        const y = realY * scale;

        // Front Arm Group (Pitch: -2 deg upward)
        const armGroupF = new THREE.Group();
        armGroupF.position.set(x, y, colThick * 0.75);
        armGroupF.rotation.x = (-2 * Math.PI) / 180;

        // Backing Plate
        const plateGeo = new THREE.BoxGeometry(colThick * 1.25, colThick * 1.45, 0.4 * scale);
        const plateF = new THREE.Mesh(plateGeo, colMat);
        plateF.position.set(0, 0, -0.2 * scale);
        plateF.castShadow = true;
        armGroupF.add(plateF);

        // Arm Body
        const armGeo = new THREE.BoxGeometry(colThick * 0.7, colThick * 0.7, armLen);
        const armF = new THREE.Mesh(armGeo, armMat);
        armF.position.set(0, 0, armLen / 2);
        armF.castShadow = true;
        armGroupF.add(armF);

        // Arm End Tip Stop
        const tipGeo = new THREE.BoxGeometry(colThick * 0.7, colThick * 1.5, 1 * scale);
        const tipF = new THREE.Mesh(tipGeo, armMat);
        tipF.position.set(0, colThick * 0.4, armLen);
        armGroupF.add(tipF);

        armGroupF.userData = { isPart: true };
        scene.add(armGroupF);

        // Rear Arm Group (if Two-Sided)
        if (isTwoSided) {
          const armGroupB = new THREE.Group();
          armGroupB.position.set(x, y, -colThick * 0.75);
          armGroupB.rotation.x = (2 * Math.PI) / 180;

          const plateB = new THREE.Mesh(plateGeo, colMat);
          plateB.position.set(0, 0, 0.2 * scale);
          armGroupB.add(plateB);

          const armB = new THREE.Mesh(armGeo, armMat);
          armB.position.set(0, 0, -armLen / 2);
          armGroupB.add(armB);

          const tipB = new THREE.Mesh(tipGeo, armMat);
          tipB.position.set(0, colThick * 0.4, -armLen);
          armGroupB.add(tipB);

          armGroupB.userData = { isPart: true };
          scene.add(armGroupB);
        }
      }

      // Bracing Between Columns
      if (i < bays) {
        const nextX = (i + 1) * bayW - (bays * bayW) / 2;
        const midX = (x + nextX) / 2;
        const braceWidth = Math.abs(nextX - x);

        const yStart = realYStart * scale;
        const bHeight = realBraceH * scale;

        // Horizontal Struts
        const drawHoriz = (posY: number) => {
          const sGeo = new THREE.BoxGeometry(braceWidth, 1.4, 1.4);
          const s = new THREE.Mesh(sGeo, braceMat);
          s.position.set(midX, posY, 0);
          s.userData = { isPart: true };
          scene.add(s);
        };

        // Diagonal X-Cables
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

        if (+height <= 144) {
          drawHoriz(yStart);
          drawHoriz(yStart + bHeight);
          drawX(yStart, yStart + bHeight);
        } else if (+height <= 192) {
          drawHoriz(yStart);
          drawHoriz(yStart + bHeight * 0.5);
          drawHoriz(yStart + bHeight);
          drawX(yStart, yStart + bHeight * 0.5);
        } else {
          drawHoriz(yStart);
          drawHoriz(yStart + bHeight * 0.5);
          drawHoriz(yStart + bHeight);
          drawX(yStart, yStart + bHeight * 0.5);
          drawX(yStart + bHeight * 0.5, yStart + bHeight);
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
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.7;
      inst.camera.position.set(center.x + cameraZ * 0.45, center.y + cameraZ * 0.25, center.z + cameraZ * 0.95);
      inst.controls.target.copy(center);
      inst.controls.update();
    } else {
      inst.camera.position.set(0, colHeight / 2, colHeight * 2);
      inst.controls.target.set(0, colHeight / 2, 0);
      inst.controls.update();
    }
  }, [height, armLength, levels, sideType, bays, bayWidth, solved, cameraMode]);

  const handleCopyApexPayload = () => {
    const payload = {
      action: "CantileverRackController.createQuoteAndLines",
      opportunityId: "0065g000001XyZaABC",
      closeDate: new Date().toISOString().split("T")[0],
      engineeringSpecs: {
        solvedColumnSystem: solved.system,
        solvedArmSeries: solved.armType,
        rackHeightInches: +height,
        armLengthInches: +armLength,
        levelsPerColumn: levels,
        baysCount: bays,
        bayWidthInches: +bayWidth,
        sideType,
        bundleLengthInches: bundleLength,
        bundleWeightLbs: bundleWeight,
        armsSupporting: solved.armsSupporting,
        loadPerArmLbs: solved.loadPerArm,
        maxSafeCapacityLbs: solved.calculatedMaxCapacity,
        isCapacityExceeded: solved.isCapacityExceeded,
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

  return (
    <div className="space-y-4 font-mono text-xs text-white/90">
      
      {/* Titlebar with Solver Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-white/90">
          <Sliders className="w-4 h-4 text-[#E8A317]" />
          <span className="font-bold text-sm">Industrial Cantilever 3D CPQ Configurator</span>
        </div>

        {/* Solver Solved Pill */}
        <div className="flex items-center gap-2">
          {solved.isCapacityExceeded ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500 text-rose-300 text-[11px] font-bold">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>OVERLOAD: Exceeds {solved.calculatedMaxCapacity.toLocaleString()} lbs</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Solved: {solved.system} &bull; {solved.armType} Arms</span>
            </div>
          )}

          {/* View Toggles */}
          <button
            onClick={() => setCameraMode(cameraMode === "3d" ? "2d" : "3d")}
            className="px-2.5 py-1 rounded border border-white/20 bg-white/5 hover:bg-white/15 text-[11px] text-white flex items-center gap-1.5 cursor-pointer"
          >
            <Box className="w-3 h-3 text-[#E8A317]" />
            <span>{cameraMode === "3d" ? "3D Orbit" : "2D Ortho"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-3 bg-[#14182E] border border-white/15 p-4 rounded-[14px]">
          <div className="text-[10px] uppercase font-bold text-white/60 tracking-wider flex items-center justify-between">
            <span>Parametric Inputs</span>
            <span className="text-[#E8A317]">Civil/Mechanical Solver</span>
          </div>

          {/* Configuration Toggles */}
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
              <span className="text-white/50 block text-[10px] mb-1">Bays Count</span>
              <div className="flex rounded border border-white/15 overflow-hidden">
                {[1, 2, 3].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBays(b)}
                    className={`flex-1 py-1 text-center transition-colors cursor-pointer ${
                      bays === b ? "bg-[#E8A317] text-black font-bold" : "text-white/60"
                    }`}
                  >
                    {b} Bay{b > 1 ? "s" : ""}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column Height */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/60">Column Height:</span>
              <span className="font-bold text-white">{+height / 12} ft ({height}&quot;)</span>
            </div>
            <select
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-[#0A0D1A] border border-white/20 rounded p-1.5 text-xs text-white cursor-pointer"
            >
              <option value="96">8 ft (96&quot;)</option>
              <option value="120">10 ft (120&quot;)</option>
              <option value="144">12 ft (144&quot;)</option>
              <option value="168">14 ft (168&quot;)</option>
              <option value="192">16 ft (192&quot;)</option>
              <option value="216">18 ft (216&quot;)</option>
              <option value="240">20 ft (240&quot;)</option>
            </select>
          </div>

          {/* Arm Length */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/60">Arm Length (2° Pitch):</span>
              <span className="font-bold text-white">{+armLength / 12} ft ({armLength}&quot;)</span>
            </div>
            <select
              value={armLength}
              onChange={(e) => setArmLength(e.target.value)}
              className="w-full bg-[#0A0D1A] border border-white/20 rounded p-1.5 text-xs text-white cursor-pointer"
            >
              <option value="24">2 ft (24&quot;) · C3X35 to S4X77</option>
              <option value="36">3 ft (36&quot;) · C3X35 to S4X77</option>
              <option value="48">4 ft (48&quot;) · C3X35 to S4X77</option>
              <option value="60">5 ft (60&quot;) · C3X35 to S4X77</option>
              <option value="72">6 ft (72&quot;) · C3X35 to S4X77</option>
            </select>
          </div>

          {/* Bay Width & Levels */}
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="space-y-1">
              <span className="text-white/60 block">Bay Span:</span>
              <select
                value={bayWidth}
                onChange={(e) => setBayWidth(e.target.value)}
                className="w-full bg-[#0A0D1A] border border-white/20 rounded p-1.5 text-xs text-white cursor-pointer"
              >
                <option value="36">3 ft (36&quot;)</option>
                <option value="48">4 ft (48&quot;)</option>
                <option value="60">5 ft (60&quot;)</option>
                <option value="72">6 ft (72&quot;)</option>
                <option value="96">8 ft (96&quot;)</option>
              </select>
            </div>
            <div className="space-y-1">
              <span className="text-white/60 block">Levels per Column:</span>
              <select
                value={levels}
                onChange={(e) => setLevels(+e.target.value)}
                className="w-full bg-[#0A0D1A] border border-white/20 rounded p-1.5 text-xs text-white cursor-pointer"
              >
                <option value={2}>2 Levels</option>
                <option value={3}>3 Levels</option>
                <option value={4}>4 Levels</option>
                <option value={5}>5 Levels</option>
              </select>
            </div>
          </div>

          {/* Load Parameters */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="flex justify-between text-[11px]">
              <span className="text-white/60">Bundle Weight:</span>
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
          <div className="pt-2.5 border-t border-white/10 space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-white/50">Bundle Columns Span:</span>
              <span className="font-semibold text-white">{solved.armsSupporting} Columns</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Required Load / Arm:</span>
              <span className="font-semibold text-white">{solved.loadPerArm.toLocaleString()} lbs</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
              <span className="text-white/70 font-semibold">Total Wholesale Price:</span>
              <span className="text-base font-bold text-emerald-400">${totalPrice.toLocaleString()} USD</span>
            </div>
          </div>

        </div>

        {/* 3D WebGL Canvas & Output Tabs */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Three.js Interactive 3D Viewport */}
          <div className="rounded-[14px] bg-[#0A0D1A] border border-white/15 overflow-hidden shadow-inner relative">
            <div className="absolute top-2.5 left-3 text-[10px] text-white/50 flex items-center gap-2 z-10 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Three.js WebGL &bull; Drag to rotate, scroll to zoom</span>
            </div>

            <div ref={mountRef} className="w-full h-80 cursor-grab active:cursor-grabbing" />
          </div>

          {/* BOM vs Apex Payload Tabs */}
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
                  <div key={idx} className="py-1.5 flex justify-between items-center text-white/80">
                    <div className="space-y-0.5">
                      <div className="font-semibold text-white flex items-center gap-2">
                        <span>{item.sku}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/60">
                          {item.componentType}
                        </span>
                      </div>
                      <div className="text-white/50 text-[10px]">{item.description}</div>
                    </div>
                    <div className="text-right shrink-0 pl-2">
                      <div className="font-mono text-emerald-400 font-bold">{item.quantity} pcs</div>
                      <div className="text-[10px] text-white/40">${(item.quantity * item.unitCost).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Tab 2: Apex DML Payload View */
              <pre className="max-h-48 overflow-y-auto text-[10px] text-emerald-400 font-mono leading-relaxed bg-[#0A0D1A] p-2.5 rounded border border-white/10">
{`// Apex Controller: CantileverRackController.createQuoteAndLines
{
  "system": "${solved.system}",
  "armSeries": "${solved.armType}",
  "height": "${height}\\"",
  "armLength": "${armLength}\\"",
  "levels": ${levels},
  "bays": ${bays},
  "bayWidth": "${bayWidth}\\"",
  "sideType": "${sideType}",
  "bundleWeightLbs": ${bundleWeight},
  "calculatedMaxCapacityLbs": ${solved.calculatedMaxCapacity},
  "totalPriceUSD": ${totalPrice},
  "totalLines": ${bom.length}
}`}
              </pre>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
