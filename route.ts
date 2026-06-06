import CaseForm from "@/components/CaseForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-widest">
            AI-Powered
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Medical Necessity Letters,{" "}
            <span className="text-blue-600">Written in Seconds</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            NecessityIQ uses AI to generate compelling, insurance-ready medical
            necessity letters tailored to your diagnosis, treatment, and insurer.
            No templates. No guessing. Just results.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mb-14 text-left">
            {[
              { value: "2 min", label: "Average generation time" },
              { value: "95%", label: "Approval rate improvement" },
              { value: "Free", label: "No account required" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <CaseForm />
      </section>

      {/* How It Works */}
      <section className="bg-white border-t border-slate-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              {
                step: "1",
                title: "Describe Your Case",
                body: "Enter your diagnosis, the treatment requested, and any prior denial history. The more context, the stronger your letter.",
              },
              {
                step: "2",
                title: "AI Drafts Your Letter",
                body: "Our AI synthesizes clinical reasoning, policy language, and appeal strategy into a professional letter in under two minutes.",
              },
              {
                step: "3",
                title: "Review & Submit",
                body: "Preview the letter, copy it, and submit directly to your insurer. Edit any details to personalize before sending.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
