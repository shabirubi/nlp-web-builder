import nlp from "compromise";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Missing text" });
  }

  const doc = nlp(text);

  const people = doc.people().out("array");
  const places = doc.places().out("array");
  const topics = doc.topics().out("array");
  const terms = doc.terms().out("array");

  res.status(200).json({
    original: text,
    terms,
    people,
    places,
    topics,
  });
}
