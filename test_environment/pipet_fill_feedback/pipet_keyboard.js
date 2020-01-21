window.onload = function () {
  const bar = document.getElementById('js--pipet-feedbar');
  const PIPET_CONTAINER = document.getElementById('js--pipet-container');
  let pressedKey = 0;
  let lastKey = 0;
  let start;
  let deltaG = 0;
  let deltaH = 0;
  // let delta = 0;
  let visualFeedback;
  let initialBarHeight = 0;
  let activeBarHeight = 0;
  let modifiedDelta;
  let gKeyHeld = false;
  let hKeyHeld = false;

  let soundCue = new Audio("drop.mp3");

  console.log("press and hold [G] to rise, press and hold [H] to diminish");

  document.addEventListener("keydown", function(event) {
    // keycode for [G], increase
    if (event.keyCode == 71 && event.keyCode != pressedKey && !hKeyHeld) {
      gKeyHeld = true;
      console.log(PIPET_CONTAINER.getAttribute("grabbed"));
      if (PIPET_CONTAINER.getAttribute("grabbed") == "") {
        fillPipetStart();
      }

    } else if (event.keyCode == 72 && event.keyCode != pressedKey && !gKeyHeld) {
      hKeyHeld = true;
      if (PIPET_CONTAINER.getAttribute("grabbed") == "") {
        emptyPipetStart();
      }


    }
  })

  document.addEventListener("keyup", function(event) {
    if (event.keyCode == 71) {
      gKeyHeld = false;
      if (PIPET_CONTAINER.getAttribute("grabbed") == "") {
        fillPipetEnd();
      }

    }
    if (event.keyCode == 72) {
      hKeyHeld = false;
      if (PIPET_CONTAINER.getAttribute("grabbed") == "") {
        emptyPipetEnd();
      }


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

  fillPipetStart = () => {
    pressedKey = event.keyCode;
    console.log('keydown');
    start = new Date();

    visualFeedback = setInterval(f => {
      let end = new Date();
      deltaG = end - start;
      console.log("deltaG: " + deltaG);
      modifiedDelta = (deltaG/2000) + initialBarHeight + activeBarHeight;
      console.log("modified: " + modifiedDelta);
      bar.setAttribute("height", modifiedDelta);
      bar.setAttribute("position", "0 " + (modifiedDelta/2) + " 0");
    }, 50);
  }

  fillPipetEnd = () => {
    console.log('keyup');
    activeBarHeight = activeBarHeight + deltaG/2000;
    clearInterval(visualFeedback);
  }

  emptyPipetStart = () => {
      pressedKey = event.keyCode;
      console.log('keydown');
      start = new Date();

      visualFeedback = setInterval(f => {
        let end = new Date();
        deltaH =  -(end - start);
        console.log("deltaH: " + deltaH);
        modifiedDelta = (deltaH/2000) + initialBarHeight + activeBarHeight;
        console.log("modified: " + modifiedDelta);
        bar.setAttribute("height", modifiedDelta);
        bar.setAttribute("position", "0 " + (modifiedDelta/2) + " 0");
      }, 50);
  }

  emptyPipetEnd = () => {
    console.log('keyup');
    activeBarHeight = activeBarHeight + deltaH/2000;
    clearInterval(visualFeedback);
  }
}
