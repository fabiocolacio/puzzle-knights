GAME.PlayState = function()
{
    var bg = new Image();
    bg.src = 'res/bg/mountains.png';
    
    var fg = new Image();
    fg.src = 'res/ui/layout.png';

    this.update = function()
    {
        this.render();
    };
    
    this.render = function()
    {
        GAME.clearCanvas();
        
        GAME.ctx.drawImage(bg, 0, 0);
        
        GAME.ctx.drawImage(fg, 0, 0);
    };

    this.onKeyDown = function(e)
    {
    
    };
    
    this.onKeyUp = function(e)
    {
    
    };

};

