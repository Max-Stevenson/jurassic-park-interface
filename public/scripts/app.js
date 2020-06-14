// Timer
const startTimer = (duration, display) => {
  let timer = duration,
    minutes,
    seconds;
  setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
};

document.getElementById("start-timer").addEventListener("click", () => {
  const twoMinutes = 60 * 2;
  const display = document.getElementById("countdown-timer__display");
  startTimer(twoMinutes, display);
});
////////////////////////

// Control panel buttons
const topControlPanelButtons = document.getElementsByClassName(
  "control-panel__button-display"
)[0].children;
for (let i = 0; i < topControlPanelButtons.length; i++) {
  let button = topControlPanelButtons[i];
  button.addEventListener("click", event => {
    for (let k = 0; k < topControlPanelButtons.length; k++) {
      let prevButton = topControlPanelButtons[k];
      if (prevButton.classList.contains("button__depressed")) {
        prevButton.classList.remove("button__depressed");
        prevButton.classList.add("outer-edge__light");
        prevButton.firstElementChild.classList.add("inner-edge__light");
        prevButton.firstElementChild
          .querySelector("p")
          .classList.remove("button-text__embossed");
        prevButton.firstElementChild
          .querySelector("p")
          .classList.add("button-text__engraved");
      }
    }
    button.classList.add("button__depressed");
    button.classList.remove("outer-edge__light");
    button.firstElementChild.classList.remove("inner-edge__light");
    button.firstElementChild
      .querySelector("p")
      .classList.add("button-text__embossed");
    button.firstElementChild
      .querySelector("p")
      .classList.remove("button-text__engraved");
    changeScreenContent(event);
  });
}
////////////////////////

// Video screen tab change
const changeScreenContent = event => {
  let selectedTab = event.currentTarget.lastElementChild.firstElementChild.innerHTML.toLowerCase();
  const mainDisplayElements = document.getElementsByClassName("main-display");
  const tabContentElements = document.getElementsByClassName(
    "video-screen__tab-content"
  );

  for (let i = 0; i < tabContentElements.length; i++) {
    if (tabContentElements[i].id === `video-screen__${selectedTab}`) {
      tabContentElements[i].style.display = "flex";
    } else {
      tabContentElements[i].style.display = "none";
    }
  }

  for (let i = 0; i < mainDisplayElements.length; i++) {
    if (mainDisplayElements[i].id === `${selectedTab}-display__inner`) {
      mainDisplayElements[i].style.display = "flex";
    } else {
      mainDisplayElements[i].style.display = "none";
    }
  }
};
////////////////////////

// Trash modal
const trashIcon = document.getElementById("trash-icon");

trashIcon.addEventListener("click", () => {
  const trashModal = document.getElementById("trash-modal");
  const trashModalCloseButton = document.getElementById(
    "modal-container__close-button"
  );
  trashModalCloseButton.addEventListener("click", () => {
    trashModal.classList.remove("modal-active");
    trashModal.classList.add("modal-inactive");
  });
  trashModal.classList.remove("modal-inactive");
  trashModal.classList.add("modal-active");
});
////////////////////////

// user clicks start button

// loop through DOM and add interactivity to all elements with interactive class

// init steps to win as 0 (have to complete 10 to win)

// take instruction from array and show on screen

// start 2 minute timer

// take instruction interaction object and listen for click

// after a timer or inccorect number of clicks display a hint for the object (flashing or hightlight border?)

// once clicked check for if last instruction

// if so, display win message, if not pull next instruction from array and show on screen

// if time expires display lose message
