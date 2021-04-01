function Snake(){
    this.body = [
        { "row": 3, "col": 4 },
        { "row": 3, "col": 3 },
        { "row": 3, "col": 2 }
    ],
    this.direction = "R",
    this.nextDirection = "R"
}
Snake.prototype.changeDirection = function(d){
    this.nextDirection = d;
}
Snake.prototype.update = function(){
    this.direction = this.nextDirection;
    switch(this.direction){
        case "R":
            this.body.unshift({"row": this.body[0].row, "col": this.body[0].col+1});
            break;
        case "L":
            this.body.unshift({"row": this.body[0].row, "col": this.body[0].col-1});
            break;
        case "U":
            this.body.unshift({"row": this.body[0].row-1, "col": this.body[0].col});
            break;
        case "D":
            this.body.unshift({"row": this.body[0].row+1, "col": this.body[0].col});
            break;
    }
    if(this.body[0].row > game.row - 1 || this.body[0].col > game.col - 1 || this.body[0].row < 0 || this.body[0].col < 0){
        this.body.shift();     
        alert("游戏结束了！");
        clearInterval(game.timer);        
    }
    for( var i = 1; i < this.body.length; i++){
        if(this.body[0].row === this.body[i].row && this.body[0].col === this.body[i].col){
            this.body.shift(); 
            alert("游戏结束了！")
            clearInterval(game.timer);            
        }
    }
    if(this.body[0].row === game.food.row && this.body[0].col === game.food.col){
        game.food = new Food(game);
        game.f = 0;
        document.querySelector('.d_fen').innerHTML = game.score++ * 10;
    }else{
        this.body.pop();
    }    
}
Snake.prototype.render = function(){
    game.setColor(this.body[0].row, this.body[0].col, 'skyblue');
    for(var i = 1; i < this.body.length; i++){
        game.setColor(this.body[i].row, this.body[i].col, 'pink');
    }
}