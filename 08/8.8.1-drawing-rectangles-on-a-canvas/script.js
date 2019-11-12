var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

context.fillStyle = "orange";
context.fillRect(5, 10, 200, 75);

context.strokeStyle = "royalblue";
context.lineWidth = 6;
context.strokeRect(120, 30, 100, 40);
