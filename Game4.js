width = 1280
height = 720
radius = 20;
endX = width/2
endY = height - radius*5
let a = [];
minSpeed = 150;
maxSpeed = 200;
recW = radius*6;
recH = radius;
let b = null;
rectY = endY - radius;
let lives2 = 3;
let livesRad = 20;
let score2 = 0;
let mode2 = 420;
let asteroidDelay = 1500;

let img;
let blast;

var sound;
var playerScore = 0;
let menuText2;
let HS2 = 0;
let delayUpdated = false;
let missedAst = false;
let missedTime = 0;
let missSound;
let hitSound;
let flashText2 = false;
let flashTime2 = 0;

function game4Setup() {
  createCanvas(1280, 720);
  b = new Base();
  png = loadImage('Asteroid.png');
  //blast = loadSound('mixkit-whip-small-explosion-1519.mp3');  
  menuText2 = loadImage("DeflectAstText.png");
  textAlign(CENTER,BASELINE);
  makeAsteroids();
  missSound = loadSound('ErrorSound.mp3')
  hitSound = loadSound("SpeedUp.wav");
}

function game4Draw() {
  imageMode(CORNER);
  background(spaceBG);
  switch (mode2) {
    case 420:
      defelectAsteroidsStartScreen();
      break;
    case 0:
      playDefelectAsteroids();
      break;
    case 1:
      defelectAsteroidsendScreen();
      break;
  }
}

function defelectAsteroidsStartScreen(){  
  drawAsteroids();
  b.show();
  let startButton = new TAHRectTextButton(width/2-100,500,200,75,"START",50,'green','white',15);
  startButton.display();
  imageMode(CENTER);
  image(menuText2,width/2,250,1100,100)
  textSize(50);
  fill('green');
  stroke('white');
  strokeWeight(3);
  text("Dont let any asteroids by the deflector! Watch out they come faster the longer you play!",width/2-525,350,1050);
  if(mouseIsPressed && startButton.over()){
    mode2 = 0;
    a = [];
    uiSound.play();
    lives2 = 3;
  }
  mainMenuButton.display();
  if(mouseIsPressed && mainMenuButton.over()){
    clear()
    currGame = 0;
    uiSound.play();
  }    
}

function defelectAsteroidsendScreen(){
  drawAsteroids();
   let resetButton = new TAHRectTextButton(width/2-100,500,200,75,"RESTART",40,'green','white',17);
  textAlign(CENTER,BASELINE);
  textSize(80);
  stroke('white');
  fill('green');
  if(HS2 == score2 && score2>0){
    text("NEW HIGH SCORE!",width/2,250);
  }else{
    text("NO HIGH SCORE :(",width/2,250);
  }
  text("GAME OVER",width/2,150);
  text("SCORE: " + score2,width/2,450);
  text("HIGH SCORE: " + HS2,width/2,350);
  mainMenuButton.display();
  if(mouseIsPressed && mainMenuButton.over()){
    clear()
    mode2 = 420;
    currGame = 0;
    lives2 = 3;
    score2 = 0;
    a = [];
    asteroidDelay = 1500;
    uiSound.play();
  }
    resetButton.display();
  if(mouseIsPressed && resetButton.over()){
    mode2 = 0;
    lives2 = 3;
    score2 = 0;
    a = [];
    asteroidDelay = 1500;
    uiSound.play();
  }
  b.show();
  
}  

function playDefelectAsteroids(){
  drawAsteroids();
  drawLives2();
  b.show();
  textAlign(CENTER);
  textSize(50);
  stroke('white');
  text(score2,width/2,20);
  noStroke();
  if(missedAst && millis() < missedTime + 250){
    rectMode(CORNER);
    fill('rgba(255,0,0,0.22)');
    rect(0,0,width,height);    
  }else{
    missedAst = false;
  }
  if(flashText2 && millis() < flashTime2 + 1500){
    textAlign(CENTER)
    textSize(30);
    fill('white');
    text("Asteroids are coming faster!",width/2,85);
  }
}

function makeAsteroids(){
  if(currGame == 4){
    a.push(new Asteroid2())
    setTimeout(makeAsteroids,asteroidDelay);
  }
}

function drawAsteroids(){
  for(i = 0;i < a.length;i++){
    a[i].show();
  }
  if(a.length > 30){
    a.shift();
  }
}

function drawLives2(){
  textSize(25);
  fill('white');
  text("LIVES",width-40,10);
  for(i = 0; i < lives2; i++){
    stroke('white');
    fill('red');
    circle(width-40,60+livesRad*i*2.5,livesRad*2);
    noStroke();
  }
  if(lives2 == 0){
    mode2 = 1;

    if(score2 > HS2){
      HS2 = score2;
      scoring.play();
    }else{
      missSound.play();
    }
  }
}

class Asteroid2{
  constructor(i){
    this.x = randomNum(-width/4, width*1.25);
    this.y = 0 - radius;
    this.speed = randomNum(minSpeed,maxSpeed);
    endX = randomNum(radius*6, width - radius*6);
    this.dx = (endX - this.x)/this.speed;
    this.dy = (endY - this.y)/this.speed;
    this.dead = false;
    this.collided = false;
  }
  
  show(){
    imageMode(CENTER);
    image(png, this.x, this.y,radius*2,radius*2);
    this.x += this.dx;
    this.y += this.dy;    
    ///collision//
    if(this.x > b.getX() - recW/2 && this.x < b.getX() + recW/2 && this.y > rectY - recH/2 - radius-5 && this.y < rectY + recH/2 && !this.collided){
      hitSound.play();
      this.collided = true;
      this.dy = -this.dy 
      if(mode2 == 0){
        score2+=100;
        if(score2% 1000 == 0 && score2> 0 && !delayUpdated && asteroidDelay > 500){
          asteroidDelay -= 50;
          delayUpdated = true;
          flashText2 = true;
          flashTime2 = millis();
        }else{
          delayUpdated = false
        }
      }
    }
    if(this.y - radius > height && !this.dead){
      lives2--;
      if(mode2 == 0){
        dead.play();
      }
      this.dead = true;
      missedAst = true;
      missedTime = millis();
    }
  }
  
  getX(){
    return this.x;
  }
  
  getY(){
    return this.y;
  }
}

class Base{
  constructor(){
    this.x = width/2;
  }
  show(){
    rectMode(CENTER);
    if(mode2 != 1){
      this.x = mouseX;
    }
    fill('green');
    stroke('white')
    strokeWeight(3)
    rect(this.x,rectY,recW,recH);
    noStroke();
  }
  getX(){
    return this.x   
  }
    
}

function randomNum(min,max){
  return random(min,max);
}

function offScreen(x,y){
  if(x + radius < 0){
    return true
    //blast.play();
  }
  
  if(x - radius > width){
    return true
    //blast.play();
  }
  
  if(y + radius < 0){
    return true
    //blast.play();
  }
  
  if(y - radius > height){
    return true
    //blast.play();   
  }
  
  return false
}
