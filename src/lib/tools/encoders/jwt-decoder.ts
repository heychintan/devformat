import type { ToolDefinition } from "../types";

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  const withPadding = pad ? padded + "=".repeat(4 - pad) : padded;
  const binary = atob(withPadding);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export const jwtDecoder: ToolDefinition = {
  id: "jwt-decoder",
  name: "JWT Decoder",
  category: "encoders",
  route: "/encoders/jwt-decoder",
  language: "json",
  description: "Decode JSON Web Tokens (JWT) to inspect the header, payload, and signature.",
  keywords: ["jwt", "json web token", "decode", "header", "payload", "claim", "auth", "bearer"],
  mode: "transform",
  sampleInput:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  execute: async (input) => {
    try {
      const parts = input.trim().split(".");
      if (parts.length !== 3) {
        return { success: false, output: "", error: "Invalid JWT format. Expected 3 parts separated by dots." };
      }

      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));

      const lines: string[] = [
        "--- Header ---",
        JSON.stringify(header, null, 2),
        "",
        "--- Payload ---",
        JSON.stringify(payload, null, 2),
        "",
        "--- Signature ---",
        parts[2],
      ];

      if (payload.exp) {
        const expDate = new Date(payload.exp * 1000);
        const isExpired = expDate < new Date();
        lines.push("", `--- Expiration ---`);
        lines.push(`Expires: ${expDate.toISOString()}`);
        lines.push(`Status: ${isExpired ? "EXPIRED" : "Valid"}`);
      }

      return { success: true, output: lines.join("\n") };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to decode JWT";
      return { success: false, output: "", error: msg };
    }
  },
};
