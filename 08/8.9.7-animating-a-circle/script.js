let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

let x = 50;

window.requestAnimationFrame(drawFrame);


function drawFrame() {
  context.save();
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.arc(x, 50, 30, 0, 2 * Math.PI);
  context.fillStyle = "red";
  context.fill();

  context.restore();

  x++;
  if (x < 150) {
    window.requestAnimationFrame(drawFrame);
  }
}