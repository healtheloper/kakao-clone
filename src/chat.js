const form = document.querySelector(".chat__write-form");
const chat_input = document.querySelector(".chat__write-input");
const chat_messages = document.querySelector(".chat__messages");
const chat_screen = document.querySelector(".chat-screen");

let msgs = [];

function getDays() {
  const time = new Date();
  const month_option = { month: "long" };
  const day_option = { weekday: "long" };
  const weekday = new Intl.DateTimeFormat("en-US", day_option).format(time);
  const months = new Intl.DateTimeFormat("en-US", month_option).format(time);
  const date = time.getDate();
  const years = time.getFullYear();
  const curDay = `${weekday} ${months} ${date} ${years}`;

  const dayObj = {
    weekday: weekday,
    months: months,
    date: date,
    years: years,
    curDay: curDay,
  };
  return dayObj;
}

function getTime() {
  const time = new Date();
  const time_hour =
    time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
  const time_min =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
  const curTime = time_hour + ":" + time_min;
  return curTime;
}
function paintDay(dayObj) {
  const span = document.createElement("span");
  const day = document.createElement("span");
  const month = document.createElement("span");
  const date = document.createElement("span");
  const year = document.createElement("span");

  day.innerText = dayObj.weekday;
  month.innerText = dayObj.months;
  date.innerText = dayObj.date;
  year.innerText = dayObj.years;

  day.classList.add("chat__timestamp__day");
  month.classList.add("chat__timestamp__months");
  date.classList.add("chat__timestamp__date");
  year.classList.add("chat__timestamp__years");
  span.appendChild(day);
  span.appendChild(month);
  span.appendChild(date);
  span.appendChild(year);
  span.classList.add("chat__timestamp");
  chat_messages.appendChild(span);
}
function paintMsg(message) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const content_div = document.createElement("div");
  const span = document.createElement("span");
  const time = getTime();
  const message_time = document.querySelectorAll(".message__timestamp");
  if (time === message_time[message_time.length - 1].textContent) {
    const message_last = document.querySelectorAll(".sent-message");
    const message_last_time = message_last[
      message_last.length - 1
    ].querySelector(".message__timestamp");
    message_last_time.innerText = "";
    span.innerText = getTime();
  } else {
    span.innerText = getTime();
  }
  span.classList.add("message__timestamp");
  content_div.innerText = message;
  content_div.classList.add("message-sent-bubble");
  div.classList.add("message-content");
  div.appendChild(content_div);
  li.appendChild(span);
  li.appendChild(div);
  li.classList.add("sent-message");
  li.classList.add("message");
  chat_messages.appendChild(li);
  //   if (chat_messages.clientHeight > 310) {
  //     chat_screen.classList.add("toBottom");
  //   }
}
function handleSubmit(event) {
  event.preventDefault();
  const message = chat_input.value;
  const day = getDays();
  const lastDay = document.querySelectorAll(".chat__timestamp__day");
  const lastMonth = document.querySelectorAll(".chat__timestamp__months");
  const lastDate = document.querySelectorAll(".chat__timestamp__date");
  const lastYears = document.querySelectorAll(".chat__timestamp__years");
  if (
    day.years !== parseInt(lastYears[lastYears.length - 1].textContent) ||
    day.months !== lastMonth[lastMonth.length - 1].textContent ||
    day.weekday !== lastDay[lastDay.length - 1].textContent ||
    day.date !== parseInt(lastDate[lastDate.length - 1].textContent)
  ) {
    paintDay(day);
    paintMsg(message);
  } else {
    paintMsg(message);
  }

  chat_input.value = "";
}

function init() {
  form.addEventListener("submit", handleSubmit);
}

init();
