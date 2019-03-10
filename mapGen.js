

var canvas = document.querySelector("canvas"),
    c = canvas.getContext('2d');

canvas.width = 640;
canvas.height = 640;
c.fillRect(0,0,canvas.width, canvas.height);

var tileSize = 32,
    mapTileWidth = 20,
    mapTileHeight = 20;


var tileSet = new Image(),
    tileSetSize = 32;
tileSet.src = 'Assets/Dungeon tilemap.png';

    

//Map arrays
var stack = [],
    map = [],
    wall = [];

var mapLoaded = false;

//Player movement variables
var velY = 0,
    velX = 0,
    friction = 0.80,
    keys = [];

// Player
var Player = {
    Blocked: false,
    Speed: .75,
    Position: [],
    Dimensions: [5,5]
}

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

            //Push the generated tile to the stack for collisions
            stack.push([tilePosX, tilePosY]);

            //Draws the map as it's generating
            c.fillStyle = "White";
            c.fillRect(tilePosX, tilePosY, tileSize, tileSize);

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
                //Initialize the player start position
                var randomStart = randomizer(0, stack.length - 1);
                randomStart = stack[randomStart];
                Player.Position[0] = randomStart[0] +Player.Dimensions[0] +tileSize/2;
                Player.Position[1] = randomStart[1] +Player.Dimensions[1] +tileSize/2;
                
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

        mapLoaded = true;
        Items.Spawner();
        update();
    }
} // End init map

var Items = {
    Index:[
        {
            Name: "Key",
            Color: "#cfcc26",
            Dimensions: [10,10],
            Position: [],
            Hitbox: [-5, 15],
            Obtained: false,
            Interaction: function(){
                this.Position = [];
                this.Obtained = true;
                Items.Index[1].noKey = false;
                
            }
        },
        {
            Name: "Door",
            Color: "#947533",
            Dimensions: [20,tileSize],
            Position: [],
            Hitbox: [-5, tileSize -5],
            noKey: false,
            Interaction: function(){
                if(Items.Index[0].Obtained === true){
                    location.reload();
                } else{
                    this.noKey = true;
                }
            }
        },
    ],

    //Initializes the items
    Spawner: function(){
        for(i=0; i<Object.keys(Items.Index).length; i++){
            if(Items.Index[i].Position){
                Items.Index[i].Position = [];
            }
            var randomItemLocation = randomizer(0, stack.length - 1);
            itemLocationX = stack[randomItemLocation][0];
            itemLocationY = stack[randomItemLocation][1];
            Items.Index[i].Position.push(itemLocationX, itemLocationY);
            c.fillStyle = Items.Index[i].Color;
            c.fillRect(Items.Index[i].Position[0], Items.Index[i].Position[1], Items.Index[i].Dimensions[0], Items.Index[i].Dimensions[1]);
        }
    },

    //Keeps track of items every frame
    Updater: function(){
        for(i=0; i<Object.keys(Items.Index).length; i++){
            if(Items.Index[i]){
                c.fillStyle = Items.Index[i].Color;
                c.fillRect(Items.Index[i].Position[0], Items.Index[i].Position[1], Items.Index[i].Dimensions[0], Items.Index[i].Dimensions[1]);
            }
        }
    },

    
    Interact: function(){
        for(i=0; i<Object.keys(Items.Index).length; i++){
            if(Player.Position[0] <= Items.Index[i].Position[0] +Items.Index[i].Hitbox[1] && Player.Position[0] >= Items.Index[i].Position[0] +Items.Index[i].Hitbox[0]){
                if( Player.Position[1] <= Items.Index[i].Position[1] +Items.Index[i].Hitbox[1] && Player.Position[1] >= Items.Index[i].Position[1] +Items.Index[i].Hitbox[0]){
                    Items.Index[i].Interaction();
                }
            }
        }
    }
} // End Items

