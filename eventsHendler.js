let newGrid;

let click;
let reczna=false;
let g_ID;

function buttonStart(){

    if(!reczna){
        let width=document.getElementById("width").value;
        let lenght=document.getElementById("lenght").value;
        let embryos = document.getElementById("embroys").value;
        let nucleation=document.getElementById("nucleation").value;
        let neighborhood = document.getElementById("neighborhood").value;
        let radius = document.getElementById("rad").value;
        let boundaryCondition=document.getElementById("boundaryCondtion").value;
        let radiusSa=document.getElementById("radSasiedz").value;
        let jednorodneX=document.getElementById("jednorodneX").value;
        let jednorodneY=document.getElementById("jednorodneY").value
        newGrid=new Grid(width,lenght,embryos,neighborhood,nucleation,radius,boundaryCondition,radiusSa,jednorodneX,jednorodneY);
        resizeCanvas(800,800);
       
    }
    if(click<2){
        click++;
    }else{
        click=1;
    }
    
    if(newGrid.nucleation==="wyklinanie"){
        reczna=true;
    }
    if(click==2 && newGrid.nucleation==="wyklinanie"){
        reczna=false;
        started=false;
        click=0;
    }
    
    console.log(newGrid);
    if(reczna)drawGrid();
    started?started=false:started=true;
    
}

function drawGrid(){
    for(let i=0;i<newGrid.columns;i++){
        for(let j=0;j<newGrid.rows;j++){
            stroke(0);
            fill(255);
            rect(newGrid.array[i][j].x,newGrid.array[i][j].y,newGrid.scl,newGrid.scl);
        }
    }
}

function mousePressed(){
    
    if(reczna){
        for(let i=0;i<newGrid.columns;i++){
            for(let j=0;j<newGrid.rows;j++){
                let dis = dist(mouseX,mouseY,newGrid.array[i][j].x+(newGrid.scl/2),newGrid.array[i][j].y+(newGrid.scl/2));
                if(dis<newGrid.scl/2){
                    
                    if(newGrid.array[i][j].id==0){
                        newGrid.array[i][j].id=g_ID;
                        newGrid.array[i][j].color=newGrid.getRandomColor();
                        g_ID++;
                    }
                }
            }
        }
    }
}