window.onload = function () {
  const PIPET_FEEDBAR = document.getElementById('js--pipet-feedbar');
  const PIPET = document.getElementById('js--pipet');
  const PIPET_CONTAINER = document.getElementById('js--pipet-container');
  const GRABBABLES = document.getElementsByClassName('grabbable');

  let startPipetFeedbackTimer;
  let deltaPipetFeedbackTimer = 0;
  let visualFeedbackInterval;
  let initialFeedbackBarHeight = 0;
  let activeFeedbackBarHeight = 0;
  let modifiedDeltaPipetFeedbackTimer;
  let aButtonHeld = false;
  let bButtonHeld = false;

    for (let i = 0; i < GRABBABLES.length; i++) {
      GRABBABLES[i].addEventListener('grab-start', function (e) {

        console.log(GRABBABLES[i].id);

        let ID = GRABBABLES[i].id;

        switch (ID) {
          case "js--pipet-container":
            GRABBABLES[i].addEventListener('abuttondown', function (e) {
              aButtonHeld = true;
              fillPipetStart();
            })
            GRABBABLES[i].addEventListener('bbuttondown', function (e) {
              bButtonHeld = true;
              emptyPipetStart();
            })
            GRABBABLES[i].addEventListener('abuttonup', function (e) {
              aButtonHeld = false;
              fillPipetEnd();
            })
            GRABBABLES[i].addEventListener('bbuttonup', function (e) {
              bButtonHeld = false;
              emptyPipetEnd();
            })
            break;

          case "js--other-grabbables":
            //FUNCTION
            break;
          default:

        }
      }
    }

  // document.addEventListener("keydown", function(event) {
  //   // keycode for [G], increase
  //
  //     for (var i = 0; i < GRABBABLES.length; i++) {
  //
  //       console.log(GRABBABLES[i].getAttribute("grabbed"));
  //       console.log(GRABBABLES[i].id);
  //
  //       if (GRABBABLES[i].getAttribute("grabbed") == "") {
  //         let ID = GRABBABLES[i].id;
  //
  //         switch (ID) {
  //           case "js--pipet-container":
  //             if (event.keyCode == 71 && event.keyCode != pressedKey && !hKeyHeld) {
  //               pressedKey = event.keyCode;
  //               gKeyHeld = true;
  //               fillPipetStart();
  //             } else if (event.keyCode == 72 && event.keyCode != pressedKey && !gKeyHeld) {
  //               pressedKey = event.keyCode;
  //               hKeyHeld = true;
  //               emptyPipetStart();
  //             }
  //             break;
  //
  //           case "js--other-grabbables":
  //             //FUNCTION
  //             break;
  //           default:
  //
  //         }
  //       }
  //     }

  // document.querySelector('#rig').addEventListener('abuttondown', function (e) {
  //   aButtonHeld = true;
  //   if (PIPET_CONTAINER.getAttribute("grabbed") == "") {
  //     fillPipetStart();
  //   }
  // })
  //
  // document.querySelector('#rig').addEventListener('abuttonup', function (e) {
  //   aButtonHeld = false;
  //   if (PIPET_CONTAINER.getAttribute("grabbed") == "") {
  //     fillPipetEnd();
  //   }
  // })
  //
  // document.querySelector('#rig').addEventListener('bbuttondown', function (e) {
  //   bButtonHeld = true;
  //   if (PIPET_CONTAINER.getAttribute("grabbed") == "") {
  //     emptyPipetStart();
  //   }
  // })
  //
  // document.querySelector('#rig').addEventListener('bbuttonup', function (e) {
  //   bButtonHeld = false;
  //   if (PIPET_CONTAINER.getAttribute("grabbed") == "") {
  //     emptyPipetEnd();
  //   }
  // })

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
