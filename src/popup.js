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
    document.getElementById('setup').addEventListener('click', () => {
      console.log('Set up...')
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs) => {
        const messgae = {
          type: 'SETUP'
        }
        chrome.tabs.sendMessage(tabs[0].id, messgae, (response) => {
          console.log(response)
        })
      })
    })

    document.getElementById('save').addEventListener('click', () => {
      console.log('Default pose saved.')
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs) => {
        const messgae = {
          type: 'SAVE'
        }
        chrome.tabs.sendMessage(tabs[0].id, messgae, (response) => {
          console.log(response)
        })
      })
    })

    document.getElementById('start').addEventListener('click', () => {
      console.log('Start!');
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs) => {
        const message = {
          type: 'START'
        }
        chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
          console.log(response)
        })
      })
    })

    document.getElementById('stop').addEventListener('click', () => {
      console.log('Stop!');
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs) => {
        const message = {
          type: 'STOP'
        }
        chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
          console.log(response)
        })
      })
    })
  };

  document.addEventListener('DOMContentLoaded', setUp);
})();

