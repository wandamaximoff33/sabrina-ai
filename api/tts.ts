export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing text" });
  }

  if (!process.env.FISH_AUDIO_API_KEY) {
    return res.status(500).json({ error: "Missing Fish Audio API key" });
  }

  const response = await fetch("https://api.fish.audio/v1/tts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FISH_AUDIO_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      voice_id: "5c37ce7913ac4d138e733f6def46deeb",
      format: "mp3",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return res.status(500).json({
      error: "Fish Audio failed",
      details: errorText,
    });
  }

  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = Buffer.from(arrayBuffer);

  res.setHeader("Content-Type", "audio/mpeg");
  res.send(audioBuffer);
}
