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
        if(this.parent = document.getElementById)
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
      
      this.color = new Color(0x00000000);
      
      this.fps = fps;
      this.milliseconds = 0;
      this.framecount = 0;
      this.frameinterval;
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
      }, 1, this);
    }
    stop() { clearInterval(this.frameinterval); }
    calculate()
    {
      
    }
    animate()
    {
      var game = this.game;
      var wid = game.width;
      var hgt = game.height;
      var ctx = game.context;
      
      ctx.fillStyle = this.color.string;
      ctx.fillRect(0, 0, wid, hgt);
    }
  }
  SGE.Scene = Scene;
  
})();
