// React
import React from 'react';

// Next.js
import Image from 'next/image';

// Framer-motion
import { motion } from "framer-motion";

export default function Results({goHome, name, description, image}) {
  // Props:
  //  - goHome: the function from the main index.js file that controls the "Try Again" buttons' behavior
  //  - name:   the fake product's name
  //  - description:  the fake product's description
  //  - image:  the fake product's image URL

  // No extra finagling needed, just return the styled content
  return (
    <React.Fragment key={3}>
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center relative z-10"
          key="results"
      >
        <main className='md:grid md:grid-flow-row md:grid-col-1 lg:grid-cols-2 items-center md:mt-20 md:mb-40 rounded overflow-hidden shadow-lg bg-white z-10 md:w-2/3 align-center justify-center relative'>
          
          {
            // The product image -- left side on big screens, top on small screens
          }
          <div className="w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            <Image
              src={image}
              className="w-full h-full flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              width="1024"
              height="1024"
              alt={name}
              placeholder='blur'
              blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkSAMAAGwAaKJgE8oAAAAASUVORK5CYII='
            />
          </div>

          {
            // Title/description -- right side on big screens, bottom on small screens
          }
          <div className="flex flex-col px-5 w-auto">
            <div className="mb-8 mt-4">
              <h1 className="text-gray-900 font-bold text-xl mb-2">{name}</h1>
              <p className="text-gray-700 text-base mb-5">{description}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded relative z-10" onClick={goHome}>Try Again</button>
            </div>
          </div>
        </main>
      </motion.div>
    </React.Fragment>
  );
}