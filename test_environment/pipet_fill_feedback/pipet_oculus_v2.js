// window.onload = function () {
//==================== PIPET STUFF
const PIPET_FEEDBAR = document.getElementById('js--pipet-feedbar');
// const PIPET = document.getElementById('js--pipet');
const PIPET_CONTAINER = document.getElementById('js--pipet-container');

let startPipetFeedbackTimer;
let deltaPipetFeedbackTimer = 0;
let visualFeedbackInterval;
let initialFeedbackBarHeight = 0;
let activeFeedbackBarHeight = 0;
let modifiedDeltaPipetFeedbackTimer;

let aButtonHeld = false;
let bButtonHeld = false;

let dropletSound = new Audio("drop.mp3");


document.getElementById('js--pipet-container-2').addEventListener('grab-start', function (e) {

      document.getElementById('rig').addEventListener('abuttondown', fillPipetStart()})

      document.getElementById('rig').addEventListener('bbuttondown', emptyPipetStart()})

      document.getElementById('rig').addEventListener('abuttonup', fillPipetEnd()})

      document.getElementById('rig').addEventListener('bbuttonup', emptyPipetEnd()})

})

getElementById('js--pipet-container-2').addEventListener('grab-end', function (e) {

      document.getElementById('rig').removeEventlistener('abuttondown', fillPipetStart()})

      document.getElementById('rig').removeEventlistener('bbuttondown', emptyPipetStart()})

      document.getElementById('rig').removeEventlistener('abuttonup', fillPipetEnd()})

      document.getElementById('rig').removeEventlistener('bbuttonup', emptyPipetEnd()})

})

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
  if (!bButtonHeld && !aButtonHeld) {
    startPipetFeedbackTimer = new Date();

    visualFeedbackInterval = setInterval(f => {
      let endPipetFeedbackTimer = new Date();
      deltaPipetFeedbackTimer = endPipetFeedbackTimer - startPipetFeedbackTimer;
      modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight + activeFeedbackBarHeight;
      if (modifiedDeltaPipetFeedbackTimer > .5) {
        modifiedDeltaPipetFeedbackTimer = .5;
      }
      // modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight;
      PIPET_FEEDBAR.setAttribute("height", modifiedDeltaPipetFeedbackTimer);
      PIPET_FEEDBAR.setAttribute("position", "-.06 " + ((modifiedDeltaPipetFeedbackTimer/2)-0.225) + " .03");
    }, 50);
    aButtonHeld = true;
  }
}

fillPipetEnd = () => {
  clearInterval(visualFeedbackInterval);
  aButtonHeld = false;
  activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/6000;
}

emptyPipetStart = () => {
  if (!aButtonHeld && !bButtonHeld) {
    startPipetFeedbackTimer = new Date();

    visualFeedbackInterval = setInterval(f => {
      let endPipetFeedbackTimer = new Date();
      deltaPipetFeedbackTimer = -(endPipetFeedbackTimer - startPipetFeedbackTimer);
      modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight + activeFeedbackBarHeight;
      if (modifiedDeltaPipetFeedbackTimer < 0) {
        modifiedDeltaPipetFeedbackTimer = 0;
      }
      PIPET_FEEDBAR.setAttribute("height", modifiedDeltaPipetFeedbackTimer);
      PIPET_FEEDBAR.setAttribute("position", "-.06 " + ((modifiedDeltaPipetFeedbackTimer/2)-0.225) + " .03");
    }, 50);
    bButtonHeld = true;
  }
}

emptyPipetEnd = () => {
  // activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/6000;
  clearInterval(visualFeedbackInterval);
  bButtonHeld = false;
}

// }
