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
    // Wait for the product name before we get going
    const body = await req.json();

    // Send the request to the robots
    const image_generated = await openai.createImage({
      prompt: body.item_name,
      n: 1,
      size: '1024x1024',
    });

    // Wait for the robots to respond
    const data = (await image_generated.json()) as ResponseTypes["createCompletion"]

    // Yay! They responded! Let's tell the frontend!
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    })
  } catch (error: any) {

    // Oh no... let's take a look
    console.error(error)

    // Tell the UI what happened
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    })
  }
}

// Required for a reason I forgot
export const config = {
  runtime: "edge",
}

export default handler