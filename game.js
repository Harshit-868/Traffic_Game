class Game {
  constructor() {
    this.startTime = 0;
    this.endTime = 0;
    this.crash = false;
    this.road = createSprite(width / 2, height*5 / 2);
    this.car = createSprite(width / 2, 550, 20, 20);
    this.cars = [];

    this.road.addImage("road_Img", roadImg);
    this.road.scale = 8;
    this.road.visible = false;
    this.car.addImage("car_Img", plr);
    this.car.addImage("explode_img", explode);
    this.car.scale = 0.45;
    this.car.depth = 3;
  }
  play() {    
    // set default movement of car to 0
    this.car.velocityX = 0;
    this.car.velocityY = 0;

    // create illusion of infinite forward movement
    if(this.crash == false){
      this.road.velocityY = 15;
      if(this.road.y/2 >= height) {
        game.road.y = height / 2 + 255;
      }
    }

    // move the car left and right
    if (this.crash == false) {
      if (keyIsDown(LEFT_ARROW)) {
        this.car.velocityX -= 8.5;
      } if (keyIsDown(RIGHT_ARROW)) {
        this.car.velocityX += 8.5;
      } if (keyIsDown(UP_ARROW)) {
        this.car.velocityY -= 8.5;
      } if (keyIsDown(DOWN_ARROW)) {
        this.car.velocityY += 8.5;
      }
      this.spawnCars();
    }

    for (var c of this.cars) {
      c.bounciness = 1.5;
      // check for collisions
      if (c.bounceOff(this.car)) {
        this.car.changeImage("explode_img");
        this.car.y -= 15;
        this.road.velocityY = 0;
        c.life = -1;
        if (this.crash == true) {
          this.endTime = frameCount;
        }
        this.crash = true;
      }
      if (c.life == 0) {
        this.cars.splice(c, 1);
      }
    }

    if(this.endTime != 0 && frameCount > this.endTime + 40) {
      location.reload();
    }

    drawSprites();
  }
  spawnCars() {
    // every 50 frames, starting 70 frames after start
    if (frameCount > this.startTime + 70 && frameCount % 50 == 0) {
      // create car sprite
      var x = Math.round(random(20, 610));
      var car = createSprite(x, -40, 10, 10);
      car.velocityY = 24;

      // set random image
      var img = Math.round(random(1, 3));
      car.addImage("car1_img", car1);
      car.addImage("car2_img", car2);
      car.addImage("car3_img", car3);
      car.changeImage("car"+img+"_img");
      car.scale = 0.5;

      car.life = 100;
      car.depth = 2;
      this.cars.push(car);
    }
  }
}