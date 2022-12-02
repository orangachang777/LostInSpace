let screen = 0;
let paused = false;

let passcodeIN = "";
let genPasscode = "";
let score = 0;
let pTimer = 0;
let pLimit = 300;

let pBarPercent = 0;

let tintTimer = 0;
let tintThreshold = 150;
let tintPeriod = 180;

let tutorialTitle = "TUTORIAL";
let tutorialText =
  "Oh no! You're locked in the alien's meat freezer! You have little time to get out. Remember the passcode shown, and pull the levers in the right order! \n Good luck.";

let loseText = "You died."
let winText = "You lived!"

let bgT;
let leverBGT;
let metalFrameT;
let metalSignT;
let monitorT;
let leverHeadT;
let leverBodyT;

function game2Setup(){
  currGame = 2
  createCanvas(1280, 720);

  alarm = loadSound('alarm.mp3');
  leverBeep = loadSound('LeverBeep.mp3');
  scoreSound = loadSound('score.mp3');
  breakCore = loadSound('breakCore.mp3');
  pipe = loadSound('MetalPipe.mp3');
  errorSound = loadSound('ErrorSound.mp3');
  EMFtext = loadImage("EscapeFreezerText.png");
  
  bgT = createGraphics(width, height);
  bgT.tint(204, 0, 60);
  bgT.image(bgTint, 0, 0, width, height);

  leverBGT = createGraphics(500, 520);
  leverBGT.tint(204, 0, 60);
  leverBGT.image(leverBGTint, 0, 0, 500, 520);

  metalFrameT = createGraphics(500, 520);
  metalFrameT.tint(204, 0, 60);
  metalFrameT.image(metalFrameTint, 0, 0, 500, 520);

  metalSignT = createGraphics(150, 80);
  metalSignT.tint(204, 0, 60);
  metalSignT.image(metalSignTint, 0, 0, 150, 80);

  monitorT = createGraphics(200, 100);
  monitorT.tint(204, 0, 60);
  monitorT.image(monitorTint, 0, 0, 200, 100);

  leverHeadT = createGraphics(50, 50);
  leverHeadT.tint(204, 0, 60);
  leverHeadT.image(leverHeadTint, 0, 0, 50, 50);

  leverBodyT = createGraphics(width, height);
  leverBodyT.tint(204, 0, 60);
  leverBodyT.image(leverBodyTint, 0, 0, width, height);

  lever1 = new Lever(700, 200, 200, 360, "1");
  lever2 = new Lever(800, 200, 200, 360, "2");
  lever3 = new Lever(900, 200, 200, 360, "3");
  lever4 = new Lever(1000, 200, 200, 360, "4");

  startButton1.resize(230, 130);
  menuButtonImage.resize(230, 130);
  retryButton1.resize(230, 130);
  leverBG.resize(500, 520);
  monitor.resize(200, 100);
  metalFrame.resize(500, 520);
  leverHead.resize(50, 50);
  metalSign.resize(150, 80);

  startButton = new TAHRectTextButton(width/2-100,550,200,75,"START",50,'green','white',15);
  retryButton = new Button3(300, 500, retryButton1);
  menuButton22 = new Button3(700, 500, menuButtonImage);

  textSize(width / 30);
  textAlign(CENTER);
}

