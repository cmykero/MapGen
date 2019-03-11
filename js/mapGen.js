var tileSet = new Image(),
    tileSetSize = 32;

//Map arrays
var stack = [],
    map = [],
    wall = [],
    floors = [];

function generateMap(){
    
    var mapHeight = mapTileWidth * tileSize;
    var mapWidth = mapTileHeight * tileSize;

    var tileCounter = 0;
    var tilePosX = (randomizer(1, mapTileWidth-2) * tileSize);
    var tilePosY = (randomizer(1, mapTileHeight-2) * tileSize);
    

    // Generating Map Screen
    c.fillStyle='black';
    c.fillRect(0,0,canvas.width,canvas.height);
    c.fillStyle = 'white'
    c.font = '18px Arial';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('Generating Map...', canvas.width/2, canvas.height/2);

    //Don't change this value;
    var lastTile;

    var mapper = setInterval(function(){

        function declareMap(){
            var nextTile = randomizer(0,3); 



            if((nextTile === 0 && tilePosY - tileSize < tileSize) || (nextTile === 1 && tilePosX + tileSize === mapWidth - tileSize) || (nextTile === 2 && tilePosY + tileSize === mapWidth - tileSize) || (nextTile === 3 && tilePosX - tileSize < tileSize)){
                //Edge of map
                return declareMap();
            } else if(nextTile === 0){ // Go Up
                tilePosY -= tileSize;
                lastTile = 2;
                trackTile()
            } else if(nextTile === 1){ // Go Right
                tilePosX += tileSize;
                lastTile = 3;
                trackTile();
            } else if(nextTile === 2){ // Go Down
                tilePosY += tileSize;
                lastTile = 0;
                trackTile();
            } else if(nextTile === 3){ // Go Left
                tilePosX -= tileSize;
                lastTile = 1;
                trackTile();
            }
        }

        function trackTile(){
            //If the tile gets placed on an existing tile redefine it
            for(i=0; i<stack.length; i++){
                if(stack[i][0] === tilePosX){
                    if(stack[i][1] === tilePosY){
                        return declareMap();
                    }
                }
            }

            //Push the generated tile to the stack for collisions
            stack.push([tilePosX, tilePosY]);

            //Draws the map as it's generating
            // c.fillStyle = "White";
            // c.fillRect(tilePosX, tilePosY, tileSize, tileSize);

            //Write on the tiles as they generate

            // c.font = "10px Arial";
            // c.fillStyle = "black";
            // c.textAlign = 'center';
            // c.textBaseline= 'middle';
            // c.fillText(tileCounter, tilePosX + tileSize / 2, tilePosY + tileSize / 2);

            tileCounter++;

            //After level is done generating
            if(tileCounter === maxTileCount){
                clearInterval(mapper);
                createMap();
            }
        }
        declareMap();
    }, 1);

    function createMap(){        
        var mapIndex = 0;
        for(var r = 0; r < mapTileHeight; r++){
            for(var c=0; c < mapTileWidth; c++){
                var mapPosition = [c * tileSize, r * tileSize];

                map.push(0);//mapIndex should be able to retrieve this.

                for(s = 0; s<stack.length; s++){
                    if(stack[s][0] === mapPosition[0]){
                        if(stack[s][1] === mapPosition[1]){
                            map[mapIndex]=1;
                        }
                    }
                }

                if(map[mapIndex] === 0){
                    //Push wall into the wall array for collisions
                    wall.push([c*tileSize, r*tileSize, c*tileSize+tileSize, r*tileSize+tileSize]);
                }

                if(map[mapIndex] === 1){
                    floors.push([c*tileSize, r*tileSize, c*tileSize+tileSize, r*tileSize+tileSize])
                }
                mapIndex++;
            }
        }

        // var mapChecked = mapQualityChecker();
        // console.log(mapChecked);

        mapChecked = true;
        if(mapChecked === true){
            // mapLoaded = true;
            loadWalls();
            return gameManager();
        }
    }
} // End init map


