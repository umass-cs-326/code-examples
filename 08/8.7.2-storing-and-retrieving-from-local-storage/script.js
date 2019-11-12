let playerNameWidget = document.getElementById("playerName");
let difficultyLevelWidget = document.getElementById("diffLevel");

if (localStorage.getItem("playerName")) {
  console.log("loading value from local storage: " + localStorage.getItem("playerName"));
  playerNameWidget.value = localStorage.getItem("playerName");
  difficultyLevelWidget.value = localStorage.getItem("difficultyLevel");
}

document.getElementById("saveBtn").addEventListener("click", function () {
  console.log("saving value from form to local storage: " + playerNameWidget.value);
  localStorage.setItem("playerName", playerNameWidget.value);
  localStorage.setItem("difficultyLevel", difficultyLevelWidget.value);
});