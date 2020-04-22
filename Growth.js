
let randomNum=getRandomNumber(0,4);
function generate(){
    if(newGrid.neighborhood==="vonNeumann"){
        vonNeumann();
    }else if(newGrid.neighborhood==="penRand"){
       pentaRand();
    }else if(newGrid.neighborhood==="heksa"){
        heksa();
    }else if(newGrid.neighborhood==="moore"){
        moore();
    }else if(newGrid.neighborhood==="radius"){
        withRadius();
    }
    for(let i =0;i<newGrid.columns;i++){
        for(let j=0;j<newGrid.rows;j++){
            newGrid.array[i][j].prevGen=newGrid.array[i][j].id;
        }
    }
}

function vonNeumann(){
    let arrayOfNeighborhoodVN = new Array(4);
    let north,west,east,south;
    for(let i =0;i<newGrid.columns;i++){
        for(let j=0;j<newGrid.rows;j++){
            if(newGrid.array[i][j].id==0){
                  north=j-1;
                  east=i+1;
                  south=j+1;
                  west=i-1;
                if(newGrid.boundaryCondtion==="periodyczne"){
                    arrayOfNeighborhoodVN[0]=newGrid.array[(i+newGrid.columns)%newGrid.columns][(j+newGrid.rows-1)%newGrid.rows]; //top
                    arrayOfNeighborhoodVN[1]=newGrid.array[(i+newGrid.columns-1)%newGrid.columns][(j+newGrid.rows)%newGrid.rows]; //left
                    arrayOfNeighborhoodVN[2]=newGrid.array[(i+newGrid.columns+1)%newGrid.columns][(j+newGrid.rows)%newGrid.rows]; //right
                    arrayOfNeighborhoodVN[3]=newGrid.array[(i+newGrid.columns)%newGrid.columns][(j+newGrid.rows+1)%newGrid.rows]; //bottom
                    
                }else{
                    north!=-1?arrayOfNeighborhoodVN[0]=newGrid.array[i][north]:arrayOfNeighborhoodVN[0]=new Cell(0,0,0); //top
                    south!=newGrid.columns?arrayOfNeighborhoodVN[1]=newGrid.array[i][south]:arrayOfNeighborhoodVN[1]=new Cell(0,0,0); //bottom
                    east!=newGrid.rows?arrayOfNeighborhoodVN[2]=newGrid.array[east][j]:arrayOfNeighborhoodVN[2]=new Cell(0,0,0);//right
                    west!=-1?arrayOfNeighborhoodVN[3]=newGrid.array[west][j]:arrayOfNeighborhoodVN[3]=new Cell(0,0,0);//left
                }
                
                let cell=countNeighbors(arrayOfNeighborhoodVN)
                if(cell.prevGen!=0){
                    newGrid.array[i][j].id=cell.prevGen;
                    newGrid.array[i][j].color=cell.color;
                }
             }
            
        }
    }
}

function countNeighbors(array){
    
    let arr=new Array(array.length);
   for(let i=0;i<arr.length;i++){
       arr[i]=new Array(2);
   }
   for(let i=0;i<array.length;i++){
       arr[i][0]=array[i].id;
       arr[i][1]=getOccurrence(array,array[i].prevGen);
   }
   let max=0;
   let maxIndex=0;
   for(let i=0;i<arr.length;i++){
       if(max<arr[i][1] && arr[i][0]!==0){
            max=arr[i][1];
            maxIndex=i;
        }
   }
   return array[maxIndex];
}

function getOccurrence(array, value) {
    let count = 0;
    array.forEach((v) => (v.prevGen === value && count++));
    return count;
}

