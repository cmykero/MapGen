

var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');

canvas.width = 640;
canvas.height = 640;
c.fillRect(0,0,canvas.width, canvas.height);

var tileSize = 32;
var mapTileWidth = 20;
var mapTileHeight = 20;


var stack = [];
var init = false;

var map = [];
var wall = [];
var mapX = 0;
var mapY = 0;

function initMap(){
    

    var mapHeight = mapTileWidth * tileSize;
    var mapWidth = mapTileHeight * tileSize;

    var maxTileCount = 150; //Adjust this value to adjust how many blocks get placed
    var tileCounter = 0;
    var tilePosX = (randomizer(1, mapTileWidth-2) * tileSize);
    var tilePosY = (randomizer(1, mapTileHeight-2) * tileSize);
    
    
    
    //Don't change this value;
    var lastTile;

    var mapper = setInterval(function(){


        function declareMap(){
            var nextTile = randomizer(0,3); 

            if((nextTile === 0 && tilePosY - tileSize < tileSize) || (nextTile === 1 && tilePosX + tileSize === mapWidth - tileSize) || (nextTile === 2 && tilePosY + tileSize === mapWidth - tileSize) || (nextTile === 3 && tilePosX - tileSize < tileSize)){
                //Edge of map
                declareMap();
            } else if(nextTile === 0){ // Go Up
                tilePosY -= tileSize;
                lastTile = 2;
                drawTile()
            } else if(nextTile === 1){ // Go Right
                tilePosX += tileSize;
                lastTile = 3;
                drawTile();
            } else if(nextTile === 2){ // Go Down
                tilePosY += tileSize;
                lastTile = 0;
                drawTile();
            } else if(nextTile === 3){ // Go Left
                tilePosX -= tileSize;
                lastTile = 1;
                drawTile();
            }
        }

        function drawTile(){
            //If the tile gets placed on an existing tile redefine it
            for(i=0; i<stack.length; i++){
                if(stack[i][0] === tilePosX){
                    if(stack[i][1] === tilePosY){
                        return declareMap();
                    }
                }
            }

            stack.push([tilePosX, tilePosY]);


            //Draws the map as it's generating
            c.fillStyle = "White";
            c.fillRect(tilePosX, tilePosY, tileSize, tileSize);

            //Write on the tiles as they generate

            // c.font = "10px Arial";
            // c.fillStyle = "white";
            // c.textAlign = 'center';
            // c.textBaseline= 'middle';
            // c.fillText(tileCounter, tilePosX + tileSize / 2, tilePosY + tileSize / 2);


            tileCounter++;

            //After level is done generating
            if(tileCounter === maxTileCount){
                clearInterval(mapper);

                var randomStart = randomizer(0, stack.length);

                Player.Position[0] = stack[randomStart][0];
                Player.Position[1] = stack[randomStart][1];
                
                

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
                mapIndex++;
            }
        }

        Items.Spawner();

        levelDrawer();



    }
} // End init map


function levelDrawer(){

    for(var y = 0; y < mapTileHeight; y++){
        for(var x = 0; x < mapTileWidth; x++){
            switch(map[((y*mapTileWidth)+x)]){
                case 0:
                    c.fillStyle = "#999999";
                    break;
                default:
                    c.fillStyle = "#eeeeee";
                    break;
            }
            c.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
        }
    }
    
    loadPlayer(30);

    Items.Loader();
}


function collisions(direction){

    if(direction == "up"){
        for(var w = 0; w<wall.length; w++){   
            if(Player.Position[0]+1 >= wall[w][0] && Player.Position[0]+1 <= wall[w][2]){
                if(Player.Position[1] - Player.Speed < wall[w][3] && Player.Position[1] > wall[w][1]){
                    console.log("up");
                    return wall[w][3];
                }
            }    
        }
    }

    if(direction == "down"){
        for(var w = 0; w<wall.length; w++){   
            if(Player.Position[0]+1 >= wall[w][0] && Player.Position[0]+1 <= wall[w][2]){
                if(Player.Position[1] + Player.Speed + Player.Dimensions[0] > wall[w][1] && Player.Position[1] < wall[w][1]){
                    console.log("down");
                    return wall[w][1] - Player.Dimensions[0];
                }
            }    
        }
    }


    if(direction == "left"){
        for(var w = 0; w<wall.length; w++){   
            if(Player.Position[1]+1 >= wall[w][1] && Player.Position[1]+1 <= wall[w][3]){
                if(Player.Position[0] - Player.Speed < wall[w][2] && Player.Position[0] > wall[w][0]){
                    console.log("left");
                    return wall[w][2];
                }
            }    
        }
    }

    if(direction === "right"){      
        for(var w=0; w<wall.length; w++){
            if(Player.Position[1]+1 >= wall[w][1] && Player.Position[1]+1 <= wall[w][3]){
                if(Player.Position[0] + Player.Dimensions[0] +Player.Speed > wall[w][0] && Player.Position[0]+ Player.Dimensions[0] < wall[w][2]){///WHY DOES 2 WORK !?!?!?!?!?!?!?!?!?!?!
                    return wall[w][0] - Player.Dimensions[0];
                }
            }
        }
    }

}


var Items = {
    Chest: {
        Color: "#cfcc26",
        Dimensions: [10,10]
    },

    //Initializes the items
    Spawner: function(){
        var randomItemLocation = randomizer(0, stack.length);
        itemLocationX = stack[randomItemLocation][0];
        itemLocationY = stack[randomItemLocation][1];
    },

    //Keeps track of items
    Loader: function(){
        //Load Chest
        c.fillStyle = this.Chest.Color;
        c.fillRect(itemLocationX, itemLocationY, this.Chest.Dimensions[0], this.Chest.Dimensions[1]);
    }
}

// Player
var Player = {
    Blocked: false,
    Speed: 5,
    Position: [],
    Dimensions: [10,10]
}



function loadPlayer(event, interval){
    var movement;

        switch (event.keyCode){
            case 65: //Move Left
                
                movement = collisions("left");

                if(movement){
                    
                    return Player.Position[0] = movement;
                }

                Player.Position[0] -= Player.Speed;

            break;
            case 68: // Move Right


            // Player.Position[0] += Player.Speed;

                movement = collisions("right");

                if(movement){ 
                    return Player.Position[0] = movement;
                }

                Player.Position[0] += Player.Speed;

            break;
            case 87: // Move Up


                movement = collisions("up");

                if(movement){
                    return Player.Position[1] = movement;
                }

                Player.Position[1] -= Player.Speed;
            break;
            case 83: //Move Down
        


                movement = collisions("down");
                if(movement){
                    return Player.Position[1] = movement;
                }
                Player.Position[1] += Player.Speed;
            break;
    }


    c.fillStyle = 'blue';
    c.fillRect(Player.Position[0], Player.Position[1], Player.Dimensions[0], Player.Dimensions[1]);


    //Player has to initialize before listening to key events
    window.addEventListener('keydown', loadPlayer, true);

    var playerMovement = setInterval(function(){
        levelDrawer();
    },interval);
}




initMap();


window.onload = function(){

}