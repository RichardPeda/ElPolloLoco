const level1 = new Level(
    [new Chicken(), new Chicken(), new Chicken(), , new Chicken(), new Chicken(), new Chicken(), new Endboss()],
   
    [new Cloud('img/5_background/layers/4_clouds/1.png'), new Cloud('img/5_background/layers/4_clouds/2.png')],
    [
        'img/5_background/layers/air.png',
        'img/5_background/layers/air.png',
        'img/5_background/layers/3_third_layer/1.png',
        'img/5_background/layers/3_third_layer/2.png',
        'img/5_background/layers/2_second_layer/1.png',
        'img/5_background/layers/2_second_layer/2.png',
        'img/5_background/layers/1_first_layer/1.png',
        'img/5_background/layers/1_first_layer/2.png',
    ],
    4,
    [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()],
    [
        new CollectableBottle(),
        new CollectableBottle(),
        new CollectableBottle(),
        new CollectableBottle(),
        new CollectableBottle()
    ]
);
