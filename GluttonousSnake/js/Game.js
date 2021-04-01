function Game(){
    this.row = 20;
    this.col = 20;
    this.score = 0;
    this.move = false;
    // 初始化
    this.init();
    // 初始化蛇类
    this.snake = new Snake();
    this.food = new Food(this);
    this.start(this.move);
    this.bindEvent();
}
Game.prototype.init = function(){
    this.dom = document.createElement('table');
    var tr, td;
    for(var i = 0; i < this.row; i++){
        tr = document.createElement('tr');        
        for(var j = 0; j < this.col; j++){
            td = document.createElement('td');
            tr.appendChild(td);
        }
        this.dom.appendChild(tr);
    }
    document.getElementById("app").appendChild(this.dom);
    document.querySelector('.d_fen').innerHTML = this.score++ * 10;
}
Game.prototype.setColor = function(row, col, color){
    this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].style.background = color;
    this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].innerHTML = '';    
}
Game.prototype.setFood = function(row, col, html){
    this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].innerHTML = html;
}
Game.prototype.clear = function(){
    for( var i = 0; i < this.row; i++){
        for( var j = 0; j < this.col; j++){
            this.dom.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.background = 'white';
        }
    }    
}
Game.prototype.bindEvent = function(){
    var self = this;
    document.onkeydown = function(event){
        switch(event.keyCode){            
            case 37:
                if(self.snake.direction ==="R") return;
                self.snake.changeDirection("L")
                break;
            case 38:
                if(self.snake.direction === "D") return;
                self.snake.changeDirection("U")
                break;
            case 39:
                if(self.snake.direction === "L") return;
                self.snake.changeDirection("R")
                break;
            case 40:
                if(self.snake.direction === "U") return;
                self.snake.changeDirection("D")
                break;
        }
    }    
    var startBtn = document.querySelector('.startBtn');
    startBtn.addEventListener('click', () => {
        this.move = true;
        this.start(this.move)
    });
    var stopBtn = document.querySelector('.stopBtn');
    stopBtn.addEventListener('click', () => {
        this.move = false;
        clearInterval(this.timer)
    });
    var restartBtn = document.querySelector('.restartBtn');
    restartBtn.addEventListener('click', () => {
        window.location.reload();
    });
}

Game.prototype.start = function(state){
    if(state === true){
        this.f = 0;
        this.timer = setInterval(() => {            
            game.f++;
            game.clear();
            var duration = (game.snake.body.length < 30) ? (30 - game.snake.body.length) : 1;
            game.f % duration === 0 && game.snake.update();                
            game.snake.render();
            game.food.render();
   
        }, 20);
    
    } 
}