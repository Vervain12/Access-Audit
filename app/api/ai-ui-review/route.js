import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
    try {
        const { image } = await request.json();

        console.log("Beginning ui review.")

        const prompt = `
        You are an expert in website UI accessibility auditing. Given UI images provided by the user, analyze them for accessibility issues including but not limited to color contrast, font size, text readability, spacing, and general visual clarity.

        You must return your response as a single valid JSON object with the following fields:

        "ui_summary": {
        "rating": <integer, 1-100>,
        "summary": "A concise, insightful, and readable explanation of the pages accessibility, based on its visual design. Focus on the overall user experience impact. Use a professional, empathetic tone. Max 3 sentences.",
        "recommendation": "Provide clear, actionable, and prioritized recommendations to improve the UI's visual accessibility. Use bullet points to format the recommendations. Maximim 6 bullet points."
        },
        "elements":
        {
            "Element Name": {
                "issue": true/false,
                "description": "Brief description of the identified issue (if any).",
                "recommendation": "Actionable recommendation to improve accessibility (if needed)."
            }
        }

        Important Constraints:
            - Only include visual and readability-related issues (e.g. color contrast, font clarity, layout spacing, element size).
            - Do not include any feedback or recommendations related to ARIA attributes, roles, landmarks, or alt text.

        Ensure that:
            - "issue" is true if there is any visual accessibility concern, otherwise false. Do not make up issues where there are none, keep it realistic.
            - Your output strictly adheres to the JSON format above.
            - Only output the JSON. No markdown, no extra text.
        `

        const client = new OpenAI();
        
        const response = await client.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
            { role: "system", content: prompt },
            {
                role: "user",
                    content: [
                        { type: "text", text: "Analyze this UI for accessibility issues." },
                        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${image}` } }
                    ]
                }
            ],
            temperature: 0,
            max_tokens: 2048,
        });

        const data = JSON.parse(response.choices[0].message.content);

        console.log("summary: ", data.ui_summary);
        console.log("elements: ", data.elements);
        return NextResponse.json({ summary: data.ui_summary || data.summary, elements: data.elements }, { status: 200 });
    } catch (error){
        console.log(error.message);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
}