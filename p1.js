console.clear();

// ----------------------------------------------
// Do not modify this code.
// ----------------------------------------------

let canvas = document.getElementById("game");
let context2d = canvas.getContext("2d");
let pacman_model = null;
let snack_pellets = null;
let time_index = 0;
let key = null;
let radius = 20; 
let displacement = 5;
let score = 0;
let paused = true;
let x_pacman = 0;
let y_pacman = 0; 


function hypotenus( a, b ) {
  return Math.sqrt( Math.pow( a, 2 ) + Math.pow(  b, 2 ) );
}

function createSnackPellets() {
  
  let index = 0;
  let pellet_radius = 3;
  let space = 25;
  let path = null; 
  
  for ( let y_pellet = space; y_pellet < canvas.height; y_pellet+= space ) {
  
    for ( let x_pellet = space; x_pellet < canvas.width; x_pellet+= space ) {
    
      if ( hypotenus( ( x_pellet - canvas.width/2 ), ( y_pellet - canvas.height/2 ) )  >  ( radius + space/2 ) ) {
      
        path = new Path2D();
        path.arc( x_pellet, y_pellet, pellet_radius, 0, 2*Math.PI );
        snack_pellets[index++] = { x: x_pellet, y: y_pellet, circle:path };
      }
     
    }
    
  }
  
}

function createModel() {

  pacman_model[0] = new Path2D();
  pacman_model[0].moveTo( 0, 0 );
  pacman_model[0].arc( 0, 0, radius, 0, 2*Math.PI );
  pacman_model[0].lineTo( 0, 0 );
  
  pacman_model[1] = new Path2D();
  pacman_model[1].moveTo( 0, 0 );
  pacman_model[1].lineTo( radius*Math.cos( 25*Math.PI)/180, radius*Math.sin( 25*Math.PI)/180);
  pacman_model[1].arc( 0, 0, radius, 25*Math.PI/180, -25*Math.PI/180 );
  pacman_model[1].lineTo( 0, 0 );
  
  pacman_model[2] = new Path2D();
  pacman_model[2].moveTo( 0, 0 );
  pacman_model[2].lineTo( radius*Math.cos( 45*Math.PI/180), radius*Math.sin( 45*Math.PI/180));
  pacman_model[2].arc( 0, 0, radius, 45*Math.PI/180, -45*Math.PI/180 );
  pacman_model[2].lineTo( 0, 0 );
  
  pacman_model[3] = pacman_model[1];

}

// ----------------------------------------------
// Task 1: Todo - put JS code below.
// ----------------------------------------------

function startGame() {
  x_pacman = canvas.width / 2;
  y_pacman = canvas.height / 2;
  time_index, score = 0;
  pacman_model = new Array();
  snack_pellets = new Array();
  key = "ArrowRight";
  paused = true;
  createModel();
  createSnackPellets();
}




// ----------------------------------------------
// Task 2: Todo - modify the JS code below.
// ----------------------------------------------
document.addEventListener( "keyup", keyEvent );

function keyEvent( event ) {
  if (event.key == 's') {
    startGame();
    console.log("Game start");
  }
  if (event.key == " ") {
    paused = !paused;
    console.log("paused = " + paused);
  }
  if (!paused && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    key = event.key;
    console.log("key = " + key);
  }
}



// ----------------------------------------------
// Task 3: Todo - put JS code below.
// ----------------------------------------------

function draw() {
  // Initialize canvas settings
  let scoreText = document.getElementById("score");
  scoreText.innerText = score;
  context2d.clearRect(0, 0, canvas.clientWidth, canvas.height);
  context2d.fillStyle = "black";
  context2d.strokeStyle = "black";
  context2d.save();

  // Iterate through snack_pellets
  for (let i = snack_pellets.length - 1; i >= 0; i--) {
    let pellet = snack_pellets[i];
    // Calculate distance of pellet from pacman center
    let distance = hypotenus(x_pacman - pellet.x, y_pacman - pellet.y);
    // Remove pellet from array if distance is less than pacman radius / 2 and add 10 to score
    if (distance < radius / 2) {
      snack_pellets.splice(i, 1);
      score += 10;
    }
  }
  // Draw the pellets
  for (let i = 0; i < snack_pellets.length; i++) {
    context2d.fill(snack_pellets[i].circle);
    context2d.stroke(snack_pellets[i].circle);
  }
  // Find min and max x and y for pacman using pacman radius
  const minX = 0 + radius;
  const maxX = canvas.width - radius;
  const minY = 0 + radius;
  const maxY = canvas.height - radius;
  // Ensure that x and y of pacman are within set boundaries
  x_pacman = Math.max(minX, Math.min(maxX, x_pacman));
  y_pacman = Math.max(minY, Math.min(maxY, y_pacman));
  // Translate pacman
  context2d.translate(x_pacman, y_pacman);
  // Rotate pacman according to key
  if (key == "ArrowUp") {
    context2d.rotate((270 * Math.PI) / 180);
  } else if (key == "ArrowLeft") {
      context2d.rotate((180 * Math.PI) / 180);
  } else if (key == "ArrowDown") {
      context2d.rotate((90 * Math.PI) / 180);
  } else if (key == "ArrowRight") {
      context2d.rotate((0 * Math.PI) / 180);
  }
  // If game not paused, displace pcman according to key direction
  if (!paused) {
    if (key == "ArrowUp") {
      y_pacman  -= displacement;
    } else if (key == "ArrowLeft") {
        x_pacman -= displacement;
    } else if (key == "ArrowDown") {
        y_pacman += displacement;
    } else if (key == "ArrowRight") {
        x_pacman += displacement;
    }
  }
  // Draw pacman and increment time_index
  context2d.fillStyle = "yellow";
  context2d.fill(pacman_model[time_index]);
  context2d.stroke(pacman_model[time_index]);
  context2d.restore();
  time_index = (time_index + 1) % 4;
}


// ----------------------------------------------
// Task 4: Todo - put JS code below.
// ----------------------------------------------

startGame();
setInterval(draw, 100);