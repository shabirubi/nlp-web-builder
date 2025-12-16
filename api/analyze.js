export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Missing text" });
  }

  const words = text.split(/\s+/);
  const wordCount = words.length;

  res.status(200).json({
    original: text,
    wordCount,
    words,
  });
}
