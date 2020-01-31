const textField = document.getElementById('js--text-element');


// let startTimer;
// let deltaFlame = 0;
// let temperatureStepper;
// let tempCondities = true;
// INTERVAL_FREQ = 100;
//
// riseTemperatureStart = (tempCondities) => {
//
//   if (tempCondities) {
//     startTimer = new Date();
//
//     temperatureStepper = setInterval(f => {
//       let endTimer = new Date();
//       deltaFlame = Math.round((endTimer - startTimer)/6);
//       console.log(deltaFlame);
//       textField.setAttribute('value', deltaFlame);
//
//     }, INTERVAL_FREQ);
//   }
// }
// riseTemperatureStart(tempCondities);
//
//
// setTimeout(
//
// riseTemperatureEnd = () => {
//   clearInterval(temperatureStepper);
//   // activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/6000;
//
//   console.log(deltaFlame);
// }, 2000);


var continueTimeer = true;
document.getElementById("nextButtonFlame").onmouseenter = (event) => {
  continueTimeer = true;
  changeTempWithInterval("plus");
}
document.getElementById("nextButtonFlame").onmouseleave = (event) => {
 continueTimeer = false;
}
document.getElementById("previousButtonFlame").onmouseenter = (event) => {
  continueTimeer = true;
  changeTempWithInterval("minus");
}
document.getElementById("previousButtonFlame").onmouseleave = (event) => {
 continueTimeer = false;
}

INTERVAL_FREQ = 100;
var count = 0, time = 1000;

function changeTempWithInterval(direction) {

    setTimeout(function () {
      if(continueTimeer == false ){
        return;
      }
      if(continueTimeer === true && direction === "plus"){
            count += 10;
            textField.setAttribute('value', count + " K");
            changeTempWithInterval("plus");
      }
      if(continueTimeer === true && direction === "minus"){
            count -= 10;
            textField.setAttribute('value', count + " K");
            changeTempWithInterval("minus");
      }

    }, INTERVAL_FREQ);
};


  var inforBUttons = document.getElementsByClassName("infoButton");
  for (let i = 0; i < inforBUttons.length; i++) {
    inforBUttons[i].addEventListener('click', function(evnt){
      console.log("Number " + i);
    });
  };
