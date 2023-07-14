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

const die = (players, enemies, survivingPlayerCount: number) => {
    if (survivingPlayerCount >= 0) {
        enemies.map((enemy) => enemy.play({ key: 'enemyDeath', repeat: 0 }))
        players.slice(0, players.length - survivingPlayerCount).map((player) => player.play({ key: 'playerDeath', repeat: 0 }))
    }
    else {
        players.map((player) => player.play({ key: 'playerDeath', repeat: 0 }))
        enemies.slice(0, enemies.length - survivingPlayerCount).map((enemy) => enemy.play({ key: 'enemyDeath', repeat: 0 }))
    }

}

const attack = (players, enemies, survivingPlayerCount: number) => {
    players.map((player) => player.play({ key: 'playerAttack', repeat: 0 }))
    enemies.map((enemy) => enemy.play({ key: 'enemyAttack', repeat: 0 }))
    // TODO fix this animation triggers immediately
    players[0].once('animationcomplete', die(players, enemies, survivingPlayerCount))

}


const runAttackScene = (demo, players, numOfPlayers, enemies, numOfEnemies, positionList) => {
    demo.canTween = false
    const duration = 3000
    enemies = setupEnemies(demo, enemies, positionList.slice(0, numOfEnemies))
    players = setupPlayers(demo, players, positionList.slice(0, numOfPlayers), 1000, duration)
    demo.cameras.main.startFollow(players[players.length - 1], true, 0.08, 0);
    setTimeout(() => { attack(players, enemies, numOfPlayers - numOfEnemies) }, duration)
}


export { movePlayer, setupPlayers, setupEnemies, runAttackScene }
