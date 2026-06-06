"use client";

import { useState } from "react";

interface LetterPreviewProps {
  letter: string;
  onReset: () => void;
}

export default function LetterPreview({ letter, onReset }: LetterPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedLetter, setEditedLetter] = useState(letter);

  async function handleCopy() {
    await navigator.clipboard.writeText(editedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function handlePrint() {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Medical Necessity Letter – NecessityIQ</title>
          <style>
            body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 1in; color: #000; }
            pre { white-space: pre-wrap; word-wrap: break-word; font-family: inherit; font-size: inherit; }
          </style>
        </head>
        <body><pre>${editedLetter.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre></body>
      </html>
    `);
    win.document.close();
    win.print();
  }

  return (
    <div className="space-y-6">
      {/* Success banner */}
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4">
        <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-green-800">Your letter is ready!</p>
          <p className="text-xs text-green-600 mt-0.5">Review, edit if needed, then copy or print to submit to your insurer.</p>
        </div>
      </div>

      {/* Letter card */}
      <div className="card">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-lg font-semibold text-slate-800">Medical Necessity Letter</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`btn-secondary text-sm py-2 px-3 gap-1.5 ${editMode ? "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100" : ""}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {editMode ? "Done Editing" : "Edit"}
            </button>
            <button onClick={handlePrint} className="btn-secondary text-sm py-2 px-3 gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
            <button onClick={handleCopy} className={`btn-primary text-sm py-2 px-4 gap-1.5 ${copied ? "bg-green-600 hover:bg-green-700" : ""}`}>
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Letter
                </>
              )}
            </button>
          </div>
        </div>

        {editMode ? (
          <textarea
            value={editedLetter}
            onChange={(e) => setEditedLetter(e.target.value)}
            rows={28}
            className="form-textarea font-mono text-sm text-slate-800 leading-relaxed w-full"
          />
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 font-serif text-sm text-slate-800 leading-relaxed whitespace-pre-wrap min-h-[400px]">
            {editedLetter}
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 flex gap-2">
        <svg className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>
          <strong>Important:</strong> This letter is AI-generated and intended as a draft starting point. Review all clinical details for accuracy, fill in the placeholder contact information, and have your physician review before submission. NecessityIQ is not a substitute for professional medical or legal advice.
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button onClick={onReset} className="btn-secondary text-sm py-2.5 px-5 gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Start New Letter
        </button>
        <button onClick={handleCopy} className={`btn-primary text-sm py-2.5 px-6 gap-2 ${copied ? "bg-green-600 hover:bg-green-700" : ""}`}>
          {copied ? "Copied to Clipboard!" : "Copy & Submit"}
        </button>
      </div>
    </div>
  );
}
