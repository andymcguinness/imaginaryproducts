# Imaginary Products for Imaginary People

Have you ever wanted a mug that stirs your coffee for you? How about an inflatable toilet? If any of that sounds appealing, this repo is for you.

## Welcome, traveler, to the world of strange, fascinating imaginary products!

This repo houses all the goodness of the web app located at [https://imaginaryproducts.vercel.app/](https://imaginaryproducts.vercel.app/).

# Stack

- [Next.js](https://nextjs.org/)
- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel](https://vercel.com/docs)

# Getting Started with the Code

## Fast Version

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fandymcguinness%2Fimaginaryproducts&env=OPENAI_API_KEY,OPENAI_IMAGE_PATHNAME&envDescription=Your%20OpenAI%20API%20key%20and%20the%20pathname%20for%20your%20images.%20The%20API%20key%20will%20be%20under%20%22API%20Keys%22%2C%20and%20the%20path%20will%20look%20like%20%22%2Fprivate%2F%7Byour%20org%20here%7D%22%2C%20where%20you%20replace%20the%20org%20with%20the%20one%20present%20at%20%22Org%20Settings%22.&envLink=https%3A%2F%2Fplatform.openai.com%2Faccount%2Forg-settings&project-name=imaginary-products&repository-name=imaginary-products&demo-title=Imaginary%20Products&demo-description=An%20OpenAI-powered%20Next.js%20project%20using%20Tailwind%20CSS%20and%20Framer%20Motion.&demo-url=https%3A%2F%2Fimaginaryproducts.vercel.app%2F)

Click the button above. It will generate a new repo for you, and deploy it on Vercel, where my app is hosted.

## Local Development

First, you'll need an OpenAI API key. One can be obtained for free -- so you have no excuse not to!

[Get your API key here.](https://platform.openai.com/account/api-keys).

Then, run the following in the main folder:

```js
npm install
```

Once everything's installed, you'll need to set up your API key and API image location in your .env file.

It will look like this:

```js
OPENAI_API_KEY='{your key here}'
OPENAI_IMAGE_PATHNAME='/private/{your org here}/**'
```

You'll also need to set up your next.config.js file to look like this:

```js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'oaidalleapiprodscus.blob.core.windows.net',
          port: '',
          pathname: process.env.OPENAI_IMAGE_PATHNAME
        },
      ],
    },
  }
```

This is because by default, Next.js doesn't trust external images. We need to explicity tell it that it's totally okay to load images from OpenAI.

(If you find your images are not being trusted, double-check the hostname. Yours could be different.)

Then, to start the development server and have it watch for changes, run:

```js
npx next dev
```

That should get you a working version of the site -- albeit much slower than the production version. (The API calls take twice as long locally, for whatever reason.)

**Be warned**: When you first start the project up, you will get several 400 errors with the console logging of 'ConnectTimeoutError'. This is transient, and will go away after a few calls. I have no idea why this is -- if you do, please open a pull request with the fix!

# Problems

If you run into any problems, please open an issue on Github! I'll do my best to help you out. Please leave code suggestions to pull requests, though.

There are lots of small bugs that exist, mainly around error handling and weird API responses. I am working on them slowly -- please feel free to jump in and squash a few!

# Contributing

Please fork and make a pull request with any updates. No, really, _please do_. The more the merrier!

# License

This work is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](http://creativecommons.org/licenses/by-nc/4.0/). This is an open-source project built on other open-source projects; please keep it that way. If you use this code, please indicate it somehow -- a fork of my repo is good enough for me!