import type { ToolDefinition } from "../types";

const CHARSETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(length: number, chars: string): string {
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => chars[n % chars.length]).join("");
}

export const passwordGenerator: ToolDefinition = {
  id: "password-generator",
  name: "Password Generator",
  category: "generators",
  route: "/generators/password",
  language: "text",
  description: "Generate secure random passwords. Enter length (default: 16). Includes upper, lower, numbers, and symbols.",
  keywords: ["password", "generate", "random", "secure", "strong", "passphrase", "credentials"],
  mode: "generate",
  sampleInput: "16",
  execute: async (input) => {
    try {
      const length = Math.min(Math.max(parseInt(input.trim()) || 16, 4), 128);
      const allChars = CHARSETS.lowercase + CHARSETS.uppercase + CHARSETS.numbers + CHARSETS.symbols;

      const passwords: string[] = [];
      for (let i = 0; i < 5; i++) {
        passwords.push(generatePassword(length, allChars));
      }

      const strength = length >= 20 ? "Very Strong" : length >= 16 ? "Strong" : length >= 12 ? "Good" : "Moderate";

      return {
        success: true,
        output: `Password Length: ${length}\nStrength: ${strength}\nCharset: uppercase, lowercase, numbers, symbols\n\n${passwords.map((p, i) => `${i + 1}. ${p}`).join("\n")}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Password generation failed";
      return { success: false, output: "", error: msg };
    }
  },
};
