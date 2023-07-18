import express from "express";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import dotenv from "dotenv";
import { countTokensInConversation } from "./Utils/OpenAIUtils.js";

dotenv.config();
const app = express();
const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.API_KEY })
);

app.use(cors({ origin: "*" }));
app.use(express.json());

let conversation = [
  { role: "system", content: "You are a helpful assistant." },
];

app.post("/api/generate-text", async (req, res) => {
  const userMessage = req.body.prompt;
  conversation.push({ role: "user", content: userMessage });

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });

    const assistantMessage = response.data.choices[0].message.content;
    conversation.push({ role: "assistant", content: assistantMessage });
    res.json(assistantMessage);
    console.log(
      `Total tokens used in conversation: ${countTokensInConversation(
        conversation
      )}`
    );
  } catch (err) {
    console.error(err.response.data.error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3000, () => console.log("Server listening on port 3000"));
