//const Engine = Matter.Engine;
//const World = Matter.World;
//const Bodies = Matter.Bodies;
//const Body = Matter.Body;
var foodS,foodStock,database,happyDog,dog,dogImg;
var feed,addFood;
var fedTime, LastFed;
var foodObj;
var updateFoodStock,getFoodStock,getFedTime,deductFoodStock;

function preload()
{
  dogImg = loadImage("images/dog.png")
  happyDog = loadImage("images/happyDog.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)
  
  dog = createSprite(350,350,50,50)
  dog.addImage(dogImg)
  dog.scale = 0.2
  
  feed=createButton("feed the dog")
  feed.position(650,95)
  feed.mousePressed(feedDog);

  addFood=createButton('Add Food');
  addFood.position(750,95)
  addFood.mousePressed(addFoods)

 

  
}

function draw() {  
  background(46,139,87)
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    LastFed=data.val();
  });

  fill(255,255,254)
  textSize(15)
  if(LastFed>=12) {
    text("Last Feed :"+LastFed%12 + "PM", 350,30);
  } else if(LastFed==0){
    text("Last Feed : 12 AM", 350,30);
  } else{
    text("Last Feed :"+ LastFed + "AM", 350,30)
  }
  drawSprites();
}


function readStock(data) {
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function addFoods() {
  foodS++;
  dog.addImage(dogImg);
  database.ref('/').update({
    Food:foodS
  })

}

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour
  })
}


