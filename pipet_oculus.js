window.onload = function () {
  const PIPET_FEEDBAR = document.getElementById('js--pipet-feedbar');
  const PIPET = document.getElementById('js--pipet');
  const PIPET_CONTAINER = document.getElementById('js--pipet-container');

  let start;
  let delta = 0;
  let visualFeedback;
  let initialBarHeight = 0;
  let activeBarHeight = 0;
  let modifiedDelta;
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
      start = new Date();

      visualFeedback = setInterval(f => {
        let end = new Date();
        delta = end - start;
        modifiedDelta = (delta/2000) + initialBarHeight + activeBarHeight;
        PIPET_FEEDBAR.setAttribute("height", modifiedDelta);
        PIPET_FEEDBAR.setAttribute("position", "0 " + (modifiedDelta/2) + " -.03");
      }, 50);
    }
  }

  fillPipetEnd = () => {
    activeBarHeight = activeBarHeight + delta/2000;
    clearInterval(visualFeedback);
  }

  emptyPipetStartStart = () => {
    if (!aButtonHeld) {
      start = new Date();

      visualFeedback = setInterval(f => {
        let end = new Date();
        delta = -(end - start);
        modifiedDelta = (delta/2000) + initialBarHeight + activeBarHeight;
        PIPET_FEEDBAR.setAttribute("height", modifiedDelta);
        PIPET_FEEDBAR.setAttribute("position", "0 " + (modifiedDelta/2) + " -.03");
      }, 50);
    }
  }

  emptyPipetEnd = () => {
    activeBarHeight = activeBarHeight + delta/2000;
    clearInterval(visualFeedback);
  }

}
