let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

context.beginPath();
context.moveTo(50, 90);
context.lineTo(100, 10);
context.lineTo(150, 90);
context.closePath();
context.fillStyle = "yellow";
context.fill();
context.strokeStyle = "red";
context.lineWidth = 3;
context.stroke();