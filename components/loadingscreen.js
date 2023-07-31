// React
import React, { useState, useEffect } from "react";

// Framer-motion
import { motion } from "framer-motion";

// Funnies
import getRandomMessage from './messages';

// Progress bar
import ProgressBar from "@ramonak/react-progress-bar";

export default function LoadingScreen({ percentage }) {

  // This will hold the funny loading message
  const [funny, setFunny] = useState('Loading data...')

  // No infinite reload loops, please
  useEffect(() => {
    
    // Reload the text on a certain interval -- currently 4s
    const id = setInterval(() => {
      
      // Get the new funny
      let new_funny = getRandomMessage();

      // Set it with state
      setFunny(new_funny);
    }, 4000);
    // Clear the interval
    return () => clearInterval(id);
  }, [funny])

  return (
    <React.Fragment key={2}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center relative z-10 overflow-hidden"
        id="outer-div"
        key={"loading"}
      >
        <main className="items-center md:mt-20 md:mb-20 rounded overflow-hidden shadow-lg bg-white px-20 py-20 z-10 w-full md:w-1/2">
          
          {
            // The funny text
          }
          <p className="mb-6 mt-4 text-lg font-normal text-gray-500 lg:text-xl text-center relative z-10">{funny}</p>
          
          {
            // Progress bar component
          }
          <ProgressBar 
            completed={percentage}
            bgColor="rgb(59 130 246)"
            isLabelVisible={true}
            animateOnRender={true}
          />
        </main>
      </motion.div>
    </React.Fragment>
  );
}