window.onload = function () {
  const bar = document.getElementById('js--bar');
  let pressedKey = 0;
  let lastKey = 0;
  let start;
  let deltaG = 0;
  let deltaH = 0;
  // let delta = 0;
  let visualFeedback;
  let initialBarHeight = .3;
  let activeBarHeight = 0;
  let modifiedDelta;
  let gKeyHeld = false;
  let hKeyHeld = false;

  console.log("press and hold [G] to rise, press and hold [H] to diminish");

  document.addEventListener("keydown", function(event) {
    // keycode for [G], increase
    if (event.keyCode == 71 && event.keyCode != pressedKey && !hKeyHeld) {
      fillPipet();

    } else if (event.keyCode == 72 && event.keyCode != pressedKey && !gKeyHeld) {
      emptyPipet();

    }
  })

  document.addEventListener("keyup", function(event) {
    if (event.keyCode == 71) {
      console.log('keyup');
      gKeyHeld = false;
      activeBarHeight = activeBarHeight + deltaG/2000;
      clearInterval(visualFeedback);
    }
    if (event.keyCode == 72) {
      console.log('keyup');
      hKeyHeld = false;
      activeBarHeight = activeBarHeight + deltaH/2000;
      clearInterval(visualFeedback);

      // if (delta > 0 && delta < 500) {
      //   console.log("less than 500ms");
      // } else if (delta > 500 && delta < 1000) {
      //   console.log("more than 500ms, less than 1s");
      // } else if (delta > 1000) {
      //   console.log("more than 1s");
      // }
    }
    pressedKey = 0;
  })

  fillPipet = () => {
    pressedKey = event.keyCode;
    gKeyHeld = true;
    console.log('keydown');
    start = new Date();

    visualFeedback = setInterval(f => {
      let end = new Date();
      deltaG = end - start;
      console.log("deltaG: " + deltaG);
      modifiedDelta = (deltaG/2000) + initialBarHeight + activeBarHeight;
      console.log("modified: " + modifiedDelta);
      bar.setAttribute("height", modifiedDelta);
      bar.setAttribute("position", "0 " + (modifiedDelta/2) + " -3");
    }, 50);
  }

  emptyPipet = () => {
      pressedKey = event.keyCode;
      hKeyHeld = true;
      console.log('keydown');
      start = new Date();

      visualFeedback = setInterval(f => {
        let end = new Date();
        deltaH =  -(end - start);
        console.log("deltaH: " + deltaH);
        modifiedDelta = (deltaH/2000) + initialBarHeight + activeBarHeight;
        console.log("modified: " + modifiedDelta);
        bar.setAttribute("height", modifiedDelta);
        bar.setAttribute("position", "0 " + (modifiedDelta/2) + " -3");
      }, 50);
  }
}
