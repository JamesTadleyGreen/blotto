import * as Phaser from 'phaser';

export default class Demo extends Phaser.Scene
{
    constructor ()
    {
        super('demo');
    }

    preload ()
    {
        this.load.image('sky_cloud', 'assets/Background/sky_cloud.png');
        this.load.image('sky', 'assets/Background/sky.png');
        this.load.image('cloud', 'assets/Background/cloud.png');
        this.load.image('mountain2', 'assets/Background/mountain2.png');
        this.load.image('pine1', 'assets/Background/pine1.png');
        this.load.image('pine2', 'assets/Background/pine2.png');
        this.load.image('ground2', 'assets/Background/ground2.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/map.json')
    }
    create ()
    {

        const map = this.make.tilemap({key: 'tilemap'})
        var sky_cloud = map.addTilesetImage('sky_cloud.png', 'sky_cloud')
        var mountain2 = map.addTilesetImage('mountain2.png', 'mountain2')
        var pine1 = map.addTilesetImage('pine1.png', 'pine1')
        var pine2 = map.addTilesetImage('pine2.png', 'pine2')
        var ground2 = map.addTilesetImage('ground2.png', 'ground2')
        map.createLayer('Tile Layer 1', [sky_cloud, ground2], 0,0)
        map.createLayer('Tile Layer 2', [mountain2], 0,0)
    }}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Demo
};

const game = new Phaser.Game(config);
