// React
import React, { useEffect, useState } from "react";

// Framer Motion
import { motion } from "framer-motion";

// Highlight.js
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

export default function ErrorPage({returnHome, problem}) {

  // This will hold some cheeky text about the error
  const [bestGuess, setBestGuess] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Set highlighting
  hljs.registerLanguage('javascript', javascript);

  useEffect(() => {

    // Parse what the server sent back
    if (problem.props) {
      if (problem.props.message) {
        setErrorMsg(problem.props.message);
      } else {
        setErrorMsg(problem.props);
      }
    } else {
      console.log(problem);
      setErrorMsg(problem.toString());
    }

    // Init highlighting
    hljs.highlightAll();

    // Go through several options and take a guess at what's wrong
    if (String(errorMsg).includes("JSON")) {
      setBestGuess("Looks like the JSON was badly formatted. My bad. I've been notified, and will take a look.");
    }
    else if (String(errorMsg).includes("rate limit")) {
      setBestGuess("Oh no! The robot is overwhelmed. It's okay, robot, it happens to me too. (Please try again in a few minutes.)");
    }
    else if (String(errorMsg).includes("API key")) {
      setBestGuess("I think the robots got tired of me asking the same question... my bad. I've been notified, and will take a look.");
    }
    else if (String(errorMsg).includes("safety")) {
      setBestGuess("Yikes, the robot said a bad word. Oops. (This happens occasionally. Please try again!)");
    }
    else if (String(errorMsg).includes("timeout")) {
      setBestGuess("Hmmmm, something's not quite right. I've been notified, and will take a look.");
    }
    else if (String(errorMsg).includes("item name")) {
      setBestGuess("Uh-oh, the robot got tangled up in the time-space continuum. (This happens occasionally. Please try again!)");
    }
    else {
      setBestGuess("I'm not sure what happened there. I've been notified, and will take a look.")
    }
  }, [errorMsg]);

  return (
    <React.Fragment key={4}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center relative z-10"
        key="error"
      >
        {
          // Header and body copy
        }
        <main className='flex flex-col items-center mt-20 mb-40 rounded overflow-hidden shadow-lg bg-white px-20 py-20 z-10 w-2/3 align-center justify-center relative'>
          <h1 className="text-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl relative  z-10">Oh no! Something went wrong.</h1>
          <p className="mb-6 mt-4 text-lg font-normal text-gray-500 lg:text-xl text-center relative z-10">Well, that's embarrassing. Here's what happened:</p>

          {
            // The error message
          }
          <pre className="flex flex-col items-center rounded text-wrap">
            <code className="javascript">
              {errorMsg}
            </code>
          </pre>

          {
            // My best guess at what's wrong
          }
          <p className="mb-6 mt-4 text-lg font-normal text-gray-500 lg:text-xl text-center relative z-10">{bestGuess}</p>

          {
            // Try again button
          }
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded relative z-10" onClick={returnHome}>Try Again</button>
        </main>
      </motion.div>
    </React.Fragment>
  );
}