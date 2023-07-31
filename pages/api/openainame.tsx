// Next.js
import type { NextRequest } from "next/server"

// OpenAI package, but the edge version
import { Configuration, OpenAIApi, ResponseTypes } from "openai-edge"

// Set the API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

// Init the main component
const openai = new OpenAIApi(configuration)

const handler = async (req: NextRequest) => {

  try {

    // Try getting a name
    const item_name = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Generate the name of an imaginary product.",
      max_tokens: 50,
      stream: false,
    });

    // Await the response, so we can do something with it
    const data = (await item_name.json()) as ResponseTypes["createCompletion"]

    // Yay! We did it! Return that response!
    return new Response(JSON.stringify(data.choices[0].text.trim().replace("\n", "").replace("\"", "").replace("\\\"", "")), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    })
  } catch (error: any) {

    // Something's gone sideways -- let's take a look
    console.error(error)

    // Tell the UI the bad news
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

