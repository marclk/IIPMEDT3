window.onload = function () {
  const pipet = document.getElementsByClassName('js--pipet');
  const SAFETY_GOGGLE = document.getElementById('js--bril');
  const LAB_COAT = document.getElementById('js--labcoat');
  const GUI_RADIO = document.getElementById('js--gui-radio');
  const GUI_RADIO_SECOND = document.getElementById('js--gui-radio-second');


  var goggleOnHead = false
  var labCoatOn = false;

  SAFETY_GOGGLE.addEventListener('click', function(evnt){
    console.log("Im registerd!!!");
   //this.remove();
    GUI_RADIO.click();
    GUI_RADIO.click();
    goggleOnHead = true;
    this.removeAttribute("gui-interactable");
    this.setAttribute("visible","false");
    checkIfSafetyIsGood(labCoatOn,goggleOnHead);


  });

  LAB_COAT.addEventListener('click', function(evnt){
    console.log("Im registerd!!!");
    //this.remove();
    GUI_RADIO_SECOND.click();
    labCoatOn = true;
    this.removeAttribute("gui-interactable");
    this.setAttribute("visible","false");
    checkIfSafetyIsGood(labCoatOn,goggleOnHead);

  });

}


function checkIfSafetyIsGood(labCoatOn,goggleOnHead){




  if(labCoatOn === true && goggleOnHead === true){
    console.log("jeej safety");
  //console.log(document.getElementById('js--gui-radio-second').getAttribute("gui-radio"));


    //document.getElementById('part2OfClipboardContent').setAttribute("position",{x:0,y:0,z:0});

    console.log(document.getElementById("js--clipBoard"));
    document.getElementById("js--clipBoard").firstElementChild.remove();
document.getElementById("js--clipboardContent").setAttribute("position", {z:0,y:0,x:0});


  }else{
    console.log("not yet");
  }

}
