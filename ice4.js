console.clear();

// ----------------------------------------------
// This code is given to you, do not modify.
// ----------------------------------------------

let canvas = document.getElementById("game");
let context2d = canvas.getContext("2d");
let pacman_model = new Array();
let time_index = 0;
let key = null;
let radius = 40;

context2d.fillStyle = "yellow";
context2d.strokeStyle = "black";

document.addEventListener( "keyup", keyEvent );

function keyEvent( event ) {
	key = event.key;
  console.log( key );
}

// ----------------------------------------------
// Task 1: Todo - put JS code below.
// ----------------------------------------------

function createModel() {

  let counterclockwise = true;

  let closed = new Path2D();
  closed.moveTo(0, 0);
  closed.lineTo(radius * Math.cos((0 * Math.PI) / 180), 0);
  closed.arc(0, 0, radius, 0, 2 * Math.PI);
  pacman_model[0] = closed;

  let partial = new Path2D();
  partial.moveTo(0, 0);
  partial.lineTo((radius * Math.cos(-1 * (25 * Math.PI) / 180)), (radius * Math.sin(-1 * (25 * Math.PI) / 180)));
  partial.arc(0, 0, radius, -1 * ((25 * Math.PI) / 180), (25 * Math.PI) / 180, counterclockwise);
  partial.lineTo(0, 0);
  pacman_model[1] = partial;
  pacman_model[3] = partial; 

  let open = new Path2D();
  open.moveTo(0, 0);
  open.lineTo((radius * Math.cos(-1 * (45 * Math.PI) / 180)), (radius * Math.sin(-1 * (45 * Math.PI) / 180)));
  open.arc(0, 0, radius, -1 * ((45 * Math.PI) / 180), (45 * Math.PI) / 180, counterclockwise);
  open.lineTo(0,0);
  pacman_model[2] = open;
}

// ----------------------------------------------
// Task 2: Todo - put JS code below.
// ----------------------------------------------

function draw() {
  context2d.clearRect(0, 0, canvas.clientWidth, canvas.height);
  context2d.save();
  context2d.translate(canvas.width / 2, canvas.height / 2);
  if (key == "ArrowUp") {
    context2d.rotate(-1 * (90 * Math.PI) / 180);
  } else if (key == "ArrowLeft") {
      context2d.rotate(-1 * (180 * Math.PI) / 180);
  } else if (key == "ArrowDown") {
    context2d.rotate(-1 * (270 * Math.PI) / 180);
  } else {
    context2d.rotate((0 * Math.PI) / 180);
  }
  context2d.fill(pacman_model[time_index]);
  context2d.stroke(pacman_model[time_index]);
  context2d.restore();
  time_index = (time_index + 1) % 4;
}

// ----------------------------------------------
// Task 3: Todo - put JS code below.
// ----------------------------------------------
createModel();
setInterval(draw, 150);