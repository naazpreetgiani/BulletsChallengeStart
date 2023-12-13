// Click Detect Challenge

//Canvas Setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let mouseIsPressed = false;
let mouseX, mouseY;
let leftPressed = false;
let rightPressed = false;

let player = {
    x: cnv.width / 2,
    y: 550,
    r: 30,
    color: "blue"
};

// Circles Array
let circles = [];
for (let n = 1; n <= 5; n++) {
    circles.push(randomCircle());
}

let bullets = [];
for (let n = 1; n <= 5; n++) {
    bullets.push(shoot());
}

window.addEventListener("load", draw)

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    //Draw Boundary
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white"
    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(800, 500);
    ctx.stroke();
   
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.r, 0, 2 * Math.PI)
    ctx.fill();

   for (let i = 0; i < circles.length; i++) {
       moveCircle(circles[i]);
       drawCircle(circles[i]);
    }

 requestAnimationFrame(draw);
}

//Circle Stuff

function drawCircle(aCircle) {
 ctx.lineWidth = 3;   
 ctx.strokeStyle = `${aCircle.c}`;
 ctx.beginPath();
 ctx.arc(aCircle.x, aCircle.y, aCircle.r, 0, 2 * Math.PI)
 ctx.stroke();
}

function moveCircle(aCircle) {
    aCircle.y += aCircle.ys;
    aCircle.x += aCircle.xs;

    //Check for collisions with canvas boundaries
    if (aCircle.x - aCircle.r < 0 || aCircle.x + aCircle.r > cnv.width) {
        aCircle.xs = -aCircle.xs;
    }

    if (aCircle.y - aCircle.r < 0 || aCircle.y + aCircle.r > cnv.height) {
        aCircle.ys = -aCircle.ys;
    }

    if (aCircle.y + aCircle.r > 500) {
        aCircle.y = 500 - aCircle.r; // Reset the position to be just above the line
        aCircle.ys = -aCircle.ys; // Reverse the y-speed
    }
}

function randomCircle() {
   return {
        x: randomInt(0, cnv.width),
        y: randomInt(0, cnv.height),
        r: randomInt(10, 50),
        xs: randomInt(1, 5),
        ys: randomInt(1, 5),
        c: randomRGB
    }
}

// Event Listeners & Handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function keydownHandler(e) {
    //Check for keys pressed
  if (e.code === "ArrowLeft") {
      leftPressed = true;
    } else if (e.code === "ArrowRight") {
      rightPressed = true;
  }
  
  if (leftPressed) {
      player.x -= 7;
    } else if (rightPressed) {
      player.x += 7;
    }

    if (player.x - player.r < 0) {
        player.x = player.r;
    } else if (player.x + player.r > cnv.width) {
        player.x = cnv.width - player.r;
    }
}

function keyupHandler(e) {
    //Check for keys pressed
   if (e.code === "ArrowLeft") {
      leftPressed = false;
    } else if (e.code === "ArrowRight") {
      rightPressed = false;
    } 
}

function mousedownHandler() {
    mouseIsPressed = true;
    if (mouseIsPressed) {
        for (let i = 0; i < bullets.length; i++) {
            let bullet = bullets[i];         
            moveBullet(bullet);
            for (let j = 0; j < circles.length; j++) {
                let circle = circles[j];
                let distance = Math.sqrt((bullet.x - circle.x) ** 2 + (bullet.y - circle.y) ** 2);

                if (distance <= bullet.r + circle.r) {
                    // Handle collision, e.g., remove the bullet and circle
                    bullets.splice(i, 1);
                    circles.splice(j, 1);
                }

                if (bullet.y > 0) {
                   bullet.y -= 2;
                }   
            }   
        }
    }
}

function shoot() {
    return {
        x: player.x,
        y: player.y,
        r: 5,
        s: 3,
        c: randomRGB()
    }
}  

function drawBullet(aBullet) {
    ctx.lineWidth = 3;   
    ctx.strokeStyle = `${aBullet.c}`;
    ctx.beginPath();
    ctx.arc(aBullet.x, aBullet.y, aBullet.r, 0, 2 * Math.PI)
    ctx.stroke();
}

function moveBullet(aBullet) {
    console.log(aBullet.y);
    aBullet.y += aBullet.s;
   
    if (aBullet.y > 600) {
       aBullet.y = 0;
    }
}

function mouseupHandler() {
    mouseIsPressed = false;
}