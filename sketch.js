 var ghost,ghostImage,tower,towerImage,door,doorImage,climber;
 var climberImage,block;

var doorsGroup,climbersGroup,blocksGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  ghostImage=loadImage("ghost-standing.png");
  towerImage=loadImage("tower.png");
  climberImage=loadImage("climber.png");
  doorImage=loadImage("door.png");
}
function setup(){
createCanvas(600,600); 
  
 tower=createSprite(300,300,600,600);
 tower.addImage(towerImage);
 tower.velocityY=5;
  
 ghost=createSprite(300,300,20,20);
 ghost.addImage(ghostImage);
 ghost.scale=0.5;
 
 doorsGroup=new Group();
 climbersGroup=new Group();
 blocksGroup=new Group();
  
} 
function draw(){
background("black");
 
if(gameState===PLAY){ 

  if(tower.y>600){
    tower.y=300;
  }
  
if(keyDown("space")){
  
  ghost.velocityY=-3;
}
  ghost.velocityY=ghost.velocityY+1;
  
}
if(keyDown("LEFT_ARROW")){  
  ghost.velocityX=-4;
} 
  
if(keyDown("RIGHT_ARROW")){
 ghost.velocityX=4;

}
spawnDoors();
          
if(climbersGroup.isTouching(ghost)){
  ghost.velocityY=0;
  climbersGroup.velocityY=0;
   blocksGroup.velocityY=0;
   doorsGroup.velocityY=0; 
}
if(blocksGroup.isTouching(ghost)||ghost.y>600){
  ghost.destroy();
  climbersGroup.destroyEach(); 
  doorsGroup.destroyEach();
  blocksGroup.destroyEach();
  //tower.velocityY=0;
  gameState=END;
}
  drawSprites();
  if(gameState===END){
    fill("yellow");
    textSize(30);
    text("Game Over",250,300);
    
  }
}

function spawnDoors(){
  
 if(frameCount%200===0){
   door=createSprite(Math.round(random(80,400)),50,10,10);
   door.addImage(doorImage);
   door.velocityY=5;
   door.lifetime=70;
   climber=createSprite(door.x,105,door.width,5);
   climber.addImage(climberImage);
   climber.velocityY=5;
   
   block=createSprite(door.x,115,climber.width,5);
   block.debug=true;
   block.velocityY=5;
   
   doorsGroup.add(door);
   climbersGroup.add(climber);
   blocksGroup.add(block);
 }
}