radius= 50
minSpeed2 = 12
maxSpeed2 = 16
asteroid2 = [];
timeBetween = 500;
lastTime = 0;
shipLength = 50;
let ship;
astroidPerCycle = 4;
let shipX = 0;
let shipY = 0;
maxAsteroids = 30
gameState = 69
lives = 3
livesRad = 20
invinsible = false
let invinsStart = 0
invinsTime = 500;
let imgA;
let DAscore = 0;
let startTime = 0;
let DAHighScore = 0;
let shipImg;
let dodeAstText;
let lastScore = 0
let soundhit;
let speedupSound;
let flashText = false;
let flashTime = 0;

function game3Setup() {
  clear()
  shipImg = loadImage("dodgeAstShip.png");
  imgA = loadImage('Asteroid.png')
  dodeAstText = loadImage('DodgeAstText.png')
  ship = new Ship();
  DAStartButton = new DARectTextButton(width/2-100,500,200,75,"START",50,'green','white');
  DARestartButton = new DARectTextButton(width/2-100,500,200,75,"RESTART",40,'green','white');
  soundhit = loadSound('ErrorSound.mp3');
  speedupSound = loadSound("SpeedUp.wav");
}


function game3Draw() {
  imageMode(CORNER);
  background(spaceBG);
  switch(gameState){
    case 69:
      drawAsteroids2();
      DAMenu();
      ship.updateShip();
      break;
      
    case 1:
      drawAsteroids2();
      ship.updateShip();
      updateLives();
      timer();
      break
      
    case 2:
      drawAsteroids2();
      endScreen2()    
      break    
  }
  
}

function DAMenu(){
  mainMenuButton.display();
  if(mouseIsPressed && mainMenuButton.over()){
    clear()
    currGame = 0;
    uiSound.play();
    gameState = 69;
    lives = 3;
    startTime = millis();
    asteroid2 = [];
  }
  DAStartButton.display();
  if(mouseIsPressed && DAStartButton.over()){
    gameState = 1;
    lives = 3;
    startTime = millis();
    asteroid2 = [];
    astroidPerCycle = 4;
    uiSound.play();
  }
  imageMode(CENTER);
  image(dodeAstText,width/2,250,1100,100)
  textSize(50);
  fill('green');
  stroke('white');
  strokeWeight(3);
  text("Dont get hit by any asteroids! Watch out they come faster the longer you play!",width/2-525,350,1050);
}
  
function timer(){
  textAlign(CENTER);
  textSize(50);
  stroke('white');
  fill('green');
  text(floor(millis()-startTime),width/2,50);
  noStroke();
  if(floor(millis())-startTime > lastScore+10000){
      astroidPerCycle++;
      lastScore += 10000;
      speedupSound.play();
      flashText = true;
      flashTime = millis();
  }
  if(flashText && millis() < flashTime + 1500){
    textAlign(CENTER)
    textSize(30);
    fill('white');
    text("More Asteroids added!",width/2,85);
  }
}
  
function endScreen2(){
  image(shipImg,shipX,shipY,shipLength,shipLength);
  textSize(100)
  textAlign(CENTER)
  textAlign(CENTER,BASELINE);
  textSize(80);
  stroke('white');
  fill('green');
  if(floor(DAscore) == floor(DAHighScore)){
    text("NEW HIGH SCORE!",width/2,250);
  }else{
    text("NO HIGH SCORE :(",width/2,250);
  }
  text("GAME OVER",width/2,150);
  text("SCORE: " + floor(DAscore),width/2,450);
  text("HIGH SCORE: " + floor(DAHighScore),width/2,350);
  drawAsteroids2();
  DARestartButton.display();
  if(mouseIsPressed && DARestartButton.over()){
    gameState = 1;
    lives = 3;
    startTime = millis();
    asteroid2 = [];
    astroidPerCycle =4;
    uiSound.play();
  }
    mainMenuButton.display();
  if(mouseIsPressed && mainMenuButton.over()){
    clear()
    currGame = 0;
    uiSound.play();
    gameState = 69;
    lives = 3;
    startTime = millis();
    asteroid2 = [];
  }
}
  
function updateLives(){
  textSize(25);
  fill('white');
  textAlign(CENTER,BASELINE)
  text("LIVES",width-40,25);
  for(i = 0; i < lives; i++){
    stroke('white');
    fill('red');
    circle(width-40,60+livesRad*i*2.5,livesRad*2);
    noStroke();
  }
  if(lives == 0){
    gameState = 2;

    DAscore = millis()-startTime;
    if(DAscore > DAHighScore){
      DAHighScore = DAscore
      scoring.play();
    }else{
      soundhit.play();
    }
  }
  if(invinsible && millis() > invinsStart + invinsTime){
    invinsible = false;
  }
  if(invinsible){
    background('rgba(255,0,0,0.39)');
  }
}

function drawAsteroids2(){

  if(millis() > lastTime + timeBetween){
    for(i = 0; i < astroidPerCycle; i++){
      asteroid2.push(new Asteroid());
    }
      lastTime = millis();
  }
  
  for(i = 0; i < asteroid2.length; i++){
    asteroid2[i].drawAsteroid();
  }
  
  if(asteroid2.length > maxAsteroids){
    asteroid2.shift();
  }
}

class Ship{
  constructor(){}
  
  updateShip(){
    imageMode(CENTER);
    image(shipImg,mouseX,mouseY,shipLength,shipLength);
    shipX = mouseX
    shipY = mouseY
  }  
}

class Asteroid{

  constructor(){
    this.x = randomX()
    this.speed = randomSpeed()
    this.y = -radius - random(0,width/2);
  }
  
  drawAsteroid(){
    fill('gold')
    imageMode(CENTER);
    image(imgA,this.x,this.y,radius*2,radius*2)
    this.hitShip()
    this.y += this.speed
  }  
  
  hitShip(){
    let d = dist(this.x,this.y,shipX,shipY)
    if(d <= radius + shipLength/2 && !invinsible && gameState == 1){
      lives--;
      dead.play();
      invinsible = true;
      invinsStart = millis();
    }
  }
}
  
class DARectTextButton{

  constructor(inX,inY,w, h,text,textSize,color,strokeColor){
    this.x = inX;
    this.y = inY;
    this.w = w;
    this.h = h;
    this.text = text;
    this.textSize = textSize;
    this.color = color;
    this.strokeColor = strokeColor;
  }
  
  display() {
    
    // tint the image on mouse hover
    if (this.over()) {
      fill('rgb(0,64,0)');
    }else{
      fill(this.color)
    }
    rectMode(CORNER);
    stroke(this.strokeColor);
    textSize(this.textSize);
    strokeWeight(5);
    rect(this.x,this.y,this.w,this.h);
    fill(this.strokeColor);
    noStroke();
    textAlign(CENTER);
    text(this.text,this.x,this.y+17,this.w,this.h)
  }
  
  // over automatically matches the width & height of the image read from the file
  // see this.img.width and this.img.height below
  over() {
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      return true;
    } else {
      return false;
    }
  }
}

function randomX(){
  return random(radius,width-radius)
}
function randomSpeed(){
  return random(minSpeed2,maxSpeed2)
}