import type { ToolDefinition } from "../types";

export const base64Encoder: ToolDefinition = {
  id: "base64-encoder",
  name: "Base64 Encode/Decode",
  category: "encoders",
  route: "/encoders/base64",
  language: "text",
  description: "Encode text to Base64 or decode Base64 back to text with full UTF-8 support.",
  keywords: ["base64", "encode", "decode", "binary", "ascii", "btoa", "atob"],
  mode: "transform",
  sampleInput: "Hello, World! This is a Base64 encoding test with UTF-8: café ñ 日本語",
  execute: async (input) => {
    try {
      // Try decoding first — if input looks like valid base64
      const base64Regex = /^[A-Za-z0-9+/\n\r]+=*$/;
      const trimmed = input.trim();
      if (base64Regex.test(trimmed) && trimmed.length >= 4) {
        try {
          const bytes = Uint8Array.from(atob(trimmed), (c) => c.charCodeAt(0));
          const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
          return {
            success: true,
            output: `--- Encoded ---\n${trimmed}\n\n--- Decoded ---\n${decoded}`,
          };
        } catch {
          // Not valid base64, fall through to encode
        }
      }
      // Encode
      const bytes = new TextEncoder().encode(input);
      const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
      const encoded = btoa(binary);
      return {
        success: true,
        output: `--- Encoded ---\n${encoded}\n\n--- Decoded ---\n${input}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Encoding failed";
      return { success: false, output: "", error: msg };
    }
  },
};
