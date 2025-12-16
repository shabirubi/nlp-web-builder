import express from "express";
import cors from "cors";
import nlp from "compromise";
import { WordTokenizer, PorterStemmer } from "natural";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing text" });

  const doc = nlp(text);
  const people = doc.people().out("array");
  const places = doc.places().out("array");
  const topics = doc.topics().out("array");

  const tokenizer = new WordTokenizer();
  const tokens = tokenizer.tokenize(text);
  const stems = tokens.map((word) => PorterStemmer.stem(word));

  res.json({
    original: text,
    tokens,
    stems,
    people,
    places,
    topics,
  });
});

app.get("/", (req, res) => {
  res.send("NLP server is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
