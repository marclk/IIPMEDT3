var meltingPoint = 0;

var isDonePippeteren = false;
var isDoneAfval = false;
var isDoneBrander = false;

var correctSound =   document.getElementById("js--correctSound");
var completeSound =   document.getElementById("js--completeSound");




function checkIfeveryThingIsDone(){
  if(isDonePippeteren == true && isDoneAfval == true && isDoneBrander == true){
    document.getElementById("lockt-box").remove();
    completeSound.components.sound.playSound();
     document.getElementById("Bronvermelding").setAttribute("visible","true");


  }
}


//==================== CHEMISTRY API STUFF
const BASE_URL = "https://neelpatel05.pythonanywhere.com"
const ELEMENT_NUMBER = document.getElementById('js--element-number')
const ELEMENT_SYMBOL = document.getElementById('js--element-symbol')
const ELEMENT_NAME = document.getElementById('js--element-name')
const ELEMENT_MASS = document.getElementById('js--element-mass')
// var randomElement = Math.floor(Math.random()* 118);

fetchApiData = () => {
  // randomElement = Math.floor(Math.random()* 118);
  let randomElement = Math.floor(Math.random()* 118);
  fetch( BASE_URL )
  .then( (data) => {
    return data.json();
  })
  .then( (response) => {
    // AFRAME.log(response[randomElement]);
    ELEMENT_NUMBER.setAttribute("value", response[randomElement].name)
    ELEMENT_SYMBOL.setAttribute("value", response[randomElement].meltingPoint + " K")
    meltingPoint = response[randomElement].meltingPoint;
    if(response[randomElement].meltingPoint < 800){
      fetchApiData();
    }

    // ELEMENT_NAME.setAttribute("value", response[randomElement].standardState)
  });
}

fetchApiData();

//==================== PIPET STUFF
// const PIPET_FEEDBAR = document.getElementById('js--pipet-feedbar')
const PIPET_CONTAINER = document.getElementById('js--pipet-container')
const PIPET_COLISION_BOX = document.getElementById('js--pipet-colision-box')
const TEST_CYLINDER_SUCC = document.getElementById('js--test-cylinder-succ')
const TEST_CYLINDER_FILL = document.getElementById('js--test-cylinder-fill')
const THRESHHOLD_METER = document.getElementById('js--threshhold-meter')


// =============== HONOURABLE MENTION THOUGH

AFRAME.log("dit is hoe je dingen logt :^)");

document.getElementById('cube').addEventListener('hoveron', function(evt) {
  alert("DROPPED");
})

document.getElementById('righthand').addEventListener('thumbrightstart', function(event) {
  // AFRAME.log("Right thumbstick");
  let head = document.getElementById('cameraRig');
  //let position = document.getElementById('cameraRig').getAttribute("rotation");
  document.getElementById('cameraRig').setAttribute('rotation', {x: head.getAttribute("rotation").x,  y: (head.getAttribute("rotation").y - 45), z: head.getAttribute("rotation").z });
});
document.getElementById('righthand').addEventListener('thumbleftstart', function(event) {
  // AFRAME.log("Right thumbstick");
  let head = document.getElementById('cameraRig');
  //let position = document.getElementById('cameraRig').getAttribute("rotation");
  document.getElementById('cameraRig').setAttribute('rotation', {x: head.getAttribute("rotation").x,  y: (head.getAttribute("rotation").y + 45), z: head.getAttribute("rotation").z });
});



var isactive = false;
document.getElementById('lefthand').addEventListener('ybuttonup', function(event) {
  if(isactive == false){
    document.getElementById("objectives").setAttribute("visible",true);
    isactive = true;
  }else{
    document.getElementById("objectives").setAttribute("visible",false);
    isactive = false;
  }


});



const INTERVAL_FREQ = 100;

let startPipetFeedbackTimer;
let deltaPipetFeedbackTimer = 0;
let visualFeedbackInterval;
let initialFeedbackBarHeight = 0;
let activeFeedbackBarHeight = 0;
let modifiedDeltaPipetFeedbackTimer;
let fillCylinderRatio = 0;
let succCylinderRatio = 0;

let aButtonHeld = false;
let bButtonHeld = false;
let grabbedObject = false;
let hoveringOverTube = false;

let dropletSound = new Audio("drop.mp3");


//================================ F I R E
var fireElemnt =   document.getElementById("fire");
var labcoatAan = false;
var brilAan = false;


document.getElementById("js--labcoat").addEventListener('click', function(evnt){
  document.getElementById("js--coatSound").components.sound.playSound();

  this.remove();
  labcoatAan = true;
  testIfUserIsSafe()
    AFRAME.log("clicked labcoat");
});

