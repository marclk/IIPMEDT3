window.onload = function () {
  const PIPET_FEEDBAR = document.getElementById('js--pipet-feedbar');
  const PIPET = document.getElementById('js--pipet');
  const PIPET_CONTAINER = document.getElementById('js--pipet-container');

  let start;
  let delta = 0;
  let visualFeedback;
  let initialBarHeight = .3;
  let activeBarHeight = 0;
  let modifiedDelta;
  let aButtonHeld = false;
  let bButtonHeld = false;

  console.log(PIPET_CONTAINER.getAttribute("grabbable"));

  document.querySelector('#rig').addEventListener('abuttondown', function (e) {
    aButtonHeld = true;
    fillPipet();
  })

  document.querySelector('#rig').addEventListener('abuttonup', function (e) {
    aButtonHeld = false;
    activeBarHeight = activeBarHeight + delta/2000;
    clearInterval(visualFeedback);
  })

  document.querySelector('#rig').addEventListener('bbuttondown', function (e) {
    bButtonHeld = true;
    emptyPipet();
  })

  document.querySelector('#rig').addEventListener('bbuttonup', function (e) {
    bButtonHeld = false;
    activeBarHeight = activeBarHeight + delta/2000;
    clearInterval(visualFeedback);
  })

  fillPipet = () => {
    if (!bButtonHeld) {
      start = new Date();

      visualFeedback = setInterval(f => {
        let end = new Date();
        delta = end - start;
        modifiedDelta = (delta/2000) + initialBarHeight + activeBarHeight;
        PIPET_FEEDBAR.setAttribute("height", modifiedDelta);
        PIPET_FEEDBAR.setAttribute("position", "0 " + (modifiedDelta/2) + " -3");
      }, 50);
    }
  }

  emptyPipet = () => {
    if (!aButtonHeld) {
      start = new Date();

      visualFeedback = setInterval(f => {
        let end = new Date();
        delta = -(end - start);
        modifiedDelta = (delta/2000) + initialBarHeight + activeBarHeight;
        PIPET_FEEDBAR.setAttribute("height", modifiedDelta);
        PIPET_FEEDBAR.setAttribute("position", "0 " + (modifiedDelta/2) + " -3");
      }, 50);
    }
  }

}
