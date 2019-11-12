var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

context.beginPath();
context.arc(50, 50, 30, 0, 2 * Math.PI);
context.fillStyle = "red";
context.fill();

context.beginPath();
context.translate(0, 80);
context.arc(50, 50, 30, 0, 2 * Math.PI);
context.fillStyle = "yellow";
context.fill();

context.beginPath();
context.translate(0, 80);
context.arc(50, 50, 30, 0, 2 * Math.PI);
context.fillStyle = "green";
context.fill();
