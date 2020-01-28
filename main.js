
// const SAFETY_GOGGLE = document.getElementById('js--bril');
// const LAB_COAT = document.getElementById('js--labcoat');
// // const GUI_RADIO = document.getElementById('js--gui-radio');
// // const GUI_RADIO_SECOND = document.getElementById('js--gui-radio-second');
//
// var goggleOnHead = false
// var labCoatOn = false;

// AFRAME.registerComponent('test-tube', {
//       play: function() {
//         this.el.addEventListener('dragover-start', function(evt) {
//           // evt.detail.dropped.setAttribute('material', 'color',
//           //   '#'+(Math.random()*0xFFFFFF<<0).toString(16s))
//           //  // notify super-hands that the gesture was accepted
//           // evt.preventDefault()
//         })
//       }
//     })

//==================== CHEMISTRY API STUFF
const BASE_URL = "https://neelpatel05.pythonanywhere.com"
const ELEMENT_NUMBER = document.getElementById('js--element-number')
const ELEMENT_SYMBOL = document.getElementById('js--element-symbol')
const ELEMENT_NAME = document.getElementById('js--element-name')
const ELEMENT_MASS = document.getElementById('js--element-mass')

fetchApiData = () => {
  let randomElement = Math.floor(Math.random()* 118);
  fetch( BASE_URL )
  .then( (data) => {
    return data.json();
  })
  .then( (response) => {
    // AFRAME.log(response[randomElement]);
    ELEMENT_NUMBER.setAttribute("value", response[randomElement].atomicNumber)
    ELEMENT_SYMBOL.setAttribute("value", response[randomElement].symbol)
    ELEMENT_NAME.setAttribute("value", response[randomElement].name)
    ELEMENT_MASS.setAttribute("value", response[randomElement].atomicMass)
  });
}

fetchApiData();

//==================== PIPET STUFF
const PIPET_FEEDBAR = document.getElementById('js--pipet-feedbar');
const PIPET_CONTAINER = document.getElementById('js--pipet-container');
const PIPET_COLISION_BOX = document.getElementById('js--pipet-colision-box');
const TEST_CYLINDER_SUCC = document.getElementById('js--test-cylinder-succ');
const TEST_CYLINDER_FILL = document.getElementById('js--test-cylinder-fill');

const GRABBABLES = document.getElementsByClassName('js--grabbable')
// console.log(GRABBABLES.length)
// AFRAME.log("aantal grabbables: " + GRABBABLES.length);
AFRAME.log("dit is hoe je dingen logt :^)");

document.getElementById('cube').addEventListener('hoveron', function(evt) {
  alert("DROPPED");
})

document.getElementById('lefthand').addEventListener('thumbupstart', function(evt) {

})


const INTERVAL_FREQ = 100;

let startPipetFeedbackTimer;
let deltaPipetFeedbackTimer = 0;
let visualFeedbackInterval;
let initialFeedbackBarHeight = 0;
let activeFeedbackBarHeight = 0;
let modifiedDeltaPipetFeedbackTimer;
let fillCylinderRatio = 0;
let succRatio = 0;

let aButtonHeld = false;
let bButtonHeld = false;
let grabbedObject = false;

let dropletSound = new Audio("drop.mp3");

let randomThreshhold = (Math.floor(Math.random()* 20))/100
AFRAME.log("random pipeteer threshhold: " + (randomThreshhold + 0.01))


