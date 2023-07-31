// Next.js
import type { NextRequest } from "next/server"

// OpenAI package, but the edge version
import { Configuration, OpenAIApi, ResponseTypes } from "openai-edge"

// Set the API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

// Init the main module
const openai = new OpenAIApi(configuration)

const handler = async (req: NextRequest) => {

  try {

    // Wait for the product name before proceeding
    const body = await req.json();

    if (body.item_name == undefined) {
      throw new Error("No product name specified.");
    };

    // Ask the AI really, really nicely to paint me a picture
    const image_generated = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Come up with a sales pitch for " + body.item_name + ".",
      max_tokens: 500,
    });

    // Wait for the response before doing anything
    const data = (await image_generated.json()) as ResponseTypes["createCompletion"]

    // Yay! What an, erm, beautiful picture! Let's send it to the frontend
    return new Response(JSON.stringify(data.choices[0].text.trim().replace("\n", "").replace("\"", "").replace("\\\"", "")), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    })
  } catch (error: any) {

    // Boo! Let's see what went wrong.
    let error_text = error ? error : "No product name specified.";

    // Tell the frontend to cease and desist
    return new Response(JSON.stringify(error_text), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    })
  }
}

// Required for -- oh yeah! Streaming!
export const config = {
  runtime: "edge",
}

export default handler