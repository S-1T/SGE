var SGE = {};
(function(){
  
  class Game
  {
    
    constructor(width, height, parent)
    {
      this.canvas = document.createElement("canvas");
      
      this.width = width;
      this.height = height;
      
      if(parent && typeof parent == "string")
        if(this.parent = document.getElementById)
          this.parent.appendChild(this.canvas);
    }
    
    set width(value) { this.canvas.width = value; }
    get width() { return this.canvas.width; }
    
    set height(value) { this.canvas.height = value; }
    get height() { return this.canvas.height; }
    
  }
  SGE.Game = Game;
  
})();
