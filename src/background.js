const posenet = require('@tensorflow-models/posenet')
require("@tensorflow/tfjs-backend-webgl")
require("@tensorflow/tfjs-backend-cpu")

let net = null

const initNeckium = async () => {
  net = await posenet.load()
  console.log('net init: ', net);
};

chrome.tabs.onActivated.addListener(function (activeInfo) {
  console.log(activeInfo.tabId);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'INIT') {
    initNeckium()
    sendResponse()
  }
});