//https://github.com/harlyq/aframe-sprite-particles-component#properties
//Flame
var fireElemnt =   document.getElementById("fire");
//

  document.getElementById("ruizendevlam").addEventListener('click', function(evnt){
    fireElemnt.setAttribute("sprite-particles",{enable:true}); //kan je het gelehe element mee aan en uit zetten
      fireElemnt.pause(); //Nodig om het element te kunnen veranderen.
        fireElemnt.setAttribute("sprite-particles",{color:"darkblue,black,black"});//Set de kleurvan de vlam
        fireElemnt.setAttribute("sprite-particles",{scale:"0..1,2..2"}); //scale van de vlam (0..1) = onderkantlamdikte en (2..2) = bovenkantvlamdikte
        fireElemnt.setAttribute("sprite-particles",{textureCount:3});//wat dikte
      fireElemnt.play();//Nodig om het element te kunnen starten.
  });

  document.getElementById("pauzevlam").addEventListener('click', function(evnt){
      fireElemnt.setAttribute("sprite-particles",{enable:true});
      fireElemnt.pause();
        fireElemnt.setAttribute("sprite-particles",{color:"black,black,white,white,white"});
        fireElemnt.setAttribute("sprite-particles",{scale:"0..1,1..3"});
        fireElemnt.setAttribute("sprite-particles",{textureCount:0});
      fireElemnt.play();
  });


  document.getElementById("blauwevlam").addEventListener('click', function(evnt){
    fireElemnt.setAttribute("sprite-particles",{enable:true});
      fireElemnt.pause();
        fireElemnt.setAttribute("sprite-particles",{color:"mediumblue,mediumblue,mediumblue,black"});
        fireElemnt.setAttribute("sprite-particles",{textureCount:0});
        fireElemnt.setAttribute("sprite-particles",{scale:"0..1,2..2"});
      fireElemnt.play();
  });


  document.getElementById("uitzettenVlam").addEventListener('click', function(evnt){
    fireElemnt.setAttribute("sprite-particles",{enable:false});
  });




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
        document.getElementById('cameraRig').addEventListener('abuttondown', function (e) {
          fillPipetStart(TEST_CYLINDER_SUCC);
          aButtonHeld = true;
        })
        document.getElementById('cameraRig').addEventListener('bbuttondown', function (e) {
          // alert("b button pressed")
          emptyPipetStart(TEST_CYLINDER_FILL);
          bButtonHeld = true;
        })
        document.getElementById('cameraRig').addEventListener('abuttonup', function (e) {
          // alert("abutton released")
          aButtonHeld = false;
          fillPipetEnd();
        })
        document.getElementById('cameraRig').addEventListener('bbuttonup', function (e) {
          bButtonHeld = false;
          emptyPipetEnd();
        })
        break;

      case "js--labcoat" || "js--bril":
        document.getElementById('cameraRig').addEventListener('abuttondown', function (e) {

          aButtonHeld = true;
        })
        document.getElementById('cameraRig').addEventListener('bbuttondown', function (e) {

          bButtonHeld = true;
        })
        document.getElementById('cameraRig').addEventListener('abuttonup', function (e) {
          aButtonHeld = false;
          GRABBABLES[i].remove()
        })
        document.getElementById('cameraRig').addEventListener('bbuttonup', function (e) {
          bButtonHeld = false;
          GRABBABLES[i].remove()
        })
        break;

      // case "js--bril":
      //   document.getElementById('rig').addEventListener('abuttondown', function (e) {
      //
      //     aButtonHeld = true;
      //   })
      //   document.getElementById('rig').addEventListener('bbuttondown', function (e) {
      //
      //     bButtonHeld = true;
      //   })
      //   document.getElementById('rig').addEventListener('abuttonup', function (e) {
      //     aButtonHeld = false;
      //
      //   })
      //   document.getElementById('rig').addEventListener('bbuttonup', function (e) {
      //     bButtonHeld = false;
      //
      //   })
      //   break;
      //
      // default:

    }

  })

  GRABBABLES[i].addEventListener('grab-end', function (e) {
    grabbedObject = false;
  })
}

fillPipetStart = (substance) => {
  if (!bButtonHeld && !aButtonHeld && grabbedObject) {
    startPipetFeedbackTimer = new Date();

    visualFeedbackInterval = setInterval(f => {
      let endPipetFeedbackTimer = new Date();
      deltaPipetFeedbackTimer = endPipetFeedbackTimer - startPipetFeedbackTimer;
      modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight + activeFeedbackBarHeight;
      // console.log("modified delta before: " + modifiedDeltaPipetFeedbackTimer);
      if (modifiedDeltaPipetFeedbackTimer <= 0) {
        modifiedDeltaPipetFeedbackTimer = .0001;
      } else if (modifiedDeltaPipetFeedbackTimer > .5) {
        modifiedDeltaPipetFeedbackTimer = .5;
      }
      // console.log("modified delta after: " + modifiedDeltaPipetFeedbackTimer);
      // modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight;
      PIPET_FEEDBAR.setAttribute("height", modifiedDeltaPipetFeedbackTimer);
      PIPET_FEEDBAR.setAttribute("position", "-.06 " + ((modifiedDeltaPipetFeedbackTimer/2)-0.225) + " .03");

      succRatio = succRatio + .005
      // AFRAME.log(substance.getAttribute("height"))
      substance.setAttribute("height", (.25-succRatio));
      substance.setAttribute("position", "0 " + -(succRatio/2)+0.110 + " 0");
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

      if (modifiedDeltaPipetFeedbackTimer <= 0) {
        modifiedDeltaPipetFeedbackTimer = 0.001;
      } else if (modifiedDeltaPipetFeedbackTimer > .5) {
        modifiedDeltaPipetFeedbackTimer = .5;
      }
      // console.log("modified delta after: " + modifiedDeltaPipetFeedbackTimerFill);
      PIPET_FEEDBAR.setAttribute("height", modifiedDeltaPipetFeedbackTimer);
      PIPET_FEEDBAR.setAttribute("position", "-.06 " + ((modifiedDeltaPipetFeedbackTimer/2)-0.225) + " .03");

      fillCylinderRatio = fillCylinderRatio + .005

      substance.setAttribute("height", (.001+ fillCylinderRatio));
      substance.setAttribute("position", "0 " + ((fillCylinderRatio/2)-0.110) + " 0");

    }, INTERVAL_FREQ);
  }
}

emptyPipetEnd = () => {
  clearInterval(visualFeedbackInterval);
  activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/6000;
  if (activeFeedbackBarHeight <= 0) {
    activeFeedbackBarHeight = .0001
  }

  AFRAME.log(TEST_CYLINDER_FILL.getAttribute("height"))
  let filledJuice = TEST_CYLINDER_FILL.getAttribute("height")
  AFRAME.log("pipet fill threshhold minimum: " + randomThreshhold)
  if (randomThreshhold > filledJuice > randomThreshhold+0.01) {
    AFRAME.log("you filled the test tube correctly, pass!" + randomThreshhold + " - " + filledJuice)
  } else {
    AFRAME.log("sorry but you failed, failure!" + randomThreshhold + " - " + filledJuice)
  }
  // console.log(deltaPipetFeedbackTimer);
}
