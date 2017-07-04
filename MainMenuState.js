GAME.MainMenuState = function()
{
    var bg = new Image();
    bg.src = 'res/bg/mountains.png';
    
    var menuItems =
    [
        { txt: 'Play',    callback: playBtnPressed    },
        { txt: 'Options', callback: optionsBtnPressed }
    ];
    
    var activeMenuItem = 0;
    
    function optionsBtnPressed()
    {
        console.log('options');
    }
    
    function playBtnPressed()
    {
        console.log('play');
        GAME.currentState = new GAME.PlayState();
    }
    
    this.update = function()
    {
        this.render();
    };
    
    this.render = function()
    {
        GAME.clearCanvas();
        
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
            if (index == activeMenuItem)
            {
                GAME.ctx.fillStyle = 'yellow';
            }
            else
            {
                GAME.ctx.fillStyle = 'black';
            }
        
            item = menuItems[index].txt;
            txtWidth = GAME.ctx.measureText(item).width;
            txtx = (GAME.WIDTH / 2) - (txtWidth / 2);
            GAME.ctx.fillText(item, txtx, txty);
            txty = txty + 10 + txtHeight;
        }
    };
    
    this.onKeyDown = function(e)
    {
        switch (e.keyCode)
        {
            case 37: // left arrow
                break;
                
            case 38: // up arrow
                activeMenuItem = 
                    Math.abs((activeMenuItem - 1) % menuItems.length);
                break;
                
            case 39: // right arrow
                break;
                
            case 40: // down arrow
                activeMenuItem =
                    Math.abs((activeMenuItem + 1) % menuItems.length);
                break;
                
            case 13: // enter key
            case 32: // space
                menuItems[activeMenuItem].callback();
                break;
        }
    };
    
    this.onKeyUp = function(e)
    {
        
    };
};

