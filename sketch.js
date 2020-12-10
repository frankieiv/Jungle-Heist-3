var gameState = "level0"
var jake, jakeImage
var background
var counter = 0;
var score = 0
var treeGroup,coinGroup

function preload(){
  jakeImage = loadAnimation("images/boy1.PNG","images/boy2.PNG","images/boy3.PNG")
  jakeTouching = loadImage("images/boy4.PNG")
  Alien1Image = loadAnimation("images/Alien1.PNG","images/Alien2.PNG","images/Alien3.PNG","images/Alien4.PNG")
  Alien2Image = loadImage("images/Alien2.PNG")
  Alien3Image = loadImage("images/Alien3.PNG")
  Alien4Image = loadImage("images/Alien4.PNG")
  Alien8Image = loadImage("images/Alien8.PNG")

  jungleImage = loadImage("images/Jungle.jpg")
  jungleMoving = loadImage("images/Capture2.PNG")
  jungleStart = loadImage("images/background.jpg")
  
  t1 = loadImage("images/tree1.png")
  t2 = loadImage("images/tree2.png")
  t3 = loadImage("images/tree3.png")

  coinImage = loadImage("images/coin.png") 
  handImage = loadImage("images/Hand.PNG")
  mapImage = loadImage("images/Map.png")
  storyImage = loadImage("images/Story.png")
  titleImage = loadImage("images/JungleHeistTitle.png")
  guideImage = loadImage("images/Guide.png")


}

function setup() {
  createCanvas(displayWidth, displayHeight);
  bg = createSprite(displayWidth/2, displayHeight/2,10,10)
  //add the image as required
  //background.addImage(jungleImage)
  bg.scale = 1
 

  jake1 = createSprite(278,366,50,50)
  jake1.addImage(jakeTouching) 
  jake1.scale = 0.5
  jake1.visible = false
  
  //jake.setCollider()
  jake = createSprite(278,displayHeight-200,50,50)
  jake.addAnimation("walk",jakeImage) 
  jake.scale = 1.1
  jake.visible = false
  jake.debug = true
  jake.setCollider("rectangle",0,0,70,150)


  invisibleGround = createSprite(0,displayHeight-50,800,20)
  invisibleGround.visible = false
  
  alien = createSprite(100,displayHeight-200,50,50)
  alien.addAnimation("running",Alien1Image)
  alien.visible = false
  alien.scale = 1.4
  alien.debug = true
  alien.setCollider("rectangle", 0,0,100,100)

  changePage=createButton("Change");
  changePage.position(1000,305);

  tt1 = createSprite(displayWidth/2,300,60,60)
  tt1.visible = true
  tt1.addImage(titleImage)
  
  tt3 = createSprite(displayWidth/2-200,500,60,60)
  tt3.visible = false
  tt3.shapeColor = "blue"
  tt3.addImage(mapImage)
  
  tt2 = createSprite(displayWidth/2,500,60,60)
  tt2.visible = false
  tt2.shapeColor = "green"
  tt2.addImage(handImage)

  tt4 = createSprite(displayWidth/2,700,120,120)
  tt4.visible = false
  tt4.shapeColor = "black"
  tt4.addImage(storyImage)

  tt5 = createSprite(displayWidth/2-200,500,120,120)
  tt5.visible = false
  tt5.shapeColor = "black"
  tt5.addImage(guideImage)


  //groups
  treeGroup = createGroup ()
  coinGroup = createGroup ()
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
        case 1 :  tt2.visible=true;
        tt3.visible=true;
        break;
        
        case 2 :
        tt4.visible = true;
        tt2.visible=false;
        tt3.visible=false;
        break;
        
        case 3 : gameState = "level1"
        console.log(gameState)
        tt1.visible = true
        tt2.visible = false
        tt3.visible = false
        tt4.visible = false;
        tt5.visible = false;
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
    tt5.visible = true;
    console.log(gameState)
    tt1.visible = true
    tt2.visible = false
    tt3.visible = false
    tt4.visible = false;
    

    textSize(20)
    text("press space to begin",300,300)
    tt5.visible = true

    if(keyDown("space")){
      tt5.visible = false
      gameState = "level2"
      bg.velocityX =-3
    }
  }
 
  
  //level 2 - trees
  if(gameState==="level2"){
    bg.addImage(jungleMoving)

    changePage.hide()
    background.visible = true
    alien.visible = true
    jake.visible = true

    if(bg.x<0){
      bg.x = 900
    }

    jake.collide(invisibleGround)
    console.log(jake.y)
    if(keyDown("space")&&jake.y>displayHeight-600){
      jake.velocityY = -23
    }

    jake.velocityY +=0.9    
    spawnTrees()

    if(jake.isTouching(treeGroup)){
      jake.velocityX = 0
      jake.velocityY = 0
      bg.velocityX = 0
      treeGroup.setVelocityXEach(0)
      treeGroup.setLifetimeEach(-2)
      console.log("gameover")
    }

    if(jake.isTouching(coinGroup)){
      score = score + 1
    }
    
    textSize(24)
    text("Score : "+score,displayWidth-200,70)


  }
  


  //level 3 -flamethrower



  // level 5 - end
  
  drawSprites();
  fill("red")
  strokeWeight(5)
  stroke("black")
  textSize(44)
  text("Score : "+score,displayWidth-200,70)
}

function spawnTrees(){
  if(frameCount%180===0){
    var trees = createSprite(displayWidth, displayHeight - 101, 50, 100)
    trees.shapeColor = "black"
    trees.velocityX = -7
    trees.lifetime = 800
    //images for tree
    r = Math.round((1,3))
    switch(r){
     case 1 : trees.addImage(t1)
     trees.debug = true
     trees.setCollider("rectangle", 0,0,150,40)
     break;
     case 2 : trees.addImage(t2)
     trees.debug = true
     trees.setCollider("rectangle", 0,0,150,40)
     break;
     case 3 : trees.addImage(t3)
     trees.debug = true
     trees.setCollider("rectangle", 0,0,150,40)
     break;
     default : console.log("error")
     break;
    }
    treeGroup.add(trees)
  }
}

function spawnCoins(){
  if(frameCount%220===0){
    var coins = createSprite(displayWidth, displayHeight - 501, 50, 100)
    coins.velocityX = -9
    coins.lifetime = 800
    coins.addImage(t1)
    coinGroup.add(coins)
  }
}
