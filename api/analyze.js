import nlp from "compromise";
import { WordTokenizer, PorterStemmer } from "natural";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing text" });

  const doc = nlp(text);
  const people = doc.people().out("array");
  const places = doc.places().out("array");
  const topics = doc.topics().out("array");

  const tokenizer = new WordTokenizer();
  const tokens = tokenizer.tokenize(text);
  const stems = tokens.map((word) => PorterStemmer.stem(word));

  res.status(200).json({
    original: text,
    tokens,
    stems,
    people,
    places,
    topics,
  });
}
