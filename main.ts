controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    ship.y += -5
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    blast = sprites.createProjectileFromSprite(assets.image`bolt`, ship, 400, 0)
    blast.setFlag(SpriteFlag.DestroyOnWall, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    ship.y += 5
})
let blast: Sprite = null
let ship: Sprite = null
scene.setBackgroundColor(15)
let mscale = 0
scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`back1`)
scroller.scrollBackgroundWithSpeed(-50, 0)
scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`back0`)
scroller.scrollBackgroundWithSpeed(-77, 0, scroller.BackgroundLayer.Layer1)
ship = sprites.create(assets.image`Xwing`, SpriteKind.Player)
ship.setPosition(18, 55)
ship.changeScale(0.75, ScaleAnchor.Middle)
ship.setStayInScreen(true)
