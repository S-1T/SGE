alert();
var game = new SGE.Game(800, 600, "game-container");
var scene = new SGE.Scene(game, 30);

var box = new SGE.Sprite(scene, 100, 100);

scene.start();
