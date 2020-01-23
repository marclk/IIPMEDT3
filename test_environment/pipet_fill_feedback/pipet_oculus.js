// window.onload = function () {
//==================== PIPET STUFF
const PIPET_FEEDBAR = document.getElementById('js--pipet-feedbar');
// const PIPET = document.getElementById('js--pipet');
const PIPET_CONTAINER = document.getElementById('js--pipet-container');

const INTERVAL_FREQ = 100;

let startPipetFeedbackTimer;
let deltaPipetFeedbackTimer = 0;
let visualFeedbackInterval;
let initialFeedbackBarHeight = 0;
let activeFeedbackBarHeight = null;
let modifiedDeltaPipetFeedbackTimer;

let aButtonHeld = false;
let bButtonHeld = false;
let grabbedObject = true;

let dropletSound = new Audio("drop.mp3");

// let testID = PIPET_CONTAINER.id;
// switch (testID) {
//   case 'js--pipet-container' || 'js--pipet':
//     console.log(testID);
//     break;
//   default:
//
// }

// DOWN
document.addEventListener('gamepadbuttondown', function (e) {
  // console.log(e.detail.index);

  if (e.detail.index == 0) {
    fillPipetStart();
    aButtonHeld = true;
  }

});

document.addEventListener('gamepadbuttondown', function (e) {
  // console.log(e.detail.index);

  if (e.detail.index == 1) {
    emptyPipetStart();
    bButtonHeld = true;
  }

});

// UP
document.addEventListener('gamepadbuttonup', function (e) {
  // console.log(e.detail.index);

  if (e.detail.index == 0) {
    aButtonHeld = false;
    fillPipetEnd();
  }

});

document.addEventListener('gamepadbuttonup', function (e) {
  // console.log(e.detail.index);

  if (e.detail.index == 1) {
    bButtonHeld = false;
    emptyPipetEnd();
  }

});

// document.addEventListener('abuttondown', function (e) {
//   console.log("a button pressed");
//   fillPipetStart();
//   aButtonHeld = true;
// })
// document.addEventListener('bbuttondown', function (e) {
//   console.log("b button pressed")
//   emptyPipetStart();
//   bButtonHeld = true;
// })
// document.addEventListener('abuttonup', function (e) {
//   console.log("abutton released")
//   aButtonHeld = false;
//   fillPipetEnd();
// })
// document.addEventListener('bbuttonup', function (e) {
//   bButtonHeld = false;
//   emptyPipetEnd();
// })


// document.getElementById('js--pipet-container-2').addEventListener('grab-end', function (e) {
//   document.getElementById('js--pipet-container-2').removeEventlistener('abuttondown')
// }

// console.log(PIPET_CONTAINER.components.grabbable);

// document.querySelector('#rig').addEventListener('abuttondown', function (e) {
//   aButtonHeld = true;
//   if (PIPET_CONTAINER.components.grabbable.GRABBED_STATE == 'grabbed') {
//     dropletSound.play();
//     fillPipetStart();
//   }
// })
//
// document.querySelector('#rig').addEventListener('abuttonup', function (e) {
//   aButtonHeld = false;
//   if (PIPET_CONTAINER.hasAttribute("clicked")) {
//     fillPipetEnd();
//   }
// })
//
// document.querySelector('#rig').addEventListener('bbuttondown', function (e) {
//   bButtonHeld = true;
//   dropletSound.play();
//   if (PIPET_CONTAINER.hasAttribute("clicked")) {
//     emptyPipetStart();
//   }
// })
//
// document.querySelector('#rig').addEventListener('bbuttonup', function (e) {
//   bButtonHeld = false;
//   if (PIPET_CONTAINER.hasAttribute("clicked")) {
//     emptyPipetEnd();
//   }
// })

fillPipetStart = () => {
  if (!bButtonHeld && !aButtonHeld && grabbedObject) {
    startPipetFeedbackTimer = new Date();

    visualFeedbackInterval = setInterval(f => {
      let endPipetFeedbackTimer = new Date();
      deltaPipetFeedbackTimer = endPipetFeedbackTimer - startPipetFeedbackTimer;
      modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight + activeFeedbackBarHeight;
      // console.log("modified delta before: " + modifiedDeltaPipetFeedbackTimer);
      if (modifiedDeltaPipetFeedbackTimer < 0) {
        modifiedDeltaPipetFeedbackTimer = 0;
      } else if (modifiedDeltaPipetFeedbackTimer > .5) {
        modifiedDeltaPipetFeedbackTimer = .5;
      }
      // console.log("modified delta after: " + modifiedDeltaPipetFeedbackTimer);
      // modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight;
      PIPET_FEEDBAR.setAttribute("height", modifiedDeltaPipetFeedbackTimer);
      PIPET_FEEDBAR.setAttribute("position", "-.06 " + ((modifiedDeltaPipetFeedbackTimer/2)-0.225) + " .03");
    }, INTERVAL_FREQ);
  }
}

fillPipetEnd = () => {
  activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/6000;
  if (activeFeedbackBarHeight > .5) {
    activeFeedbackBarHeight = .5
  }
  // console.log("active height fill end: " + activeFeedbackBarHeight);
  clearInterval(visualFeedbackInterval);
}

emptyPipetStart = () => {
  if (!aButtonHeld && !bButtonHeld && grabbedObject) {
    startPipetFeedbackTimer = new Date();

    visualFeedbackInterval = setInterval(f => {
      let endPipetFeedbackTimer = new Date();
      deltaPipetFeedbackTimer = -(endPipetFeedbackTimer - startPipetFeedbackTimer);
      modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight + activeFeedbackBarHeight;
      if (modifiedDeltaPipetFeedbackTimer < 0) {
        modifiedDeltaPipetFeedbackTimer = 0;
      } else if (modifiedDeltaPipetFeedbackTimer > .5) {
        modifiedDeltaPipetFeedbackTimer = .5;
      }
      PIPET_FEEDBAR.setAttribute("height", modifiedDeltaPipetFeedbackTimer);
      PIPET_FEEDBAR.setAttribute("position", "-.06 " + ((modifiedDeltaPipetFeedbackTimer/2)-0.225) + " .03");
    }, INTERVAL_FREQ);
  }
}

emptyPipetEnd = () => {
  activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/6000;
  if (activeFeedbackBarHeight < 0) {
    activeFeedbackBarHeight = 0
  }
  clearInterval(visualFeedbackInterval);
}

// }
