import './popup.css';

(function () {
  const counterStorage = {
    get: (cb) => {
      chrome.storage.sync.get(['count'], (result) => {
        cb(result.count);
      });
    },
    set: (value, cb) => {
      chrome.storage.sync.set(
        {
          count: value,
        },
        () => {
          cb();
        }
      );
    },
  };

  function setUp() {
    document.getElementById('start').addEventListener('click', () => {
      console.log('Start!');

      // send message to background script to init posenet
      chrome.runtime.sendMessage(
        {
          type: 'INIT'
        },
        (response) => {
          console.log(response);
        }
      );

      // send message to content script to start webcam
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs) => {
        const message = {
          type: 'start'
        }
        chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
          console.log(response)
        })
      })
    })
  };

  document.addEventListener('DOMContentLoaded', setUp);
})();

