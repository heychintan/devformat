import type { ToolDefinition } from "../types";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "cras", "justo",
  "pellentesque", "facilisis", "volutpat", "blandit", "cursus", "risus",
  "ultrices", "posuere", "cubilia", "curae", "donec", "velit", "neque",
  "auctor", "tempus", "quam", "felis", "leo", "porta", "diam", "sapien",
];

function generateSentence(): string {
  const len = 8 + Math.floor(Math.random() * 12);
  const words: string[] = [];
  for (let i = 0; i < len; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(): string {
  const sentenceCount = 4 + Math.floor(Math.random() * 4);
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(" ");
}

export const loremIpsumGenerator: ToolDefinition = {
  id: "lorem-ipsum-generator",
  name: "Lorem Ipsum Generator",
  category: "generators",
  route: "/generators/lorem-ipsum",
  language: "text",
  description: "Generate placeholder Lorem Ipsum text. Enter a number for paragraph count (default: 3).",
  keywords: ["lorem", "ipsum", "placeholder", "dummy text", "filler", "paragraph", "generate"],
  mode: "generate",
  sampleInput: "3",
  execute: async (input) => {
    try {
      const count = Math.min(Math.max(parseInt(input.trim()) || 3, 1), 20);
      const paragraphs: string[] = [];
      // First paragraph always starts with "Lorem ipsum dolor sit amet..."
      paragraphs.push(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
          generateParagraph().split(". ").slice(1).join(". ")
      );
      for (let i = 1; i < count; i++) {
        paragraphs.push(generateParagraph());
      }
      return { success: true, output: paragraphs.join("\n\n") };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Generation failed";
      return { success: false, output: "", error: msg };
    }
  },
};
