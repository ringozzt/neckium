const posenet = require('@tensorflow-models/posenet')
require("@tensorflow/tfjs-backend-webgl")
require("@tensorflow/tfjs-backend-cpu")

let net = null

const initNeckium = async () => {
  net = await posenet.load()
  console.log('net init: ', net);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.type === 'INIT') {
    const message = 'Start neckium';

    // Log message coming from the `request` parameter
    // Send a response message
    initNeckium();
    sendResponse({
      message,
    });
  }
});



