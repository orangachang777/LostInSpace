let menuButton;
let startButtonImg;
let currGame = 0;
let buttons = [];
let menuButton1 = null;
let menuButton2 = null;
let menuButton3 = null;
let menuButton4 = null;
let mainMenuButton = null;
let buttonWidth2 = 300;
let buttonHeight2 = 100;
let buffer = 10   
let aliens;
let ShipX = 0;
let ShipY = 0;
let l;
let spaceBG;
let dead;
let scoring;
let bgSound;

 function preload(){
   startButtonImg = loadImage("Start-Button-Vector-PNG.png");
   menuButtonImg = loadImage("Images.png");
   img1 = loadImage("Start-Button-Vector-PNG.png");
   aliens = loadImage("pixil-frame-0.png");
   beam = loadImage("Beam.png");
   l = loadImage("L.png");
   title = loadImage("starwarsfont.png");
   
  //Game 2 Levers
  startButton1 = loadImage("StartButton.png");
  
  retryButton1 = loadImage("retryButton.png");
  
  menuButtonImage = loadImage("menuButton.png");

  bgTint = loadImage("MetalBG.jpg");
  bg = loadImage("MetalBG.jpg");

  leverBG = loadImage("leverBG.jpg");
  leverBGTint = loadImage("leverBG.jpg");

  metalFrame = loadImage("metalFrame.png");
  metalFrameTint = loadImage("metalFrame.png");

  metalSign = loadImage("MetalSign.png");
  metalSignTint = loadImage("MetalSign.png");

  leverHead = loadImage("LeverHead.png");
  leverHeadTint = loadImage("LeverHead.png");

  monitor = loadImage("monitor.png");
  monitorTint = loadImage("monitor.png");

  leverBody = loadImage("LeverBody.png");
  leverBodyTint = loadImage("LeverBody.png");
  spaceBG = loadImage("spaceBG.jpg");
   
  uiSound = loadSound("UIsound.wav");
  dead = loadSound("sound.wav");
  scoring = loadSound('score.mp3');
   bgSound = loadSound("backgroundmusic.webm");
   bgSound.setVolume(0.25);
   
  //Game 2 Levers
 }

function setup() {
  createCanvas(1280, 720);
  mainMenuButton = new TAHRectTextButton(10,10,200,60,"MAIN MENU",30,'green','white',17);
}

function draw() {
  if (!bgSound.isPlaying()) {
    bgSound.play();
  }
  switch(currGame){
    case 0: 
      mainMenu();
      break;
    case 1: 
      game1Draw();
      break;
    case 2: 
      game2Draw();
      break;
    case 3: 
      game3Draw();
      break;
    case 4: 
      game4Draw();
      break;
  }
}

class Button2{
  constructor(x,y,xSize,ySize,img,doThis){
    this.x = x
    this.y = y
    this.img = img
    this.xSize = xSize;
    this.ySize = ySize;
    this.doThis = doThis
    this.a = null;
  }    
  display(){
      this.check_click();
      this.img.resize(this.xSize,this.ySize);
    if(this.over()){
         tint(20, 250, 204);
      }else{
        noTint();
      }
      this.a = image(this.img,this.x,this.y);
      noTint();
  }
  over(){
     if (mouseX > this.x && mouseX < this.x + this.img.width && mouseY > this.y && mouseY < this.y + this.img.height) {
      return true;
    } else {
      return false;
    }  
  }
  
  check_click() {
    if (mouseIsPressed && this.over() ) this.doThis();
  }
}

function mainMenu(){
  imageMode(CORNER);
  background(spaceBG);
  image(title, 80, 200);
  displayButtons();  
  if (currGame == 2) {
    resetVariables();
    changeScreen(0);
  }

}


function displayButtons(){
  TAH = new MenuRectTextButton(width/2-330,430,"THROW ALIENS HOME",25);
  EF = new MenuRectTextButton(width/2-110,430,"ESCAPE THE FREEZER",25);
  DA = new MenuRectTextButton(width/2+110,430,"DODGE ASTEROIDS",25);
  DefA = new MenuRectTextButton(width/2+330,430,"DEFLECT ASTEROIDS",25);

  TAH.display();
  EF.display();
  DA.display();
  DefA.display();
}

class MenuRectTextButton{

  constructor(x,y,txt,size){
    this.x = x;
    this.y = y;
    this.text = txt;
    this.size = size;
  }
  
  display() {
    if (this.over()) {
      fill('#0F5412');
    }else{
      fill('rgb(0,141,0)')
    }

    stroke('white');
    textSize(this.size);
    strokeWeight(5);
    rectMode(CENTER);
    rect(this.x,this.y,200,75);
    fill('white');
    noStroke();
    textAlign(CENTER);
    text(this.text,this.x,this.y,180,55)
  }
  
  // over automatically matches the width & height of the image read from the file
  // see this.img.width and this.img.height below
  over() {
    if (mouseX > this.x - 100 && mouseY > this.y - 75/2 && mouseX < this.x + 100 && mouseY < this.y + 75/2) {
      return true;
    } else {
      return false;
    }
  }
}
















