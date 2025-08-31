"use client";
import { useState } from "react";

export default function Home() {
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setLoading(true);
    setImagePreview(URL.createObjectURL(file));

    // Mock caption (replace with LLaVA or API later)
    setTimeout(() => {
      setCaption("This is a generated caption ✨");
      setLoading(false);
    }, 500);
  };

  return (
    <div className="app-container">
      <h1 style={{ color: "#FF8C42", marginBottom: "1rem" }}>AI Image Caption Generator</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imagePreview && <img src={imagePreview} alt="Preview" />}
      {loading ? <p>Generating caption...</p> : caption && <p>{caption}</p>}
      <button onClick={() => setCaption("This is a generated caption ✨")} disabled={loading || !imagePreview}>
        Generate Caption
      </button>
    </div>
  );
}
