let index, controlsR, controlsL, controlSteps, controlBtnNext, controllerInput;

window.onload = function(){

  tutorialTitle = document.getElementById("js--control-title");

  tutorialButton = document.getElementById("js--control-step");

  tutorialDescription = document.getElementById("js--control-desc");

  controlBtnNext = document.getElementById("js--controls-next");

  controlsR = document.getElementsByClassName("js--oculus-touch-controls-R");
  controlsL = document.getElementsByClassName("js--oculus-touch-controls-L");

  controllerInput = document.querySelector("#cameraRig");

  tutorialTitleArr = ["Teleport/draaien", "Selecteren", "Vastpakken", "Pipet: Opzuigen", "Pipet: Legen"];
  tutorialBtnArr = ["Thumbstick", "Trigger", "Grip", "A Knop (rechts)", "B Knop (rechts)"];
  tutorialDescriptionArr = ["Door de linker thumbstick naar voren te duwen is het mogelijk om naar een andere positie te teleporten! \n Met de rechter thumbstick (naar rechts of links te drukken) kan je de camera draaien. Probeer het uit!", "Met de Trigger kan je knoppen selecteren. Klik op de 'i' tjes bij de tafels om meer info te krijgen over de opdracht!", "Met de grip button kan je objecten oppakken en weer neerzetten. Gebruik dit om bijvoorbeeld een gebroken erlenmeyer weg te gooien of om een pipet op te pakken!", "Tijdens het vasthouden van de pipet kan je met de A knop vloeistof opzuigen! Zorg er natuurlijk wel voor dat je de pipet bij de goede reageerbuis houd!", "Met de B knop kan je de pipet legen als je de pipet bij de juiste reageerbuis houd, je wilt natuurlijk niet dat de vloeistof op de grond valt. "];

  controlBtnNext.addEventListener("click", function (e){
    nextControl();
  });
  var setFirstTime = false;

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

        tutorialTitle.setAttribute("value", tutorialTitleArr[i+1]);
        tutorialButton.setAttribute("value", tutorialBtnArr[i+1]);
        tutorialDescription.setAttribute("value", tutorialDescriptionArr[i+1]);

        if(i == (controlsR.length - 2)){

          document.getElementById("volgende-knop").setAttribute("value", "Ga door de deur");
          document.getElementById("volgende-knop").setAttribute("position", {x:-0.789});
          document.getElementById("volgende-knop").setAttribute("color", "black");
          document.getElementById("js--controls-next").setAttribute("color", "yellow");
        }
        return;
      }
      if(setFirstTime === false){
        setFirstTime = true;
        controlsR[0].setAttribute("animation", "property: components.material.material.color; type: color; from: black; to: yellow; dur: 1000; loop: true; dir: alternate; easing: easeInOutCirc");
        controlsL[0].setAttribute("animation", "property: components.material.material.color; type: color; from: black; to: yellow; dur: 1000; loop: true; dir: alternate; easing: easeInOutCirc");

        tutorialTitle.setAttribute("value", tutorialTitleArr[0]);
        tutorialButton.setAttribute("value", tutorialBtnArr[0]);
        tutorialDescription.setAttribute("value", tutorialDescriptionArr[0]);
      }

    }
  }
  //
  // controlSteps = document.getElementsByClassName("js--control-step");
  //
  //
  //

  //
  //
  controllerInput.addEventListener("ybuttondown", function (e){
    nextControl();
  });
  //


}
