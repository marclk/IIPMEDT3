window.onload = function () {
  const bar = document.getElementById('js--bar');
  let lastKey = 0;
  let start;
  // let end;
  let delta;
  // let visualFeedback;

  const feedbackMeter = () => {
    let end = new Date();
    delta = end - start;
    console.log("meter: " + delta);

    bar.setAttribute("height", delta/100)
  }

  document.addEventListener("keydown", function(event) {
    if (event.keyCode == 71 && event.keyCode != lastKey) {
      lastKey = event.keyCode;
      console.log('keydown');
      start = new Date();
      visualFeedback = setInterval(feedbackMeter(), 200);
    }
  })

  document.addEventListener("keyup", function(event) {
    if (event.keyCode == 71) {
      console.log('keyup');
      lastKey = 0;
      let end = new Date();
      delta = end - start;
      console.log("miliseconds: " + delta);
      clearInterval(visualFeedback);
      bar.setAttribute("height", delta/100)

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
