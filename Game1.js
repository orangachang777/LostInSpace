let alien;
let timeBetweenQuad = 1000;
let alienSpeed = 10;
let timeBetweenThrow = 10;
let alienSize = 75;
let alienX;
let alienY;
let poweringDown = false;
let powerDownTime;
let powerDownTotal;
let powerDownColor = false;
let TAHscore = 0;
let TAHhighScore = 0;
let TAHhighScore2 = 0;
let TAHhighScore3 = 0;
let missed = false;

let lives = 3;
let missedCircles = 6;
let livesObjects = [];
let circeLivesObjects = [];
let livesColors = ['#AF4C4C','#E9F129','#25DA40'];
let circleLivesColors = ['#AF4C4C','#AF4C4C','#FFA03B','#E9F129','#E9F129','#25DA40'];

let needCircles = 3;
let ringColors = ['#AF4C4C8C','#FFA03B9B','#E9F1298E','#25DA40A5'];
let ringColors2 = ['#AF4C4C','#FFA03B','#E9F129','#25DA40'];

let portals = [];
let portalsDrawn = false;
let numPortals = 5;
let portalSizes = [alienSize*4,alienSize*3,alienSize*2];

let spaceShip;
let bg;
let wh;
let oR;
let arrow;
let nextArrow;
let sA;
let menuText;

let mode = 0;
let tutorialMode = 0;
let diff = 0;

let tahRestart;
let TAHmainMenuButton;
let tutButton;
let ezButton;
let normalButton;
let hardButton;

let portalHitSound;
let uiSound;
let speedDown;
let throwSound;
let powerDown;
let hitting;

function game1Setup() {
  clear();
  currGame = 1;
  
  spaceShip = loadImage("Alien.png");
  bg = loadImage("spaceBG.jpg");
  wh = loadImage("wormhole.png");
  oR = loadImage("aRing.png");
  arrow = loadImage("arrow.png");
  sA = loadImage("straightArrow.png");
  nextArrow = loadImage("NextArrow.png");
  menuText = loadImage("TAHText.png");
  
  uiSound = loadSound("UIsound.wav");
  portalHitSound = loadSound("HitPortal.mp3");
  speedDown = loadSound("SpeedDown.wav");
  speedUp = loadSound("SpeedUp.wav");
  throwSound = loadSound("ThrowSound.wav");
  powerDown = loadSound("PowerDown.mp3");
  hitting = loadSound('ErrorSound.mp3');
  
  createCanvas(1280,720);
  alienX = width/2;
  alienY = height/1.25;
  
  livesObjects = [new poly(alienX-157,alienY+50,alienX-145,alienY+80,alienX-190,alienY+80,alienX-190,alienY+50),new poly(alienX-200,alienY+50,alienX-200,alienY+80,alienX-250,alienY+80,alienX-250,alienY+50),new poly(alienX-260,alienY+50,alienX-260,alienY+80,alienX-293,alienY+80,alienX-305,alienY+50)];
  circleLivesObjects = [new poly(alienX-185,alienY+30,alienX-160,alienY+30,alienX-163,alienY,alienX-180,alienY),new poly(alienX-185-35,alienY+30,alienX-160-35,alienY+30,alienX-163-27,alienY,alienX-180-35,alienY),new poly(alienX-185-35*2,alienY+30,alienX-160-35*2,alienY+30,alienX-163-27-35,alienY,alienX-180-35*2,alienY),new poly(alienX-185-35*3,alienY+30,alienX-160-35*3,alienY+30,alienX-163-27-35*2,alienY,alienX-180-35*3,alienY),new poly(alienX-185-35*4,alienY+30,alienX-160-35*4,alienY+30,alienX-163-27-35*3,alienY,alienX-180-35*4,alienY),new poly(alienX-185-35*5+17,alienY+30,alienX-160-35*5,alienY+30,alienX-163-27-35*4,alienY,alienX-180-35*5,alienY)];
  
  alien = new Alien(alienX,alienY,alienSize,alienSize);
  nextTut = new ThrowAliensButton(1025,height/1.5,nextArrow,250,200);
  TAHmainMenuButton = new TAHRectTextButton(width-110,10,100,40,"Menu",30,'rgba(0,255,0,0.17)','green',7);
  tutButton = new TAHRectTextButton(width/2-400-30,height/2+50,200,75,"Tutorial",50,'green','white',15);
  ezButton = new TAHRectTextButton(width/2-200-10,height/2+50,200,75,"Easy",50,'green','white',15);
  normalButton = new TAHRectTextButton(width/2+10,height/2+50,200,75,"Normal",50,'green','white',15);
  hardButton = new TAHRectTextButton(width/2+200+30,height/2+50,200,75,"Hard",50,'green','white',15);
  tahRestart = new TAHRectTextButton(width/2+10,height/1.75,200,75,"Restart",50,'green','white',15);
  endMenuButton = new TAHRectTextButton(width/2 - 210,height/1.75,200,75,"Menu",50,'green','white',15);
}

