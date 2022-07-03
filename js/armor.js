let tier1ArmorEquipped = false;

armors = {
    ARMOR: function(){
        if (tier1ArmorEquipped === false){
            tier1ArmorEquipped = true
            player.damageReduction = 2
        }else{
            tier1ArmorEquipped = false
            player.damageReduction = 1
        }
    }
};