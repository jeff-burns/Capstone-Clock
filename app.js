//CURRENT TIME CLOCK
const ONE_SEC = 1000; // milliseconds
function update() {
  document.querySelector("#clock").textContent =
    "Current Time - " + moment().format("ddd h:mm:ss a");
}
setInterval(update, ONE_SEC);
//TIME-PICKER
const dropDown = document.querySelector("#alarm-time");
console.log(dropDown);
const timeNow = moment();
const numTimes = 60 * 24; // every  minute over next 24 hours
const data = {};

for (let i = 0; i < numTimes; i++) {
  const optionTime = document.createElement("option");
  const timeStr =
    i > 0
      ? timeNow.add(1, "minute").format("ddd, h:mm a")
      : timeNow.format("ddd, h:mm a");
  optionTime.setAttribute("value", timeStr);
  optionTime.setAttribute("class", "options");
  optionTime.textContent = timeStr;
  dropDown.appendChild(optionTime);
}
//FETCH POST ONCE TIME IS PICKED
function setAlarm() {
  let timeSet = dropDown.value;
  data.alarmOnOff = true;
  data.alarmTime = timeSet;
  console.log(data);
  sendAlarmSettings(data);
}

var URL = "https://young-ridge-65381.herokuapp.com/alarmSettings";

function sendAlarmSettings(data) {
  console.log(data);
  fetch(URL, {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify(data)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response);
    });
}

fetch(URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response);
  });
