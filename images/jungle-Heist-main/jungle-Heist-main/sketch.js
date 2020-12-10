var gameState = "level0"
var jake, jakeImage
var background
var counter = 0;


function preload(){
  jakeImage = loadAnimation("images/boy1.PNG","images/boy2.PNG","images/boy3.PNG")
  jakeTouching = loadImage("images/boy4.PNG")
  Alien1Image = loadAnimation("images/Alien1.PNG","images/Alien2.PNG","images/Alien3.PNG","images/Alien4.PNG")
  Alien2Image = loadImage("images/Alien2.PNG")
  Alien3Image = loadImage("images/Alien3.PNG")
  Alien4Image = loadImage("images/Alien4.PNG")
  Alien8Image = loadImage("images/Alien8.PNG")

  jungleImage = loadImage("images/Jungle.jpg")
  jumgleMoving = loadImage("images/Capture2.PNG")
  jungleStart = loadImage("images/background.jpg")
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  bg = createSprite(displayWidth/2, displayHeight/2,10,10)
  //add the image as required
  //background.addImage(jungleImage)
  bg.scale = 1

  title = createSprite(displayWidth/2, displayHeight/2,10,10) 
  
  jake1 = createSprite(278,366,50,50)
  jake1.addImage(jakeTouching) 
  jake1.scale = 0.5
  jake1.visible = false

  jake = createSprite(278,366,50,50)
  jake.addAnimation("walk",jakeImage) 
  jake.scale = 0.5
  jake.visible = false

  alien = createSprite(100,360,50,50)
  alien.addAnimation("running",Alien1Image)
  alien.visible = false

  changePage=createButton("Change");
  changePage.position(800,95);

  t1 = createSprite(200,100,60,60)
  t1.visible = false
  t1.shapeColor = "red"
  t2 = createSprite(200,200,60,60)
  t2.visible = false
  t2.shapeColor = "green"
  t3 = createSprite(200,300,60,60)
  t3.visible = false
  t3.shapeColor = "blue"

  t4 = createSprite(100,500,120,120)
  t4.visible = false
  t4.shapeColor = "black"

  //groups
  treeGroup = createGroup ()
}

function draw() {
  background("white")
  //introduction - level 0
  if(gameState==="level0"){ 
  bg.addImage(jungleStart)
  
    changePage.mouseClicked(()=>{
      console.log(counter)
      counter +=1
      switch(counter){
        case 1 :  t1.visible=true;
        break;
        case 2 : t2.visible=true;
        t1.visible=false;
        break;
        case 3 : t2.visible=false;
        t1.visible=false;
        t3.visible = true
        break;
        case 4 : gameState = "level1"
        console.log(gameState)
        t1.visible = false
        t2.visible = false
        t3.visible = false
        changePage.hide()
        console.log("from level 0 gamestate changing to : "+gameState)
        break;
        default : console.log("error!!!!!!!!! clicked too many times")
        break;  
      }
    })
  }
  
  //level 1 - tutorials - instruction
  if(gameState==="level1"){
    console.log(gameState)
    t1.visible = false
    t2.visible = false
    t3.visible = false
    textSize(20)
    text("press space to begin",300,300)
    t4.visible = true

    if(keyDown("space")){
      gameState = "level2"
    }
  }
  
  
  //level 2 - trees
  if(gameState==="level2"){
    background.addImage(jungleMoving)
    changePage.hide()
    background.visible = true
    alien.visible = true
    jake.visible = true



    spawnTrees()
  }
  


  //level 3 -flamethrower



  // level 5 - end
  
  drawSprites();
}

function spawnTrees(){
  if(frameCount%180===0){
    var trees = createSprite(displayWidth, displayHeight - 101, 50, 100)
    trees.shapeColor = "black"
    trees.velocityX = -7
    trees.lifetime = 800
    //images for tree
    treeGroup.add(trees)
  }
}