document.getElementById("js--bril").addEventListener('click', function(evnt){
  document.getElementById("js--goggleSound").components.sound.playSound();
  this.remove();
  brilAan = true;
  testIfUserIsSafe()
  AFRAME.log("clicked Bril");
});

function testIfUserIsSafe(){
  if(labcoatAan === true && brilAan === true){
  document.getElementById("normalMesh").setAttribute("position",{z:0, y:4.124, x:0});
  document.getElementById("deur-dicht").remove();
  document.getElementById("doFirstPlane").remove();

  }
}


var continueTimeer = true;
var counterFlameNumber = 0;
var vlamAan = false;
const textField = document.getElementById('js--text-element');
textField.setAttribute('value', "-" + " K");


var roaringFlameEffect = document.getElementById("js--flameBlue");
var pauseFlameEffect = document.getElementById("js--flamePauze");



document.getElementById("nextButtonFlame").addEventListener('click', function(evnt){
  changeTempWithInterval("plus");
});

document.getElementById("previousButtonFlame").addEventListener('click', function(evnt){
  changeTempWithInterval("minus");
});


var tellerWelkeVlam = 300, time = 1000;
function changeTempWithInterval(direction) {
    setTimeout(function () {
      if(continueTimeer == false || vlamAan === false){
        return;
      }

      if(continueTimeer === true && direction === "plus" && vlamAan === true){
            tellerWelkeVlam += 50;
            textField.setAttribute('value', tellerWelkeVlam + " K");
            checkFlameNumber(tellerWelkeVlam );
            textField.setAttribute("color","white");
            //changeTempWithInterval("plus");
      }
      if(continueTimeer === true && direction === "minus" && vlamAan === true){
        if(tellerWelkeVlam < 525){
            tellerWelkeVlam = 523;
        }else{
          tellerWelkeVlam -= 50;

        }
            textField.setAttribute('value', tellerWelkeVlam + " K");
            checkFlameNumber(tellerWelkeVlam);
            textField.setAttribute("color","white");
      }
    }, 500);
};

function checkFlameNumber(tellerWelkeVlam){
  if(tellerWelkeVlam > 523 && tellerWelkeVlam < 1273 ){

    console.log("pauzevlam");
    setFlameNumber(1);
  }
  if(tellerWelkeVlam > 1273 && tellerWelkeVlam < 1473 ){
    console.log("blauwevlam");
    setFlameNumber(2);
  }
  if(tellerWelkeVlam > 1473 && tellerWelkeVlam < 1773 ){
    roaringFlameEffect.components.sound.playSound();
    pauseFlameEffect.components.sound.stopSound();
      console.log("ruisvlam");
    setFlameNumber(3);
  }
}


function setFlameNumber(counterFlameNumberCount){
  fireElemnt.pause();
  fireElemnt.setAttribute("sprite-particles",{enable:true});
switch(counterFlameNumberCount) {
    case 1:
    //pauze
    fireElemnt.setAttribute("sprite-particles",{color:"black,black,white,white,white"});
    fireElemnt.setAttribute("sprite-particles",{scale:"0..1,1..3"});
    fireElemnt.setAttribute("sprite-particles",{textureCount:0});
      break;
    case 2:
    //blauw
      fireElemnt.setAttribute("sprite-particles",{color:"mediumblue,mediumblue,mediumblue,black"});
      fireElemnt.setAttribute("sprite-particles",{textureCount:0});
      fireElemnt.setAttribute("sprite-particles",{scale:"0..1,2..2"});
    break;
    case 3:
    //ruis
      fireElemnt.setAttribute("sprite-particles",{color:"darkblue,black,black"});//Set de kleurvan de vlam
      fireElemnt.setAttribute("sprite-particles",{scale:"0..1,2..2"}); //scale van de vlam (0..1) = onderkantlamdikte en (2..2) = bovenkantvlamdikte
      fireElemnt.setAttribute("sprite-particles",{textureCount:3});//wat dikte
    break;
    default:
      // code block
  }
  fireElemnt.play();


}


