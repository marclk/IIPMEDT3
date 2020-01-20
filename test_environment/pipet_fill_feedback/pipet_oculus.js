window.onload = function () {
  const bar = document.getElementById('js--bar');
  let pressedKey = 0;
  let lastKey = 0;
  let start;
  let deltaG = 0;
  let deltaH = 0;
  let delta = 0;
  let visualFeedback;
  let initialBarHeight = .3;
  let activeBarHeight = 0;
  let modifiedDelta;
  let aButtonHeld = false;
  let bButtonHeld = false;

  document.querySelector('#rig').addEventListener('abuttondown', function (e) {
    aButtonHeld = true;
    if (!bButtonHeld) {
      start = new Date();

      visualFeedback = setInterval(f => {
        let end = new Date();
        delta = end - start;
        modifiedDelta = (delta/2000) + initialBarHeight + activeBarHeight;
        bar.setAttribute("height", modifiedDelta);
        bar.setAttribute("position", "0 " + (modifiedDelta/2) + " -3");
      }, 50);
    }
  })

  document.querySelector('#rig').addEventListener('abuttonup', function (e) {
    aButtonHeld = false;
    activeBarHeight = activeBarHeight + delta/2000;
    clearInterval(visualFeedback);
  })

  document.querySelector('#rig').addEventListener('bbuttondown', function (e) {
    bButtonHeld = true;
    if (!aButtonHeld) {
      start = new Date();

      visualFeedback = setInterval(f => {
        let end = new Date();
        delta = -(end - start);
        modifiedDelta = (delta/2000) + initialBarHeight + activeBarHeight;
        bar.setAttribute("height", modifiedDelta);
        bar.setAttribute("position", "0 " + (modifiedDelta/2) + " -3");
      }, 50);
    }
  })

  document.querySelector('#rig').addEventListener('bbuttonup', function (e) {
    bButtonHeld = false;
    activeBarHeight = activeBarHeight + delta/2000;
    clearInterval(visualFeedback);
  })

}
