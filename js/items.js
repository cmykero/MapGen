



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