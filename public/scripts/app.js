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

// Voltage toggles
const voltageDisplay = document.getElementById("current-voltage");
const voltageToggleInputs = document.querySelectorAll('input[type="radio"]');

const updateVoltage = () => {
  let totalVoltage = 0;
  for (let i = 0; i < voltageToggleInputs.length; i++) {
    if (voltageToggleInputs[i].checked) {
      totalVoltage += parseInt(voltageToggleInputs[i].value);
    }
  }
  voltageDisplay.innerHTML = totalVoltage;
};

for (let i = 0; i < voltageToggleInputs.length; i++) {
  voltageToggleInputs[i].addEventListener("click", event => {
    updateVoltage();
  });
}

updateVoltage();

////////////////////////

// Charge code
const chargeButton = document.getElementById("power-charge");
const chargeStatus = document.getElementById("charge-status");
chargeButton.addEventListener("click", () => {
  let currentVoltage = parseInt(voltageDisplay.innerHTML);
  if (currentVoltage === 220) {
    chargeStatus.innerHTML = "Charged";
    chargeStatus.style.backgroundColor = "#f6e100";
  } else {
    chargeStatus.innerHTML = "Discharged";
  }
});
////////////////////////

// Contact code
const closeButton = document.getElementById("power-close");
const breakerStatus = document.getElementById("contact-status");
closeButton.addEventListener("click", () => {
  if (chargeStatus.innerHTML === "Charged") {
    breakerStatus.innerHTML = "Closed";
    breakerStatus.style.backgroundColor = "red";
    chargeStatus.innerHTML = "Discharged";
    chargeStatus.style.backgroundColor = "white";
    initCircuitBreakers();
  }
});
////////////////////////

// Open code
const openButton = document.getElementById("power-open");
openButton.addEventListener("click", () => {
  if (breakerStatus.innerHTML === "Closed") {
    breakerStatus.innerHTML = "Open";
    breakerStatus.style.backgroundColor = "#148e42";
    for (let i = 0; i < voltageToggleInputs.length; i++) {
      if (i % 2 === 0) {
        voltageToggleInputs[i].click();
      }
    }
  }
  resetCircuitBreakers();
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

// Bottom control panel buttons
const bottomControlPanelButtons = document.getElementsByClassName(
  "control-panel__button-display"
)[1].children;
for (let i = 0; i < bottomControlPanelButtons.length; i++) {
  let button = bottomControlPanelButtons[i];
  button.addEventListener("click", event => {
    for (let k = 0; k < bottomControlPanelButtons.length; k++) {
      let prevButton = bottomControlPanelButtons[k];
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

// Circuit Breaker Init
const initCircuitBreakers = () => {
  const breakerWrappers = document.getElementsByClassName(
    "breaker-label__wrapper"
  );
  const breakerLabels = document.getElementsByClassName("breaker-label__text");
  const breakerOnButtons = document.getElementsByClassName("breaker-on");
  const breakerOffButtons = document.getElementsByClassName("breaker-off");

  for (let i = 0; i < breakerWrappers.length; i++) {
    breakerOffButtons[i].style.backgroundColor = "#99E3C0";
    breakerLabels[i].style.backgroundColor = "#c2a693";
    breakerOnButtons[i].addEventListener("click", handleBreakerOn);
    breakerOffButtons[i].addEventListener("click", handleBreakerOff);
  }
};
////////////////////////

// Breaker On
const handleBreakerOn = event => {
  event.target.parentElement.lastElementChild.style.backgroundColor = "#1F1115";
  event.target.parentElement.nextElementSibling.style.backgroundColor =
    "#C23457";
  event.target.style.backgroundColor = "#E40141";
};
////////////////////////

// Breaker Off
const handleBreakerOff = event => {
  event.target.parentElement.firstElementChild.style.backgroundColor =
    "#1F1115";
  event.target.parentElement.lastElementChild.style.backgroundColor =
    "rgb(153, 227, 192)";
  event.target.parentElement.nextElementSibling.style.backgroundColor =
    "#1F1115";
};
////////////////////////

// Circuit Breaker Reset
const resetCircuitBreakers = () => {
  const breakerWrappers = document.getElementsByClassName(
    "breaker-label__wrapper"
  );
  const breakerLabels = document.getElementsByClassName("breaker-label__text");
  const breakerOnButtons = document.getElementsByClassName("breaker-on");
  const breakerOffButtons = document.getElementsByClassName("breaker-off");

  for (let i = 0; i < breakerWrappers.length; i++) {
    breakerWrappers[i].style.backgroundColor = "#1F1115";
    breakerLabels[i].style.backgroundColor = "#37291f";
    breakerOnButtons[i].style.backgroundColor = "#1F1115";
    breakerOffButtons[i].style.backgroundColor = "#1F1115";
    breakerOnButtons[i].removeEventListener("click", handleBreakerOn);
    breakerOffButtons[i].removeEventListener("click", handleBreakerOff);
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
///////////////////
