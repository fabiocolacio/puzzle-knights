var GAME = {};

GAME.init = function()
{
    GAME.WIDTH = 320;
    GAME.HEIGHT = 480;
    GAME.RATIO = GAME.WIDTH / GAME.HEIGHT;
    
    GAME.canvas = document.getElementById('game');
    GAME.canvas.width = GAME.WIDTH;
    GAME.canvas.height = GAME.HEIGHT;
    GAME.ctx = GAME.canvas.getContext('2d');

    GAME.currentState = new GAME.MainMenuState();

    GAME.resize();

    GAME.interval = setInterval(GAME.update, 20);
};

GAME.resize = function()
{
    var winHeight = window.innerHeight;
    var winWidth = window.innerWidth;
    
    if ((winWidth / winHeight) > GAME.RATIO)
    {
        GAME.currentHeight = winHeight;
        GAME.currentWidth = GAME.currentHeight * GAME.currentWidth / GAME.RATIO;
        GAME.canvas.style.top = 0 + 'px';
    }
    else
    {
      GAME.currentWidth = winWidth;
      GAME.currentHeight = GAME.currentWidth/GAME.RATIO;
      var topMargin = (winHeight - GAME.currentHeight)/2;
      GAME.canvas.style.top = topMargin + 'px';
    }
    
    GAME.canvas.style.width = GAME.currentWidth + 'px';
    GAME.canvas.style.height = GAME.currentHeight + 'px';
};

GAME.update = function()
{
    GAME.currentState.update();
};

window.addEventListener('load', GAME.init, false);
window.addEventListener('resize', GAME.resize, false);

