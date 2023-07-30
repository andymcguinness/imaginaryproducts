import type { NextRequest } from "next/server"
import { Configuration, OpenAIApi, ResponseTypes } from "openai-edge"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const handler = async (req: NextRequest) => {

  try {
    const item_name = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Generate the name of a wacky imaginary product.",
      max_tokens: 50,
      stream: false,
    });

    const data = (await item_name.json()) as ResponseTypes["createCompletion"]

    return new Response(JSON.stringify(data.choices[0].text.trim().replace("\n", "").replace("\"", "").replace("\\\"", "")), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    })
  } catch (error: any) {
    console.error(error)

    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    })
  }
}

export const config = {
  runtime: "edge",
}

export default handler

