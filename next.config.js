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