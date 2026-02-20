# DevFormat

**Live demo: [formatter-three.vercel.app](https://formatter-three.vercel.app/)**

**28 free online developer tools — all in your browser, no server, no tracking.**

DevFormat is a fast, ad-free collection of formatter, validator, encoder, escaper, generator, and converter tools for developers. Every operation runs entirely client-side, so your data never leaves your machine.

## Tools

### Formatters
| Tool | Route |
|------|-------|
| JSON Formatter | `/formatters/json` |
| XML Formatter | `/formatters/xml` |
| HTML Formatter | `/formatters/html` |
| SQL Formatter | `/formatters/sql` |

### Validators
| Tool | Route |
|------|-------|
| JSON Validator | `/validators/json` |
| XML Validator | `/validators/xml` |
| HTML Validator | `/validators/html` |
| SQL Validator | `/validators/sql` |

### Encoders
| Tool | Route |
|------|-------|
| Base64 Encode/Decode | `/encoders/base64` |
| URL Encoder/Decoder | `/encoders/url` |
| HTML Entities Encoder | `/encoders/html-entities` |
| JWT Decoder | `/encoders/jwt-decoder` |
| MD5 Hash Generator | `/encoders/md5` |
| SHA-256 Hash Generator | `/encoders/sha256` |

### Escapers
| Tool | Route |
|------|-------|
| JSON Escaper | `/escapers/json` |
| XML Escaper | `/escapers/xml` |
| HTML Escaper | `/escapers/html` |
| SQL Escaper | `/escapers/sql` |
| Regex Escaper | `/escapers/regex` |

### Generators
| Tool | Route |
|------|-------|
| UUID v4 Generator | `/generators/uuid` |
| Password Generator | `/generators/password` |
| Lorem Ipsum Generator | `/generators/lorem-ipsum` |
| Color Generator | `/generators/color` |
| Timestamp Generator | `/generators/timestamp` |

### Converters
| Tool | Route |
|------|-------|
| JSON ↔ YAML | `/converters/json-yaml` |
| JSON → CSV | `/converters/json-csv` |
| Number Base Converter | `/converters/number-base` |
| Text Case Converter | `/converters/text-case` |

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Editor:** CodeMirror 6 via `@uiw/react-codemirror`
- **Libraries:** Prettier, sql-formatter, js-yaml, vkbeautify, uuid
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Privacy

All tools run entirely in the browser. No data is sent to any server. No analytics, no tracking, no ads.

## License

MIT
