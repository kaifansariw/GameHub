let board;
let boardwidth=360;
let boardHeight=640;
 let context;
 //brd
let birdwidth =34;
let birdheight=24;
let birdx= boardwidth/8;
let birdy=boardHeight/2;
let birdImg;

let bird ={
    x: birdx,
    y:birdy,
    width: birdwidth,
    height: birdheight

};
//sticks
let pipeArray =[];
let pipeWidth =64;
let pipeHeight=512;
let pipeX = boardwidth;
let pipeY = 0;
let topPipeImg;
let bottomPipeImg;

//formulas
let velocityX = -2; // Speed of pipe movement
 let gravity = 0.5; // Gravity  on bird
 let birdVelocityY = 0;
 //let velocityY=0;
 let gameOver = false;
let score =0;

 window.onload=function() {
    board= document.getElementById("board"); 
    board.height= boardHeight;
    board.width=boardwidth;
    context =board.getContext("2d");    
     
 
    birdImg= new Image();
    birdImg.src ="bird.png";
    birdImg.onload= function(){
      context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    
};
topPipeImg =new Image();
topPipeImg.src = "toppipe.png";
bottomPipeImg= new Image();
bottomPipeImg.src="bottompipe.png";

requestAnimationFrame(update);
setInterval(placePipes, 1500); //1.5 sec
document.addEventListener("keydown",moveBird);
};
context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
function update(){
     requestAnimationFrame(update);
     if(gameOver){
         
        return;
     }
     context.clearRect(0, 0, board.width, board.height);
     
 birdVelocityY += gravity;
    bird.y += birdVelocityY;
    //brd
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    
    //for fall down
    if(bird.y> board.height) {
        gameOver=true;
    }
for (let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x +=velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        
        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            score +=0.5;
            pipe.passed = true; 
        }
      if (detectCollision(bird,pipe)){
        gameOver=true;

      }
}

   context.fillStyle ="white";
   context.font="45px sans-serif";
   context.fillText(score,5,45);
   if (gameOver){
    context.fillText("Game Over",90,90);
   }

}
function placePipes(){
    if (gameOver){
        return;
    }
    
     let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
     let openingSpace= board.height/4;
     let topPipe ={
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed:false
         
    };
    pipeArray.push(topPipe);

    let bottompipe ={
        img: bottomPipeImg,
        x:pipeX,
        y:randomPipeY + pipeHeight + openingSpace ,
        width: pipeWidth,
        height: pipeHeight,
        passed:false
    };
    pipeArray.push(bottompipe);
}
function moveBird(e) {
    if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyX") {
        birdVelocityY = -6; // Move the bird up
        playJumpSound(); 
    }
}

function detectCollision(a,b){
    let collision= a.x < b.x +b.width  &&
           a.x + a.width > b.x &&
           a.y< b.y +b.height &&
           a.y + a.height > b.y; 
           if (collision) {
            playCollisionSound(); // Play collision sound when there's a collision
        }
    return collision; 
         }
function restartGame() {
    location.reload(); // Reload the page
}
function playJumpSound() {
    document.getElementById("jumpSound").play();
}
function playCollisionSound(){
    document.getElementById("collisionSound").play();
}
function toggleMute() {
    let audioElements = document.getElementsByTagName("audio");
    for (let i = 0; i < audioElements.length; i++) {
        audioElements[i].muted = !audioElements[i].muted;
    }
}

window.restartGame = restartGame;
window.toggleMute = toggleMute;
