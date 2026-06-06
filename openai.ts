"use client";

import { useState } from "react";
import LetterPreview from "./LetterPreview";

interface FormData {
  patientName: string;
  dob: string;
  insurerId: string;
  memberId: string;
  diagnosis: string;
  icdCode: string;
  treatment: string;
  cptCode: string;
  providerName: string;
  providerNpi: string;
  clinicalJustification: string;
  priorDenial: boolean;
  denialReason: string;
  urgency: "routine" | "urgent" | "emergent";
}

const initialForm: FormData = {
  patientName: "",
  dob: "",
  insurerId: "",
  memberId: "",
  diagnosis: "",
  icdCode: "",
  treatment: "",
  cptCode: "",
  providerName: "",
  providerNpi: "",
  clinicalJustification: "",
  priorDenial: false,
  denialReason: "",
  urgency: "routine",
};

export default function CaseForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [letter, setLetter] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState<1 | 2>(1);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setLetter(data.letter);
      setStep(2);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setForm(initialForm);
    setLetter("");
    setError("");
    setStep(1);
  }

  if (step === 2 && letter) {
    return <LetterPreview letter={letter} onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Patient Info */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-800 mb-5 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center">1</span>
          Patient Information
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="form-label" htmlFor="patientName">Patient Name</label>
            <input id="patientName" name="patientName" type="text" placeholder="Jane Doe" value={form.patientName} onChange={handleChange} className="form-input" />
          </div>
          <div>
            <label className="form-label" htmlFor="dob">Date of Birth</label>
            <input id="dob" name="dob" type="date" value={form.dob} onChange={handleChange} className="form-input" />
          </div>
          <div>
            <label className="form-label" htmlFor="insurerId">Insurer / Health Plan</label>
            <input id="insurerId" name="insurerId" type="text" placeholder="Blue Cross Blue Shield" value={form.insurerId} onChange={handleChange} className="form-input" />
          </div>
          <div>
            <label className="form-label" htmlFor="memberId">Member ID</label>
            <input id="memberId" name="memberId" type="text" placeholder="XYZ123456789" value={form.memberId} onChange={handleChange} className="form-input" />
          </div>
        </div>
      </div>

      {/* Clinical Info */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-800 mb-5 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center">2</span>
          Clinical Details
          <span className="ml-auto text-xs font-normal text-slate-400">* Required</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="form-label" htmlFor="diagnosis">
              Diagnosis <span className="text-red-500">*</span>
            </label>
            <input id="diagnosis" name="diagnosis" type="text" placeholder="Type 2 Diabetes with neuropathy" value={form.diagnosis} onChange={handleChange} required className="form-input" />
          </div>
          <div>
            <label className="form-label" htmlFor="icdCode">ICD-10 Code</label>
            <input id="icdCode" name="icdCode" type="text" placeholder="E11.40" value={form.icdCode} onChange={handleChange} className="form-input" />
          </div>
          <div>
            <label className="form-label" htmlFor="treatment">
              Requested Treatment / Service <span className="text-red-500">*</span>
            </label>
            <input id="treatment" name="treatment" type="text" placeholder="Continuous glucose monitor (CGM)" value={form.treatment} onChange={handleChange} required className="form-input" />
          </div>
          <div>
            <label className="form-label" htmlFor="cptCode">CPT Code</label>
            <input id="cptCode" name="cptCode" type="text" placeholder="95251" value={form.cptCode} onChange={handleChange} className="form-input" />
          </div>
        </div>
        <div className="mt-5">
          <label className="form-label" htmlFor="clinicalJustification">
            Clinical Justification / Supporting Notes <span className="text-red-500">*</span>
          </label>
          <textarea
            id="clinicalJustification"
            name="clinicalJustification"
            rows={5}
            required
            value={form.clinicalJustification}
            onChange={handleChange}
            placeholder="Describe relevant history, failed alternative treatments, clinical findings, lab results, and why this treatment is medically necessary..."
            className="form-textarea"
          />
          <p className="mt-1.5 text-xs text-slate-400">The more detail you provide, the stronger and more specific your letter will be.</p>
        </div>
      </div>

      {/* Provider Info */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-800 mb-5 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center">3</span>
          Provider & Appeal Details
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="form-label" htmlFor="providerName">Ordering Provider</label>
            <input id="providerName" name="providerName" type="text" placeholder="Dr. Sarah Johnson, MD" value={form.providerName} onChange={handleChange} className="form-input" />
          </div>
          <div>
            <label className="form-label" htmlFor="providerNpi">Provider NPI</label>
            <input id="providerNpi" name="providerNpi" type="text" placeholder="1234567890" value={form.providerNpi} onChange={handleChange} className="form-input" />
          </div>
          <div>
            <label className="form-label" htmlFor="urgency">Urgency Level</label>
            <select id="urgency" name="urgency" value={form.urgency} onChange={handleChange} className="form-select">
              <option value="routine">Routine</option>
              <option value="urgent">Urgent</option>
              <option value="emergent">Emergent</option>
            </select>
          </div>
        </div>

        {/* Prior Denial */}
        <div className="mt-5">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="priorDenial"
              checked={form.priorDenial}
              onChange={handleChange}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
              This request was previously denied
            </span>
          </label>
          {form.priorDenial && (
            <div className="mt-3">
              <label className="form-label" htmlFor="denialReason">Denial Reason (as stated by insurer)</label>
              <textarea
                id="denialReason"
                name="denialReason"
                rows={3}
                value={form.denialReason}
                onChange={handleChange}
                placeholder="e.g., 'Not medically necessary per plan guidelines' or paste the denial letter text..."
                className="form-textarea"
              />
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="btn-primary gap-2 text-base px-8 py-3.5">
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating Letter…
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Necessity Letter
            </>
          )}
        </button>
      </div>
    </form>
  );
}
