
//==================== PIPET STUFF
const PIPET_FEEDBAR = document.getElementById('js--pipet-feedbar');
// const PIPET = document.getElementById('js--pipet');
const PIPET_CONTAINER = document.getElementById('js--pipet-container-2');
const GRABBABLES = document.getElementsByClassName('grabbable');

let startPipetFeedbackTimer;
let deltaPipetFeedbackTimer = 0;
let visualFeedbackInterval;
let initialFeedbackBarHeight = 0;
let activeFeedbackBarHeight = 0;
let modifiedDeltaPipetFeedbackTimer;

let aButtonHeld = false;
let bButtonHeld = false;

let dropletSound = new Audio("drop.mp3");
console.log(GRABBABLES.length);

// for (let i = 0; i < GRABBABLES.length; i++) {
  document.addEventListener('keydown', function (e) {

  // let ID = GRABBABLES[i].id;
  let ID = GRABBABLES[0].id;
  console.log("keydown");

  switch (ID) {
    case "js--pipet-container-2":
      if (event.keyCode == 71 ) {
        fillPipetStart();
      } else if (event.keyCode == 72 ) {
        emptyPipetStart();
      }
      break;

    case "js--other-grabbables":
      //FUNCTION
      break;
    default:

  }

    // document.getElementById('rig').addEventListener('keydown', function (e) {
    //   aButtonHeld = true;
    //   fillPipetStart();
    // })
    // document.getElementById('rig').addEventListener('bbuttondown', function (e) {
    //   // alert("b button pressed")
    //   bButtonHeld = true;
    //   emptyPipetStart();
    // })
    // document.getElementById('rig').addEventListener('abuttonup', function (e) {
    //   // alert("abutton released")
    //   aButtonHeld = false;
    //   fillPipetEnd();
    // })
    // document.getElementById('rig').addEventListener('bbuttonup', function (e) {
    //   bButtonHeld = false;
    //   emptyPipetEnd();
    // })

  });
// }
//============================== OCULUS
// document.getElementById('js--pipet-container-2').addEventListener('grab-start', function (e) {
// //  aButtonHeld = true;
//   // alert("hello");
//
//       document.getElementById('rig').addEventListener('abuttondown', function (e) {
//         aButtonHeld = true;
//         fillPipetStart();
//       })
//       document.getElementById('rig').addEventListener('bbuttondown', function (e) {
//         // alert("b button pressed")
//         bButtonHeld = true;
//         emptyPipetStart();
//       })
//       document.getElementById('rig').addEventListener('abuttonup', function (e) {
//         // alert("abutton released")
//         aButtonHeld = false;
//         fillPipetEnd();
//       })
//       document.getElementById('rig').addEventListener('bbuttonup', function (e) {
//         bButtonHeld = false;
//         emptyPipetEnd();
//       })
//
// })

fillPipetStart = () => {
  if (!bButtonHeld) {
    startPipetFeedbackTimer = new Date();

    visualFeedbackInterval = setInterval(f => {
      let endPipetFeedbackTimer = new Date();
      deltaPipetFeedbackTimer = endPipetFeedbackTimer - startPipetFeedbackTimer;
      modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight + activeFeedbackBarHeight;
      if (modifiedDeltaPipetFeedbackTimer > 2) {
        modifiedDeltaPipetFeedbackTimer = 2;
      }
      // modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight;
      PIPET_FEEDBAR.setAttribute("height", modifiedDeltaPipetFeedbackTimer);
      PIPET_FEEDBAR.setAttribute("position", "-.06 " + ((modifiedDeltaPipetFeedbackTimer/2)-0.225) + " -.03");
    }, 50);
  }
}

fillPipetEnd = () => {
  activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/6000;
  clearInterval(visualFeedbackInterval);
}

emptyPipetStart = () => {
  if (!aButtonHeld) {
    startPipetFeedbackTimer = new Date();

    visualFeedbackInterval = setInterval(f => {
      let endPipetFeedbackTimer = new Date();
      deltaPipetFeedbackTimer = -(endPipetFeedbackTimer - startPipetFeedbackTimer);
      modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight + activeFeedbackBarHeight;
      if (modifiedDeltaPipetFeedbackTimer < 0) {
        modifiedDeltaPipetFeedbackTimer = 0;
      }
      PIPET_FEEDBAR.setAttribute("height", modifiedDeltaPipetFeedbackTimer);
      PIPET_FEEDBAR.setAttribute("position", "-.06 " + ((modifiedDeltaPipetFeedbackTimer/2)-0.225) + " -.03");
    }, 50);
  }
}

emptyPipetEnd = () => {
  activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/6000;
  clearInterval(visualFeedbackInterval);
}
