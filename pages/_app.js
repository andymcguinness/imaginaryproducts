// React
import React from 'react'

// Next.js
import Head from 'next/head';

// Fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

// My styles -- pulling in Tailwind
import '../styles/globals.scss'

// Highlight.js
import 'highlight.js/styles/default.css';

// I was told to put this here
config.autoAddCss = false
 
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title>Imaginary Products for Imaginary People</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}