window.onload = function () {
  const bar = document.getElementById('js--bar');
  let lastKey = 0;
  let start;
  // let end;
  let deltaG = 0;
  let deltaH = 0;
  let visualFeedback;
  let initialBarHeight = .3;
  let modifiedDelta;

  console.log("press and hold [G] to rise, press and hold [H] to diminish");

  document.addEventListener("keydown", function(event) {
    // keycode for [G], increase
    if (event.keyCode == 71 && event.keyCode != lastKey) {
      lastKey = event.keyCode;
      console.log('keydown');
      start = new Date();

      visualFeedback = setInterval(f => {
        let end = new Date();
        deltaG = deltaH + (end - start);
        console.log("deltaG: " + deltaG);
        modifiedDelta = deltaG/2000+initialBarHeight;
        console.log("modified: " + modifiedDelta);
        bar.setAttribute("height", modifiedDelta);
        bar.setAttribute("position", "0 " + (modifiedDelta/2) + " -3");
      }, 50);

    }
      // keycode for [H], decrease
      if (event.keyCode == 72 && event.keyCode != lastKey) {
        lastKey = event.keyCode;
        console.log('keydown');
        start = new Date();

        visualFeedback = setInterval(f => {
          let end = new Date();
          deltaH =  deltaG - (end - start);
          console.log("deltaH: " + deltaH);
          modifiedDelta = deltaH/2000+initialBarHeight;
          console.log("modified: " + modifiedDelta);
          bar.setAttribute("height", modifiedDelta);
          bar.setAttribute("position", "0 " + (modifiedDelta/2) + " -3");
        }, 50);

      }
  })

  document.addEventListener("keyup", function(event) {
    if (event.keyCode == 71) {
      console.log('keyup');
      lastKey = 0;
      clearInterval(visualFeedback);
    }
    if (event.keyCode == 72) {
      console.log('keyup');
      lastKey = 0;
      clearInterval(visualFeedback);

      // if (delta > 0 && delta < 500) {
      //   console.log("less than 500ms");
      // } else if (delta > 500 && delta < 1000) {
      //   console.log("more than 500ms, less than 1s");
      // } else if (delta > 1000) {
      //   console.log("more than 1s");
      // }
    }
  })
}
