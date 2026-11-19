import { describe, it, expect } from "vitest";
import { computeCodeChallenge } from "../src/lib/pkce";

describe("OAuth 2.0 PKCE Generator", () => {
  it("should compute deterministic SHA-256 base64url challenge", async () => {
    // RFC 7636 Appendix B test vector
    const verifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
    const expectedChallenge = "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM";

    const challenge = await computeCodeChallenge(verifier);
    expect(challenge).toBe(expectedChallenge);
  });

  it("should generate URL-safe characters without padding", async () => {
    const testVerifier = "random_test_verifier_string_1234567890_salesforce_addin";
    const challenge = await computeCodeChallenge(testVerifier);

    expect(challenge).not.toContain("+");
    expect(challenge).not.toContain("/");
    expect(challenge).not.toContain("=");
    expect(challenge.length).toBeGreaterThan(30);
  });
});