function game1Draw() {
  imageMode(CORNER);
  background(spaceBG);

  switch (mode) {
    case 0:
      TAHTitleScreen();
      mainMenuButton.display();
      break;
    case 1:
      tutorial();
      TAHmainMenuButton.display();
      break;
    case 2:
      playGame();
      TAHmainMenuButton.display();
      break;
    case 3:
      endScreen();
      break;
  }
}

function TAHTitleScreen(){
  imageMode(CENTER);
  image(menuText,width/2,220,1100,100)
  imageMode(CORNER);
  tutButton.display();
  ezButton.display();
  normalButton.display();
  hardButton.display();
  textSize(40)
  fill('green');
  stroke('white');
  strokeWeight(3);
  text("Throw as many aliens home through the wormholes as possible!",width/2-400,290,800);
  textSize(40);
  stroke('green')
  strokeWeight(5);
  fill('white');
  textStyle(BOLD);
  text("High Scores",width/2,525);
  stroke('green');
  textSize(30);
  fill('white');
  textStyle(NORMAL);
  strokeWeight(3);
  text("Easy:" + TAHhighScore,width/2,570);
  text("Normal:" + TAHhighScore2,width/2,620);
  text("Hard:" + TAHhighScore3,width/2,670);
  mainMenuButton.display();
  if(mouseIsPressed && mainMenuButton.over()){
    currGame = 0;
    uiSound.play();
    clear();
  }
}

function endScreen(){
  strokeWeight(5);
  stroke('white');
  textSize(32);
  fill('green');
  textAlign(CENTER);
  textSize(80);
  let displatScore;
  if(diff == 0){
    displatScore = TAHhighScore;
  }
  if(diff == 1){
    displatScore = TAHhighScore2;
  }
  if(diff == 2){
    displatScore = TAHhighScore3;
  }
  text("GAME OVER", width/2 - 500,height/2-310,1000,500);
  text("SCORE: " + TAHscore, width/2 - 500,height/2-40,1000,500);
  text("HIGH SCORE: " + displatScore, width/2 - 500,height/2-125,1000,500);
  if(TAHscore == displatScore && TAHscore != 0){
    text("NEW HIGH SCORE!", width/2 - 600,height/2-220,1200,500);
  }else{
    text("NO HIGH SCORE :(", width/2 - 500,height/2-220,1000,500);
  }
  tahRestart.display();  
  endMenuButton.display();
}

