class Grid{
    columns;
    rows;
    array;
    scl;
    embryos;
    neighborhood;
    nucleation;
    radius;
    
    
    constructor(_col,_row,_embryos,_neighborhood,_nucleation,_radius){
        if(_col <= 0 || _row <=0 )
        {
            alert("Wielkość siatki musi być większa od zera!");
            return;
        }  

        this.columns=Number(_col);
        this.rows=Number(_row);
        this.embryos=Number(_embryos);
        this.neighborhood=_neighborhood;
        this.nucleation=_nucleation;
        this.radius=_radius;
        this.scl=12.5;
       
        this.createGrid();
        this.fillWithEmbroys();
    }
    
    createGrid(){
        let x=0;
        let y=0;
        
        this.array=new Array(this.columns);
        for(let i=0;i<this.columns;i++)
            this.array[i]=new Array(this.rows);
        
        for(let i=0;i<this.columns;i++){
            y=i*this.scl;
            for(let j=0;j<this.rows;j++){
                x=j*this.scl;
                this.array[i][j]=new Cell(Number(x),Number(y),0)
               
            }
        }
    }
    
    fillWithEmbroys(){
        if(this.nucleation==="jednorodne"){
            this.evenlySpacedEmbroys();
        }else if(this.nucleation==="zPromieniem"){
            this.randomInRange();
        }else if(this.nucleation==="losowe"){
            this.randomEmbroys();
        }
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    getRandomNumber(begin,end){
        return Math.floor(Math.random()*(end-begin)+begin);
    }
    evenlySpacedEmbroys(){
        let _id=1; // Setting id's of cells 
        let space = 4;
        print(space);
        for(let i=0 ;i<this.columns;i+=space){
            for(let j=0;j<this.rows;j+=space){
                if(_id<=this.embryos){
                    this.array[i][j].id=_id;
                    this.array[i][j].color=this.getRandomColor();
                    _id++;
                    
                }
            }
        }
        
    }

    randomEmbroys(){
        let _id=1;
        let randomX;
        let randomY;
        while(_id<=this.embryos){
            randomX=this.getRandomNumber(0,this.columns-1)
            randomY=this.getRandomNumber(0,this.rows-1);
            if(this.array[randomX][randomY].id===0){
                this.array[randomX][randomY].id=_id;
                this.array[randomX][randomY].color=this.getRandomColor();
                _id++;
            }

        }
    }

    randomInRange(){
        let iterEmbroys=0;
        let randomX,randomY;
        let range=Math.ceil(this.radius/12.5); //Checks every sqaure in this range
      
        let _id=1;
        let countInRadius;
        let maxEND=0;
        while(iterEmbroys<this.embryos ){
            countInRadius=0;
            randomX=this.getRandomNumber(0,this.columns);
            randomY=this.getRandomNumber(0,this.rows);
        
            for(let i = (randomX-range-1);i<=randomX+range+1;i++){
                for(let j=(randomY-range-1);j<=randomY+range+1;j++){
                    if(i<0 || j<0 || i>=this.columns||j>=this.rows )continue; //array out of range conditon
                    if(this.array[i][j].id!=0 && ((this.array[i][j].gravityCenter[0]-this.array[randomX][randomY].gravityCenter[0])**2+(this.array[i][j].gravityCenter[1]-this.array[randomX][randomY].gravityCenter[1])**2)
                        <=this.radius**2){
                        //if in range 
                        countInRadius++;
                    }
                }
            }
                if(countInRadius==0) //If there is no embroys in area then set embro
                {
                    this.array[randomX][randomY].color=this.getRandomColor();
                    this.array[randomX][randomY].id=_id;

                    _id++;
                    iterEmbroys++;
                }
            
            maxEND++;
            if(maxEND==5000){
                break;
            }
        }
    }

    get columns(){
        return this.columns;
    }

    get rows(){
        return this.rows;
    }

    get array(){
        return this.array;
    }

    get scl(){
        return this.scl;
    }
}