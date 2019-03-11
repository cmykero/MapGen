var canvas = document.querySelector("canvas"),
    c = canvas.getContext('2d');

canvas.width = 640;
canvas.height = 640;
c.fillRect(0,0,canvas.width, canvas.height);

var tileSize = 16,
    mapTileWidth = 40,
    mapTileHeight = 40,
    maxTileCount = 300; //Adjust this value to adjust how many blocks get placed


var mapLoaded = false,
    randomStart,
    eventListeners = false;


tileSet.src = 'Assets/Dungeon tilemap.png';


// Player
var Player = {
    Blocked: false,
    Speed: .6,
    Position: [],
    Dimensions: [5,5]
}

window.onload = function(){
    generateMap();
}

window.addEventListener('keydown', keyTrack);
window.addEventListener('keyup', keyTrack);
// eventListeners = true;


function gameManager(){
    getPlayerRandomStart(); //Initialize the player start position
    Items.Spawner();

    

    return gameEngine();//this function is what runs the game
}

function keyTrack(e){
    if(e.type === 'keydown'){
        keys[e.keyCode] = true  
    } else if(e.type === 'keyup'){
        keys[e.keyCode] = false
    }
}


function getRandomMapPosition(){
    randomStart = randomizer(0, stack.length - 1);
    randomStart = stack[randomStart];
}

function getPlayerRandomStart(){
    getRandomMapPosition();

    if((randomStart[0]<=450 && randomStart[0]>=150)||(randomStart[1]<=450 && randomStart[1]>=150)){
        return getPlayerRandomStart();
    }
    Player.Position[0] = randomStart[0] +Player.Dimensions[0] +tileSize/2;
    Player.Position[1] = randomStart[1] +Player.Dimensions[1] +tileSize/2;
    return;
}

function gameEngine(){
    requestAnimationFrame(gameEngine);

    loadFloors();    /// loads the floors needs to happen first

    playerMovementTracker();


    // if(Items.Index[0].Obtained === true){
    //     c.fillStyle = 'white';
    //     c.textAlign = 'center';
    //     c.textBaseline = 'middle'
    //     c.font = '20px Arial'
    //     c.fillText("You have obtained the key!", canvas.width/2, tileSize/2);
    //     c.stroke();
    // }

    // if(Items.Index[1].noKey === true){
    //     c.fillStyle = 'white';
    //     c.textAlign = 'center';
    //     c.textBaseline = 'middle'
    //     c.font = '20px Arial'
    //     c.fillText("You must first obtain the key!", canvas.width/2, tileSize/2);
    //     c.stroke();
    // }

    Items.Interact();
    Items.Updater();

    //Draws the player
    c.fillStyle = 'blue';
    c.beginPath();
    c.arc(Player.Position[0], Player.Position[1], 3, 0, Math.PI * 2);
    c.fill();
} // END gameUpdater