function mouseClicked(){
  if(currGame == 1 && nextTut.over() && mode == 1){
    uiSound.play();
    tutorialMode++;
    if(tutorialMode == 4){
      mode = 0;
    }
  }

  if(currGame == 1 && tutButton.over() && mode == 0){
    uiSound.play()
    mode = 1;
    tutorialMode = 0;
    resetGame();
  }
  
  if(currGame == 1 && ezButton.over() && mode == 0){
    uiSound.play()
    diff = 0;
    mode = 2;
    resetGame();
  }
  
  if(currGame == 1 && normalButton.over() && mode == 0){
    uiSound.play()
    diff = 1;
    mode = 2;
    resetGame();
  }
  
  if(currGame == 1 && hardButton.over() && mode == 0){
    uiSound.play()
    diff = 2;
    mode = 2;
    resetGame();
  }
  
  if(currGame == 1 && TAHmainMenuButton.over()){
    uiSound.play()
    mode = 0;
  }
  
  if(currGame == 1 && tahRestart.over() && mode == 3){
    uiSound.play()
    mode = 2;
    resetGame();
  }
  
  if(currGame == 1 && endMenuButton.over() && mode == 3){
    uiSound.play()
    mode = 0;
  }
  
  if(TAH.over() && currGame == 0){
    uiSound.play();
    currGame = 1;
    game1Setup();
  }
  
  if(EF.over() && currGame == 0){
    uiSound.play();
    currGame = 2;
    game2Setup();
  }
  
  if(DA.over() && currGame == 0){
    uiSound.play();
    currGame = 3;
    game3Setup();
  }
  
  if(DefA.over() && currGame == 0){
    uiSound.play();
    currGame = 4;
    game4Setup();
  }
  
  if(DefA.over() && currGame == 0){
    uiSound.play();
    currGame = 4;
    game4Setup();
  }
}

function resetGame(){
  portalsDrawn = false;
  portals = [];
  numPortals = 5;
  lives = 3;
  missedCircles = 6;
  TAHscore = 0;
}

function tutorial(){
  switch (tutorialMode) {
    case 0:
      tutorial1();
      break;
    case 1:
      tutorial2();
      break;
    case 2:
      tutorial3();
      break;
    case 3:  
      tutorial4();
      break;
  }
  imageMode(CORNER)
   nextTut.display();
}

function tutorial1(){
  accelerationRings();
  drawPortals();
  drawLives();
  image(arrow,width/2,575,alienSize*2.5,alienSize*2.5);
  alien.draw();
  strokeWeight(3);
  stroke('white');
  textSize(32);
  fill('green');
  textAlign(CENTER);
  text("Put cursor on alien and move it in a circle inside the rings.", width/2,height/2);
}

function tutorial2(){
  accelerationRings();
  drawPortals();
  drawLives();
  alien.draw();
  strokeWeight(3);
  stroke('white');
  textSize(32);
  fill('green');
  textAlign(CENTER);
  text("After 3 successful circle within the rings fast enough, the rings turns green and the alien is ready to be thrown. When the mouse is moved outside the rings it will go that direction", width/2 - 500,height/2.25,1000,500);
}

function tutorial3(){
  accelerationRings();
  drawPortals();
  drawLives();
  alien.draw();
  strokeWeight(3);
  stroke('white');
  textSize(32);
  fill('green');
  textAlign(CENTER);
  text("You only have 3 misses and you can only make 6 mistakes powering up shown by bars on the left of rings", width/2 - 500,height/2.25,1000,500);

}

function tutorial4(){
accelerationRings();
  drawPortals();
  drawLives();
  alien.draw();
  strokeWeight(3);
  stroke('white');
  textSize(32);
  fill('green');
  textAlign(CENTER);
  text("Throw as many aliens home through the wormholes and get the highest score possible.Good Luck!", width/2 - 500,height/2.25,1000,500);
}

function tutorialAlien(a){ 
  let x = alienX + alienSize*cos(-PI/2);
  let y = alienY + alienSize*sin(-PI/2);
  imageMode(CENTER);
  
  if(a < 2){
    image(arrow,alienX,alienY,alienSize*2.5,alienSize*2.5);
  }
  
  if(a == 2){
    translate(500,400)
    rotate(-3*PI/4);
    image(sA,0,0,300,50);
    rotate(3*PI/4);
    translate(-500,-400)
  }
}

function playGame(){
  accelerationRings();
  drawPortals();
  drawLives();
  alien.draw();
}

