import type { ToolDefinition } from "../types";

function randomColor(): { hex: string; rgb: string; hsl: string } {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }

  return {
    hex,
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
  };
}

export const colorGenerator: ToolDefinition = {
  id: "color-generator",
  name: "Random Color Generator",
  category: "generators",
  route: "/generators/color",
  language: "text",
  description: "Generate random colors with hex, RGB, and HSL values. Enter a number for color count (default: 6).",
  keywords: ["color", "hex", "rgb", "hsl", "random", "palette", "generate", "swatch"],
  mode: "generate",
  sampleInput: "6",
  execute: async (input) => {
    try {
      const count = Math.min(Math.max(parseInt(input.trim()) || 6, 1), 20);
      const colors = Array.from({ length: count }, () => randomColor());
      const output = colors
        .map((c, i) => `Color ${i + 1}:\n  HEX: ${c.hex}\n  RGB: ${c.rgb}\n  HSL: ${c.hsl}`)
        .join("\n\n");
      return { success: true, output };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Color generation failed";
      return { success: false, output: "", error: msg };
    }
  },
};
