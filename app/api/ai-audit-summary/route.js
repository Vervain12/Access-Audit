import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
    try {
        const { formattedViolations } = await request.json();

        const prompt = `
          You are an expert in digital accessibility auditing.

          Given a set of violations from axe-core, analyze and synthesize them into a strategic summary of accessibility health. Your job is not only to list whats wrong, but to interpret what the pattern of violations suggests about the overall accessibility and user experience of the site.

          You must return your response as a single valid JSON object with the following fields:

          {
            "score": <integer, 1-100>, 
            "summary": "A concise, insightful, and readable explanation of the pages accessibility health. Focus on the overall user experience impact — not just listing rules. Use a professional, empathetic tone. 3 sentences max. If there are less than three violations, only provide that many priorities.",
            "priorities": {
              "priority_1": {
                "violation_id": "The violation ID from axe-core that represents the most critical issue on this page",
                "name": "A short explanation of the problem (not just the rule name)",
                "fix": "A brief and developer-friendly explanation of how to fix this issue, ideally with user impact context"
              },
              "priority_2": {
                "violation_id": "The second most critical issues ID",
                "name": "What this issue means and how it hurts accessibility",
                "fix": "Actionable and clear steps to resolve it"
              },
              "priority_3": {
                "violation_id": "Third most critical",
                "name": "Explain the problem clearly",
                "fix": "Clear and concise fix guidance"
              }
            }
          }

          Instructions:
          - Prioritize based on **impact on real users**, not just rule severity.
          - If several violations are related (e.g., multiple unlabeled controls), summarize the theme.
          - Explain *why it matters* in each fix when possible.
          - Only output the JSON. No markdown, no extra text.
          `

        const client = new OpenAI();

        const response = await client.chat.completions.create({
          model: "gpt-4.1-mini",
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: formattedViolations }
          ],
          temperature: 0,
          max_tokens: 2048,
        });

        const summary = response.choices?.[0]?.message?.content;

        console.log(summary);
        return NextResponse.json({ data: summary }, { status: 200 });

    } catch (error){
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
}

/*
I need:
Violations[Violation[id, impact, description, node count]]


{
  "score": <integer, 1-100, reflecting accessibility quality based on violation impact, node count, and violation count>,
  "summary": "A quality, readable summary detailing the reasons behind the score and a clear explanation of why",
  "priorities": {
    "priority-1": {
      "violation-id": "The violation id from axe-core",
      "name": "A short explanation of the most critical violation",
      "fix": "A concise, informative explanation of how to fix this violation"
    },
    "priority-2": {
      "violation-id": "The violation id from axe-core (second most critical)",
      "name": "A short explanation of the second most critical violation",
      "fix": "A concise, informative explanation of how to fix this violation"
    },
    "priority-3": {
      "violation-id": "The violation id from axe-core (third most critical)",
      "name": "A short explanation of the third most critical violation",
      "fix": "A concise, informative explanation of how to fix this violation"
    }
  }
} */

/*
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.responses.create({
  prompt: {
    "id": "pmpt_688e5983b730819695bd5083142a5c0b075a87c5fad5a5b2",
    "version": "1"
  }
}); */