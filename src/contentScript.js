const posenet = require('@tensorflow-models/posenet');
require("@tensorflow/tfjs-backend-webgl");
require("@tensorflow/tfjs-backend-cpu");

const video = document.createElement('video')
document.body.appendChild(video)
let net = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('request: ', request)
  switch (request.type) {
    case 'START': start(); break;
    case 'UP': break;
    case 'DOWN': break;
    case 'LEFT': break;
    case 'RIGHT': break;
  }
  sendResponse({});
  return true;
});

async function init() {
  net = await posenet.load();
};

async function start() {
  await init();
  console.log('net init: ', net);

  console.log('navigator in content: ', navigator);

  const constraints = {
    audio: true,
    video: { facingMode: "user" }
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(async (stream) => {
      video.srcObject = stream
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          resolve(video)
        }
      })

      const res = await net.estimatePoses(video, {
        decodingMethod: 'single-person'
      })
      console.log(res)
    })
    .catch((err) => {
      console.log('err: ', err)
    });
}

function handleUp() {

}

function handleDown() {

}

function handleLeft() {

}

function handleRight() {

}
