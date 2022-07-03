let tier1SwordEquipped = false;

items = {
    SWORD: function(){
        if (tier1SwordEquipped === false){
            tier1SwordEquipped = true
            player.baseAttack = 3
        }else{
            tier1SwordEquipped = false
            player.baseAttack = 1
        }
    }

    /*SHIELD: function(){
        if (tier1ShieldEquipped === false){
            tier1ShieldEquipped = true
            player.shield = 2
        }else{
            tier1ShieldEquipped = false
            player.shield = 0
        }
    }*/
};