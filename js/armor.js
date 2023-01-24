let tier1ArmorEquipped = false;

armors = {
    PLATING: function(){
        if (tier1ArmorEquipped === false){
            tier1ArmorEquipped = true
            player.damageReduction = 2
            playSound("equip_armor");
            if (ArmorUpgraded === true){
                player.damageReduction = 3
            }
            
        }else{
            tier1ArmorEquipped = false
            player.damageReduction = 1
        }
    }
};