let index, controlsR, controlsL, controlSteps;

window.onload = function(){
  controlsR = document.getElementsByClassName("js--oculus-touch-controls-R");
  controlsL = document.getElementsByClassName("js--oculus-touch-controls-L");

  controlSteps = document.getElementsByClassName("js--control-step");

  controlBtnNext = document.getElementById("js--controls-next");

  controllerInput = document.querySelector("#cameraRig");

  controlBtnNext.addEventListener("onclick", function (e){
    nextControl();
  });

  controllerInput.addEventListener("ybuttondown", function (e){
    nextControl();
  });

  nextControl = () =>{
    for (let i = 0; i < controlsR.length; i++) {
      if(controlsR[i].hasAttribute("animation")){
        let sourceR = controlsR[i].getAttribute("src");
        controlsR[i].removeAttribute("animation");
        controlsR[i].setAttribute("mtl", sourceR.replace("obj", "mtl"));
        controlsR[i+1].setAttribute("animation", "property: components.material.material.color; type: color; from: black; to: yellow; dur: 1000; loop: true; dir: alternate; easing: easeInOutCirc");

        if(i <= 1){
          let sourceL = controlsL[i].getAttribute("src");
          controlsL[i].removeAttribute("animation");
          controlsL[i].setAttribute("mtl", sourceL.replace("obj", "mtl"));
          controlsL[i+1].setAttribute("animation", "property: components.material.material.color; type: color; from: black; to: yellow; dur: 1000; loop: true; dir: alternate; easing: easeInOutCirc");
        }else{
          let source1 = controlsL[2].getAttribute("src");
          controlsL[2].removeAttribute("animation");
          controlsL[2].setAttribute("mtl", source1.replace("obj", "mtl"));
        }

        if(controlSteps[i].hasAttribute("scale")){
          controlSteps[i].removeAttribute("scale");
          controlSteps[i].setAttribute("color", "#dedede");
          controlSteps[i+1].setAttribute("scale", "1.1 1.1 1.1");
          controlSteps[i+1].setAttribute("color", "yellow");
        }

        if(i == (controlsR.length - 2)){
          
          document.getElementById("volgende-knop").setAttribute("value", "Ga door de deur");
          document.getElementById("volgende-knop").setAttribute("position", {x:-0.789});
          document.getElementById("volgende-knop").setAttribute("color", "black");
          document.getElementById("js--controls-next").setAttribute("color", "yellow");
        }
        return;
      }
    }
  }
}
