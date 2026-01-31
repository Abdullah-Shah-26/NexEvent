import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Event from "@/database/event.model";
import { chatMessageSchema } from "@/lib/validations/chat.validation";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "demo-key");

async function callOpenAI(prompt: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = chatMessageSchema.safeParse(body);

    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return NextResponse.json(
        {
          error: "Validation Error",
          message: firstError.message,
          field: firstError.path.join("."),
        },
        { status: 400 },
      );
    }

    const { message } = validation.data;

    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected, fetching events...");

    const events = await Event.find().sort({ createdAt: -1 }).limit(20).lean();
    console.log(`Found ${events.length} events in database`);

    if (events.length === 0) {
      return NextResponse.json({
        response:
          "I don't have any event information available right now. Please check back later or contact support if this issue persists.",
      });
    }

    const eventsContext = events
      .map(
        (e) =>
          `Event: ${e.title}\nDate: ${e.date} at ${e.time}\nLocation: ${
            e.location
          }\nVenue: ${e.venue}\nDescription: ${
            e.description
          }\nTags: ${e.tags.join(", ")}\n`,
      )
      .join("\n---\n");

    console.log("Events context length:", eventsContext.length);

    const prompt = `You are a helpful assistant for NexEvent, an event management platform for developers. 

IMPORTANT: You MUST answer questions using ONLY the event data provided below. Do not make up information.

Available Events:
${eventsContext}

User Question: ${message}

Instructions:
- Answer based ONLY on the events listed above
- If the question is about events, list relevant events with their details
- Be concise, friendly, and helpful
- If no events match the question, say so clearly

Answer:`;

    let responseText: string;

    try {
      console.log("Trying Gemini AI...");
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-pro",
      });

      const result = await model.generateContent(prompt);
      const response = result.response;
      responseText = response.text();
      console.log("Gemini response generated successfully");
    } catch (geminiError) {
      console.error("Gemini AI failed, falling back to OpenAI:", geminiError);

      if (!process.env.OPENAI_API_KEY) {
        throw new Error("Both Gemini and OpenAI are unavailable");
      }

      console.log("Using OpenAI fallback...");
      responseText = await callOpenAI(prompt);
      console.log("OpenAI response generated successfully");
    }

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Chat error details:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error message:", errorMessage);

    return NextResponse.json(
      {
        response:
          "I'm having trouble connecting right now. Please try again in a moment.",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
