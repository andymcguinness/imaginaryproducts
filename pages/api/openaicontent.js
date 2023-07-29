import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {

  try {

    const item_name = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Generate the name of a wacky imaginary product.",
      max_tokens: 500,
    });

    const item_text = item_name.data.choices[0].text;

    const item_description = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Come up with a sales pitch for " + item_text + ".",
      max_tokens: 500,
    });

    const item_description_text = item_description.data.choices[0].text


    const image_generated = await openai.createImage({
      prompt: item_text,
      n: 1,
      size: '1024x1024',
    });

    const imageUrl = image_generated.data.data[0].url;

    const response_data = {
      "image_url": imageUrl,
      "item_text": item_text,
      "completion_text": item_description_text
    };

    res.status(200).json({
      success: true,
      data: response_data,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};