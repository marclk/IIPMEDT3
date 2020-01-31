// window.onload = function () {
//==================== PIPET STUFF
const PIPET_FEEDBAR = document.getElementById('js--pipet-feedbar');
const PIPET_CONTAINER = document.getElementById('js--pipet-container');
const TEST_CYLINDER_SUCC = document.getElementById('js--test-cylinder-succ');
const TEST_CYLINDER_FILL = document.getElementById('js--test-cylinder-fill');

const INTERVAL_FREQ = 100;

let startPipetFeedbackTimer;
let deltaPipetFeedbackTimer = 0;
let visualFeedbackInterval;
let initialFeedbackBarHeight = 0;
let activeFeedbackBarHeight = null;
let modifiedDeltaPipetFeedbackTimer;
let fillCylinderRatio = 0;

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
    fillPipetStart(TEST_CYLINDER_SUCC);
    aButtonHeld = true;
  }

});

document.addEventListener('gamepadbuttondown', function (e) {
  // console.log(e.detail.index);

  if (e.detail.index == 1) {
    emptyPipetStart(TEST_CYLINDER_FILL);
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

fillPipetStart = (substance) => {
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
      substance.setAttribute("scale", ".02 " + (1-(modifiedDeltaPipetFeedbackTimer)) + " .02");
      substance.setAttribute("position", "0 " + (.5-(modifiedDeltaPipetFeedbackTimer/2)) + " -2");
    }, INTERVAL_FREQ);
  }
}

fillPipetEnd = () => {
  clearInterval(visualFeedbackInterval);
  activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/6000;
  if (activeFeedbackBarHeight > .5) {
    activeFeedbackBarHeight = .5
  }
  console.log(deltaPipetFeedbackTimer);
  // console.log("active height fill end: " + activeFeedbackBarHeight);
}

emptyPipetStart = (substance) => {
  if (!aButtonHeld && !bButtonHeld && grabbedObject) {
    startPipetFeedbackTimer = new Date();

    visualFeedbackInterval = setInterval(f => {
      let endPipetFeedbackTimer = new Date();
      deltaPipetFeedbackTimer = -(endPipetFeedbackTimer - startPipetFeedbackTimer);
      deltaPipetFeedbackTimerFill = endPipetFeedbackTimer - startPipetFeedbackTimer;

      modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight + activeFeedbackBarHeight;
      // modifiedDeltaPipetFeedbackTimerFill = (deltaPipetFeedbackTimerFill/6000) + initialFeedbackBarHeight + activeFeedbackBarHeight;

      // console.log("delta empty: " + deltaPipetFeedbackTimerFill);

      if (modifiedDeltaPipetFeedbackTimer < 0) {
        modifiedDeltaPipetFeedbackTimer = 0;
      } else if (modifiedDeltaPipetFeedbackTimer > .5) {
        modifiedDeltaPipetFeedbackTimer = .5;
      }
      // console.log("modified delta after: " + modifiedDeltaPipetFeedbackTimerFill);
      PIPET_FEEDBAR.setAttribute("height", modifiedDeltaPipetFeedbackTimer);
      PIPET_FEEDBAR.setAttribute("position", "-.06 " + ((modifiedDeltaPipetFeedbackTimer/2)-0.225) + " .03");

      fillCylinderRatio = fillCylinderRatio + .02

      substance.setAttribute("scale", ".02 " + (.001+ (fillCylinderRatio)) + " .02");
      substance.setAttribute("position", "-.5 " + (fillCylinderRatio/2) + " -2");

    }, INTERVAL_FREQ);
  }
}

emptyPipetEnd = () => {
  clearInterval(visualFeedbackInterval);
  activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/6000;
  if (activeFeedbackBarHeight < 0) {
    activeFeedbackBarHeight = 0
  }
  console.log(deltaPipetFeedbackTimer);
}

// }
