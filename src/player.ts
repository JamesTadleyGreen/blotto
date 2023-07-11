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

export default movePlayer
