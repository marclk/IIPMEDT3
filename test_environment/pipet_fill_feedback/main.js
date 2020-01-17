window.onload = function () {
  const bar = document.getElementById('js--bar');
  let lastKey = 0;
  let start;
  // let end;
  let delta = 0;
  let visualFeedback;
  let initialBarHeight = .3;
  let modifiedDelta;

  console.log("press and hold [G]");

  document.addEventListener("keydown", function(event) {
    // keycode for [G]
    if (event.keyCode == 71 && event.keyCode != lastKey) {
      lastKey = event.keyCode;
      console.log('keydown');
      start = new Date();

      visualFeedback = setInterval(f => {
        let end = new Date();
        delta = end - start;
        console.log("delta: " + delta);
        modifiedDelta = delta/2000+initialBarHeight;
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
