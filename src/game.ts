import * as Phaser from 'phaser';
import * as attackCutScene from './attackCutScene'



const config = {
    type: Phaser.AUTO,
    width: 1000,
    background: 0,
    height: 400,
    pixelArt: true,
    scene: [attackCutScene.CutSceneController, attackCutScene.AttackCutScene]
};

const game = new Phaser.Game(config);
