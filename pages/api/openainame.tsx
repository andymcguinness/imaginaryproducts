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

    // Try getting a name
    const item_name = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Generate the name of a nonexistent product.' }],
      model: 'gpt-3.5-turbo',
    });

    // Yay! We did it! Return that response!
    return new Response(JSON.stringify(item_name.choices[0].message.content.trim().replace("\n", "").replace("\"", "").replace("\\\"", "")), {
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

