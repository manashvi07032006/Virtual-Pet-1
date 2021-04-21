var dog, happyDog;
var database, foodS, foodStock;
var dogIMG, happyDogIMG;

function preload()
{
	dogIMG = loadImage("Dog1.png");
  happyDogIMG = loadImage("Dog2.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);

  dog = createSprite(250, 300, 20, 20);
  dog.addImage(dogIMG);
  dog.scale = 0.3;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(20);  
}

function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW) && foodS>0){
    writeStock(foodS);
    dog.addImage(happyDogIMG);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogIMG)
  }

  drawSprites();
  textSize(20);
    fill("white");
    text("Food Stock: " + foodS, 180, 100);
    text("Note: Press UP_ARROW key to feed DOG Milk", 30, 50); 
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){ 
if(x<=0){
  x = 0;
}
else{
  x=x-1;
}

  database.ref('/').update({
    Food: x
  })
}