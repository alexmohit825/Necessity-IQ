# NecessityIQ

**AI-powered medical necessity letters, generated in seconds.**

NecessityIQ is a Next.js 14 application that uses OpenAI's GPT-4o to generate professional, insurance-ready medical necessity letters tailored to a patient's diagnosis, requested treatment, and clinical justification.

---

## Features

- 🩺 **Detailed case intake form** — patient info, diagnosis, ICD-10, CPT codes, provider details
- 🤖 **GPT-4o letter generation** — clinically precise, formatted, and persuasive
- ✏️ **In-browser editing** — review and customize before submitting
- 🖨️ **Print & copy** — one-click copy to clipboard or print-ready view
- 🔒 **No data storage** — letters are generated ephemerally; nothing is saved

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | OpenAI GPT-4o via `openai` SDK |
| Deployment | Vercel (recommended) |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-org/necessityiq.git
cd necessityiq
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
OPENAI_API_KEY=sk-...your-key-here...
```

> Get your API key at [platform.openai.com](https://platform.openai.com).

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
necessityiq/
├── app/
│   ├── layout.tsx              # Root layout with Header & Footer
│   ├── page.tsx                # Home page (hero + form + how-it-works)
│   ├── globals.css             # Tailwind base + custom component classes
│   └── api/
│       └── generate-letter/
│           └── route.ts        # POST /api/generate-letter (OpenAI call)
├── components/
│   ├── Header.tsx              # Sticky nav header
│   ├── Footer.tsx              # Site footer
│   ├── CaseForm.tsx            # Multi-section intake form
│   └── LetterPreview.tsx       # Letter display with edit/copy/print
├── lib/
│   ├── openai.ts               # OpenAI client singleton
│   └── templates.ts            # System prompt + user prompt builders
├── public/
│   └── favicon.svg             # Site favicon
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Add `OPENAI_API_KEY` as an environment variable in the Vercel dashboard
4. Deploy — done!

---

## Customization

- **Prompts**: Edit `lib/templates.ts` to adjust the system prompt or letter structure
- **Model**: Change `"gpt-4o"` in `app/api/generate-letter/route.ts` to `"gpt-4o-mini"` for lower cost
- **Styling**: Tailwind config and component classes are in `tailwind.config.ts` and `app/globals.css`

---

## Disclaimer

NecessityIQ generates AI-assisted draft letters. All letters should be reviewed by the ordering physician before submission. This tool is not a substitute for professional medical or legal advice.
