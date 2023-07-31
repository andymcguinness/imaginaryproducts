// Next.js
import Head from 'next/head';

// Framer-motion
import { AnimatePresence } from 'framer-motion'

// Page components
import App from '../_app'; // needed for global styles
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function About() {

  // No extra Javascript-ing needed
  return (
    <>
      <AnimatePresence mode="wait" initial={true}>
        <div>

          {
            // Setting the title of the page
          }
          <Head>
            <title>Imaginary Products for Imaginary People | About</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          {
            // The nav bar
          }
          <Navbar />

          <main className="flex flex-col relative md:mb-20">

            {
              // Header and subheader/description
            }
            <header className="mb-6 mt-2">
              <h1 className="text-center mb-4 mt-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl">About/Caveats</h1>
              <p className="text-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">About this project and some caveats.</p>
            </header>

            <div className="grid grid-flow-row grid-col-1 md:grid-cols-2">
              {
                // About card
              }
              <div className="max-w-lg rounded overflow-hidden shadow-lg md:mr-4 mb-4 justify-self-center md:justify-self-end">
                <div className="px-6 py-4">
                  <h3 className="font-bold text-xl mb-2">About</h3>
                  <p className="text-gray-700 text-base">
                    This project is an exercise in absurdity by <a href="https://andymcguinness.com" target="_blank" className="font-semibold text-gray-700 hover:underline decoration-blue-500 decoration-2">Andy McGuinness</a>. Take with a large grain of salt.
                    <br />
                    <br />
                    <a href="https://github.com/andymcguinness/imaginaryproducts" target="_blank" className="font-semibold text-gray-700 hover:underline decoration-blue-500 decoration-2">Code.</a>
                  </p>
                </div>
              </div>

              {
                // Stack card
              }
              <div className="max-w-lg rounded overflow-hidden shadow-lg md:mr-4 mb-4 justify-self-center md:justify-self-start">
                <div className="px-6 py-4">
                  <h3 className="font-bold text-xl mb-2">Stack</h3>
                  <p className="text-gray-700 text-base">
                    This project is built on <a href="https://nextjs.org/" target="_blank" className="font-semibold text-gray-700 hover:underline decoration-blue-500 decoration-2">Next.js</a> using the ever-awesome <a href="https://www.framer.com/motion/" target="_blank" className="font-semibold text-gray-700 hover:underline decoration-blue-500 decoration-2">Framer Motion</a> and <a href="https://tailwindcss.com/" target="_blank" className="font-semibold text-gray-700 hover:underline decoration-blue-500 decoration-2">Tailwind CSS</a>. It also makes heavy use of <a href="https://openai.com/blog/openai-api" target="_blank" className="font-semibold text-gray-700 hover:underline decoration-blue-500 decoration-2">OpenAI's API</a>.
                  </p>
                </div>
              </div>

              {
                // Credits card
              }
              <div className="max-w-lg rounded overflow-hidden shadow-lg md:mr-4 mb-4 justify-self-center md:justify-self-end">
                <div className="px-6 py-4">
                  <h3 className="font-bold text-xl mb-2">Credits</h3>
                  <p className="text-gray-700 text-base">
                    In addition to the stack listed here, there's a few repos/websites I could not have done this without.
                    <br />
                    <br />
                    The first is Brad Traversy's <a href="https://github.com/bradtraversy/nodejs-openai-image" target="_blank" className="font-semibold text-gray-700 hover:underline decoration-blue-500 decoration-2">nodejs-openai-image</a>. This provided the groundwork for what I've done here. Though I've bastardized it pretty badly, this project would never have gotten off the ground without this repo. Cheers to you, Brad.
                    <br />
                    <br />
                    I also made heavy use of <a href="https://blog.logrocket.com/" target="_blank" className="font-semibold text-gray-700 hover:underline decoration-blue-500 decoration-2">LogRocket's blog</a>. Several tutorials they provided were fundamental to the success of this project. Thanks y'all.
                    <br />
                    <br />
                    I'd also like to shout out the <a href="http://sideprojectgenerator.com/" target="_blank" className="font-semibold text-gray-700 hover:underline decoration-blue-500 decoration-2">Side Project Generator</a>, where this idea came from to begin with. If you're curious, my words were "Tea" and "Copywriting".
                    <br />
                    <br />
                    The spinning squares on the hero are thanks to <a href="https://codepen.io/BjornRombaut/pen/mOLGgX" target="blank" className="font-semibold text-gray-700 hover:underline decoration-blue-500 decoration-2">Bjorn Rombaut</a>, and the fun-colored title is from <a href="https://flowbite.com/docs/typography/headings/" target="_blank" className="font-semibold text-gray-700 hover:underline decoration-blue-500 decoration-2">Flowbite</a>.
                  </p>
                </div>
              </div>

              {
                // Caveats card
              }
              <div className="max-w-lg rounded overflow-hidden shadow-lg md:mr-4 mb-4 justify-self-center md:justify-self-start">
                <div className="px-6 py-4">
                  <h3 className="font-bold text-xl mb-2">Caveats</h3>
                  <p className="text-gray-700 text-base">
                    <span className="font-bold">Why is the loading time so long?</span>
                    <br />
                    <br />
                    The answer there is pretty simple: to maximize the congruence between the image and the text, I make three calls to OpenAI's API: a first one to get a product name, and from there, one to generate the text from that product name, and one to generate the image from that product name. Yes, it increses the latency quite a bit, but it also ups the funny factor. Trade-offs.
                    <br />
                    <br />
                    <span className="font-bold">Can I make a product less imaginary?</span>
                    <br />
                    <br />
                    I mean... by all means. I'd check with OpenAI about using their intellectual property first, though.
                    <br />
                    <br />
                    <span className="font-bold">Can I take this idea and do ______?</span>
                    <br />
                    <br />
                    Sure! Please just fork the code, first -- I'd love to see what people do with the idea.
                  </p>
                </div>
              </div>
            </div>
          </main>

          {
            // The footer
          }
          <Footer />
          
        </div>
      </AnimatePresence>
    </>
  )
}