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
  let modifiedDelta;
  let gKeyHeld = false;
  let hKeyHeld = false;

  document.querySelector('#rig').addEventListener('abuttondown', function (e) {
    start = new Date();

    visualFeedback = setInterval(f => {
      let end = new Date();
      delta = end - start;
      //add activeHeight to modifiedDelta
      modifiedDelta = (delta/2000)+initialBarHeight;
      bar.setAttribute("height", modifiedDelta);
      bar.setAttribute("position", "0 " + (modifiedDelta/2) + " -3");
    }, 50);
  })

  document.querySelector('#rig').addEventListener('abuttonup', function (e) {
    //save final delta into activeHeight
    clearInterval(visualFeedback);
  })

  document.querySelector('#rig').addEventListener('bbuttondown', function (e) {
    start = new Date();

    visualFeedback = setInterval(f => {
      let end = new Date();
      delta = -(end - start);
      //add activeHeight to modifiedDelta
      modifiedDelta = delta/2000+initialBarHeight;
      bar.setAttribute("height", modifiedDelta);
      bar.setAttribute("position", "0 " + (modifiedDelta/2) + " -3");
    }, 50);
  })

  document.querySelector('#rig').addEventListener('bbuttonup', function (e) {
    //save final delta into activeHeight
    clearInterval(visualFeedback);
  })

}