function moore(){
      let arrayOfNeighborhoodMoore = new Array(8);
      let north,west,east,south;
      
      for(let i=0;i<newGrid.columns;i++){
          for(let j=0;j<newGrid.rows;j++){
              if(newGrid.array[i][j].id==0){
                  north=j-1;
                  east=i+1;
                  south=j+1;
                  west=i-1;
                  if(newGrid.boundaryCondtion==="periodyczne"){
                    arrayOfNeighborhoodMoore[0]=newGrid.array[(i+newGrid.columns-1)%newGrid.columns][(j+newGrid.rows-1)%newGrid.rows]; //left top
                    arrayOfNeighborhoodMoore[1]=newGrid.array[(i+newGrid.columns)%newGrid.columns][(j+newGrid.rows-1)%newGrid.rows]; //top
                    arrayOfNeighborhoodMoore[2]=newGrid.array[(i+newGrid.columns+1)%newGrid.columns][(j+newGrid.rows-1)%newGrid.rows]; //right top
                    arrayOfNeighborhoodMoore[3]=newGrid.array[(i+newGrid.columns-1)%newGrid.columns][(j+newGrid.rows)%newGrid.rows]; //left
                    arrayOfNeighborhoodMoore[4]=newGrid.array[(i+newGrid.columns+1)%newGrid.columns][(j+newGrid.rows)%newGrid.rows]; //right
                    arrayOfNeighborhoodMoore[5]=newGrid.array[(i+newGrid.columns-1)%newGrid.columns][(j+newGrid.rows+1)%newGrid.rows];//left bottom
                    arrayOfNeighborhoodMoore[6]=newGrid.array[(i+newGrid.columns)%newGrid.columns][(j+newGrid.rows+1)%newGrid.rows]; //bottom
                    arrayOfNeighborhoodMoore[7]=newGrid.array[(i+newGrid.columns+1)%newGrid.columns][(j+newGrid.rows+1)%newGrid.rows]; //right bottom
                    
                  }else{
                    north!=-1?arrayOfNeighborhoodMoore[0]=newGrid.array[i][north]:arrayOfNeighborhoodMoore[0]=new Cell(0,0,0);//top
                    south!=newGrid.columns?arrayOfNeighborhoodMoore[1]=newGrid.array[i][south]:arrayOfNeighborhoodMoore[1]=new Cell(0,0,0);//bottom
                    east!=newGrid.rows?arrayOfNeighborhoodMoore[2]=newGrid.array[east][j]:arrayOfNeighborhoodMoore[2]=new Cell(0,0,0);//right
                    west!=-1?arrayOfNeighborhoodMoore[3]=newGrid.array[west][j]:arrayOfNeighborhoodMoore[3]=new Cell(0,0,0);//left
                    north!=-1&&west!=-1?arrayOfNeighborhoodMoore[4]=newGrid.array[west][north]:arrayOfNeighborhoodMoore[4]=new Cell(0,0,0);//left top
                    north!=-1&&east!=newGrid.rows?arrayOfNeighborhoodMoore[5]=newGrid.array[east][north]:arrayOfNeighborhoodMoore[5]=new Cell(0,0,0);//right top
                    south!=newGrid.columns&&west!=-1?arrayOfNeighborhoodMoore[6]=newGrid.array[west][south]:arrayOfNeighborhoodMoore[6]=new Cell(0,0,0);//left bottom
                    south!=newGrid.columns&&east!=newGrid.rows?arrayOfNeighborhoodMoore[7]=newGrid.array[east][south]:arrayOfNeighborhoodMoore[7]=new Cell(0,0,0);//right bottom
                  }
                let cell=countNeighbors(arrayOfNeighborhoodMoore);
                if(cell.prevGen!=0){
                    newGrid.array[i][j].id=cell.prevGen;
                    newGrid.array[i][j].color=cell.color;
                }
              }
          }
      }
}
function heksa(){
    let arrayOfNeighborhoodMoore = new Array(6);
      let north,west,east,south;
      
      for(let i=0;i<newGrid.columns;i++){
          for(let j=0;j<newGrid.rows;j++){
              if(newGrid.array[i][j].id==0){
                  north=j-1;
                  east=i+1;
                  south=j+1;
                  west=i-1;
                  if(newGrid.boundaryCondtion==="periodyczne"){
                    arrayOfNeighborhoodMoore[0]=newGrid.array[(i+newGrid.columns)%newGrid.columns][(j+newGrid.rows-1)%newGrid.rows]; //top
                    arrayOfNeighborhoodMoore[1]=newGrid.array[(i+newGrid.columns+1)%newGrid.columns][(j+newGrid.rows-1)%newGrid.rows]; //right top
                    arrayOfNeighborhoodMoore[2]=newGrid.array[(i+newGrid.columns-1)%newGrid.columns][(j+newGrid.rows)%newGrid.rows]; //left
                    arrayOfNeighborhoodMoore[3]=newGrid.array[(i+newGrid.columns+1)%newGrid.columns][(j+newGrid.rows)%newGrid.rows]; //right
                    arrayOfNeighborhoodMoore[4]=newGrid.array[(i+newGrid.columns-1)%newGrid.columns][(j+newGrid.rows+1)%newGrid.rows];//left bottom
                    arrayOfNeighborhoodMoore[5]=newGrid.array[(i+newGrid.columns)%newGrid.columns][(j+newGrid.rows+1)%newGrid.rows]; //bottom
                  }else{
                    north!=-1?arrayOfNeighborhoodMoore[0]=newGrid.array[i][north]:arrayOfNeighborhoodMoore[0]=new Cell(0,0,0);//top
                    south!=newGrid.columns?arrayOfNeighborhoodMoore[1]=newGrid.array[i][south]:arrayOfNeighborhoodMoore[1]=new Cell(0,0,0);//bottom
                    east!=newGrid.rows?arrayOfNeighborhoodMoore[2]=newGrid.array[east][j]:arrayOfNeighborhoodMoore[2]=new Cell(0,0,0);//right
                    west!=-1?arrayOfNeighborhoodMoore[3]=newGrid.array[west][j]:arrayOfNeighborhoodMoore[3]=new Cell(0,0,0);//left
                    north!=-1&&east!=newGrid.rows?arrayOfNeighborhoodMoore[4]=newGrid.array[east][north]:arrayOfNeighborhoodMoore[4]=new Cell(0,0,0);//right top
                    south!=newGrid.columns&&west!=-1?arrayOfNeighborhoodMoore[5]=newGrid.array[west][south]:arrayOfNeighborhoodMoore[5]=new Cell(0,0,0);//left bottom
                    
                  }
                let cell=countNeighbors(arrayOfNeighborhoodMoore);
                if(cell.prevGen!=0){
                    newGrid.array[i][j].id=cell.prevGen;
                    newGrid.array[i][j].color=cell.color;
                }
              }
          }
      }
}

