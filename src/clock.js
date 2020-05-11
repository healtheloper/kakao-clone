const clock = document.querySelector(".status-bar__clock");

function getTime() {
  const time = new Date();
  const time_hour =
    time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
  const time_min =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
  const curTime = time_hour + ":" + time_min;
  clock.innerText = curTime;
}
getTime();
setInterval(getTime, 1000);
