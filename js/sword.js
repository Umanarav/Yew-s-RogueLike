let tier1SwordEquipped = false;

swords = {
    CPMII: function(){
        if (tier1SwordEquipped === false){
            tier1SwordEquipped = true
            player.baseAttack = 3
            if (weaponUpgraded === true){
                player.baseAttack = 5
            }
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