function game2Draw(){

background(0);
  
  if (tintTimer % tintPeriod > tintThreshold) {
    if (!alarm.isPlaying()) {
      alarm.play();
    }
  } else {
    alarm.stop();
  }
  
  if (tintTimer % tintPeriod > tintThreshold) {
    image(bgT, 0, 0);
  } else {
    image(bg, 0, 0);
  }
  rectMode(CORNERS);
  if (screen == 0) {
    image(spaceBG, 0, 0);
    textSize(width / 30);
    textAlign(CENTER, CENTER);
    fill('green');
    stroke('white');
    rect(200, 170+50, 1080, 470+50);
    noStroke();
    fill(255);
    text(tutorialText, 200, 170+50, 880, 350);
    text(tutorialTitle, 200, 70+50, 880, 250);
    startButton.display();

    if (startButton.over() && mouseIsPressed) {
      screen = 1;
      noTint();
    }
    noTint();
    image(EMFtext,width/2-550,90,1100,100);
    mainMenuButton.display();
    if(mouseIsPressed && mainMenuButton.over()){
      currGame = 0;
      uiSound.play()
      resetVariables();
      screen = 0;
      clear();
    }
  }
  if (screen == 1) {
    tintTimer++;

    if (tintTimer % tintPeriod > tintThreshold) {
      image(leverBGT, 600, 100);
      image(bgT, 0, 0);
    } else {
      image(leverBG, 600, 100);
      image(bg, 0, 0);
    }
    if (tintTimer % tintPeriod > tintThreshold) {
      image(metalFrameT, 600, 100);
    } else {
      image(metalFrame, 600, 100);
    }

    if (mouseIsPressed && mouseWithinLever(lever1)) {
      lever1.move();
    } else {
      lever1.show();
    }
    if (mouseIsPressed && mouseWithinLever(lever2)) {
      lever2.move();
    } else {
      lever2.show();
    }
    if (mouseIsPressed && mouseWithinLever(lever3)) {
      lever3.move();
    } else {
      lever3.show();
    }
    if (mouseIsPressed && mouseWithinLever(lever4)) {
      lever4.move();
    } else {
      lever4.show();
    }
    
    

    //function to generate passcode for the first time and after success.
    if (genPasscode == "") {
      generatePasscode();
    }

    if (tintTimer % tintPeriod > tintThreshold) {
      image(monitorT, 200, 270);
    } else {
      image(monitor, 200, 270);
    }
    //monitor for generated passcode

    textAlign(CENTER, CENTER);
    if (pTimer < pLimit) {
      pTimer++;
      text(genPasscode, 0, 70, 600, 500);
    }
    //Generated passcode

    if (tintTimer % tintPeriod > tintThreshold) {
      image(metalSignT, 25, 280);
    } else {
      image(metalSign, 25, 280);
    }
    //sign for OUT

    text("OUT", 0, 70, 200, 500);
    //OUT text

    if (tintTimer % tintPeriod > tintThreshold) {
      image(monitorT, 200, 370);
    } else {
      image(monitor, 200, 370);
    }
    //monitor for inputed passcode

    text(passcodeIN, 0, 70, 600, 700);
    //Inputed passcode

    if (tintTimer % tintPeriod > tintThreshold) {
      image(metalSignT, 25, 380);
    } else {
      image(metalSign, 25, 380);
    }
    //Sign for IN

    text("INPUT", 0, 70, 200, 700);
    //INPUT text
    if (checkPasscode(passcodeIN) && passcodeIN.length == 4) {
      score++;
      scoreSound.play();
      passcodeIN = "";
      genPasscode = "";
      pLimit -= 25;
      pTimer = 0;
    } else if (!checkPasscode(passcodeIN)) {
      passcodeIN = "";
      genPasscode = "";
      pLimit -= 25;
      pTimer = 0;
      errorSound.play();
    }
    //function to check if passcode is the same, sends user to fail screen
    //if string length of 4 is reached and passcode is not the same.
    //Updates score++ and pLimit, resets pTimer if success, and back to function one. Clears generated
    //as well.

    //display score
    if (tintTimer % tintPeriod > tintThreshold) {
      image(metalSignT, 25, 585);
    } else {
      image(metalSign, 25, 585);
    }

    text("SCORE", 0, 300, 200, 650);

    if (tintTimer % tintPeriod > tintThreshold) {
      image(monitorT, 200, 575);
    } else {
      image(monitor, 200, 575);
    }

    text(score, 0, 300, 600, 650);

    fill(200);
    rect(25, 25, 500, 75);
    fill(255, 0, 0);
    rect(30, 30, (465*pBarPercent)/100 + 30, 70);
    fill(255);
    
    
    
    if (pBarPercent < 100) {
      pBarPercent = 3.25*tintTimer/180;
      tintPeriod *= 0.99999;
      tintThreshold *= 0.99999;
    } else {
      changeScreen(2);
    }
    
    
    if (score == 10) {
      changeScreen(3);
    }
    
    if (keyCode == ESCAPE && keyIsPressed) {
      changeScreen(4);
    }
  }
  if (screen == 2) {
    image(spaceBG, 0, 0);
    mainMenuButton.display();
    if(mouseIsPressed && mainMenuButton.over()){
      currGame = 0;
      uiSound.play()
      resetVariables();
      screen = 0;
      clear();
    }
    text(loseText, 0, 0, 1280, 420);
    retryButton.display();
    if (!pipe.isPlaying()) {
      pipe.play();
    }
    if (retryButton.over() && mouseIsPressed) {
      screen = 0;
      noTint();
      resetVariables();
    }
    
  }
  if (screen == 3) {
    image(spaceBG, 0, 0);
    mainMenuButton.display();
    if(mouseIsPressed && mainMenuButton.over()){
      currGame = 0;
      uiSound.play()
      resetVariables();
      screen = 0;
      clear();
    }
    text(winText, 0, 0, 1280, 420);
    retryButton.display();
    if (!breakCore.isPlayint()) {
      breakCore.play();
    }
    if (retryButton.over() && mouseIsPressed) {
      screen = 0;
      noTint();
      resetVariables();
    }
    
  }
  if (screen == 4) {
    mainMenuButton.display();
    if(mouseIsPressed && mainMenuButton.over()){
      currGame = 0;
      uiSound.play()
      resetVariables();
      screen = 0;
      clear();
    }
    fill(150, 100);
    rect(0, 0, 1280, 720);
    fill(255);
    text("PAUSED", 0, 0, 1280, 720);
    if (keyCode == ESCAPE && keyIsPressed) {
      changeScreen(1);
    }
  }
}

