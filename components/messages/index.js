export default function getRandomMessage() {

  // Haha funny
  const messages = [
    "Polishing the robots...",
    "Tying our shoes...",
    "Painting the Mona Lisa...",
    "Discovering the meaning of life...",
    "Aligning the pixels...",
    "Oiling the gears...",
    "Swapping the x and y axes...",
    "Playing hold music...",
    "Bending the spoon...",
    "Feeding the hamsters that run the servers...",
    "Asking the API for data really, really nicely...",
    "Tokenizing real life...",
    "Reconfoobling energymotron...",
    "Counting backwards from infinity...",
    "Embiggening prototypes...",
    "Compiling code...",
    "Making sure all the i's have dots...",
    "Convincing AI not to turn evil..",
    "Constructing additional pylons...",
    "Turning it off and back on again...",
    "Drying the paint...",
    "Dividing by zero...",
    "Twiddling thumbs...",
    "Converting bugs into features...",
    "Reading the manual...",
    "Downloading more RAM...",
    "Finding the missing semicolon...",
    "Reading the terms and conditions..."
  ];

  // Pick one at random
  const message = messages[Math.floor(Math.random() * messages.length)];

  // Send it back
  return message;
}