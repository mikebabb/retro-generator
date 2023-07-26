/*
Create a controller with the following specifications:

1. import the Configuration class and the OpenAIApi class from the openai npm module
2. create a new configuration object that includes the api key and uses the Configuration class from the openai module
3. create a new instance of the OpenAIApi class and pass in the configuration object
4. create an async function called generateInfo that accepts a request and response object as parameters
5. use try to make a request to the OpenAI completion api and return the response
6. use catch to catch any errors and return the error include a message to the user
7. export the generateInfo function as a module
*/

// Path: pages/api/generateInfo.js

import { Configuration, OpenAIApi } from "openai";
const { retroPrompt } = require("../../data/prompt.json");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: "https://api.openai.com/v1",
});

const openai = new OpenAIApi(configuration);

export async function generateInfo(req, res) {
  const { retroTheme } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${retroPrompt}${retroTheme}` }],
      max_tokens: 200,
      temperature: 0,
      n: 1,
    });
    const response = completion.data.choices[0].message.content;

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    if (error.response.status === 401) {
      return res.status(401).json({
        error: "Please provide a valid API key.",
      });
    }
    return res.status(500).json({
      error:
        "An error occurred while generating retro information. Please try again later.",
    });
  }
}

export default generateInfo;
