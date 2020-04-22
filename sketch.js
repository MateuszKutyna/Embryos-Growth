let end;
let change;
function setup(){
    createCanvas(800,800);
    click=0;
    started=false;
    g_ID=1;
    end=false;
    change=0;
}


function draw(){
    if(started){
       
        end=true;
        
            for(let i=0 ;i<newGrid.columns;i++){
                for(let j=0;j<newGrid.rows;j++){
                    if(newGrid.array[i][j].id!=0){
                        noStroke();
                        fill(`${newGrid.array[i][j].color}`);
                        rect(newGrid.array[i][j].x,newGrid.array[i][j].y,newGrid.scl,newGrid.scl); // Draw embryo
                    }
                    if(newGrid.array[i][j].id==0)end=false;
                }
            }
          
        
     
        if(end)started=false;
        if(!reczna)generate();
    }
    
}

