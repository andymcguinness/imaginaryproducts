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

    // Wait for the product name before proceeding
    const body = await req.json();

    if (body.item_name == undefined) {
      throw new Error("No product name specified.");
    };

    // Ask the AI really, really nicely to paint me a picture
    const image_generated = await openai.chat.completions.create({
      messages: [{ role: 'user', content: "Come up with a sales pitch for " + body.item_name + "." }],
      model: 'gpt-3.5-turbo',
      max_tokens: 500,
    });

    // Yay! What an, erm, beautiful picture! Let's send it to the frontend
    return new Response(JSON.stringify(image_generated.choices[0].message.content.trim().replace("\n", "").replace("\"", "").replace("\\\"", "")), {
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