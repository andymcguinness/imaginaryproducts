import type { NextRequest } from "next/server"
import { Configuration, OpenAIApi, ResponseTypes } from "openai-edge"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const handler = async (req: NextRequest) => {

  try {
    const body = await req.json();

    const image_generated = await openai.createImage({
      prompt: body.new_text,
      n: 1,
      size: '1024x1024',
    });

    const data = (await image_generated.json()) as ResponseTypes["createCompletion"]

    return new Response(JSON.stringify(data), {
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