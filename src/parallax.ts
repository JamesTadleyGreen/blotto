const createAligned = (scene, totalWidth, texture, scrollFactor, height) => {
    const w = scene.textures.get(texture).getSourceImage().width
    const count = Math.ceil(totalWidth / w) * scrollFactor

    let x = 0
    for (let i = 0; i < count; ++i) {
        const m = scene.add.image(x, scene.scale.height, texture)
            .setOrigin(0, height)
            .setScrollFactor(scrollFactor)

        x += m.width
    }
}

export { createAligned }
