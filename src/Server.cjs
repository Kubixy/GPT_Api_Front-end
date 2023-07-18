const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const process = require("dotenv").config();

const app = express();
const openai = new OpenAIApi(
  new Configuration({ apiKey: process.parsed.API_KEY })
);

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/api/generate-text", async (req, res) => {
  const messages = req.body.prompt;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: messages },
      ],
    });

    res.json(response.data.choices[0].message.content);
  } catch (err) {
    console.error(err.response.data.error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3000, () => console.log("Server listening on port 3000"));
