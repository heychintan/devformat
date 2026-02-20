import { jsonFormatter } from "./formatters/json";
import { xmlFormatter } from "./formatters/xml";
import { htmlFormatter } from "./formatters/html";
import { sqlFormatter } from "./formatters/sql";
import { jsonValidator } from "./validators/json";
import { xmlValidator } from "./validators/xml";
import { htmlValidator } from "./validators/html";
import { sqlValidator } from "./validators/sql";
import { base64Encoder } from "./encoders/base64";
import { urlEncoder } from "./encoders/url";
import { htmlEntitiesEncoder } from "./encoders/html-entities";
import { jwtDecoder } from "./encoders/jwt-decoder";
import { md5Generator } from "./encoders/md5";
import { sha256Generator } from "./encoders/sha256";
import { jsonEscaper } from "./escapers/json-escape";
import { xmlEscaper } from "./escapers/xml-escape";
import { htmlEscaper } from "./escapers/html-escape";
import { sqlEscaper } from "./escapers/sql-escape";
import { regexEscaper } from "./escapers/regex-escape";
import { loremIpsumGenerator } from "./generators/lorem-ipsum";
import { uuidGenerator } from "./generators/uuid";
import { passwordGenerator } from "./generators/password";
import { colorGenerator } from "./generators/hash-color";
import { timestampConverter } from "./generators/timestamp";
import { jsonYamlConverter } from "./converters/json-yaml";
import { jsonCsvConverter } from "./converters/json-csv";
import { numberBaseConverter } from "./converters/number-base";
import { textCaseConverter } from "./converters/text-case";
import type { ToolDefinition, ToolCategory } from "./types";

export type { ToolCategory };

export const allCategories: ToolCategory[] = [
  "formatters",
  "validators",
  "encoders",
  "escapers",
  "generators",
  "converters",
];

export const categoryLabels: Record<ToolCategory, string> = {
  formatters: "Formatters",
  validators: "Validators",
  encoders: "Encoders",
  escapers: "Escapers",
  generators: "Generators",
  converters: "Converters",
};

export const toolRegistry: ToolDefinition[] = [
  // Formatters
  jsonFormatter,
  xmlFormatter,
  htmlFormatter,
  sqlFormatter,
  // Validators
  jsonValidator,
  xmlValidator,
  htmlValidator,
  sqlValidator,
  // Encoders
  base64Encoder,
  urlEncoder,
  htmlEntitiesEncoder,
  jwtDecoder,
  md5Generator,
  sha256Generator,
  // Escapers
  jsonEscaper,
  xmlEscaper,
  htmlEscaper,
  sqlEscaper,
  regexEscaper,
  // Generators
  loremIpsumGenerator,
  uuidGenerator,
  passwordGenerator,
  colorGenerator,
  timestampConverter,
  // Converters
  jsonYamlConverter,
  jsonCsvConverter,
  numberBaseConverter,
  textCaseConverter,
];

export function getToolById(id: string): ToolDefinition | undefined {
  return toolRegistry.find((t) => t.id === id);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return toolRegistry.filter((t) => t.category === category);
}
