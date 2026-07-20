const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Sample forum topics

const topics = [
  { id: 1, subject: "The Transfer Market", creator: "Péle" },
  { id: 2, subject: "Tactics, Managers & Players", creator: "Zidane" },
  { id: 3, subject: "Club-Specific & League Boards", creator: "Messi" },
  { id: 4, subject: "Gaming and Fantasy Futebol", creator: "Maradona" },
  { id: 5, subject: "Rules, Refeeeing, & VAR", creator: "NKono" },
];

let submittedQuestions = [];
let submittedAnswers = [];

app.get("/", (req, res) => {
  res.render("index", { topics });
});

app.get("/topic/:id", (req, res) => {
  const topic = topics.find((t) => t.id == req.params.id);
  res.render("topic", { topic });
});

app.get("/question", (req, res) => {
  res.render("question");
});

app.get("answer", (req, res) => {
  res.render("answer");
});

app.post("/question", (req, res) => {
  const { name, topic, question } = req.body;
  submittedQuestions.push({ name, topic, question });
  res.send(`<h2>Thanks you for your question, ${name}!</h2><p><strong>${topic}:</strong>
        ${question}.</p><a href="/">Back to Home</a>`);
});

app.post("/answer", (req, res) => {
  const { name, topic, answer } = req.body;
  submittedAnswers.push({ name, topic, answer });
  res.send(`<h2>Thanks you for your answer, ${name}!</h2><p><strong>${topic}:</strong>
        ${answer}.</p><a href="/">Back to Home</a>`);
});

app.listen(PORT, () => {
  console.log(`Futebol Forum app running at http://localhost:${PORT}`);
});