function drawLives(){
  fill(ringColors[alien.getCircles()]);
  stroke(ringColors2[alien.getCircles()]);
  
  if(poweringDown){
    if(millis() > powerDownTotal + 50){
      powerDownTotal += 100
      powerDownColor = !powerDownColor;
    }  
    if(powerDownColor){
      fill(ringColors[0]);
      stroke(ringColors2[0]);
    }else{
      fill('rgba(255,255,255,0.56)');
      stroke('white');
    }
  }
  
  textSize(30);
  strokeWeight(5)
  
  quad(alienX-150,alienY+40,alienX-130,alienY+90,alienX-300,alienY+90,alienX-320,alienY+40);
  quad(alienX-350,alienY+40,alienX-150,alienY+40,alienX-155,alienY-10,alienX-370,alienY-10);
  quad(alienX+350+20,alienY+40,alienX+150+2,alienY+40,alienX+155,alienY-10,alienX+370+20,alienY-10);
  quad(alienX+150+2,alienY+40,alienX+130+7,alienY+90,alienX+300,alienY+90,alienX+320,alienY+40);
  
  textAlign(CENTER,BASELINE);
  if(alien.getCircles() > 0 && alien.getCircles() < 3){
    strokeWeight(1);
    fill('white');
    text("Powering Up",905,603)
  }
  if(alien.getCircles() == 0 && !poweringDown){
    strokeWeight(1);
    fill('white');
    text("No Power",907,603)
  }
  if(alien.getCircles() == 3){
      strokeWeight(1);
      fill('white');
      text("Full Power",890,603)
  }  
  if(poweringDown){
    strokeWeight(1);
    fill('white');
    if(!missed){
      text("Powering Down",905,603);
    }else{
      text("Miss",905,603);
    }
    if(millis() > powerDownTime + 1500){
      poweringDown = false;
      missed = false;
    }
  }
  
  text("Score:" + TAHscore,855,653);
  
  for(i = 0; i < lives; i++){
    fill(livesColors[i]);
    stroke(livesColors[i]);
    livesObjects[i].draw();
  }
  for(i = 0; i < missedCircles; i++){
    fill(circleLivesColors[i]);
    stroke(circleLivesColors[i]);
    circleLivesObjects[i].draw();
  }
  if((lives == 0 || missedCircles == 0) && mode != 1){
    mode = 3;
    if(TAHscore > TAHhighScore && diff == 0){
      TAHhighScore = TAHscore;
      scoring.play();
    }else{
      if(diff == 0){
        hitting.play();
      }
    }
    
    if(TAHscore > TAHhighScore2 && diff == 1){
      TAHhighScore2 = TAHscore;
      scoring.play();
    }else{
      if(diff == 1){
        hitting.play();
      }
    }
    
    if(TAHscore > TAHhighScore3 && diff == 2){
      TAHhighScore3 = TAHscore;
      scoring.play();
    }else{
      if(diff == 2){
        hitting.play();
      }
    }
  }
  

}

function drawPortals(){
  if(!portalsDrawn){
    for(i = 0; i < numPortals; i++){
      portals.push(new Portal(alienSize*2 + alienSize*3.5*i,height/4));
    }
    portalsDrawn = true;
  }else{
    for(i = 0; i < numPortals; i++){
      portals[i].draw();   
      portals[i].collision(i);
    }
  }
}

function accelerationRings(){
  ringColor = alien.getCircles();
  stroke(ringColors[ringColor]);
  strokeWeight(alienSize+20)
  noFill();
  if(poweringDown){
    if(powerDownColor){
      stroke(ringColors2[0]);
    }else{
      stroke('rgba(255,255,255,0.46)');
    }
  }
  circle(alienX,alienY,alienSize*2);
  imageMode(CENTER);
  tint(ringColors2[ringColor]);
  if(poweringDown){
    if(powerDownColor){
      tint(ringColors2[0]);
    }else{
      tint('white');
    }
  }
  image(oR,alienX,alienY,alienSize,alienSize);
  image(oR,alienX,alienY,alienSize*4,alienSize*4);
  noTint();
}

class Portal{
  constructor(x,y,diff){
    this.x = x + random(-20,20);
    this.y = y + random(-30,30);
    this.Adjustor = +random(0,alienSize*1.5);
    this.diff = diff;
  }
  
  draw(){
    imageMode(CENTER);
    image(wh,this.x,this.y,portalSizes[diff] + this.Adjustor,portalSizes[diff] + this.Adjustor);
  }
  