function pentaRand(){
    let arrayOfNeighborhoodMoore = new Array(5);
    let north,west,east,south;
    let randomNum=getRandomNumber(0,4);
    for(let i=0;i<newGrid.columns;i++){
        for(let j=0;j<newGrid.rows;j++){
            if(newGrid.array[i][j].id==0){
                if(randomNum==0){
                    if(newGrid.boundaryCondtion==="periodyczne"){
                        arrayOfNeighborhoodMoore[0]=newGrid.array[(i+newGrid.columns-1)%newGrid.columns][(j+newGrid.rows-1)%newGrid.rows]; //left top
                        arrayOfNeighborhoodMoore[1]=newGrid.array[(i+newGrid.columns)%newGrid.columns][(j+newGrid.rows-1)%newGrid.rows]; //top
                        arrayOfNeighborhoodMoore[2]=newGrid.array[(i+newGrid.columns-1)%newGrid.columns][(j+newGrid.rows)%newGrid.rows]; //left
                        arrayOfNeighborhoodMoore[3]=newGrid.array[(i+newGrid.columns-1)%newGrid.columns][(j+newGrid.rows+1)%newGrid.rows];//left bottom
                        arrayOfNeighborhoodMoore[4]=newGrid.array[(i+newGrid.columns)%newGrid.columns][(j+newGrid.rows+1)%newGrid.rows]; //bottom
                       
                        
                      }else{
                        north!=-1?arrayOfNeighborhoodMoore[0]=newGrid.array[i][north]:arrayOfNeighborhoodMoore[0]=new Cell(0,0,0);//top
                        south!=newGrid.columns?arrayOfNeighborhoodMoore[1]=newGrid.array[i][south]:arrayOfNeighborhoodMoore[1]=new Cell(0,0,0);//bottom
                        west!=-1?arrayOfNeighborhoodMoore[2]=newGrid.array[west][j]:arrayOfNeighborhoodMoore[2]=new Cell(0,0,0);//left
                        north!=-1&&west!=-1?arrayOfNeighborhoodMoore[3]=newGrid.array[west][north]:arrayOfNeighborhoodMoore[3]=new Cell(0,0,0);//left top
                        south!=newGrid.columns&&west!=-1?arrayOfNeighborhoodMoore[4]=newGrid.array[west][south]:arrayOfNeighborhoodMoore[4]=new Cell(0,0,0);//left bottom
                 
                      }
                }else if(randomNum==1){
                    if(newGrid.boundaryCondtion==="periodyczne"){
              
                        arrayOfNeighborhoodMoore[0]=newGrid.array[(i+newGrid.columns)%newGrid.columns][(j+newGrid.rows-1)%newGrid.rows]; //top
                        arrayOfNeighborhoodMoore[1]=newGrid.array[(i+newGrid.columns+1)%newGrid.columns][(j+newGrid.rows-1)%newGrid.rows]; //right top
                        arrayOfNeighborhoodMoore[2]=newGrid.array[(i+newGrid.columns+1)%newGrid.columns][(j+newGrid.rows)%newGrid.rows]; //right
                        arrayOfNeighborhoodMoore[3]=newGrid.array[(i+newGrid.columns)%newGrid.columns][(j+newGrid.rows+1)%newGrid.rows]; //bottom
                        arrayOfNeighborhoodMoore[4]=newGrid.array[(i+newGrid.columns+1)%newGrid.columns][(j+newGrid.rows+1)%newGrid.rows]; //right bottom
                        
                      }else{
                        north!=-1?arrayOfNeighborhoodMoore[0]=newGrid.array[i][north]:arrayOfNeighborhoodMoore[0]=new Cell(0,0,0);//top
                        south!=newGrid.columns?arrayOfNeighborhoodMoore[1]=newGrid.array[i][south]:arrayOfNeighborhoodMoore[1]=new Cell(0,0,0);//bottom
                        east!=newGrid.rows?arrayOfNeighborhoodMoore[2]=newGrid.array[east][j]:arrayOfNeighborhoodMoore[2]=new Cell(0,0,0);//right
                        north!=-1&&east!=newGrid.rows?arrayOfNeighborhoodMoore[3]=newGrid.array[east][north]:arrayOfNeighborhoodMoore[3]=new Cell(0,0,0);//right top
                        south!=newGrid.columns&&east!=newGrid.rows?arrayOfNeighborhoodMoore[4]=newGrid.array[east][south]:arrayOfNeighborhoodMoore[4]=new Cell(0,0,0);//right bottom
                        
                      }
                }else if(randomNum==2){
                    if(newGrid.boundaryCondtion==="periodyczne"){
                        arrayOfNeighborhoodMoore[0]=newGrid.array[(i+newGrid.columns-1)%newGrid.columns][(j+newGrid.rows)%newGrid.rows]; //left
                        arrayOfNeighborhoodMoore[1]=newGrid.array[(i+newGrid.columns+1)%newGrid.columns][(j+newGrid.rows)%newGrid.rows]; //right
                        arrayOfNeighborhoodMoore[2]=newGrid.array[(i+newGrid.columns-1)%newGrid.columns][(j+newGrid.rows+1)%newGrid.rows];//left bottom
                        arrayOfNeighborhoodMoore[3]=newGrid.array[(i+newGrid.columns)%newGrid.columns][(j+newGrid.rows+1)%newGrid.rows]; //bottom
                        arrayOfNeighborhoodMoore[4]=newGrid.array[(i+newGrid.columns+1)%newGrid.columns][(j+newGrid.rows+1)%newGrid.rows]; //right bottom
                      }else{

                        south!=newGrid.columns?arrayOfNeighborhoodMoore[0]=newGrid.array[i][south]:arrayOfNeighborhoodMoore[0]=new Cell(0,0,0);//bottom
                        east!=newGrid.rows?arrayOfNeighborhoodMoore[1]=newGrid.array[east][j]:arrayOfNeighborhoodMoore[1]=new Cell(0,0,0);//right
                        west!=-1?arrayOfNeighborhoodMoore[2]=newGrid.array[west][j]:arrayOfNeighborhoodMoore[2]=new Cell(0,0,0);//left
                        south!=newGrid.columns&&west!=-1?arrayOfNeighborhoodMoore[3]=newGrid.array[west][south]:arrayOfNeighborhoodMoore[3]=new Cell(0,0,0);//left bottom
                        south!=newGrid.columns&&east!=newGrid.rows?arrayOfNeighborhoodMoore[4]=newGrid.array[east][south]:arrayOfNeighborhoodMoore[4]=new Cell(0,0,0);//right bottom
                        
                      }
                }else{
                    if(newGrid.boundaryCondtion==="periodyczne"){
                        arrayOfNeighborhoodMoore[0]=newGrid.array[(i+newGrid.columns-1)%newGrid.columns][(j+newGrid.rows-1)%newGrid.rows]; //left top
                        arrayOfNeighborhoodMoore[1]=newGrid.array[(i+newGrid.columns)%newGrid.columns][(j+newGrid.rows-1)%newGrid.rows]; //top
                        arrayOfNeighborhoodMoore[2]=newGrid.array[(i+newGrid.columns+1)%newGrid.columns][(j+newGrid.rows-1)%newGrid.rows]; //right top
                        arrayOfNeighborhoodMoore[3]=newGrid.array[(i+newGrid.columns-1)%newGrid.columns][(j+newGrid.rows)%newGrid.rows]; //left
                        arrayOfNeighborhoodMoore[4]=newGrid.array[(i+newGrid.columns+1)%newGrid.columns][(j+newGrid.rows)%newGrid.rows]; //right
        
                      }else{
                        north!=-1?arrayOfNeighborhoodMoore[0]=newGrid.array[i][north]:arrayOfNeighborhoodMoore[0]=new Cell(0,0,0);//top
                        east!=newGrid.rows?arrayOfNeighborhoodMoore[2]=newGrid.array[east][j]:arrayOfNeighborhoodMoore[2]=new Cell(0,0,0);//right
                        west!=-1?arrayOfNeighborhoodMoore[3]=newGrid.array[west][j]:arrayOfNeighborhoodMoore[3]=new Cell(0,0,0);//left
                        north!=-1&&west!=-1?arrayOfNeighborhoodMoore[4]=newGrid.array[west][north]:arrayOfNeighborhoodMoore[4]=new Cell(0,0,0);//left top
                        north!=-1&&east!=newGrid.rows?arrayOfNeighborhoodMoore[5]=newGrid.array[east][north]:arrayOfNeighborhoodMoore[5]=new Cell(0,0,0);//right top  
                      }
                }
                let cell=countNeighbors(arrayOfNeighborhoodMoore);
                if(cell.prevGen!=0){
                    newGrid.array[i][j].id=cell.prevGen;
                    newGrid.array[i][j].color=cell.color;
                }
            }
            
        }
    }
}

