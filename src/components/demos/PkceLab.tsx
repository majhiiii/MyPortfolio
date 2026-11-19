"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, Key, ShieldCheck, ArrowRight, Check } from "lucide-react";
import { computeCodeChallenge } from "@/lib/pkce";

// Web Crypto SHA-256 PKCE Generator
async function generatePkcePair() {
  const array = new Uint8Array(48);
  crypto.getRandomValues(array);
  const verifier = Array.from(array, (dec) => ("0" + dec.toString(16)).slice(-2)).join("");
  const challenge = await computeCodeChallenge(verifier);
  return { verifier, challenge };
}

export function PkceLab() {
  const [verifier, setVerifier] = useState<string>("");
  const [challenge, setChallenge] = useState<string>("");
  const [orgDomain, setOrgDomain] = useState<string>("login.salesforce.com");
  const [step, setStep] = useState<number>(1);
  const [simulatedToken, setSimulatedToken] = useState<string | null>(null);

  const refreshPair = async () => {
    const pair = await generatePkcePair();
    setVerifier(pair.verifier);
    setChallenge(pair.challenge);
    setStep(1);
    setSimulatedToken(null);
  };

  useEffect(() => {
    refreshPair();
  }, []);

  const simulateHandshake = () => {
    setStep(2);
    setTimeout(() => {
      setStep(3);
      setSimulatedToken(`00D5g0000000001!AQcAQ_${verifier.slice(0, 16)}...mock_access_token`);
    }, 700);
  };

  return (
    <div className="space-y-5 font-mono text-xs">
      {/* Intro info bar */}
      <div className="p-3 bg-[var(--bg)] border border-hairline rounded-sm flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
          <span>RFC 7636 Proof Key for Code Exchange (PKCE) · Zero Client Secret Required</span>
        </div>
        <button
          onClick={refreshPair}
          className="flex items-center gap-1 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Regenerate Pair</span>
        </button>
      </div>

      {/* Target Org Selector */}
      <div className="flex items-center gap-3">
        <span className="text-[var(--muted)]">Target Environment:</span>
        {["login.salesforce.com (Production/Dev)", "test.salesforce.com (Sandbox)", "custom.my.salesforce.com"].map((org) => {
          const val = org.split(" ")[0];
          return (
            <button
              key={val}
              onClick={() => setOrgDomain(val)}
              className={`px-2.5 py-1 text-[11px] rounded-xs border transition-colors ${
                orgDomain === val
                  ? "border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)] font-semibold"
                  : "border-hairline text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {org}
            </button>
          );
        })}
      </div>

      {/* Step 1 & 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Verifier */}
        <div className="border border-hairline rounded-sm p-4 bg-[var(--surface)] space-y-2">
          <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
            <span className="font-semibold text-[var(--ink)]">01. CODE VERIFIER</span>
            <span>HIGH-ENTROPY CRYPTO STRING</span>
          </div>
          <div className="p-2.5 bg-[var(--bg)] border border-hairline rounded-xs font-mono text-[11px] break-all text-[var(--ink)]">
            {verifier || "Generating..."}
          </div>
          <span className="text-[10px] text-[var(--muted)] block">Kept securely in browser memory. Never sent in URL.</span>
        </div>

        {/* Challenge */}
        <div className="border border-hairline rounded-sm p-4 bg-[var(--surface)] space-y-2">
          <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
            <span className="font-semibold text-[var(--accent)]">02. CODE CHALLENGE (S256)</span>
            <span>BASE64URL(SHA-256(verifier))</span>
          </div>
          <div className="p-2.5 bg-[var(--bg)] border border-hairline rounded-xs font-mono text-[11px] break-all text-[var(--accent)] font-bold">
            {challenge || "Computing..."}
          </div>
          <span className="text-[10px] text-[var(--muted)] block">Transmitted to Salesforce /services/oauth2/authorize</span>
        </div>
      </div>

      {/* Request Inspector */}
      <div className="border border-hairline rounded-sm bg-[var(--bg)] p-4 space-y-3">
        <div className="flex items-center justify-between text-[10px] text-[var(--muted)] uppercase">
          <span>Outbound Authorization HTTP Request</span>
          <span className="text-emerald-600">GET HTTPS</span>
        </div>
        <div className="font-mono text-[11px] text-[var(--ink)] bg-[var(--surface)] p-3 rounded-xs border border-hairline break-all leading-relaxed">
          <span className="text-[var(--accent)]">https://{orgDomain}/services/oauth2/authorize</span>
          <br />?response_type=code
          <br />&client_id=3MVG9...ConnectedAppConsumerKey
          <br />&redirect_uri=https://outlook-addin.internal/auth/callback
          <br />&code_challenge=<span className="text-[var(--accent)] font-bold">{challenge}</span>
          <br />&code_challenge_method=<span className="text-[var(--accent)] font-bold">S256</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] text-[var(--muted)]">
            {step === 1 && "Waiting for user simulation"}
            {step === 2 && "Validating hash with token endpoint..."}
            {step === 3 && "OAuth Handshake Verified! Access token generated."}
          </span>
          <button
            onClick={simulateHandshake}
            disabled={step === 2}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ink)] text-[var(--surface)] rounded-xs hover:opacity-90 font-medium transition-opacity disabled:opacity-50"
          >
            {step === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Key className="w-3.5 h-3.5 text-[var(--accent)]" />}
            <span>{step === 3 ? "Re-Test Handshake" : "Simulate Token Handshake"}</span>
          </button>
        </div>
      </div>

      {/* Simulated Response */}
      {simulatedToken && (
        <div className="p-4 border border-emerald-500/30 bg-emerald-500/5 rounded-sm space-y-2 text-[11px]">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
            <span>200 OK — /services/oauth2/token Response</span>
            <span>scope: api id refresh_token</span>
          </div>
          <div className="font-mono text-[10px] text-[var(--ink)] break-all bg-[var(--surface)] p-2.5 rounded-xs border border-hairline">
            {`{
  "access_token": "${simulatedToken}",
  "instance_url": "https://${orgDomain}",
  "id": "https://${orgDomain}/id/00D5g0000000001/0055g0000000001",
  "token_type": "Bearer",
  "issued_at": "${Date.now()}"
}`}
          </div>
        </div>
      )}
    </div>
  );
}
