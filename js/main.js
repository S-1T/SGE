var game = new SGE.Game(256, 224, "game-container");
var scene = new SGE.Scene(game, 60);

scene.addAsset("image", "box", "https://iconarchive.com/download/i86721/uiconstock/e-commerce/e-commerce-icon.ico");

scene.addAsset("audio", "robot-twitch", "https://preview-downloads.customer.envatousercontent.com/files/80738235/preview.mp3?response-content-disposition=attachment;filename=6815040_hitech-cybernetic-device_by_art-of-sound_preview.mp3&Expires=1950534196&Signature=fQY6d-TyNZitARgMspdMeakBfdSS7dw8ZVBf9-ZySl45mX4FRG400z1bPI63D6sXA~zlogCg~ZjO1WdoyYqajyGIcVuENuXDJPHkITFY6cPqenRx7R5w5Wf26yvXS8sms5Uccp44ihaYtrxRdRu~1U3fYhHjfosDJpuEMCfH0QC2amu5wKG~woUqKGk-~6sRiZ5Y9r595PN5t60I~pJsN4SYKnP5pNlQOoDML888w422aZwnlRYaIWKdsb3npwBrAvZ4YcNyc-QCZIWg-ghiuU2~ZdEQqcUzvPk4lj5Tr~DLllS0GL6EWF4I~7HXEwJwUpmqn0hJGQPAC42o535INqxrJiIYZeYAeQRcxbPjEuGpweB~AtGpF8uXU87aBXtWOHyKawbUPIC5w6Ayp~acZYaXMrBjvjjpAOJ6ICtfKXxbQV524BMDnHjtmqknsjmE2210vXteHaZtIhUYf7YdnPpKsvQDg1CiypDPuT6apCxZFb3v6AG-CAt~teiJww5I863fs-XBvMIYzvc7GHg6AGkOc3XqwkHzLboK8J4vNi5cBPW~DcNfPvMd6SB2hV3gJQhhk0HwiNDl6m4swDH-nzzvS200fj0kFDRJKwJ-gGYV5YtyxHvztgm~c~4eMnNOAEGx0oOps~viChJEpTw9oMNaU37O8ocHhPUPhXDy-v4_&Key-Pair-Id=APKAJRP2AVKNFZOM4BLQ");

var twitchSnd = scene.getSound("robot-twitch");

var box;

scene.create = function() {
	box = new SGE.Sprite(scene, 100, 100, "box");
  box.angularVelocity = 6.2832;
  
  twitchSnd.play(true);
};

scene.update = function() {
	// box.rotation += 3.1416/scene.fps;
};

scene.start();
