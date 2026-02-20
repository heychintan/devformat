import type { ToolDefinition } from "../types";

export const sha256Generator: ToolDefinition = {
  id: "sha256-generator",
  name: "SHA-256 Hash Generator",
  category: "encoders",
  route: "/encoders/sha256",
  language: "text",
  description: "Generate SHA-256 cryptographic hash digests from any text input using the Web Crypto API.",
  keywords: ["sha256", "sha-256", "hash", "digest", "crypto", "checksum", "secure hash"],
  mode: "transform",
  sampleInput: "Hello, World!",
  execute: async (input) => {
    try {
      const data = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      return {
        success: true,
        output: `Input: ${input}\n\nSHA-256: ${hash}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "SHA-256 generation failed";
      return { success: false, output: "", error: msg };
    }
  },
};
