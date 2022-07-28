const posenet = require('@tensorflow-models/posenet')
require("@tensorflow/tfjs-backend-webgl")
require("@tensorflow/tfjs-backend-cpu")

let net = null

const initNeckium = async () => {
  net = await posenet.load()
  console.log('net init: ', net)
}

const runNeckium = async () => {
  console.log('Starting Neckium...')
  getWebcam()
}

const getWebcam = () => {

}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request)
  if (request.type === 'GREETINGS') {
    const message = `Hi ${sender.tab ? 'Con' : 'Pop'
      }, my name is Bac. I am from Background. It's great to hear from you.`;

    // Log message coming from the `request` parameter
    // Send a response message
    initNeckium()
    sendResponse({
      message,
    });
  }
  else if (request.type === 'START') {
    const message = 'Running'
    console.log(message)
    runNeckium()
    sendResponse({
      message
    })
  }
});