var vlamStaatAan = false;
  document.getElementById("aanzettenVlam").addEventListener('click', function(evnt){
    let vlamAanUitLabel = document.getElementById("vlamAanUitLabel");

    if(vlamStaatAan == false){
      roaringFlameEffect.components.sound.stopSound();
      pauseFlameEffect.components.sound.stopSound();
      pauseFlameEffect.components.sound.playSound();
      vlamAanUitLabel.setAttribute("value","Uit");
      vlamStaatAan= true;
      textField.setAttribute('value', "523" + " K");
      tellerWelkeVlam = 523;
      vlamAan = true;
      fireElemnt.setAttribute("sprite-particles",{enable:true});
      textField.setAttribute("color","white");
    }else{
      roaringFlameEffect.components.sound.stopSound();
      pauseFlameEffect.components.sound.stopSound();
      vlamAanUitLabel.setAttribute("value","Aan");
      vlamStaatAan=false;
      textField.setAttribute('value', "-" + " K");
      tellerWelkeVlam = 523;
      vlamAan = false;
      fireElemnt.setAttribute("sprite-particles",{enable:false});
    }


  });

  document.getElementById("checkVlam").addEventListener('click', function(evnt){
    let valueBrander = parseInt(textField.getAttribute('value'), 10);
    let checkBLock = document.getElementById("checkVlam");


      if(valueBrander > (meltingPoint - 100) && valueBrander < (meltingPoint + 100)){
        AFRAME.log("Goed");
        textField.setAttribute("color","green");
        checkBLock.setAttribute("color","green");
        document.getElementById("branderLabelAboveTable").setAttribute("color","green");
        document.getElementById("branderLabelHand").setAttribute("color","green");
        document.getElementById("branderlabelToDoList").remove();
        roaringFlameEffect.components.sound.stopSound();
        pauseFlameEffect.components.sound.stopSound();
        isDoneBrander = true;
        correctSound.components.sound.playSound();
        checkIfeveryThingIsDone();

      }else{
        textField.setAttribute("color","red");
        checkBLock.setAttribute("color","red");
        document.getElementById("branderLabelAboveTable").setAttribute("color","red");
        document.getElementById("branderLabelHand").setAttribute("color","red");

        AFRAME.log("Not goed "+meltingPoint);
        AFRAME.log("Not goed "+valueBrander);
      }
  });




//================================= I N F O  B U T T O // NOTE:
var inforBUttons = document.getElementsByClassName("infoButton");
var panels = document.getElementsByClassName("objectivesss");
var isAlreadySet = false;

for (let i = 0; i < inforBUttons.length; i++) {
  inforBUttons[i].addEventListener('click', function(evnt){
    if(isAlreadySet === false){

       panels[i].setAttribute("visible",true);

      inforBUttons[i].setAttribute("color","green");
      isAlreadySet = true;
    }
    else{

         panels[i].setAttribute("visible",false);
        inforBUttons[i].setAttribute("color","blue");
      isAlreadySet = false;
    }
    //console.log("Number " + i);
  });
};


//================================== B R A N D E R  A F S T E L L E N
// const textField = document.getElementById('js--text-element');
let tempCondities = true;
let startTimer;
let deltaFlame = 0;
let temperatureStepper;



//===================== PIPET SCRIPT

PIPET_CONTAINER.addEventListener('grab-start', function (e) {
  grabbedObject = true;

  document.getElementById('js--pipet-colision-box-succ').addEventListener('hover-start', function (evt) {
    hoveringOverTube = true;
    AFRAME.log("hovered over the succ test tube")
    document.getElementById('cameraRig').addEventListener('abuttondown', function (e) {
      fillPipetStart(TEST_CYLINDER_SUCC);
      aButtonHeld = true;
    })
    document.getElementById('cameraRig').addEventListener('abuttonup', function (e) {
      aButtonHeld = false;
      fillPipetEnd();
    })
  })
  document.getElementById('js--pipet-colision-box-fill').addEventListener('hover-start', function (evt) {
    hoveringOverTube = true;
    AFRAME.log("hovered over the fill test tube")
    document.getElementById('cameraRig').addEventListener('bbuttondown', function (e) {
      emptyPipetStart(TEST_CYLINDER_FILL);
      bButtonHeld = true;
    })

    document.getElementById('cameraRig').addEventListener('bbuttonup', function (e) {
      bButtonHeld = false;
      emptyPipetEnd();
    })
  })
  document.getElementById('js--pipet-colision-box-fill').addEventListener('hover-end', function (evt) {
    hoveringOverTube = false;
  })
  document.getElementById('js--pipet-colision-box-succ').addEventListener('hover-end', function (evt) {
    hoveringOverTube = false;
  })

})

PIPET_CONTAINER.addEventListener('grab-end', function (e) {
  grabbedObject = false;
})



