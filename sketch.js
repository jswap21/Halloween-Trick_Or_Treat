var bgImg;
var score=0;
var gameState=1;


function preload(){

  //loading background Images for different gameState
  bgImg=loadImage("Images/backgroundImg.jpg")
  endbgImg=loadImage("Images/end.jpg");
  theEndImg=loadImage("Images/theend.png")
  TTImg=loadImage("Images/TTImg.jpg")

  //Image for random treats used in serveTreat function
  candy1=loadImage("Images/candy1.png");
  candy2=loadImage("Images/candy2.png");
  candy3=loadImage("Images/candy3.png");
  choco1=loadImage("Images/choco1.png");
  choco2=loadImage("Images/choco2.png");
  choco3=loadImage("Images/choco3.png");
  teddy1=loadImage("Images/teddy1.png");
  teddy2=loadImage("Images/teddy2.png");
  

//bat image
  batImg=loadImage("Images/bat1.png");

//Random ghost images used in ghostCall function
  blueghost=loadImage("Images/ghost/ghostblue.png");
  yellowghost=loadImage("Images/ghost/ghostyellow.png");
  greenghost=loadImage("Images/ghost/ghostgreen.png");

}

function setup() {
createCanvas(windowWidth,windowHeight);
  
 
bat=createSprite(windowWidth/2,windowHeight/2,30,50);
bat.addImage(batImg)

bat.scale=2;
bat.setCollider("rectangle",0,0,150,150);

//creating groups 
candyGroup=new Group();
ghostGroup=new Group();

}


function draw() {
//moving bat with mouse  
bat.x=World.mouseX;
bat.y=World.mouseY;

//Displaying instructions of the game in gameState 1
if(gameState==1){
  textSize(60);
  image(TTImg,0,0,windowWidth,windowHeight)
  fill("white");
  text("Allow bat to collect treats by moving mouse pointer.",displayWidth/2,displayHeight/2);
  text("Beware from ghost!!Game ends if bat touches the ghost. ",displayWidth/2,displayHeight/2+60);
  text("Hit 'Enter' to start the game... ",displayWidth/2,displayHeight/2+120);
  textSize(200)
  text("Happy Halloween",displayWidth/2,displayHeight/2+400);
    
  if(keyDown("Enter")&&gameState==1){
    gameState=2
  }
}


//Actual Game play in gameState 2
if(gameState==2){
  image(bgImg,0,0,windowWidth,windowHeight);
  textSize(50);
  fill("white");
  text("Score : "+score,windowWidth/2,50);
  serveTreat();
  ghostCall();
}

//Game ends in gameState 3
if(gameState==3){
  background(endbgImg)
  textSize(40)
  fill("black")
  text("Score : "+score,windowWidth/2,50);
  text("Hit 'Enter' to restart the game ",windowWidth/2-200,90);
  image(theEndImg,windowWidth-500,50,200,200) 
  }
//Restarting the game
if(keyDown("Enter")&&gameState==3){
  gameState=2
  score=0;
 }
    
 drawSprites(); 
}

//Function to display treats at random position 
function serveTreat(){
//creating treats after some intervals and adding them in the group
if(frameCount%20===0){
  var candy=createSprite(random(10,windowWidth-10), 0,50, 50);
  candyGroup.add(candy)
  candy.velocityX=random(4,-4,8,-8)
  candy.velocityY=random(4,2,-2)
 
  //applying random image
  candy.addImage(random([candy1,candy2,candy3,choco1,choco2,choco3,teddy1,teddy2]))
    
  //setting collider for detection
  candy.setCollider("rectangle",0,0,200,300);

  //changing depth
  candy.depth=bat.depth;
  bat.depth+=1;

  //increasing score and touch detection 
  for(var i=0;i<candyGroup.length;i++){
    if (candyGroup.get(i).isTouching(bat)){
        candyGroup.get(i).destroy();
        score=score+1;
      }
    }
  }
}

//Function for random creation of ghost sprite afer some interval
function ghostCall(){
if(frameCount%40===0){
  ghost=createSprite(random(50,windowWidth-50),0,20,30);
  ghost.addImage("ghost",random([yellowghost,blueghost,yellowghost,greenghost,blueghost]));
  ghost.scale=0.5;

  //ghost following bat
  ghost.x=bat.x-300;
  ghost.y=bat.y-300;

  ghost.velocityX=5
  ghost.velocityY=5;
  ghostGroup.add(ghost);

  //changing depth
  ghost.depth=bat.depth;
  bat.depth+=1;

  //Game end functionality
  for(var i=0;i<ghostGroup.length;i++){
    if (ghostGroup.get(i).isTouching(bat)){
      candyGroup.setVelocityYEach(0);
      ghostGroup.setVelocityYEach(0);
      ghostGroup.destroyEach();
      candyGroup.destroyEach();
      gameState=3    
    }
   }
  }
}
