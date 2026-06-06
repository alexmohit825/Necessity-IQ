import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/templates";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      patientName,
      dob,
      insurerId,
      memberId,
      diagnosis,
      icdCode,
      treatment,
      cptCode,
      providerName,
      providerNpi,
      clinicalJustification,
      priorDenial,
      denialReason,
      urgency,
    } = body;

    // Basic validation
    if (!diagnosis || !treatment || !clinicalJustification) {
      return NextResponse.json(
        { error: "diagnosis, treatment, and clinicalJustification are required." },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt({
      patientName,
      dob,
      insurerId,
      memberId,
      diagnosis,
      icdCode,
      treatment,
      cptCode,
      providerName,
      providerNpi,
      clinicalJustification,
      priorDenial,
      denialReason,
      urgency,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.3,
      max_tokens: 2000,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const letter = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ letter });
  } catch (err: unknown) {
    console.error("[generate-letter] error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
