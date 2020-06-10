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


// Trash modal code
const trashIcon = document.getElementById("trash-icon");

trashIcon.addEventListener("click", () => {
  const trashModal = document.getElementById("trash-modal");
  const trashModalCloseButton = document.getElementById("modal-container__close-button");
  trashModalCloseButton.addEventListener("click", () => {
    trashModal.classList.add("hidden");
  });
  trashModal.addEventListener("focusout", () => {
    trashModal.classList.add("hidden");
  });
  trashModal.classList.remove("hidden");
  trashModal.focus();
});
/////////////////

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