var game = new SGE.Game(256, 224, "game-container");
var scene = new SGE.Scene(game, 30);

scene.addAsset("image", "box", "https://iconarchive.com/download/i86721/uiconstock/e-commerce/e-commerce-icon.ico");

var box;

scene.create = function() {
	box = new SGE.Sprite(scene, 100, 100, "box");
};

scene.update = function() {
	box.x += 16/scene.fps;
	box.rotation += 3.1416/scene.fps;
};

scene.start();
