namespace SpriteKind {
    export const ast = SpriteKind.create()
    export const base = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    ship.y += -5
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (droid) {
        ship.sayText("disengage astromech", 500, false)
        droid = false
    } else {
        ship.sayText("engage astromech", 500, false)
        droid = true
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    laser()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    changeSpeed(0.75)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.ast, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeScoreBy(randint(10, 30))
})
function laser () {
    blast = sprites.createProjectileFromSprite(assets.image`bolt`, ship, 400, 0)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
    blast.setFlag(SpriteFlag.DestroyOnWall, true)
}
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
sprites.onOverlap(SpriteKind.base, SpriteKind.Player, function (sprite, otherSprite) {
    info.setLife(5)
    otherSprite.startEffect(effects.rings, 500)
    sprites.destroy(sprite)
    docked = false
})
let sttn: Sprite = null
let asteroid: Sprite = null
let blast: Sprite = null
let ship: Sprite = null
let docked = false
let droid = false
let speed = 0
game.splash("Pilot your X-Wing through asteroids! ")
info.setLife(5)
scene.setBackgroundColor(15)
speed = 1
droid = false
docked = false
let timer = 0
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
    if (!(docked)) {
        pause(500 / speed + 100 * randint(3, 6))
        asteroid = sprites.create(rocks._pickRandom(), SpriteKind.ast)
        asteroid.setBounceOnWall(true)
        asteroid.setFlag(SpriteFlag.AutoDestroy, true)
        asteroid.setPosition(153, randint(5, 100))
        asteroid.setVelocity(speed * randint(10, 90), randint(-90, 90))
        pause(1000 * speed)
        sprites.destroy(asteroid)
    }
})
forever(function () {
    if (droid) {
        laser()
        ship.y += randint(-6, 6)
        pause(randint(3, 6) * 250)
    }
})
forever(function () {
    if (!(docked)) {
        pause(500)
        timer += 1
        if (40 < timer) {
            docked = true
            timer = 0
            sttn = sprites.create(assets.image`station`, SpriteKind.base)
            sttn.setScale(2, ScaleAnchor.Middle)
            sttn.setPosition(147, 59)
            sttn.follow(ship)
        }
    }
})
