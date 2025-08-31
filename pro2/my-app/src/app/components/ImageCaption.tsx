"use client";

import { useState } from "react";

export default function ImageCaption() {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setImage(base64Image);

      try {
        const response = await fetch("/api/caption", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });
        const data = await response.json();
        if (data.error) {
          setError(data.error);
          setCaption("");
        } else {
          setCaption(data.caption);
          setError("");
        }
      } catch (err) {
        setError("Failed to fetch caption");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h1>Image Captioning</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" width={200} />}
      {caption && <p>Caption: {caption}</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}