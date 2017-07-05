GAME.PlayState = function()
{
    var date = new Date;
    var time = date.getTime();
    var deltaTime = 0;
    var gameLength = 0;

    var gameSpeed = 0;

    var bg = new Image();
    bg.src = 'res/bg/mountains.png';
    
    var fg = new Image();
    fg.src = 'res/ui/layout.png';
    
    var blockTypes =
    [
        { name: 'bishop' },
        { name: 'bomb'   },
        { name: 'king'   },
        { name: 'knight' },
        { name: 'pawn'   },
        { name: 'queen'  },
        { name: 'rook'   },
        { name: 'spy'    }
    ];
    for (index in blockTypes)
    {
        block = blockTypes[index]
        block.img = new Image();
        block.img.src = 'res/blocks/' + block.name  + '.png';
    }
    
    var blocksX = 10;
    var blocksY = 410;
    var blocks = [];

    function appendRandomRow(blocks)
    {
        blocks.push(getRandomRow());
    }

    function getRandomBlock()
    {
        return blockTypes[GAME.randomInt(0, blockTypes.length - 1)];
    }
    
    function getRandomRow()
    {
        var row = [];
        for (i = 0; i < 6; ++i)
        {
            row.push(getRandomBlock());
        }
        return row;
    }

    function renderBlocks(blocks, x, y)
    {
        for (row in blocks)
        {
            for (col in blocks[row])
            {
                block = blocks[row][col];
                GAME.ctx.drawImage(block.img, x + (50 * col), y + (50 * row));
            }
        }
    }
    
    function getBottomRowY(blocks, y)
    {
        return (50 * blocks.length) + y;
    }

    function updateTimer()
    {
        var tmp = time;
        time = date.getTime();
        deltaTime = time - tmp;
        gameLength += deltaTime;
    }

    function updateGameSpeed()
    {
        gameSpeed = gameSpeed * (gameLength / 60000) + 0.1;
    }

    this.update = function()
    {
        updateTimer();
        updateGameSpeed();
        
        if (Math.floor(blocksY) <= 10)
        {
            GAME.currentState = new GAME.LossState();
        }
        
        blocksY -= gameSpeed;
        
        if (getBottomRowY(blocks, blocksY) < 460)
        {
            appendRandomRow(blocks);
        }
        
        this.render();
    };
    
    this.render = function()
    {
        GAME.clearCanvas();
        
        GAME.ctx.drawImage(bg, 0, 0);
        
        renderBlocks(blocks, Math.floor(blocksX), Math.floor(blocksY));
        
        GAME.ctx.drawImage(fg, 0, 0);
    };

    this.onKeyDown = function(e)
    {
    
    };
    
    this.onKeyUp = function(e)
    {
    
    };

};

