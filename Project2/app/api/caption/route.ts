import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { imageBase64 } = await req.json();
  if (!imageBase64) return NextResponse.json({ caption: "No image provided" }, { status: 400 });

  const captions = [
    "A beautiful scenery with mountains.",
    "A group of people enjoying outdoors.",
    "An adorable cat looking at the camera.",
    "A car parked on the street.",
    "A delicious plate of food on the table."
  ];

  const caption = captions[Math.floor(Math.random() * captions.length)];
  return NextResponse.json({ caption }, { status: 200 });
}
