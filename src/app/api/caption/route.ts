// src/app/api/caption/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.HF_API_KEY;
    console.log("HF_API_KEY:", apiKey ? "Present" : "Missing");
    if (!apiKey) {
      return NextResponse.json({ error: "HF API key not found" }, { status: 500 });
    }
    const body = await req.json();
    const response = await fetch("https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base", {
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}