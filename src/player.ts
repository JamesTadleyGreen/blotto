const movePlayer = (tweens, player, x, y, duration) => {
    player.play({ key: 'walk', repeat: -1 });
    tweens.add({
        targets: player,
        x: x,
        y: y,
        duration: duration,
        ease: 'Linear',
        onComplete: () => {
            player.play({ key: 'idle', repeat: -1 });
        }
    });


}

const setupPlayers = (demo, players, positionList: number[][], xOffset: number) => {
    players = [];
    for (let i = 0; i < positionList.length; i++) {
        players.push(demo.add.sprite(positionList[i][0] - xOffset, positionList[i][1], 'playerRun').setScale(2));
    }
    players.map((player) => { movePlayer(demo.tweens, player, player.x + xOffset, player.y, 2000) })
    return players

}

const setupEnemies = (demo, enemies, positionList: number[][]) => {
    enemies = [];
    for (let i = 0; i < positionList.length; i++) {
        const enemy = demo.add.sprite(positionList[i][0] + 20, positionList[i][1], 'enemyIdle').setScale(2)
        enemy.flipX = true
        enemy.play({ key: 'enemyIdle', repeat: -1 });
        enemies.push(enemy);
    }
    return enemies
}

export { movePlayer, setupPlayers, setupEnemies }
