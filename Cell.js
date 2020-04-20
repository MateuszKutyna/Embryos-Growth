class Cell{
    id;
    color;
    x;
    y;
    prevGen;
    gravityCenter;
    
   

    constructor(_x,_y,_id)
    {
        this.x=_x;
        this.y=_y;
        this.id=_id;
        this.gravityCenter=new Array(2);
        this.gravityCenter[0]=this.x+Math.random()*(12,5 - 0) + 0;
        this.gravityCenter[1]=this.y+Math.random()*(12,5 - 0) + 0;
        
    }

    nextGeneration(){
        this.prevGen=this.thisGen;
    }

    get color(){
        return this.color;
    }

    get x(){
        return this.x;
    }

    get y(){
        return this.y;
    }

    get thisGen(){
        return this.thisGen;
    }

    get prevGen(){
        return this.prevGen;
    }

    set color(_color){
        this.color=_color;
    }

    set id(_id){
        this.id=_id;
    }

    set prevGen(_prevGen){
        this.prevGen=_prevGen;
    }
}