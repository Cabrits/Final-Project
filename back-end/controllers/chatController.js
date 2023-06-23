const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const { MANGAS } = require("./all_mangas");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const connection = require("../config");

const openai = new OpenAIApi(configuration);

async function runChatGpt(prompt) {
  let allMangas = ``;
  for (const manga of MANGAS) {
    const mangaDescription = `
    [This is the data for this manga with name :${manga.item_name}
    ,with description: ${manga.item_description.slice(0, 100)}
    ,with price:${manga.item_price}
    ,with discount:${manga.item_discount}]
    `;
    allMangas += "\n" + mangaDescription;
  }
  const message = `You are helper for the online store that sells mangas (japanese comicses). If a user asks for reccommendation. 
This are the mangas + \n${allMangas} and
this is what the user asked you: ${prompt} .
Answer conciesly and simply.${
    Math.random() > 0.7 ? "Add contact info vibevault@mail.com" : ""
  }`;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 300,
      temperature: 0,
    });
    return completion.data.choices[0].text;
  } catch (error) {
    console.error("ERRROR CHATGPT");
    console.error(error);
  }
}

exports.postChat = async (req, res) => {
  const { message } = req.body;
  try {
    const response = await runChatGpt(message);

    res.json({ reply: response });
  } catch (error) {
    console.error("ChatGPT API request error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while processing the chat request." });
  }
};
