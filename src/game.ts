import * as Phaser from 'phaser';
import { createAligned } from './parallax'

let keys = null
let player = null

export default class Demo extends Phaser.Scene {
    constructor() {
        super('demo');
    }

    preload() {
        this.load.spritesheet('player', "/assets/Character/Player/_Run.png", { frameWidth: 120, frameHeight: 80 });
        this.load.image('cloud', '/assets/Background/cloud.png')
        this.load.image('mountain', '/assets/Background/mountain.png')
        this.load.image('pine1', '/assets/Background/pine1.png')
        this.load.image('pine2', '/assets/Background/pine2.png')
        this.load.image('sky', '/assets/Background/sky.png')
    }
    create() {
        keys = this.input.keyboard.addKeys("W,S,D,A");
        const width = this.scale.width
        const height = this.scale.height
        const totalWidth = width * 15

        createAligned(this, totalWidth, 'sky', 0.15, 1.9)
        createAligned(this, totalWidth, 'cloud', 0.15, 2.9)
        createAligned(this, totalWidth, 'mountain', 0.2, 2.5)
        createAligned(this, totalWidth, 'pine2', 0.35, 1.5)
        createAligned(this, totalWidth, 'pine1', 0.45, 1.45)


        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player'),
            frameRate: 16
        });

        player = this.add.sprite(250, 300, 'player').setScale(2);

        player.play({ key: 'walk', repeat: -1 });

        this.tweens.add({
            targets: player,
            x: 7500,
            duration: 18800,
            ease: 'Linear'
        });

        this.cameras.main.setBounds(0, 0, totalWidth, height);
        this.cameras.main.startFollow(player, true, 0.08, 0);

    }

}
const config = {
    type: Phaser.AUTO,
    width: 1000,
    background: 0,
    height: 400,
    pixelArt: true,
    scene: Demo
};

const game = new Phaser.Game(config);
