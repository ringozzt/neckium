const posenet = require('@tensorflow-models/posenet');
require("@tensorflow/tfjs-backend-webgl");
require("@tensorflow/tfjs-backend-cpu");

const constraints = {
  audio: true,
  video: {
    height: 240,
    width: 320,
    facingMode: "user"
  }
};

const video = document.createElement('video')
video.width = 320
video.height = 240
video.style.position = 'absolute'
video.style.top = 0
video.style.zIndex = 2000
document.body.appendChild(video)

let net = null;
let defaultPose = null, prevPose = null, currPose = null;

let settingInterval = null, detectingInterval = null

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('request: ', request)
  switch (request.type) {
    case 'SETUP': setup(); break;
    case 'DONE': done(); break;
    case 'START': start(); break;
    case 'STOP': stop(); break;
    default: console.log('Invalid Message.'); break;
  }
  sendResponse({});
  return true;
});

async function init() {
  net = await posenet.load();
  console.log('net init: ', net)
};

async function setup() {
  await init()
  video.style.display = 'block';
  // set up default pose
  navigator.mediaDevices.getUserMedia(constraints)
    .then(async (stream) => {
      video.srcObject = stream;
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          resolve(video)
        }
      });
      video.play()

      async function detect() {
        const res = await net.estimateSinglePose(video);
        const pose = res.keypoints.slice(0, 5).map(
          i => {
            return i.position
          }
        )
        defaultPose = pose
        console.log(defaultPose)
      };

      settingInterval = setInterval(async () => {
        await detect();
      }, 500);
    })
    .catch((err) => {
      console.log('err: ', err)
    });
}

async function done() {
  clearInterval(settingInterval)
  video.style.display = 'none';
}

async function start() {
  if (!net || !defaultPose) return;

  navigator.mediaDevices.getUserMedia(constraints)
    .then(async (stream) => {
      video.srcObject = stream;
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          resolve(video)
        }
      });

      async function detect() {
        const res = await net.estimateSinglePose(video)
        const currPose = res[0].keypoints.slice(0, 5)
      };

      setInterval(async () => {
        await detect();
      }, 5000);
    })
    .catch((err) => {
      console.log('err: ', err)
    });
}

function handleUp() {

};

function handleDown() {

};

function handleLeft() {

};

function handleRight() {

};
