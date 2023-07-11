import * as Phaser from 'phaser';
import { createAligned } from './parallax'
import movePlayer from './player'

let players = null
let enemies = null

export default class Demo extends Phaser.Scene {
    constructor() {
        super('demo');
    }

    preload() {
        this.load.spritesheet('playerRun', "/assets/Character/Player/_Run.png", { frameWidth: 120, frameHeight: 80 });
        this.load.spritesheet('playerIdle', "/assets/Character/Player/_Idle.png", { frameWidth: 120, frameHeight: 80 });
        this.load.spritesheet('playerAttack', "/assets/Character/Player/_Attack.png", { frameWidth: 120, frameHeight: 80 });
        this.load.spritesheet('playerDeath', "/assets/Character/Player/_Death.png", { frameWidth: 120, frameHeight: 80 });
        this.load.image('cloud', '/assets/Background/cloud.png')
        this.load.image('mountain', '/assets/Background/mountain.png')
        this.load.image('pine1', '/assets/Background/pine1.png')
        this.load.image('pine2', '/assets/Background/pine2.png')
        this.load.image('sky', '/assets/Background/sky.png')
    }
    create() {
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
            frames: this.anims.generateFrameNumbers('playerRun'),
            frameRate: 16
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('playerIdle'),
            frameRate: 16
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('playerAttack'),
            frameRate: 16
        });

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('playerDeath'),
            frameRate: 16
        });

        players = [];
        for (let i = 0; i < 60; i++) {
            players.push(this.add.sprite(-50 - i, 320, 'playerRun').setScale(2));
        }
        const num_rows = Math.floor(players.length / 3) + 1
        const y_movement = Math.min(Math.floor(100 / players.length), 30)
        players.map((player, index) => { movePlayer(this.tweens, player, 750 + (index % num_rows) * 20, player.y + index * y_movement - players.length * y_movement, 2000) })

        this.cameras.main.setBounds(0, 0, totalWidth, height);
        this.cameras.main.startFollow(players[players.length - 1], true, 0.08, 0);

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
