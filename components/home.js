// React
import React from "react";

// Framer-motion
import { motion } from "framer-motion";

// Fontawesome
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

// Scss
import styles from '../styles/Home.module.scss'

export default function Home({handler}) {
  return (
    <React.Fragment key={1}>
      {
        // The lovely squares in the background
      }
      <div className={styles.hero}>
        <div id="cube-1" className={styles.cube}></div>
        <div id="cube-2" className={styles.cube}></div>
        <div id="cube-3" className={styles.cube}></div>
        <div id="cube-4" className={styles.cube}></div>
        <div id="cube-5" className={styles.cube}></div>
        <div id="cube-6" className={styles.cube}></div>
      </div>

      {
        // The actual content
      }
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{  opacity: 0 }}
        className="flex flex-col items-center relative z-10"
        key={"home"}
      >
        <main className="flex flex-col items-center md:mt-20 md:mb-40 rounded overflow-hidden shadow-lg bg-white md:px-20 py-20 z-10 md:w-2/3 align-center justify-center relative">
          <h1 className="text-center px-2 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl relative  z-10">
            {
              // Colorful header text
            }
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-900 from-blue-500 z-10">Imaginary Product</span> Generator
          </h1>

          {
            // Description
          }
          <p className="px-2 mb-6 mt-4 text-lg font-normal text-gray-500 lg:text-xl text-center relative z-10">Do you need a weird, nonexistent product? You've come to the right place. Click "Generate" to start the fun.</p>

          {
            // Button with arrows
          }
          <div className="flex flex-row items-center align-middle mt-10">
            <FontAwesomeIcon icon={faArrowRight} size="xl" />
            <button className="ml-5 mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded relative z-10" onClick={handler}>Generate</button>
            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
          </div>
        </main>
      </motion.div>
    </React.Fragment>
  );
}