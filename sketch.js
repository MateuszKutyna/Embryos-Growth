
function setup(){
    createCanvas(800,800);
    click=0;
    started=false;
    g_ID=1;
}


function draw(){
    if(started){
       

        for(let i=0 ;i<newGrid.columns;i++){
            for(let j=0;j<newGrid.rows;j++){
                if(newGrid.array[j][i].id!=0){
                    stroke(0);
                    fill(`${newGrid.array[j][i].color}`);
                    
                    rect(newGrid.array[j][i].x,newGrid.array[j][i].y,newGrid.scl,newGrid.scl); // Draw embryo
                    //circle(newGrid.array[j][i].gravityCenter[0],newGrid.array[j][i].gravityCenter[1],newGrid.radius); //Draw grawity center of an embryo
                }
            }
        }
        //if(reczna); nie generuj jeżeli jest włączona wersja z ustawianiem recznym
    }
    
}

