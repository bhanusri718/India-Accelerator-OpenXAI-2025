// app/api/generate/route.ts
export async function POST(req: Request) {
  const apiKey = process.env.HF_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "HF API key not found" }), { status: 500 });
  }
  const response = await fetch("https://api-inference.huggingface.co/models/facebook/blip-image-captioning-base", {
    headers: { Authorization: `Bearer ${apiKey}` },
    method: "POST",
    body: JSON.stringify(await req.json()),
  });
  const data = await response.json();
  return new Response(JSON.stringify(data), { status: 200 });
}