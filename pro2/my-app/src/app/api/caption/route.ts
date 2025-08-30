import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Call Hugging Face API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
        method: "POST",
        body: file,
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: "Hugging Face API error", details: err },
        { status: response.status }
      );
    }

    const result = await response.json();

    // Hugging Face usually returns an array with `generated_text`
    if (Array.isArray(result) && result.length > 0 && result[0].generated_text) {
      return NextResponse.json({ caption: result[0].generated_text });
    } else {
      return NextResponse.json({ error: "No caption generated" }, { status: 500 });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