fillPipetStart = (substance) => {
  if (!bButtonHeld && !aButtonHeld && grabbedObject && hoveringOverTube) {
    startPipetFeedbackTimer = new Date();

    visualFeedbackInterval = setInterval(f => {
      let endPipetFeedbackTimer = new Date();
      deltaPipetFeedbackTimer = endPipetFeedbackTimer - startPipetFeedbackTimer;
      modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight + activeFeedbackBarHeight;
      if (modifiedDeltaPipetFeedbackTimer <= 0) {
        modifiedDeltaPipetFeedbackTimer = .0001;
      } else if (modifiedDeltaPipetFeedbackTimer > .5) {
        modifiedDeltaPipetFeedbackTimer = .5;
      }
      succCylinderRatio = succCylinderRatio + .005

      if (succCylinderRatio >= .5) {
        succCylinderRatio = .5
      }

      substance.setAttribute("height", (.25-succCylinderRatio));
      substance.setAttribute("position", "0 " + -(succCylinderRatio/2)+0.110 + " 0");
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
  if (!aButtonHeld && !bButtonHeld && grabbedObject && hoveringOverTube) {
    startPipetFeedbackTimer = new Date();

    visualFeedbackInterval = setInterval(f => {
      let endPipetFeedbackTimer = new Date();
      deltaPipetFeedbackTimer = -(endPipetFeedbackTimer - startPipetFeedbackTimer);
      deltaPipetFeedbackTimerFill = endPipetFeedbackTimer - startPipetFeedbackTimer;

      modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/6000) + initialFeedbackBarHeight + activeFeedbackBarHeight;

      if (modifiedDeltaPipetFeedbackTimer <= 0) {
        modifiedDeltaPipetFeedbackTimer = 0.001;
      } else if (modifiedDeltaPipetFeedbackTimer > .5) {
        modifiedDeltaPipetFeedbackTimer = .5;
      }

      fillCylinderRatio = fillCylinderRatio + .005

      if (fillCylinderRatio >= .25) {
        fillCylinderRatio = .25
      }

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

  let filledJuice = TEST_CYLINDER_FILL.getAttribute("height")
  AFRAME.log("current juicy filled: " + filledJuice)
  if (filledJuice > 0.2) {
    document.getElementById("pipeterenLabelAboveTable").setAttribute("color","green");
    document.getElementById("pipetLabelHand").setAttribute("color","green");
    document.getElementById("pipetlabelToDoList").remove();
    isDonePippeteren = true;
    correctSound.components.sound.playSound();
    checkIfeveryThingIsDone();
  }


}



//==================== prullenbak
  TRASHCOMPLETE = false;

  trashAudioT1 = document.getElementById("js--trashAudio-t1");
  trashAudioT2 = document.getElementById("js--trashAudio-t2");

  wrongAudioT1 = document.getElementById("js--wrongAudio-t1");
  wrongAudioT2 = document.getElementById("js--wrongAudio-t2");

  trashItems = document.getElementsByClassName("trash");
  trashCount = 0;

  const greenTrashCountLabel = document.getElementById('js--green-trashcan');
  const redTrashCountLabel = document.getElementById('js--red-trashcan');

  let redTrashCounter = 0;
  let greenTrashCounter = 0;

  //drop test
  AFRAME.registerComponent('droptest', {
    play: function () {
      this.el.addEventListener('drag-drop', function (evt) {
        AFRAME.log(trashCount);
        if(this.id == "afval_1" && evt.detail.dropped.dataset.color == "red"){
          AFRAME.log("Goed gedropped ouwe");
          trashAudioT1.components.sound.playSound();
          evt.detail.dropped.setAttribute("visible", false);
          evt.detail.dropped.dataset.trashed = "true";

        }else if(this.id == "afval_2" && evt.detail.dropped.dataset.color == "green"){
          trashAudioT2.components.sound.playSound();
          AFRAME.log("Goed gedropped ouwe");
          evt.detail.dropped.setAttribute("visible", false);
          evt.detail.dropped.dataset.trashed = "true";

        }else{
          AFRAME.log("hahahahha u pleb das fout " + evt.detail.dropped.dataset.color);
          wrongAudioT1.components.sound.playSound();
          wrongAudioT2.components.sound.playSound();
        }

        if(trashItems[trashCount].dataset.trashed == "true"){
          trashCount = trashCount+1;
        }

        if(trashCount == (trashItems.length-2) ){
          AFRAME.log("All parts Trashed!!!");
          TRASHCOMPLETE = true;
          isDoneAfval = true;
          document.getElementById("afvalLabelAboveTable").setAttribute("color","green");
          document.getElementById("afvalLabelHand").setAttribute("color","green");
          document.getElementById("afvallabelToDoList").remove();
          correctSound.components.sound.playSound();
          checkIfeveryThingIsDone();
          AFRAME.log(TRASHCOMPLETE);
        }
      });
    }
  });
