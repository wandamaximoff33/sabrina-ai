export default async function handler(req: any, res: any) {

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Missing text' });
  }

  const response = await fetch('https://api.fish.audio/v1/tts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FISH_AUDIO_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      voice_id: '5c37ce7913ac4d138e733f6def46deeb',
      format: 'mp3',
    }),
  });

  const buffer = await response.arrayBuffer();

  res.setHeader('Content-Type', 'audio/mpeg');
  res.send(Buffer.from(buffer));
}
