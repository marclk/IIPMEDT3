window.onload = function () {
  const SAFETY_GOGGLE = document.getElementById('js--bril');
  const LAB_COAT = document.getElementById('js--labcoat');
  // const GUI_RADIO = document.getElementById('js--gui-radio');
  // const GUI_RADIO_SECOND = document.getElementById('js--gui-radio-second');

  var goggleOnHead = false
  var labCoatOn = false;

  //==================== PIPET STUFF
  const PIPET_FEEDBAR = document.getElementById('js--pipet-feedbar');
  const PIPET = document.getElementById('js--pipet');
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

  SAFETY_GOGGLE.addEventListener('click', function(evnt){
    console.log("Im registerd!!!");
   //this.remove();
    // GUI_RADIO.click();
    // GUI_RADIO.click();
    // goggleOnHead = true;
    // this.removeAttribute("gui-interactable");
    // this.setAttribute("visible","false");
    // checkIfSafetyIsGood(labCoatOn,goggleOnHead);
    this.remove();


  });

  LAB_COAT.addEventListener('click', function(evnt){
    console.log("Im registerd!!!");
    //this.remove();
    // GUI_RADIO_SECOND.click();
    labCoatOn = true;
    // this.removeAttribute("gui-interactable");
    // this.setAttribute("visible","false");
    // checkIfSafetyIsGood(labCoatOn,goggleOnHead);

  });

}


function checkIfSafetyIsGood(labCoatOn,goggleOnHead){




  if(labCoatOn === true && goggleOnHead === true){
    console.log("jeej safety");

      setTimeout(function(){
        document.getElementById("js--clipBoard").firstElementChild.remove();
        document.getElementById("js--clipboardContent").setAttribute("position", {z:0,y:0,x:0});
      }, 1000);




  }else{
    console.log("not yet");
  }

  document.querySelector('#rhand').addEventListener('abuttondown', function (e) {
    aButtonHeld = true;
    if (PIPET_CONTAINER.getAttribute("grabbed") != null) {
      dropletSound.play();
      fillPipetStart();
    }
  })

  document.querySelector('#rhand').addEventListener('abuttonup', function (e) {
    aButtonHeld = false;
    if (PIPET_CONTAINER.getAttribute("grabbed") != null) {
      fillPipetEnd();
    }
  })

  document.querySelector('#rhand').addEventListener('bbuttondown', function (e) {
    bButtonHeld = true;
    dropletSound.play();
    if (PIPET_CONTAINER.getAttribute("grabbed") != null) {
      emptyPipetStart();
    }
  })

  document.querySelector('#rhand').addEventListener('bbuttonup', function (e) {
    bButtonHeld = false;
    if (PIPET_CONTAINER.getAttribute("grabbed") != null) {
      emptyPipetEnd();
    }
  })

  fillPipetStart = () => {
    if (!bButtonHeld) {
      startPipetFeedbackTimer = new Date();

      visualFeedbackInterval = setInterval(f => {
        let endPipetFeedbackTimer = new Date();
        deltaPipetFeedbackTimer = endPipetFeedbackTimer - startPipetFeedbackTimer;
        modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/2000) + initialFeedbackBarHeight + activeFeedbackBarHeight;
        PIPET_FEEDBAR.setAttribute("height", modifiedDeltaPipetFeedbackTimer);
        PIPET_FEEDBAR.setAttribute("position", "0 " + (modifiedDeltaPipetFeedbackTimer/2) + " -.03");
      }, 50);
    }
  }

  fillPipetEnd = () => {
    activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/2000;
    clearInterval(visualFeedbackInterval);
  }

  emptyPipetStartStart = () => {
    if (!aButtonHeld) {
      startPipetFeedbackTimer = new Date();

      visualFeedbackInterval = setInterval(f => {
        let endPipetFeedbackTimer = new Date();
        deltaPipetFeedbackTimer = -(endPipetFeedbackTimer - startPipetFeedbackTimer);
        modifiedDeltaPipetFeedbackTimer = (deltaPipetFeedbackTimer/2000) + initialFeedbackBarHeight + activeFeedbackBarHeight;
        PIPET_FEEDBAR.setAttribute("height", modifiedDeltaPipetFeedbackTimer);
        PIPET_FEEDBAR.setAttribute("position", "0 " + (modifiedDeltaPipetFeedbackTimer/2) + " -.03");
      }, 50);
    }
  }

  emptyPipetEnd = () => {
    activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/2000;
    clearInterval(visualFeedbackInterval);
  }


}
