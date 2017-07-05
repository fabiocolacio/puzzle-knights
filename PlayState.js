GAME.PlayState = function()
{
    var date = new Date;
    var time = date.getTime();
    var deltaTime = 0;
    var gameLength = 0;

    var gameSpeed = 0;
    var fasterSpeed = 2;
    var goFaster = false;

    var bg = new Image();
    bg.src = 'res/bg/mountains.png';
    
    var fg = new Image();
    fg.src = 'res/ui/layout.png';
    
    var selectorImg = new Image();
    selectorImg.src = 'res/ui/selector.png';
    var selectorXIndex = 0;
    var selectorYIndex = 0;
    
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
    
    function renderSelector()
    {
        var x = blocksX + (selectorXIndex * 50);
        var y = blocksY + (selectorYIndex * 50);
        GAME.ctx.drawImage(selectorImg, Math.floor(x), Math.floor(y));
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

    function swapAtSelector()
    {
        var r = selectorYIndex;
        var c = selectorXIndex;
        var leftBlock = blocks[r][c];
        var rightBlock = blocks[r][c + 1];
        blocks[r][c] = rightBlock;
        blocks[r][c + 1] = leftBlock;
    }

    this.update = function()
    {
        updateTimer();
        updateGameSpeed();
        
        if (Math.floor(blocksY) <= 10)
        {
            GAME.currentState = new GAME.LossState();
        }
        
        blocksY -= goFaster ? fasterSpeed : gameSpeed;
        
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
        
        renderSelector();
        
        GAME.ctx.drawImage(fg, 0, 0);
    };

    this.onKeyDown = function(e)
    {
        switch (e.keyCode)
        {
            case GAME.KEY_ARROW_UP:
                if (selectorYIndex > 0)
                {
                    --selectorYIndex;
                }
                break;
                
            case GAME.KEY_ARROW_DOWN:
                ++selectorYIndex;
                break;
                
            case GAME.KEY_ARROW_LEFT:
                if (selectorXIndex > 0)
                {
                    --selectorXIndex;
                }
                break;
                
            case GAME.KEY_ARROW_RIGHT:
                if (selectorXIndex < 4)
                {
                    ++selectorXIndex;
                }
                break;
                
            case GAME.KEY_Z:
                swapAtSelector();
                break;
                
            case GAME.KEY_X:
                goFaster = true;
                break;
        }
    };
    
    this.onKeyUp = function(e)
    {
        switch (e.keyCode)
        {
            case GAME.KEY_X:
                goFaster = false;
                break;
        }
    };

};

