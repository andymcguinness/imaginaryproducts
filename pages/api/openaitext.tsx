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
      messages: [{ role: 'user', content: "Craft a fun and engaging sales pitch for a(n) " + body.item_name + " that combines practicality with whimsical fun. The product should seem realistic enough to exist in the real world but have a unique and quirky twist. In your pitch, emphasize its purpose, key features, how it works, and who it's perfect for. Highlight any unexpected benefits or humorous side effects. The tone should be energetic and upbeat, with a bit of humor, making it sound like something that could genuinely be marketed to a wide audience. Imagine you're selling it on a popular infomercial or a trendy online store!" }],
      model: 'gpt-3.5-turbo',
      max_tokens: 500,
    });

    // Yay! What an, erm, beautiful picture! Let's send it to the frontend
    const regex = /\n+/;

    return new Response(JSON.stringify(image_generated.choices[0].message.content.trim().replaceAll(regex, ' ').replaceAll("\"", "").replaceAll("\\\"", "")), {
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