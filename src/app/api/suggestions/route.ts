import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    const prompt = `Generate creative writing suggestions for: ${query}. Please provide exactly 3 suggestions as 
  comma-separated text, each wrapped in double quotes.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content ?? "";
    const suggestions =
      content.match(/"([^"]*)"/g)?.map(s => s.slice(1, -1)) || [];

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error calling OpenAI API: ", error);
    return NextResponse.json({ suggestions: [] });
  }
}
