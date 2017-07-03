GAME.MainMenuState = function()
{
    var bg = new Image();
    bg.src = 'res/bg/mountains.png';
    
    var menuItems = ['Play'];
    
    this.update = function()
    {
        this.render();
    };
    
    this.render = function()
    {
        GAME.ctx.drawImage(bg, 0, 0);
        
        var txtWidth;
        var txtHeight = 40;

        var item;
        
        var txtx;
        var txty = 300;
        
        GAME.ctx.font = txtHeight + 'px Sans';
        GAME.ctx.textBaseline = "top"; 
        
        for (index in menuItems)
        {
            item = menuItems[index];
            txtWidth = GAME.ctx.measureText(item).width;
            txtx = (GAME.WIDTH / 2) - (txtWidth / 2);
            GAME.ctx.fillText(item, txtx, txty);
            txty = txty + 10 + txtHeight;
        }
    };
};

