function startTimer(duration, display) {
  var timer = duration,
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
}

document.getElementById("start-timer").addEventListener("click", () => {
  var twoMinutes = 60 * 2,
  display = document.getElementById("countdown-timer__display");
  startTimer(twoMinutes, display);
});
