import styles from '../styles/Home.module.scss';
import Image from 'next/image';
import { motion } from "framer-motion";

export default function Results({goHome, data}) {
    return (
      <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center relative z-10"
        >
          <main className='grid grid-flow-row grid-col-1 lg:grid-cols-2 items-center mt-20 mb-40 rounded overflow-hidden shadow-lg bg-white z-10 w-2/3 align-center justify-center relative'>
            <div className="w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
              <Image
                src={data.data.image_url}
                className="w-full h-full flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                width="1024"
                height="1024"
                alt={data.data.item_text}
                placeholder='blur'
                blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkSAMAAGwAaKJgE8oAAAAASUVORK5CYII='
                objectFit='cover'
              />
              </div>
              <div class="flex flex-col px-5 w-auto">
                <div class="mb-8 mt-4">
                  <h1 class="text-gray-900 font-bold text-xl mb-2">{data.data.item_text}</h1>
                  <p class="text-gray-700 text-base mb-5">{data.data.completion_text}</p>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded relative z-10" onClick={goHome}>Try Again</button>
                </div>
              </div>
          </main>
        </motion.div>
      </>
    );
}