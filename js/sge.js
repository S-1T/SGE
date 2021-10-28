var SGE = {};
(function() {
  class Game { 
    constructor(width, height, parent) {
      this.canvas = document.createElement("canvas");
      this.context = this.canvas.getContext("2d");

      this.width = width;
      this.height = height;

      if(this.parent = document.getElementById(parent))
        this.parent.appendChild(this.canvas);
      else
        (this.parent = document.body).appendChild(this.canvas);

      this.scene = null;
    }

    set width(value) {
      this.canvas.width = value;
    }
    get width() {
      return this.canvas.width;
    }
    set height(value) {
      this.canvas.height = value;
    }
    get height() {
      return this.canvas.height;
    }
  }
  SGE.Game = Game;

  class Scene {
    constructor(game, fps = 30) {
      this.game = game;
      game.scene = this;
      
      this.camera = new Camera();

      this.color = new Color(0x000000ff);

      this.assets = {
        audio: {},
        image: {}
      };

      this.sprites = [];

      this.gravityX = 0;
      this.gravityY = 0;

      this.fps = fps;
      this.milliseconds = 0;
      this.framecount = 0;
      this.frameinterval;

      this.create = null;
      this.update = null;
    }

    addAsset(type, key, source) {
      if(type == "image")
        (this.assets.image[key] = new Image()).src = source;
      if(type == "audio")
        this.assets.audio[key] = new Audio(source);
    }
    addSprite(sprite) {
      this.sprites.push(sprite);
    }

    start() {
      setTimeout(function(scene) {
        if(scene.create)
          scene.create();
        scene.frameinterval = setInterval(function() {
          scene.milliseconds += 1000 / scene.fps;
          scene.framecount++;
          scene.calculate();
          scene.animate();
          if(scene.update)
            scene.update();
        }, 1000 / scene.fps);
      }, 1000, this);
    }
    stop() {
      clearInterval(this.frameinterval);
    }

    calculate() {
      // Velocity, Collision, etc
      var scene = this;
      this.sprites.forEach(function(sprite) {
        if(!sprite.static) {
          var oX = 0;
          var oY = 0;
          
          scene.sprites.forEach(function(sSprite) {
            if(sSprite.static) {
              oX += sprite.overlaps(sSprite, "x");
              oY += sprite.overlaps(sSprite, "y");
            }
          });//https://jsfiddle.net/ShakIsYaBoi/yzpa06ns/80/#save
          
          if((oX || oY) && sprite.onCollision) sprite.onCollision();
          
          sprite.velocityX *= (1 - sprite.friction) * (oX ? -sprite.bounce : 1);
          sprite.velocityY *= (1 - sprite.friction) * (oY ? -sprite.bounce : 1);
          
          sprite.x += sprite.velocityX/scene.fps ;
          sprite.y += sprite.velocityY/scene.fps;
          
            
          sprite.rotation += sprite.angularVelocity / scene.fps;

          sprite.velocityX += sprite.accelerationX / scene.fps;
          sprite.velocityY += sprite.accelerationY / scene.fps;
          sprite.angularVelocity += sprite.angularAacceleration / scene.fps;
        }
      });
    }

    animate() {
      var game = this.game;
      var width = game.width;
      var height = game.height;
      var ctx = game.context;

      ctx.fillStyle = this.color.string;
      ctx.fillRect(0, 0, width, height);
      ctx.save();

      var scene = this;
      this.sprites.forEach(function(sprite) {
        if(!scene.assets.image[sprite.texture])
          scene.drawNoTexture(sprite);
        else
          scene.drawTexture(sprite);
      });
    }
    drawNoTexture(sprite) {
      var game = this.game;
      var width = game.width;
      var height = game.height;
      var ctx = game.context;
      
      var camera = this.camera;
      var cameraX = camera.followObject ? camera.followObject.x : camera.x;
      var cameraY = camera.followObject ? camera.followObject.y : camera.y;

      ctx.save();
      ctx.translate(sprite.x - cameraX + width/2, sprite.y - cameraY + height/2);
      ctx.rotate(sprite.rotation);
      ctx.fillStyle = "#000000";
      ctx.fillRect(-sprite.width / 2, -sprite.height / 2, sprite.width, sprite.height);
      ctx.strokeStyle = "#00ff00";
      ctx.strokeRect(-sprite.width / 2, -sprite.height / 2, sprite.width, sprite.height);
      ctx.beginPath();
      ctx.moveTo(sprite.width / 2, -sprite.height / 2);
      ctx.lineTo(-sprite.width / 2, sprite.height / 2);
      ctx.stroke();
      ctx.restore();
    }
    drawTexture(sprite) {
      var ctx = sprite.scene.game.context;

      ctx.save();
      ctx.translate(sprite.x, sprite.y);
      ctx.rotate(sprite.rotation);
      ctx.drawImage(this.assets.image[sprite.texture], -sprite.width / 2, -sprite.height / 2, sprite.width, sprite.height);
      ctx.restore();
    }

    getSound(key) {
      return new Sound(this, key);
    }
  }
  SGE.Scene = Scene;
  
  class Camera {
  	constructor(x, y) {
    	this.x = x ? x : 0;
      this.y = y ? y : 0;
      this.follow = null;
    }
  }
  SGE.Camera = Camera;
  
  class Color {
    constructor(value) {
      this.value = value;
    }

    get string() {
      return "#" + (this.value + 0x100000000).toString(16).slice(-8);
    }

    set r(value) {
      this.value = Math.floor(value) * 0x01000000 + this.value & 0x00ffffff;
    }
    get r() {
      return this.value & 0xff000000;
    }
    set g(value) {
      this.value = Math.floor(value) * 0x00010000 + this.value & 0xff00ffff;
    }
    get g() {
      return this.value & 0x00ff0000;
    }
    set b(value) {
      this.value = Math.floor(value) * 0x00000100 + this.value & 0xffff00ff;
    }
    get b() {
      return this.value & 0x0000ff00;
    }
    set a(value) {
      this.value = Math.floor(value) * 0x00000001 + this.value & 0xffffff00;
    }
    get a() {
      return this.value & 0x000000ff;
    }
  }
  SGE.Color = Color;

  class Sound {
    constructor(scene, key) {
      this.scene = scene;
      this.audio = scene.assets.audio[key];
    }
    play(loop = false) {
      this.audio.loop = loop;
      this.audio.play();
    }
    pause() {
      this.audio.paused = true;
    }
    stop() {
      this.audio.paused = true;
      this.currentTime = 0;
    }
  }
  SGE.Sound = Sound;

  class Sprite {
    constructor(scene, x, y, texture = null) {
      scene.addSprite(this);

      this.scene = scene;
      this.x = x;
      this.y = y;
      this.static = false;
      this.rotation = 0;
      this.velocityX = 0;
      this.velocityY = 0;
      this.bounce = 1;
      this.friction = 0;
      this.angularVelocity = 0;
      this.accelerationX = scene.gravityX;
      this.accelerationY = scene.gravityY;
      this.angularAcceleration = 0;

      this.width = 32;
      this.height = 32;

      this.textureKey = null;
      this.texture = texture;
      
      this.onOverlap = null;
    }
    
    get velocity() { return Math.hypot(this.velocityX, this.velocityY); }
    
    set angle(rad) {
      this.velocityX = Math.sin(rad) * this.velocity;
      this.velocityY = Math.cos(rad) * this.velocity;
    }
    get angle() {
    	return Math.atan2(this.velocityX, this.velocityY);
    }

    set texture(key) {
      this.textureKey = key;

      var image;
      if(image = this.scene.assets.image[key]) {
        this.width = image.width;
        this.height = image.height;
      }
    }
    get texture() {
      return this.textureKey;
    }

    overlaps(sprite, pos = false) {
    	var fps = this.scene.fps;
      var distX = this.width/2 + sprite.width/2;
      var distY = this.height/2 + sprite.height/2;
      
    	var overlapX = Math.abs(this.x - sprite.x) < distX;
      var overlapY = Math.abs(this.y - sprite.y) < distY;
      
      var overlapNewX = Math.abs(this.x + this.velocityX/fps - sprite.x) < distX;
      var overlapNewY = Math.abs(this.y + this.velocityY/fps - sprite.y) < distY;
      
      if(!pos)
      	return overlapX && overlapY;
      else if(pos == "x")
      	return overlapNewX && overlapY;
      else if(pos == "y")
      	return overlapX && overlapNewY;
    }
  }
  SGE.Sprite = Sprite;
})();