function changeScreen(screenNum) {
  screen = screenNum;
}

function resetVariables() {
  passcodeIN = "";
  genPasscode = "";
  score = 0;
  pTimer = 0;
  pLimit = 300;

  pBarPercent = 0;

  tintTimer = 0;
  tintThreshold = 150;
  tintPeriod = 180;
}

class Lever {
  constructor(leverX, leverY, leverYPlaceholder, anchorY, id) {
    this.leverX = leverX;
    this.leverY = leverY;
    this.anchorY = anchorY;
    this.leverYPlaceholder = leverY;
    this.id = id;
  }
  show() {
    leverBody.resize(30, Math.abs(this.leverY - this.anchorY));

    if (tintTimer % tintPeriod > tintThreshold) {
      image(
        leverBodyT,
        this.leverX - 15,
        this.leverY,
        30,
        Math.abs(this.leverY - this.anchorY)
      );
      image(leverHeadT, this.leverX - 25, this.leverY - 25);
    } else {
      image(leverBody, this.leverX - 15, this.leverY);
      image(leverHead, this.leverX - 25, this.leverY - 25);
    }
      text(this.id, this.leverX, this.leverY);
    this.leverY = this.leverYPlaceholder;
  }
  move() {
    if (tintTimer % tintPeriod > tintThreshold) {
      if (mouseY < this.anchorY) {
        image(
          leverBodyT,
          this.leverX - 15,
          mouseY,
          30,
          Math.abs(mouseY - this.anchorY)
        );
      } else {
        leverBody.resize(30, Math.abs(mouseY - this.anchorY));
        image(
          leverBodyT,
          this.leverX - 15,
          this.anchorY,
          30,
          Math.abs(mouseY - this.anchorY)
        );
      }
    } else {
      if (mouseY < this.anchorY) {
        leverBody.resize(30, Math.abs(mouseY - this.anchorY));
        image(leverBody, this.leverX - 15, mouseY);
      } else {
        leverBody.resize(30, Math.abs(mouseY - this.anchorY));
        image(leverBody, this.leverX - 15, this.anchorY);
      }
    }
      
    if (tintTimer % tintPeriod > tintThreshold) {
      image(leverHeadT, this.leverX - 25, mouseY - 25);
    } else {
      image(leverHead, this.leverX - 25, mouseY - 25);
    }
      text(this.id, this.leverX, mouseY);
    this.leverY = mouseY;
    if (
      this.leverY >
      Math.abs(this.leverYPlaceholder - this.anchorY) + this.anchorY + 10
    ) {
      this.leverY = this.leverYPlaceholder;
      passcodeIN = passcodeIN + this.id;
      leverBeep.play();
    }
  }
}

function generatePasscode() {
  genPasscode =
    str(int(random(1, 5))) +
    str(int(random(1, 5))) +
    str(int(random(1, 5))) +
    str(int(random(1, 5)));
}

function checkPasscode(password) {
  if (password == genPasscode.substring(0, password.length)) {
    return true;
  } else {
    return false;
  }
}

function mouseWithinLever(Lever) {
  return (
    Math.abs(mouseX - Lever.leverX) < 25 && Math.abs(mouseY - Lever.leverY) < 25
  );
}

class Button3 {
  constructor(inX, inY, inImg) {
    this.x = inX;
    this.y = inY;
    this.img = inImg;
  }
  display() {
    stroke(0);
    // tint the image on mouse hover
    if (this.over()) {
      tint(204, 0, 128);
    } else {
      noTint();
    }
    image(this.img, this.x, this.y);
  }
  over() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.img.width &&
      mouseY > this.y &&
      mouseY < this.y + this.img.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}
