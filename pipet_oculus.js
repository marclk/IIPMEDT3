window.onload = function () {
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

  console.log(PIPET_CONTAINER.getAttribute("grabbable"));

  document.querySelector('#rig').addEventListener('abuttondown', function (e) {
    aButtonHeld = true;
    if (PIPET_CONTAINER.getAttribute("grabbed") == "") {
      fillPipetStart();
    }
  })

  document.querySelector('#rig').addEventListener('abuttonup', function (e) {
    aButtonHeld = false;
    if (PIPET_CONTAINER.getAttribute("grabbed") == "") {
      fillPipetEnd();
    }
  })

  document.querySelector('#rig').addEventListener('bbuttondown', function (e) {
    bButtonHeld = true;
    if (PIPET_CONTAINER.getAttribute("grabbed") == "") {
      emptyPipetStart();
    }
  })

  document.querySelector('#rig').addEventListener('bbuttonup', function (e) {
    bButtonHeld = false;
    if (PIPET_CONTAINER.getAttribute("grabbed") == "") {
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
