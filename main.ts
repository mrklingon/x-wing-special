namespace SpriteKind {
    export const ast = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    ship.y += -5
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    blast = sprites.createProjectileFromSprite(assets.image`bolt`, ship, 400, 0)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
    blast.setFlag(SpriteFlag.DestroyOnWall, true)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    changeSpeed(0.75)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.ast, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeScoreBy(randint(10, 30))
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    changeSpeed(1.2)
})
function changeSpeed (delta: number) {
    speed = speed * delta
    scroller.scrollBackgroundWithSpeed(-50 * speed, 0)
    scroller.scrollBackgroundWithSpeed(-77 * speed, 0, scroller.BackgroundLayer.Layer1)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    ship.y += 5
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ast, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let asteroid: Sprite = null
let blast: Sprite = null
let ship: Sprite = null
let speed = 0
game.splash("Pilot your X-Wing through asteroids! ")
info.setLife(5)
scene.setBackgroundColor(15)
speed = 1
let mscale = 0
scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`back1`)
scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`back0`)
changeSpeed(1)
ship = sprites.create(assets.image`Xwing`, SpriteKind.Player)
ship.setPosition(18, 55)
ship.changeScale(0.75, ScaleAnchor.Middle)
ship.setStayInScreen(true)
let rocks = [
assets.image`rock`,
assets.image`rock0`,
assets.image`rock1`,
assets.image`rock2`
]
forever(function () {
    pause(200 * randint(3, 9))
    asteroid = sprites.create(rocks._pickRandom(), SpriteKind.ast)
    asteroid.setBounceOnWall(true)
    asteroid.setFlag(SpriteFlag.AutoDestroy, true)
    asteroid.setPosition(153, randint(5, 100))
    asteroid.setVelocity(randint(10, 90), randint(10, 90))
    pause(2000)
    sprites.destroy(asteroid)
})
