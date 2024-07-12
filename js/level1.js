let level1;


/**
 * This function is to set the elements for the level to the variable level1
 * 
 */
function initLevel1(){
    level1 = new Level(
        [
            new Clouds(),
            new Clouds(),
            new Clouds(),
            new Clouds()
        ],
        [
            new BackgroundObject('../img/5_background/layers/air.png', -718),       
            new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -718),
            new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -718),
            new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -718),
            new BackgroundObject('../img/5_background/layers/air.png', 0),
            new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('../img/5_background/layers/air.png', 719),       
            new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('../img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('../img/5_background/layers/air.png', 719 * 3),       
            new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719 * 3)
        ],
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken()
        ],
            new Endboss(),
        [
            new PickableObject('../img/8_coin/coin_1.png',120 + Math.random() * 220,100,100,35,35,70,70),
            new PickableObject('../img/8_coin/coin_1.png',120 + Math.random() * 220,100,100,35,35,70,70),
            new PickableObject('../img/8_coin/coin_1.png',120 + Math.random() * 220,100,100,35,35,70,70),
            new PickableObject('../img/8_coin/coin_1.png',120 + Math.random() * 220,100,100,35,35,70,70),
            new PickableObject('../img/8_coin/coin_1.png',120 + Math.random() * 220,100,100,35,35,70,70),
            new PickableObject('../img/8_coin/coin_1.png',120 + Math.random() * 220,100,100,35,35,70,70),
            new PickableObject('../img/8_coin/coin_1.png',120 + Math.random() * 220,100,100,35,35,70,70),
            new PickableObject('../img/8_coin/coin_1.png',120 + Math.random() * 220,100,100,35,35,70,70),
            new PickableObject('../img/8_coin/coin_1.png',120 + Math.random() * 220,100,100,35,35,70,70),
            new PickableObject('../img/8_coin/coin_1.png',120 + Math.random() * 220,100,100,35,35,70,70)        
        ],
        [
            new PickableObject('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',355,50,60,20,10,30,16),
            new PickableObject('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',355,50,60,15,10,30,16),
            new PickableObject('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',355,50,60,20,10,30,16),
            new PickableObject('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',355,50,60,15,10,30,16),
            new PickableObject('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',355,50,60,20,10,30,16),
            new PickableObject('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',355,50,60,15,10,30,16),
            new PickableObject('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',355,50,60,20,10,30,16),
            new PickableObject('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',355,50,60,15,10,30,16),
            new PickableObject('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',355,50,60,20,10,30,16),
            new PickableObject('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',355,50,60,15,10,30,16),
            new PickableObject('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',355,50,60,20,10,30,16),
            new PickableObject('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',355,50,60,15,10,30,16),
            new PickableObject('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',355,50,60,20,10,30,16),
            new PickableObject('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',355,50,60,15,10,30,16),
            new PickableObject('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',355,50,60,20,10,30,16)
        ]    
    );
}