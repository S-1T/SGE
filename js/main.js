alert();
var game = new SGE.Game(256, 224, "game-container");
var scene = new SGE.Scene(game, 100);
scene.camera.x = 128;
scene.camera.y = 112;
scene.gravityY = 256;
//scene.addAsset("image", "dude", "https://art.ngfiles.com/images/1342000/1342887_artixium_mini-pixel-dude.png?f1594304312")
//var camera = new SGE.Camera()
//scene.camera = camera;


var ground = new SGE.Sprite(scene, 128, 216);
ground.static = true;
ground.width = 256;
ground.height = 16;

var wall1 = new SGE.Sprite(scene, 8, 104);
wall1.static = true;
wall1.width = 16;
wall1.height = 208;

var wall2 = new SGE.Sprite(scene, 248, 104);
wall2.static = true;
wall2.width = 16;
wall2.height = 208;

var box = new SGE.Sprite(scene, 128, 128);
box.width = 16;
box.height = 16;
box.velocityX = 32;
box.bounce = 1;
box.friction = 0.0;

//scene.camera.followObject = box;

var xpParticleConfig = {
	amount: 10,
  size: 8,
  speed: 256,
  bounce: 0.25,
  friction: 0.01
} 

box.onCollision = function() {
	if(this.velocity > 16)
		explodeParticles(this.x, this.y, {
      amount: this.velocity / 16,
      size: 8,
      speed: this.velocity,
      bounce: 0.25,
      friction: 0.05
    });
};

function explodeParticles(x, y, { amount, size, speed, bounce, friction }) {
	for(var i = 0; i < amount; i++) {
  	var p = new SGE.Sprite(scene, x, y);
    p.width = size;
    p.height = size;
    p.bounce = bounce;
    p.friction = friction;
    p.velocityX = speed;
    p.angle = 2*Math.PI*Math.random();
  }
}

scene.start();

