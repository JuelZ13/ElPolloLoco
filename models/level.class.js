class Level {
    clouds;
    backgroundObjects;
    character;
    enemies;
    endboss;
    coins;
    bottles;
    level_end_x = 2200; 


    /**
     * This function is to init the level. Load the objects to the arrays.
     * 
     * 
     * @param {array} clouds - cloud objects
     * @param {array} backgroundObjects - background objects
     * @param {array} enimies - enimies objects (chicken, smallchicken)
     * @param {object} endboss - endboss object
     * @param {array} coins - coin objects
     * @param {array} bottles - bottle objects
     */
    constructor(clouds, backgroundObjects, enimies, endboss, coins, bottles){
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.enemies = enimies;
        this.endboss = endboss;
        this.coins = coins;
        this.bottles = bottles;
    }
}