// React
import { useState, useEffect } from "react";

// Framer-motion
import { motion } from "framer-motion";

// Funnies
import getRandomMessage from './messages';

// Progress bar
import ProgressBar from "@ramonak/react-progress-bar";

// Styles
import styles from '../styles/LoadingScreen.module.scss';

export default function LoadingScreen() {

  const [funny, setFunny] = useState('Loading data...')

  useEffect(() => {
    const id = setInterval(() => {
        let new_funny = getRandomMessage();
        setFunny(new_funny);
    }, 4000);
    return () => clearInterval(id);
}, [funny])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center relative z-10 overflow-hidden"
        id="outer-div"
      >
        <main className="items-center mt-20 mb-20 rounded overflow-hidden shadow-lg bg-white px-20 py-20 z-10 w-full md:w-1/2">
          <p className="mb-6 mt-4 text-lg font-normal text-gray-500 lg:text-xl text-center relative z-10">{funny}</p>
          <ProgressBar 
            completed={60}
            bgColor="rgb(59 130 246)"
            isLabelVisible={false}
            animateOnRender={true}
            completedClassName={styles.bar_container}
          />
        </main>
      </motion.div>
    </>
  );
}