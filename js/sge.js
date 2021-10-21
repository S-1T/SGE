var SGE = {};
(function(){
  class Game
  {
    constructor(width, height, parent)
    {
      this.canvas = document.createElement("canvas");
      this.context = this.canvas.getContext("2d");
      
      this.width = width;
      this.height = height;
      
      if(parent && typeof parent == "string")
        if(this.parent = document.getElementById(parent))
          this.parent.appendChild(this.canvas);
        else
          (this.parent = document.body).appendChild(this.canvas);
      else
        (this.parent = document.body).appendChild(this.canvas);
      
      this.scene = null;
    }
    
    set width(value) { this.canvas.width = value; }
    get width() { return this.canvas.width; }
    
    set height(value) { this.canvas.height = value; }
    get height() { return this.canvas.height; }
  }
  SGE.Game = Game;
  
  class Color
  {
    constructor(value) { this.value = value; }
    
    get string() { return "#" + (this.value + 0x100000000).toString(16).slice(-8); }
    
    set r(value) { this.value = Math.floor(value) * 0x01000000 + this.value & 0x00ffffff; }
    get r() { return this.value & 0xff000000; }
    
    set g(value) { this.value = Math.floor(value) * 0x00010000 + this.value & 0xff00ffff; }
    get g() { return this.value & 0x00ff0000; }
    
    set b(value) { this.value = Math.floor(value) * 0x00000100 + this.value & 0xffff00ff; }
    get b() { return this.value & 0x0000ff00; }
    
    set a(value) { this.value = Math.floor(value) * 0x00000001 + this.value & 0xffffff00; }
    get a() { return this.value & 0x000000ff; }
  }
  SGE.Color = Color;
  
  class Scene
  {
    constructor(game, fps = 30)
    {
      this.game = game;
      game.scene = this;
      
      this.color = new Color(0x000000ff);
      
      this.assets = {
        audio: {},
        image: {}
      };
      
      this.sprites = [];
      
      this.fps = fps;
      this.milliseconds = 0;
      this.framecount = 0;
      this.frameinterval;
    }
    addAsset(type, key, source)
    {
      if(type == "audio")
        this.assets.audio[key] = new Audio(source);
      
      if(type == "image")
        (this.assets.image[key] = new Image()).src = source;
    }
    addSprite(sprite)
    {
      scene.sprites.push(sprite);
    }
    drawNoTexture(sprite)
    {
      var ctx = sprite.scene.game.context;
      
      ctx.translate(sprite.x, sprite.y);
      ctx.rotate(sprite.rotation);
      
      ctx.fillStyle = "#000000";
      ctx.fillRect(-sprite.width/2, -sprite.height/2, sprite.width, sprite.height);
      ctx.strokeStyle = "#00ff00";
      ctx.strokeRect(-sprite.width/2, -sprite.height/2, sprite.width, sprite.height);
      
      ctx.restore();
    }
    drawTexture(sprite)
    {
      
    }
    start()
    {
      this.frameinterval = setInterval(function(scene) {
        scene.milliseconds++;
        if(scene.milliseconds > scene.framecount * 1000 / scene.fps)
        {
          scene.framecount++;
          scene.calculate();
          scene.animate();
        }
      }, 100, this);
    }
    stop() { clearInterval(this.frameinterval); }
    calculate()
    {
      
    }
    animate()
    {
      var game = this.game;
      var width = game.width;
      var height = game.height;
      var ctx = game.context;
      
      ctx.fillStyle = this.color.string;
      ctx.fillRect(0, 0, width, height);
      
      ctx.save();
      
      for(var i = 0; i < this.sprites.length; i++)
      {
      	if(!this.sprites[i].texture)
      		this.drawNoTexture(this.sprites[i]);
      }
    }
  }
  SGE.Scene = Scene;
  
  class Sprite
  {
    constructor(scene, x, y, texture = null)
    {
      scene.addSprite(this);
      
      this.scene = scene;
      this.x = x;
      this.y = y;
      this.texture = texture;
      this.width = texture ? scene.assets.image[texture].width : 64;
      this.height = texture ? scene.assets.image[texture].height : 64;
    }
  }
  SGE.Sprite = Sprite;
})();
