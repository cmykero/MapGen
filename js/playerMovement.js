//Player movement variables
var velY = 0,
    velX = 0,
    friction = 0.7,
    keys = [];
  
function playerMovementTracker(){
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
    velY *= friction;
    Player.Position[1] += velY;
    velX *= friction;
    Player.Position[0] += velX;
}

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
