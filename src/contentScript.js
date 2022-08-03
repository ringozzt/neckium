chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  (response) => {
    console.log(response.message);
  }
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('request: ', request)
  switch (request.type) {
    case 'START': start(); break;
    case 'UP': break;
    case 'DOWN': break;
    case 'LEFT': break;
    case 'RIGHT': break;
  }
  // sendResponse({});
  return true;
});



function start() {
  console.log('navigator in content: ', navigator);
  const constraints = {
    audio: true,
    video: { facingMode: "user" }
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      console.log('stream: ', stream)
    })
    .catch((err) => {
      console.log('err: ', err)
    });

  const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
  console.log(
    `Page title: '${pageTitle}'`
  );
}

function handleUp() {

}

function handleDown() {

}

function handleLeft() {

}

function handleRight() {

}