  collision(i){
    stroke('black');
    strokeWeight(5);
    let distance = dist(this.x,this.y,alien.getX(),alien.getY());
    stroke('white');
    if(distance < portalSizes[diff]/8+alienSize/2){
      alien.setPortal(this.x,this.y,i);
    }
  }
}

function removePortal(i){
  portals.splice(i,1);
  portalHitSound.play();
  numPortals--;
  TAHscore++;
  if(numPortals == 0){
    portalsDrawn = false;
    numPortals = 5;
  }
}

function setPowerDown(a){
  if(a != 1){
    missedCircles--;
  }else{
    missed = true;
  }
  powerDown.play();
  poweringDown = true;
  powerDownTime = millis();
  powerDownTotal = powerDownTime;
}

class Alien{
  constructor(x,y,radius,length){
    this.radius = radius;
    this.angle = PI/2;
    this.v1 = createVector(this.radius,0);
    this.x = x;
    this.y = y;
    this.length = length;
    this.adjustor = 20;
    this.outDist = dist(this.x,this.y,this.x+this.radius+this.length/2+this.adjustor,this.y);
    this.inDist = dist(this.x,this.y,this.x+this.radius-this.length/2,this.y);
    this.aX = this.x + this.radius*cos(this.angle);
    this.aY = this.y + this.radius*sin(this.angle);
    this.lastCircle = 0;
    this.numCircles = 0;
    this.currTime = 0;
    this.outX = 0;
    this.outY = 0;
    this.dx = 0;
    this.dy = 0;
    this.count = 0;
    this.unitVector = 1;
    this.speed = alienSpeed;
    this.inX = 0;
    this.inY = 0;
    this.thrown = false;
    this.hitPortal = false;
    this.pX = 0;
    this.pY = 0;
    this.pRadius = alienSize/1.5;
    this.change = 1;
    this.randomDir = random(0,1);
    this.dir = 1;
    if(this.randomDir == 0){
      this.dir = -1;    
    }
    this.played = false;
  }
  
  draw(){
    let curr = this.getQuad();
    this.outsideMap();
    if(!this.hitPortal && !poweringDown){
      this.handleThrowing(curr); 
    }
    if(this.hitPortal){
      this.intoPortal();
    }
    this.drawShip();
    this.lastCircle = curr;
  }
  
  outsideMap(){
    if(this.aX + this.length < 0 || this.aX - this.length > width || this.aY + this.length < 0 || this.aY - this.length > height){
      alien = new Alien(alienX,alienY,alienSize,alienSize);
      lives--;
      setPowerDown(1);
    }
  }
  
  intoPortal(){
    this.aX = this.pX + this.pRadius*cos(this.angle);
    this.aY = this.pY + this.pRadius*sin(this.angle);
    this.angle += 0.1*this.dir;
    this.length -= 1;
    this.pRadius -= 0.5;
    if(this.length == 1){
      removePortal(this.i);
      alien = new Alien(alienX,alienY,alienSize,alienSize);
    }
  }
  
  drawShip(){
    imageMode(CENTER);
    image(spaceShip,this.aX,this.aY,this.length,this.length);
  }
  
  handleThrowing(curr){
    if(this.inCircle() && this.onAlien()){
      this.getNumCircles(this.lastCircle,curr);
      this.angle = atan2(mouseY-this.y,mouseX-this.x);
    }else{
      if(abs(this.numCircles) > 1 && abs(this.numCircles) < needCircles){
          setPowerDown();
          this.numCircles = 0;
      }
      if(abs(this.numCircles) > needCircles){
        this.inX = this.aX;
        this.inY = this.aY;
        this.outTime = millis();
      }
      if(this.outTime > 0 && millis() > this.outTime + timeBetweenThrow && !this.thrown){
        this.dx = mouseX - this.inX;
        this.dy = mouseY - this.inY;
        this.unitVector = 1/sqrt(pow(this.dx,2)+pow(this.dy,2));
        this.thrown = true;
        throwSound.play();
      }
      this.numCircles = 0;
    }
    if(this.dx != 0){
      this.count++;
    }
    this.aX = this.x + this.radius*cos(this.angle) + this.dx*this.unitVector*this.count*this.speed;
    this.aY = this.y + this.radius*sin(this.angle) + this.dy*this.unitVector*this.count*this.speed;
  }
  
