"use client";
import { useState } from "react";

export default function HomePage() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleGenerate = async () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const imageBase64 = reader.result?.toString().split(",")[1];
      if (!imageBase64) return;

      const res = await fetch("/api/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64 }),
      });

      const data = await res.json();
      setCaption(data.caption);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Image Caption Generator</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      <button onClick={handleGenerate} style={{ marginLeft: "1rem" }}>
        Generate Caption
      </button>
      {caption && <p style={{ marginTop: "1rem" }}>Caption: {caption}</p>}
    </div>
  );
}
