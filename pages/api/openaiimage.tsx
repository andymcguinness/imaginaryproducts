// Next.js
import type { NextRequest } from "next/server"

// OpenAI package
import OpenAI from 'openai';

// Set the API key
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const handler = async (req: NextRequest) => {

  try {
    // Wait for the product name before we get going
    const body = await req.json();

    // Send the request to the robots
    const image_generated = await openai.images.generate({
      model: "dall-e-3",
      prompt: body.item_name,
      n: 1,
      size: '1024x1024',
    });

    console.log(image_generated.data[0])

    // Yay! They responded! Let's tell the frontend!
    return new Response(JSON.stringify(image_generated.data[0]), {
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