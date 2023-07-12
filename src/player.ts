const movePlayer = (demo, player, x, y, duration) => {
    player.play({ key: 'playerRun', repeat: -1 });
    demo.tweens.add({
        targets: player,
        x: x,
        y: y,
        duration: duration,
        ease: 'Linear',
        onComplete: () => {
            demo.canTween = true
        }
    });


}

const setupPlayers = (demo, players, positionList: number[][], xOffset: number, duration: number) => {
    players = [];
    for (let i = 0; i < positionList.length; i++) {
        players.push(demo.add.sprite(positionList[i][0] - xOffset, positionList[i][1], 'playerRun').setScale(2));
    }
    players.map((player) => { movePlayer(demo, player, player.x + xOffset, player.y, duration) })
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

const attack = (players, enemies, survivingPlayerCount: number) => {
    players.map((player) => player.play({ key: 'playerAttack', repeat: 1 }))
    enemies.map((enemy) => enemy.play({ key: 'enemyAttack', repeat: 1 }))
    if (survivingPlayerCount >= 0) {
        enemies.map((enemy) => enemy.play({ key: 'enemyDeath', repeat: 1 }))
        players.slice(0, players.length - survivingPlayerCount - 1).map((player) => player.play({ key: 'playerDeath', repeat: 1 }))

    }
}

const runAttackScene = (demo, players, numOfPlayers, enemies, numOfEnemies, positionList) => {
    demo.canTween = false
    const duration = 2000
    enemies = setupEnemies(demo, enemies, positionList.slice(0, numOfEnemies))
    players = setupPlayers(demo, players, positionList.slice(0, numOfPlayers), 1000, duration)
    demo.cameras.main.startFollow(players[players.length - 1], true, 0.08, 0);
    attack(players, enemies, numOfPlayers)
}


export { movePlayer, setupPlayers, setupEnemies, runAttackScene }
