let tempCondities = true;
let startTimer;
let deltaFlame = 0;
let temperatureStepper;
INTERVAL_FREQ = 100;

riseTemperatureStart = () => {
  if (tempCondities) {
    startTimer = new Date();

    temperatureStepper = setInterval(f => {
      let endTimer = new Date();
      deltaFlame = (endTimer - startTimer)/6;

    }, INTERVAL_FREQ);
  }
}

riseTemperatureStart()
setTimeout(

riseTemperatureEnd = () => {
  clearInterval(temperatureStepper);
  // activeFeedbackBarHeight = activeFeedbackBarHeight + deltaPipetFeedbackTimer/6000;

  console.log(deltaFlame);
}
  , 2000);
