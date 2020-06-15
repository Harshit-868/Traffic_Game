var bg, roadImg, traffic, plr, life, car1, car2, car3, explode;
var game, btn, y;
var t1 = 30;
var state = "start";

function preload() {
  bg = loadImage("images/bg.png");
  roadImg = loadImage("images/road.png");
  traffic = loadImage("images/traffic.png");
  plr = loadImage("images/car.png");
  life = loadImage("images/life.png");
  car1 = loadImage("images/car1.png");
  car2 = loadImage("images/car2.png");
  car3 = loadImage("images/car3.png");
  explode = loadImage("images/explode.png");
}

function setup() {
  createCanvas(650, 630);
  btn = createButton("Start!");
  game = new Game();
}

function draw() {
  if (state == "start") {
    background(bg);
  }

  textAlign(CENTER);
  textFont('Georgia');
  textStyle(BOLDITALIC);
  textSize(60);
  fill("white");
  text("Traffic☆ io", 320, 125);
  image(traffic, 200, 175, 220, 260);

  btn.position(550, 500);
  btn.mousePressed(() => {
    game.startTime = frameCount;
    state = "play";
    btn.remove();
    game.road.visible = true;
  });

  if (state == "play") {
    background(50, 50, 50);
    game.play();
  }
}