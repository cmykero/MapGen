   
   
   
function mapSprites(){
   ///This draws the map wall sprites ----------------------------------------------------------------------------------------------------
    for(var y = 0; y < mapTileHeight; y++){
        for(var x = 0; x < mapTileWidth; x++){            
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
                        c.drawImage(tileSet, 6*tileSetSize, 2*tileSetSize, tileSetSize, tileSetSize, x*tileSize, y*tileSize, tileSize, tileSize);
                    break;
            }
            // c.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
        }
    }
}