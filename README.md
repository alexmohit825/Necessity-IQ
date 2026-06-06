# NecessityIQ — Medical Necessity Platform

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Type](https://img.shields.io/badge/type-single--page--app-blue)
![License](https://img.shields.io/badge/license-MIT-purple)

NecessityIQ is an AI-powered medical necessity documentation and analysis platform designed to help healthcare providers build, review, and optimize prior authorization requests and clinical justifications.

---

## 🧠 Features

- **AI-Assisted Necessity Analysis** — Analyze clinical documentation and generate medical necessity rationale aligned with payer guidelines
- **Prior Authorization Builder** — Step-by-step workflow to construct complete, defensible prior auth submissions
- **Payer Criteria Matching** — Map clinical findings to payer-specific LCD/NCD criteria
- **Document Upload & Parsing** — Upload clinical notes and records via PDF; auto-extract relevant clinical data using PDF.js
- **Collapsible Section Editor** — Structured, expandable form sections for efficient data entry
- **Evidence Linking** — Attach supporting clinical evidence to each necessity claim
- **Export Ready** — Generate submission-ready summaries for payer portals

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Edge, Firefox, Safari)
- No installation, build tools, or server required

### Run Locally
```bash
# Clone your repository
git clone https://github.com/your-username/NecessityIQ.git
cd NecessityIQ

# Open directly in browser
open index.html
# or on Windows:
start index.html
```

### Deploy to GitHub Pages
1. Push `index.html` to your repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Your app will be live at `https://your-username.github.io/NecessityIQ`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 / CSS3 / JavaScript | Core application |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Lucide Icons](https://lucide.dev/) | UI iconography |
| [PDF.js](https://mozilla.github.io/pdf.js/) | Clinical document parsing |
| [Inter](https://fonts.google.com/specimen/Inter) | Typography |
| [AppSDK AI](https://github.com) | AI chat & analysis engine |

---

## 📁 Project Structure

```
NecessityIQ/
└── index.html       # Complete self-contained application
```

---

## 🔑 AI Configuration

This app uses the built-in AppSDK AI engine for medical necessity analysis. No external API keys are required when deployed through the standard hosting environment.

---

## 📋 Use Cases

- Hospital utilization management teams
- Physician practice prior authorization coordinators
- Revenue cycle management specialists
- Insurance case managers reviewing submissions

---

## ⚠️ Disclaimer

NecessityIQ is a clinical documentation assistance tool. It does not constitute medical advice and should be used by qualified healthcare professionals only. Always verify AI-generated content against current payer policies and clinical guidelines.

---

## 📄 License

MIT © 2026
