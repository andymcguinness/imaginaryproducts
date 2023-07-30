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
  const [itemText, setItemText] = useState(null);
  const [itemDescription, setItemDescription] = useState(null);
  const [itemImage, setItemImage] = useState(null);
  const [percentage, setPercentage] = useState(0);
  /*
    Step 1 = Initial page
    Step 2 = Loading screen
    Step 3 = Image and result
    Step 4 = Error
  */

  // change state based on click
  async function handleClick() {
    setStep(2);
    const result = await fetch('/api/openainame').then((res) => {
        setPercentage(33);
        let text = res.text().then((text) => {
          let new_text = text.trim().replace("\n", "").replace("\"", "").replace("\\", "").trimEnd().substring(0, text.length - 2);
          console.log(new_text);
          setItemText(new_text);
          return new_text;
        }).then((new_text) => {
          console.log(new_text);

          const item_description = fetch('api/openaitext', { method: 'POST', body: JSON.stringify({ new_text })}).then((res) => {
            setPercentage(66);
            let description = res.text().then((text) => {
              let cleansed_description = String(text).replace("\n", "").replace("\"", "");
              setItemDescription(cleansed_description);
              return new_text;
            }).then((new_text) => {
              console.log(JSON.stringify({new_text}));

              const item_image = fetch('api/openaiimage',  { method: 'POST', body: JSON.stringify({ new_text })}).then((res) => {
                setPercentage(100);
                let image = res.json().then((json) => {
                  let new_image = json.data[0].url;
                  setItemImage(new_image);
                  setStep(3);
                });
              }).catch((err) => console.error(err));
            });
          }).catch((err) => console.error(err));
        })
      }).catch((err) => console.error(err));
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
            <LoadingScreen percentage={percentage}/>
          }

          {
            // Show only for step 3
            step == 3 &&
            <Results name={itemText} description={itemDescription} image={itemImage} goHome={goHome} />
          }

          <Footer />
        </div>
      </AnimatePresence>
    </>
  )
}
