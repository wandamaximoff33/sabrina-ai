export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405 }
    );
  }

  const { text } = await req.json();

  if (!text) {
    return new Response(
      JSON.stringify({ error: "Missing text" }),
      { status: 400 }
    );
  }

  if (!process.env.FISH_AUDIO_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Missing Fish Audio API key" }),
      { status: 500 }
    );
  }

 const response = await fetch("https://api.fish.audio/v1/tts", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.FISH_AUDIO_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    text,
    voice_id: "5c37ce7913ac4d138e733f6def46deeb",
    model: "speech-1",
    response_format: "mp3"
  }),
});
  
console.log("Fish status:", response.status);
console.log("Fish content-type:", response.headers.get("content-type"));

  if (!response.ok) {
    const errorText = await response.text();
    return new Response(
      JSON.stringify({
        error: "Fish Audio failed",
        details: errorText,
      }),
      { status: 500 }
    );
  }

  return new Response(await response.arrayBuffer(), {
  headers: {
    "Content-Type": "audio/mpeg",
    "Cache-Control": "no-store",
  },
});

}
