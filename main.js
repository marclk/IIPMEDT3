
// const SAFETY_GOGGLE = document.getElementById('js--bril');
// const LAB_COAT = document.getElementById('js--labcoat');
// // const GUI_RADIO = document.getElementById('js--gui-radio');
// // const GUI_RADIO_SECOND = document.getElementById('js--gui-radio-second');
//
// var goggleOnHead = false
// var labCoatOn = false;

//==================== PIPET STUFF
const PIPET_FEEDBAR = document.getElementById('js--pipet-feedbar');
// const PIPET = document.getElementById('js--pipet');
const PIPET_CONTAINER = document.getElementById('js--pipet-container');
const GRABBABLES = document.getElementsByClassName('js--grabbable')

let startPipetFeedbackTimer;
let deltaPipetFeedbackTimer = 0;
let visualFeedbackInterval;
let initialFeedbackBarHeight = 0;
let activeFeedbackBarHeight = 0;
let modifiedDeltaPipetFeedbackTimer;

let aButtonHeld = false;
let bButtonHeld = false;
let grabbedObject = false;

let dropletSound = new Audio("drop.mp3");

//===================== ROEL'S COAT N GOGGGGGLES
//
// SAFETY_GOGGLE.addEventListener('click', function(evnt){
//   console.log("Im registerd!!!");
//  //this.remove();
//   // GUI_RADIO.click();
//   // GUI_RADIO.click();
//   // goggleOnHead = true;
//   // this.removeAttribute("gui-interactable");
//   // this.setAttribute("visible","false");
//   // checkIfSafetyIsGood(labCoatOn,goggleOnHead);
//   this.remove();
//
//
// });
//
// LAB_COAT.addEventListener('click', function(evnt){
//   console.log("Im registerd!!!");
//   //this.remove();
//   // GUI_RADIO_SECOND.click();
//   labCoatOn = true;
//   // this.removeAttribute("gui-interactable");
//   // this.setAttribute("visible","false");
//   // checkIfSafetyIsGood(labCoatOn,goggleOnHead);
//
// });
//
// }
//
//
// function checkIfSafetyIsGood(labCoatOn,goggleOnHead){
//
//
//
//
//   if(labCoatOn === true && goggleOnHead === true){
//     console.log("jeej safety");
//
//       setTimeout(function(){
//         document.getElementById("js--clipBoard").firstElementChild.remove();
//         document.getElementById("js--clipboardContent").setAttribute("position", {z:0,y:0,x:0});
//       }, 1000);
//
//
//
//
//   }else{
//     console.log("not yet");
//   }

//===================== PIPET SCRIPT
for (let i = 0; i < GRABBABLES.length; i++) {
  GRABBABLES[i].addEventListener('grab-start', function (e) {
    grabbedObject = true;

    let ID = GRABBABLES[i].id;

    switch (ID) {
      case "js--pipet-container":

        document.getElementById('rig').addEventListener('abuttondown', function (e) {
          fillPipetStart();
          aButtonHeld = true;
        })
        document.getElementById('rig').addEventListener('bbuttondown', function (e) {
          // alert("b button pressed")
          emptyPipetStart();
          bButtonHeld = true;
        })
        document.getElementById('rig').addEventListener('abuttonup', function (e) {
          // alert("abutton released")
          aButtonHeld = false;
          fillPipetEnd();
        })
        document.getElementById('rig').addEventListener('bbuttonup', function (e) {
          bButtonHeld = false;
          emptyPipetEnd();
        })
        break;

      case "js--labjas":
        break;
      // default:

    }

  })

  GRABBABLES[i].addEventListener('grab-end', function (e) {
    grabbedObject = false;
  })
}

fillPipetStart = () => {
  if (!bButtonHeld && !aButtonHeld && grabbedObject) {
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
  }
}

fillPipetEnd = () => {
  // activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/6000;
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
      }
      PIPET_FEEDBAR.setAttribute("height", modifiedDeltaPipetFeedbackTimer);
      PIPET_FEEDBAR.setAttribute("position", "-.06 " + ((modifiedDeltaPipetFeedbackTimer/2)-0.225) + " .03");
    }, 50);
  }
}

emptyPipetEnd = () => {
  // activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/6000;
  clearInterval(visualFeedbackInterval);
}