  inCircle(){    
    let distance = dist(this.x,this.y,mouseX,mouseY);
    let inCircle = false;
    
    if(distance > this.inDist && distance < this.outDist){
      inCircle = true;
    }
    return inCircle
  }
  
  getNumCircles(lastCircle,curr){
    let time = millis()
    if(lastCircle > 0){
      if(lastCircle+1 == curr || lastCircle-3 == curr){
        this.played = false;
        if(this.numCircles < 0){
          if(abs(this.numCircles) > 1){
            setPowerDown();
          }
          this.numCircles = 0;  
        }
        this.currTime = time;
        this.numCircles += 0.25;
      }  
      if(lastCircle-1 == curr || lastCircle+3 == curr){
        this.played = false;
        if(this.numCircles > 0){
          if(abs(this.numCircles) > 1){
            setPowerDown();
          }
          this.numCircles = 0;
        }
        this.currTime = time;
        this.numCircles -= 0.25;
      }
      
      if(abs(this.numCircles) % 1.25 == 0 && this.numCircles != 0 && !this.played){
        speedUp.play();
        this.played = true;
      }
      
      if(lastCircle == curr && time > this.currTime + timeBetweenQuad) {
        this.played = false;
        if(this.numCircles > 1){
          setPowerDown();
        }
        this.numCircles = 0;
      }
    }
  }
  
  getQuad(){
      if(mouseX <= this.x && mouseY <= this.y){
        return 1;
      }
      if(mouseX > this.x && mouseY <= this.y){
        return 2;
      }
      if(mouseX <= this.x && mouseY > this.y){
        return 4;
      }
      if(mouseX > this.x && mouseY > this.y){
        return 3;
      } 
  }
  
  onAlien(){
    if(mouseX > this.aX - this.length/2-this.adjustor && mouseX < this.aX + this.length/2+this.adjustor && mouseY > this.aY - this.length/2-this.adjustor && mouseY < this.aY + this.length/2+this.adjustor){
      if(this.startAngle == 0){
        this.startAngle = this.angle;
      }
      return true;
    }
    return false;
  }
  
  getX(){
    return this.aX;
  }
  
  getY(){
    return this.aY;
  }
  
  setPortal(x,y,i){
    if(!this.hitPortal){
      this.angle = atan2(this.aY - y,this.aX - x);
      this.i = i;
    }
    this.hitPortal = true;
    this.pX = x;
    this.pY = y;
  }
  
  getCircles(){
    if(floor(abs(this.numCircles)-0.25) > 3){
      return 3;
    }
    if(this.numCircles == 0){
      return 0;
    }
    return floor(abs(this.numCircles)-0.25);
  }

}

class ThrowAliensButton{

  constructor(inX, inY, inImg, w, h) {
    this.x = inX;
    this.y = inY;
    this.img = inImg;
    this.w = w;
    this.h = h;
  }
  
  display() {
    stroke(0);
    
    // tint the image on mouse hover
    if (this.over()) {
      tint('green');
    } else {
      noTint();
    }
    
    image(this.img, this.x, this.y, this.w, this.h);
    noTint();
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

class TAHRectTextButton{

  constructor(inX,inY,w, h,text,textSize,color,strokeColor,adj){
    this.x = inX;
    this.y = inY;
    this.w = w;
    this.h = h;
    this.text = text;
    this.textSize = textSize;
    this.color = color;
    this.strokeColor = strokeColor;
    this.adj = adj
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
    textAlign(CENTER,TOP);
    text(this.text,this.x,this.y+this.adj,this.w,this.h)
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

class poly{
  constructor(p1,p2,p3,p4,p5,p6,p7,p8){
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
    this.p4 = p4
    this.p5 = p5
    this.p6 = p6
    this.p7 = p7
    this.p8 = p8
  }
  
  draw(){
    quad(this.p1,this.p2,this.p3,this.p4,this.p5,this.p6,this.p7,this.p8);
  }
}