// React
import React, { useState, useEffect } from 'react';

// Next.js
import Error from 'next/error';

// Framer-motion
import { AnimatePresence } from 'framer-motion'

// Page components
import App from './_app'; // required for global styling
import Navbar from '../components/navbar';
import Home from '../components/home'; // step 1
import LoadingScreen from '../components/loadingscreen'; // step 2
import Results from '../components/results'; // step 3
import ErrorPage from '../components/errorpage' // step 4
import Footer from '../components/footer';

export default function OnePage() {

  const [step, setStep] = useState(1);              // used to control what's displaying
  const [problem, setProblem] = useState(null);     // used for error management
  const [percentage, setPercentage] = useState(0);  // used for the loading bar
  const [itemName, setItemName] = useState(null);   // used to control the product name
  const [itemDescription, setItemDescription] = useState(null); // used to control the item description
  const [itemImage, setItemImage] = useState(null); // used to control the item image URL
  
  /*
    Step 1 = Initial page
    Step 2 = Loading screen
    Step 3 = Image and result
    Step 4 = Error
  */

  // My lovely fetch wrapper to check for 400 errors from the server
  function fetchData() {

    // Applying args to fetch -- no {this} needs applied
    return fetch.apply(null, arguments).then(response => {
      if (!response.ok) {

        // Get the basics of the error
        let err = new Error("HTTP status code: " + response.status);

        // Set the error response
        err.response = response;

        // Set the error status
        err.status = response.status;

        // Throw it like you mean it!
        throw err;
      }
      // Yay! Nothing bad happened!
      return response;
    });
  }

  // change state based on click
  async function handleClick() {

    // to start with -- move to the loading screen
    setStep(2);

    try {

      // Step 1 -- get the product name
      const item_name = await fetchData('/api/openainame').then((response, error) => {

        // Catching any API errors
        if (error) {
          throw new Error(error);
        }

        // Set the text value
        let name = response.text().then((text, error) => {

          // Catching any errors
          if (text.error) {
            throw new Error(text.error);
          }

          // Move the loading bar along
          setPercentage(33);

          // Un-junk the text
          let cleansed_name = text.trim().replace("\n", "").replace("\"", "").replace("\\", "").trimEnd().substring(0, text.length - 2);
          
          // The state won't update fast enough -- return the text as well
          setItemName(cleansed_name);

          return cleansed_name;
        }).catch((error) => {

          // How'd you get here?! No wait, go back!
          if (!problem) {
            setProblem(error);
            setStep(4);
          }
        });

        // State isn't speedy enough for us. We're moving at the speed of A S Y N C
        return name;
      }).catch((error) => {

        // It's me, hi, I'm the problem, it's me
        if (!problem) {
          setProblem(error);
          setStep(4);
        }
      });

      // Step 2 -- get the funny description
      const item_description = fetchData('/api/openaitext', { method: 'POST', body: JSON.stringify({ item_name })}).then((response, error) => {

        // Catching any API errors
        if (error) {
          throw new Error(error);
        }

        // Set the text value
        let description = response.text().then((text, error) => {

          // Catching any errors
          if (text.error || error) {
            let error_text = text.error ? text.error : error;
            throw new Error(error_text);
          }

          // Move the loading bar along
          setPercentage(66);

          // Un-junk the text
          let cleansed_description = String(text).replaceAll("\\n", " ").replace("\"", "").trimEnd().substring(0, text.length - 2);

          // Set that description
          setItemDescription(cleansed_description);
        }).catch((error) => {

          // The cyber police have been called
          if (!problem) {
            setProblem(error);
            setStep(4);
          }
        });
        
      }).catch((error) => {

        // The consequences will never be the same
        if (!problem) {
          setProblem(error);
          setStep(4);
        }
      });

      // Step 3 -- get the image
      const item_image = fetchData('/api/openaiimage', { method: 'POST', body: JSON.stringify({ item_name })}).then((response, error) => {

        // Catching any API errors
        if (error) {
          throw new Error(error);
        }

        // Set theimage URL
        let image = response.json().then((json, error) => {

          // Catching any errors
          if (json.error) {
            throw new Error(json.error);
          }

          // Move the loading bar along
          setPercentage(100);

          // No need to un-junk! Wow!
          let new_image = json.url;

          // Set the URL
          setItemImage(new_image);
        }).catch((error) => {

          // I can't believe you've done this
          if (!problem) {
            setProblem(error);
            setStep(4);
          }
        });
      }).catch((error) => {

        // Well, gosh darn...
        if (!problem) {
          setProblem(error);
          setStep(4);
        }
      });

      await Promise.all([item_description, item_image]).catch((error) => {
        
        // I'm out of witty sayings, sorry, this is some error handling for the Promise object
        if (!problem) {
          setProblem(error);
          setStep(4);
        }
      });
    } catch (error) {
      
      // Houston, we have a problem...
      if (!problem) {
        setProblem(error);
        setStep(4);
      }
    }
  }

  // resets the state from the home button
  function goHome() {

    // Move us back to the first screen
    setStep((p) => (1));

    // Clear out any errors
    setProblem((p) => (null));

    // Reset the loading bar
    setPercentage((p) => (0));

    // Reset the item name
    setItemName(null);

    // Reest the item description
    setItemDescription(null);
    
    // Reset the item image
    setItemImage(null);
  }

  useEffect(() => {

    // Checking if everything is set properly
    // "Why here, Andy?"" You may ask.
    // Well... the problem is, the Promises resolve
    // before the state change is completed. If I hook
    // onto the Promise.all() function (which I tried)
    // it will throw up because itemImage is undefined still.
    // The problem check is to make sure we don't move along
    // if we're actually in an error state.
    if (itemName && itemDescription && itemImage && !problem) {
      setStep(3);
    }
  }, [itemName, itemDescription, itemImage])

  return (
    <React.Fragment key={0}>
      <AnimatePresence mode="wait" initial={false}>
        <div className="min-h-screen bg-gray-100 flex flex-col align-center">
          <Navbar homeHandler={goHome} />

          {
            // Show only for step 1
            step == 1 &&
            <Home handler={handleClick} />
          }

          {
            // Show only for step 2
            step == 2 &&
            <LoadingScreen percentage={percentage}/>
          }

          {
            // Show only for step 3
            step == 3 &&
            <Results name={itemName} description={itemDescription} image={itemImage} goHome={goHome} />
          }

          {
            // Show for errors/step 4 :(
            step == 4 &&
            <ErrorPage problem={problem} returnHome={goHome}/>
          }

          <Footer />
        </div>
      </AnimatePresence>
    </React.Fragment>
  )
}
