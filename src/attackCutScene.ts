import * as Phaser from 'phaser';
import * as Parallax from './parallax'
import * as Player from './player'

class CutSceneController extends Phaser.Scene {
    constructor() {
        super('CutSceneController');
    }
    create() {
        this.scene.launch('AttackCutScene');
        this.scene.launch('AttackCutScene');
    }
}

class AttackCutScene extends Phaser.Scene {
    constructor() {
        super('AttackCutScene');
    }

    preload() {
        this.load.spritesheet('playerRun', "/assets/Character/Player/_Run.png", { frameWidth: 120, frameHeight: 80 });
        this.load.spritesheet('playerIdle', "/assets/Character/Player/_Idle.png", { frameWidth: 120, frameHeight: 80 });
        this.load.spritesheet('playerAttack', "/assets/Character/Player/_Attack.png", { frameWidth: 120, frameHeight: 80 });
        this.load.spritesheet('playerDeath', "/assets/Character/Player/_Death.png", { frameWidth: 120, frameHeight: 80 });
        this.load.spritesheet('enemyIdle', "/assets/Character/Enemy/_Idle.png", { frameWidth: 120, frameHeight: 80 });
        this.load.spritesheet('enemyAttack', "/assets/Character/Enemy/_Attack.png", { frameWidth: 120, frameHeight: 80 });
        this.load.spritesheet('enemyDeath', "/assets/Character/Enemy/_Death.png", { frameWidth: 120, frameHeight: 80 });
        this.load.image('cloud', '/assets/Background/cloud.png')
        this.load.image('mountain', '/assets/Background/mountain.png')
        this.load.image('pine1', '/assets/Background/pine1.png')
        this.load.image('pine2', '/assets/Background/pine2.png')
        this.load.image('sky', '/assets/Background/sky.png')
    }
    create() {
        let players = null
        let enemies = null
        const width = this.scale.width
        const height = this.scale.height
        const totalWidth = width * 15

        Parallax.createAligned(this, totalWidth, 'sky', 0.15, 1.9)
        Parallax.createAligned(this, totalWidth, 'cloud', 0.15, 2.9)
        Parallax.createAligned(this, totalWidth, 'mountain', 0.2, 2.5)
        Parallax.createAligned(this, totalWidth, 'pine2', 0.35, 1.5)
        Parallax.createAligned(this, totalWidth, 'pine1', 0.45, 1.45)

        const playerAndEnemyAnimations = ['playerRun', 'playerIdle', 'playerAttack', 'playerDeath', 'enemyIdle', 'enemyAttack', 'enemyDeath']
        playerAndEnemyAnimations.forEach((key) => {
            this.anims.create({
                key: key,
                frames: this.anims.generateFrameNumbers(key),
                frameRate: 16
            })
        })

        this.cameras.main.setBounds(0, 0, totalWidth, height);

        const playerArray = []
        for (let i = 0; i < 10; i++) {
            playerArray.push([750 + i * 20, 310])
        }
        players = Player.runAttackScene(this, players, 3, enemies, 0, playerArray)


    }

}

export { CutSceneController, AttackCutScene }
