//Created by Kero Mena


//randomizer
function randomizer(min,max){ // min and max included
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Percentor
function percentor(percentFor,percentOf){
    if(percentFor==percentOf){
        return  999999;
    }
    return Math.floor(percentFor/percentOf*100);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}