function collisions(direction){
    if(direction == "up"){
        for(var w = 0; w<wall.length; w++){   
            if(Player.Position[0]+1 >= wall[w][0] && Player.Position[0]+1 <= wall[w][2]){
                if(Player.Position[1] - Player.Speed  - Player.Dimensions[0]< wall[w][3] && Player.Position[1] > wall[w][1]){
                    return wall[w][3] + Player.Dimensions[0];
                }
            }    
        }
    }

    if(direction == "down"){
        for(var w = 0; w<wall.length; w++){   
            if(Player.Position[0]+1 >= wall[w][0] && Player.Position[0]+1 <= wall[w][2]){
                if(Player.Position[1] + Player.Speed + Player.Dimensions[0] > wall[w][1] && Player.Position[1] < wall[w][1]){
                    return wall[w][1] - Player.Dimensions[0];
                }
            }    
        }
    }

    if(direction == "left"){
        for(var w = 0; w<wall.length; w++){   
            if(Player.Position[1]+1 >= wall[w][1] && Player.Position[1]+1 <= wall[w][3]){
                if(Player.Position[0] - Player.Speed - Player.Dimensions[1] < wall[w][2] && Player.Position[0] > wall[w][0]){
                    return wall[w][2] + Player.Dimensions[1];
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
}//End collisions

function update(){
    requestAnimationFrame(update);

    //This variable is important for the collision checker
    var movement;

    //Check collisions up and down
    if(velY > 0){
        movement = collisions("down");
        if(movement){
            velY = 0;
            return Player.Position[1] = movement;
        }
    } else if(velY < 0){
        movement = collisions("up");
        if(movement){
            velY = 0;
            return Player.Position[1] = movement;
        }
    }

    //Check collisions left and Right
    if(velX < 0){
        movement = collisions("left");
        if(movement){
            velX = 0;
            return Player.Position[0] = movement;
        }
    }else if(velX > 0){
        movement = collisions("right");
        if(movement){ 
            velX = 0;
            return Player.Position[0] = movement;
        }
    }

    if(keys[65]){   //Left
        if(velX > -Player.Speed){
            velX--;
        }
    }
    if(keys[68]){   //Right
        if(velX < Player.Speed){
            velX++;
        }
    }
    if(keys[87]){   //Up
        if(velY > -Player.Speed){
            velY--;
        }
    }
    if(keys[83]){   //Down
        if(velY < Player.Speed){
            velY++;
        }
    }

    /// creates the sprites for the map walls and floors
    mapSprites();

    if(Items.Index[0].Obtained === true){
        c.fillStyle = 'white';
        c.textAlign = 'center';
        c.textBaseline = 'middle'
        c.font = '20px Arial'
        c.fillText("You have obtained the key!", canvas.width/2, tileSize/2);
        c.stroke();
    }

    if(Items.Index[1].noKey === true){
        c.fillStyle = 'white';
        c.textAlign = 'center';
        c.textBaseline = 'middle'
        c.font = '20px Arial'
        c.fillText("You must first obtain the key!", canvas.width/2, tileSize/2);
        c.stroke();
    }

    Items.Interact();
    Items.Updater();
    //The section above draws the map

    velY *= friction;
    Player.Position[1] += velY;
    velX *= friction;
    Player.Position[0] += velX;
    
    //Draws the player
    c.fillStyle = 'blue';

    c.beginPath();
    c.arc(Player.Position[0], Player.Position[1], 5, 0, Math.PI * 2);
    c.fill();
} // END UPDATE



//Listen for keys
window.addEventListener('keydown', function(e){
    if(mapLoaded === true){
        keys[e.keyCode] = true;
    }
}, true);

window.addEventListener('keyup', function(e){
    if(mapLoaded === true){
        keys[e.keyCode] = false;
    }
}, true);
//End key listeners

window.onload = function(){
    initMap();
}





function reloadMap(){
    while(i<=map.length){
        map.pop(i);
    }
    map.pop(0);
    while(i<=stack.length){
        stack.pop(i);
    }
    stack.pop(0);
    while(i<=wall.length){
        wall.pop(i);
    }
    wall.pop(0);
    initMap();
}