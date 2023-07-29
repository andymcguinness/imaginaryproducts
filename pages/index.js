// React
import React, { useState } from 'react';

// Next.js
import Head from 'next/head';

// Framer-motion
import { AnimatePresence, useAnimationControls } from 'framer-motion'

// Page components
import App from './_app';
import Navbar from '../components/navbar';
import Home from '../components/home'; // step 1
import LoadingScreen from '../components/loadingscreen'; // step 2
import Results from '../components/results'; // step 3
import Footer from '../components/footer';

export default function OnePage() {

  const controls = useAnimationControls();
  const [step, setStep] = useState(1);
  const [data, setData] = useState(null);
  /*
    Step 1 = Initial page
    Step 2 = Loading screen
    Step 3 = Image and result
    Step 4 = Error
  */

  // change state based on click
  function handleClick() {
    controls.start();
    setStep(2);
    fetch('/api/openaicontent')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        controls.stop();
        setStep(3);
      })
  }

  // resets the state from the home button
  function goHome() {
    setStep(1);
  }

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Head>
            <title>Imaginary Products for Imaginary People</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

        <div className="min-h-screen bg-gray-100 flex flex-col align-center">
          <Navbar />

          {
            // Show only for step 1
            step == 1 &&
            <Home handler = {handleClick} />
          }

          {
            // Show only for step 2
            step == 2 &&
            <LoadingScreen controls={controls}/>
          }

          {
            // Show only for step 3
            step == 3 &&
            <Results data={data} goHome={goHome} />
          }

          <Footer />
        </div>
      </AnimatePresence>
    </>
  )
}