function mapQualityChecker(){
    // console.log("checking Chamber")
    var wallCounter = 0,
        tileCounter = 0;

    for(i in map){
        // console.log(tileChecker);
        if(tileCounter === (mapTileHeight*mapTileWidth)/2 || tileCounter === mapTileHeight*mapTileWidth -1){//checks the first half of the grid, then the second half
            if(wallCounter > (mapTileHeight*mapTileWidth)*.45){
                return reloadMap();
            }
            wallCounter = 0;
        }

        if(map[tileCounter]===0){
            wallCounter++;
        }

        tileCounter++;
    }
    return true;
}



function reloadMap(){
    console.log('reloading map');
    fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height);
    map = [];
    stack = [];
    wall = [];
    randomStart = [];
    Player.Position = [];

    generateMap();
}


function loadFloors(){
    for(var y = 0; y < mapTileHeight; y++){
        for(var x = 0; x < mapTileWidth; x++){   
           if(map[((y*mapTileWidth)+x)] === 1){
               // console.log("loading from map floors")         
               c.drawImage(tileSet, 6*tileSetSize, 2*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);

           }
       }
   }
}

function loadWalls(){
    ///This draws the map wall sprites ----------------------------------------------------------------------------------------------------
     for(var y = 0; y < mapTileHeight; y++){
         for(var x = 0; x < mapTileWidth; x++){  
             // console.log("loading")          
             switch(map[((y*mapTileWidth)+x)]){
                 case 0: // Wall
                     ///Surounding floors on all sides
                     if(map[((y*mapTileWidth)+x)+1] === 1 && map[((y*mapTileWidth)+x)-1] === 1 && map[((y*mapTileWidth)+x)+mapTileWidth] === 1 && map[((y*mapTileWidth)+x)-mapTileWidth] === 1){
                         c.drawImage(tileSet, 6*tileSetSize, 1*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                     } 
                     //surrounding floors on left right bottom 
                     else if(map[((y*mapTileWidth)+x)+1] === 1 && map[((y*mapTileWidth)+x)-1] === 1 && map[((y*mapTileWidth)+x)+mapTileWidth] === 1){
                         c.drawImage(tileSet, 3*tileSetSize, 2*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                     } 
                     //surrounding floors on top right bottom 
                     else if(map[((y*mapTileWidth)+x)+1] === 1 && map[((y*mapTileWidth)+x)-mapTileWidth] === 1 && map[((y*mapTileWidth)+x)+mapTileWidth] === 1){
                         c.drawImage(tileSet, 6*tileSetSize, 0*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                     } 
                     //surrounding floors on top & left & bottom 
                     else if(map[((y*mapTileWidth)+x)-mapTileWidth] === 1 && map[((y*mapTileWidth)+x)-1] === 1 && map[((y*mapTileWidth)+x)+mapTileWidth] === 1){
                         c.drawImage(tileSet, 4*tileSetSize, 0*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                     } 
                     //surrounding floors on top & right & left
                     else if(map[((y*mapTileWidth)+x)+1] === 1 && map[((y*mapTileWidth)+x)-1] === 1 && map[((y*mapTileWidth)+x)-mapTileWidth] === 1){
                         c.drawImage(tileSet, 3*tileSetSize, 0*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                     }  
                     //surrounding floors on right and left
                     else if(map[((y*mapTileWidth)+x)+1] === 1 && map[((y*mapTileWidth)+x)-1] === 1){
                         c.drawImage(tileSet, 3*tileSetSize, 1*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                     } 
                     //surrounding floors on top and bottom
                     else if(map[((y*mapTileWidth)+x)+mapTileWidth] === 1 && map[((y*mapTileWidth)+x)-mapTileWidth] === 1){
                         c.drawImage(tileSet, 5*tileSetSize, 0*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                     } 
                     // surrounding floor top and left
                     else if(map[((y*mapTileWidth)+x)-mapTileWidth] === 1 && map[((y*mapTileWidth)+x)-1] === 1){
                         if(map[((y*mapTileWidth)+x)+(mapTileWidth + 1)] === 1){
                             // if there is a wall on the bottom right
                             c.drawImage(tileSet, 0*tileSetSize, 3*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else{
                             c.drawImage(tileSet, 0*tileSetSize, 0*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         }
                     } 
                     // surrounding floor top and right
                     else if(map[((y*mapTileWidth)+x)-mapTileWidth] === 1 && map[((y*mapTileWidth)+x)+1] === 1){
                         if(map[((y*mapTileWidth)+x) + (mapTileWidth-1)] === 1){
                             // if there is a wall on the bottom left
                             c.drawImage(tileSet, 2*tileSetSize, 3*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else{
                             c.drawImage(tileSet, 2*tileSetSize, 0*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         }
                     }
                     // surrounding floor bottom and left
                     else if(map[((y*mapTileWidth)+x)+mapTileWidth] === 1 && map[((y*mapTileWidth)+x)-1] === 1){
                         if(map[((y*mapTileWidth)+x) - (mapTileWidth-1)] === 1){
                             //If there is a wall tile on the top right
                             c.drawImage(tileSet, 0*tileSetSize, 5*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else{
                             c.drawImage(tileSet, 0*tileSetSize, 2*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         }
                     } 
                     // surrounding floor bottom and right
                     else if(map[((y*mapTileWidth)+x)+mapTileWidth] === 1 && map[((y*mapTileWidth)+x)+1] === 1){
                         if(map[((y*mapTileWidth)+x)-(mapTileWidth + 1)] === 1){
                             //if there is a wall on the top left
                             c.drawImage(tileSet, 2*tileSetSize, 5*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else{
                             c.drawImage(tileSet, 2*tileSetSize, 2*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         }
                     } 
                     // surrounding floors on right
                     else if(map[((y*mapTileWidth)+x)+1] === 1){
                         if(map[((y*mapTileWidth)+x)+(mapTileWidth -1)] === 1 && map[((y*mapTileWidth)+x)-(mapTileWidth +1)] === 1){
                             c.drawImage(tileSet, 2*tileSetSize, 4*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)+(mapTileWidth -1)] === 1){
                             c.drawImage(tileSet, 6*tileSetSize, 4*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth +1)] === 1){
                             c.drawImage(tileSet, 6*tileSetSize, 3*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else {
                             // place a right tile
                             c.drawImage(tileSet, 2*tileSetSize, 1*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         }
                     } 
                     // surrounding floors on left
                     else if(map[((y*mapTileWidth)+x)-1] === 1){
                         if(map[((y*mapTileWidth)+x)-(mapTileWidth -1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth +1)] === 1){
                             c.drawImage(tileSet, 0*tileSetSize, 4*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         }else if(map[((y*mapTileWidth)+x)+(mapTileWidth +1)] === 1){
                             c.drawImage(tileSet, 5*tileSetSize, 4*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth -1)] === 1){
                             c.drawImage(tileSet, 5*tileSetSize, 3*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else{
                             ///Place a left tile
                             c.drawImage(tileSet, 0*tileSetSize, 1*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         }
                     } 
                     // surrounding floors on top
                     else if(map[((y*mapTileWidth)+x)-mapTileWidth] === 1){
                         if(map[((y*mapTileWidth)+x)+(mapTileWidth -1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth +1)] === 1){
                             c.drawImage(tileSet, 1*tileSetSize, 3*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)+(mapTileWidth -1)] === 1){
                             c.drawImage(tileSet, 3*tileSetSize, 3*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)+(mapTileWidth +1)] === 1){
                             c.drawImage(tileSet, 4*tileSetSize, 3*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         }else {
                             c.drawImage(tileSet, 1*tileSetSize, 0*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         }
                     } 
                     // surrounding floors on bottom
                     else if(map[((y*mapTileWidth)+x)+mapTileWidth] === 1){
                         if(map[((y*mapTileWidth)+x)-(mapTileWidth -1)] === 1 && map[((y*mapTileWidth)+x)-(mapTileWidth +1)] === 1){
                             c.drawImage(tileSet, 1*tileSetSize, 5*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth -1)] === 1){
                             c.drawImage(tileSet, 4*tileSetSize, 4*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth +1)] === 1){
                             c.drawImage(tileSet, 3*tileSetSize, 4*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else {
                             c.drawImage(tileSet, 1*tileSetSize, 2   *tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         }
                     }       
                     
                     
                     else{
                         if(map[((y*mapTileWidth)+x)-(mapTileWidth+1)] === 1 && map[((y*mapTileWidth)+x)-(mapTileWidth-1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth+1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth-1)] === 1){
                             c.drawImage(tileSet, 1*tileSetSize, 4*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth+1)] === 1 && map[((y*mapTileWidth)+x)-(mapTileWidth-1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth+1)] === 1){
                             // top left & top right & bottom right
                             c.drawImage(tileSet, 7*tileSetSize, 0*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth+1)] === 1 && map[((y*mapTileWidth)+x)-(mapTileWidth-1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth-1)] === 1){
                             // top left & top right & bottom left
                             c.drawImage(tileSet, 7*tileSetSize, 3*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth+1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth+1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth-1)] === 1){
                             // top left & bottom right & bottom left
                             c.drawImage(tileSet, 7*tileSetSize, 2*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth-1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth+1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth-1)] === 1){
                             // top right & bottom right & bottom left
                             c.drawImage(tileSet, 7*tileSetSize, 1*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth -1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth +1)] === 1){
                             // place a tile with a connecting block on top right and bottom right
                             c.drawImage(tileSet, 7*tileSetSize, 5*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth +1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth -1)] === 1){
                             // place a tile with a connecting block on top left and bottom left
                             c.drawImage(tileSet, 7*tileSetSize, 4*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth -1)] === 1 && map[((y*mapTileWidth)+x)-(mapTileWidth +1)] === 1){
                             // place a tile with a connecting block on top right and top left
                             c.drawImage(tileSet, 5*tileSetSize, 5*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)+(mapTileWidth +1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth -1)] === 1){
                             // place a tile with a connecting block on bottom left and bottom right
                             c.drawImage(tileSet, 6*tileSetSize, 5*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth+1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth+1)] === 1){
                             //top left and bottom right
                             c.drawImage(tileSet, 3*tileSetSize, 5*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth-1)] === 1 && map[((y*mapTileWidth)+x)+(mapTileWidth-1)] === 1){
                             //top right and bottom left
                             c.drawImage(tileSet, 4*tileSetSize, 5*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         }
                         else if(map[((y*mapTileWidth)+x)+(mapTileWidth+1)] === 1){
                             c.drawImage(tileSet, 4*tileSetSize, 1*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)+(mapTileWidth-1)] === 1){
                             c.drawImage(tileSet, 5*tileSetSize, 1*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth+1)] === 1){
                             c.drawImage(tileSet, 5*tileSetSize, 2*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         } else if(map[((y*mapTileWidth)+x)-(mapTileWidth-1)] === 1){
                             c.drawImage(tileSet, 4*tileSetSize, 2*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         }
                         else{
                             //Draws an empty wall block
                             c.drawImage(tileSet, 1*tileSetSize, 1*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                         }   
                     }
                     break;
                 default: // Floor
                         // c.drawImage(tileSet, 6*tileSetSize, 2*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                     break;
             }
             // c.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
         }
     }
 }
 


//End key listeners

// function reloadMap(){
//     while(i<=map.length){
//         map.pop(i);
//     }
//     map.pop(0);
//     while(i<=stack.length){
//         stack.pop(i);
//     }
//     stack.pop(0);
//     while(i<=wall.length){
//         wall.pop(i);
//     }
//     wall.pop(0);
//     generateMap();
// }