function withRadius(){
    let range=Math.ceil(newGrid.radiusNeighbor/newGrid.scl);
    let arrayOfNeighborhood=[];
    let isThere;
    for(let i=0;i<newGrid.columns;i++){
        for(let j=0;j<newGrid.rows;j++){
            if(newGrid.array[i][j].id===0){
                isThere=false;
                for(let k=(i-range-1);k<=(i+range+1);k++){
                    for(let l=(j-range-1);l<=(j+range+1);l++){
                        if(k<0||l<0||k>=newGrid.columns||l>=newGrid.rows)continue;
                        if(newGrid.array[k][l].id!==0){
                            if(((newGrid.array[k][l].gravityCenter[0]-newGrid.array[i][j].gravityCenter[0])**2+(newGrid.array[k][l].gravityCenter[1]-newGrid.array[i][j].gravityCenter[1])**2)<=newGrid.radiusNeighbor**2){
                                arrayOfNeighborhood.push(newGrid.array[k][l])
                                isThere=true;
                            }
                        }
                    }
                }
                if(isThere)
                {
                    let cell = countNeighbors(arrayOfNeighborhood);
                    if(cell.prevGen!=0){
                        newGrid.array[i][j].id=cell.prevGen;
                        newGrid.array[i][j].color=cell.color;
                    }
                }
            }
           arrayOfNeighborhood=[];
        }
    }
   
    // for(let i=0;i<newGrid.columns;i++){
    //     for(let j=0;j<newGrid.rows;j++){
    //         if(newGrid.array[i][j].id!=0){
               
    //             for(let k = (i-range-1);k<=(i+range+1);k++){
    //                 for(let l=(j-range-1);l<=(j+range+1);l++){
    //                    //  (`k:${k} l:${l} i:${i} j:${j}`);
    //                     if(k<0 || l<0 || k>=newGrid.columns||l>=newGrid.rows )continue; //array out of range conditon
    //                     if(newGrid.array[k][l].id===0 && ((newGrid.array[k][l].gravityCenter[0]-newGrid.array[i][j].gravityCenter[0])**2+(newGrid.array[k][l].gravityCenter[1]-newGrid.array[i][j].gravityCenter[1])**2)
    //                        <=newGrid.radiusNeighbor**2){
                             
    //                         newGrid.array[k][l].id=newGrid.array[i][j].prev;
    //                         newGrid.array[k][l].color=newGrid.array[i][j].color;
    //                     }
    //                 }
    //             }

    //         }
    //     }
    // }
    
}

function getRandomNumber(begin,end){
    return Math.floor(Math.random()*(end-begin)+begin);
}