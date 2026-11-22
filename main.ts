// ============================================================
//  GAL GAL SOCCER  -  גל גל להב
//  Welcome -> Player card -> 1 Penalties -> 2 Skills -> 3 Tackle -> 4 Fight -> Champion
//  All on-screen text is Hebrew, drawn with our own pixel font (right-to-left).
//  Custom colors live in pxt.json "palette": 3 = tan skin, a = purple, b = gray, c = gold, d = skin, e = dark brown
// ============================================================

namespace SpriteKind {
    export const Ball = SpriteKind.create()
    export const UI = SpriteKind.create()
    export const Keeper = SpriteKind.create()
}

// ---------------------------------------------------------------- Hebrew pixel font
// Each glyph is 5 wide and 11 tall: 7 body rows, lamed goes 2 rows up, final letters go 2 rows down.

const HEB_CHARS = "אבגדהוזחטיכךלמםנןסעפףצץקרשת"
// each glyph = 10 bytes: first row (0 for tall letters, 2 otherwise), then up to 9 rows of 5 bits
const HEB_FONT = hex`
    02110905060a09090000021e02020202021f0000021c040404060a120000021f0202020202020000
    021f0101111111110000020c0404040404040000021f0404040404040000021f1111111111110000
    021315111111111f0000020c0404000000000000021e01010101011e0000021f0101010101010101
    0010101f01010204080802160911111111170000021f11111111111f0000020c02020202021e0000
    020c0404040404040404021e11111111110e000002111109050204180000021f11190101011f0000
    021f11190101010101010211110a0402011f000002111214181010101010021f0101111210101010
    021e0101010101010000021515151513111f0000021f0909090909190000
`

const glyphCache: Image[] = []
function glyphImg(i: number, color: number): Image {
    const key = color * 32 + i
    while (glyphCache.length <= key) glyphCache.push(null)
    if (glyphCache[key]) return glyphCache[key]
    const im = image.create(5, 11)
    for (let y = 0; y < 9; y++) {
        const bits = HEB_FONT[i * 10 + 1 + y]
        for (let x = 0; x < 5; x++) {
            if ((bits >> (4 - x)) & 1) im.setPixel(x, HEB_FONT[i * 10] + y, color)
        }
    }
    glyphCache[key] = im
    return im
}

// numbers and latin letters keep reading left-to-right inside Hebrew text
function isLtr(c: string): boolean {
    return "0123456789/ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c) >= 0
}
function visualOrder(s: string): string[] {
    const rev: string[] = []
    for (let i = s.length - 1; i >= 0; i--) rev.push(s.charAt(i))
    const out: string[] = []
    let i = 0
    while (i < rev.length) {
        if (isLtr(rev[i])) {
            let j = i
            while (j < rev.length && isLtr(rev[j])) j++
            for (let k = j - 1; k >= i; k--) out.push(rev[k])
            i = j
        } else {
            out.push(rev[i])
            i++
        }
    }
    return out
}
function drawHeb(im: Image, vis: string[], ox: number, oy: number, color: number) {
    let x = ox
    for (const c of vis) {
        const gi = HEB_CHARS.indexOf(c)
        if (gi >= 0) im.drawTransparentImage(glyphImg(gi, color), x, oy)
        else if (c != " ") im.print(c, x, oy + 2, color)
        x += 6
    }
}
// Hebrew text as an image (11 px tall + shadow)
function textImg(s: string, color: number, shadow: number): Image {
    const vis = visualOrder(s)
    const im = image.create(Math.max(1, vis.length * 6 + 1), 12)
    if (shadow > 0) drawHeb(im, vis, 1, 1, shadow)
    drawHeb(im, vis, 0, 0, color)
    return im
}
// big text is doubled only if it still fits on the screen (the device can't double over 126 px anyway)
function bigTextImg(s: string, color: number, shadow: number): Image {
    const t = textImg(s, color, shadow)
    return t.width > 80 ? t : t.doubled()
}

// ---------------------------------------------------------------- photos of Gal

const PHOTO_CARD = hex`
    b35b0e331b0e1f1b030e4f1e232be35b0f330d0b0e0f130eff0f0eb31b0d011b018d0eaf1e4f0eb35b0d432d0eff2f0e
    b35b031f2b2d4f4e9f0bc31b010d1b231d1b0d0e2f1e0f133e5f0e0dd30b018d0b01031f0e0d030b0d130f1e5f0b0dd3
    bb0d0e1f032d1b230b0e4f010dc34b7d01030f0e332b1d0b1e2f03010db35b7d01332e233e032f0b1dd33b3d4b431e03
    0d5e1f0e011dc34b8d130b0d031e030d2e030d2f0b011dd33b8d231d1b1d432f012dc34b8d238d0b0e1f03210dd3db13
    2d330d1b2f0b210bd33bfd3d0b031f0b011d010bd33bad030b0d530d0b1f111d01e33bad130b0d43012f030b21e33b9d
    331d231b4f2d0ed33b1d4b0d031f0d132b13013e030b1d0b0ec35b1d1b03121f030d0b431e0d1b3d010b0e632e333b0d
    621f630b1f024b0d010b0e531e631b821f0e0d531f222d110b0e531e730e321e320f0e0d431f0e324b0e431e63421e52
    1f1d1b0d031f52230b0ea3f21f0e2d031f0e62130b0e532e030f825e127f82834e0f721e624f0e92732e230ff2822e42
    030b0e431e031d23011b030f0ef2324e02731e2d3b213bf2222f12931d712b1ef24f12831d2b311b112b2eb22b2f12a3
    313f7bb21b313f1e432d317e3fa24b511e632b1ebbc2111d114e332d6b811ea27d732d1b517b1eb24d932dab411e928d
    a33d214f51927d731e1d2f413f5ba2234d1e733d5b2f1b2e9221533e331e133d2b112f1b1f1e7251b31e231d232b6e82
    1e51931ee33e823b31931ee34e72333e234e331b534e13922e4b1f2ef383a2111e1b3f7e432e93d2112e1fb31bc3e231
    1fa31bd3f2122ef393f2224e731be3f232132e432bf303f2221e132e132be31fb23e1f533e3bd31fb2d31e0bf33f1ed2
    831e0bf33f3eb2336ef3131f124e721e336ef333224e62833e3bf313c2635e0bf3432e1372a31ef3531e3362f3f38362
    f3431bf313422ef3f37372f3e34b2e1352631ef373312e1342731ef3733b931bf3f36e232df3f3233bf3731b634b534b
    531ee3db533bf373db632bf373
`
const PHOTO_TROPHY = hex`
    133b1f030e4f0e330e52ce1b133e03210d031f0b7e33426e1f5e1b031f23312f1e4f5e32fe2e0b21033b2f8e2f0e22fe
    1e0b211b131b032e13ae220ffe0e03010b030e0b034f1e134e331e224fae131e4b035e13ae224f1e134e530b1e0b1311
    0d5e631e220e1f6e0f131e131e232b0e03010d0b2e535e220e1f0e030f2e0f430c3e031b1f1e0bd35e2f331e2d230c4e
    1f1ef3532e032c5d030f0d0c0e2f8e132eb31c0f0e0d032e030c1d030e2c0e1f5e3f2e0c0d1b1d0b730c1e0d536d030f
    5e0f331c030d3b2d531c332e132d031e030c7e3c0d030e0b016d730c1d0c331d033e136e3c230d215d0c233c1d4c1d03
    0e0f130c0e1f4e2c237d0c532cad330c5e1f1c0d1e0d0c0b213d130e5ced230f4e1c0d0e031d030b5d130e2c131cdd0c
    024f0e0b4c0d230d211d0c1e0d0b7c0d136d1c035f0e4c0d236d030e0d0b4c4d236d7f2c0b730c1d130c0d034c1d139d
    1e5f0e2d6c7d7c1d330d3c032e6f3c0e0b0d4c3d9c3d330c0d031f1e6f4c0b8d0c031d032e0c131d2c2d0c034e6f0b2c
    0d338d0c030f0e336d0c6e6f2b030c2e037d2c1e2c134d0c030f5e6f030e0d030c0b230c9d030e2c630c0e1f4e6f030e
    010f1c131c7d0c030f0e2c531c6e7f0e1b0f2c130c6d130c1e2c531c1e030f1e8f3e331c6da33c4eaf3b438d133f4d13
    6e9f1d6e3d234e3f231e1f3e238f0b2e2c233d3b1e9f9e7f3e2c134c1b1d3fee336f3e2c832dfe0e436f2e3c832dfe1e
    435f2e2c134c133dfe1e435f1e7c1d1c43fe6e5f0e136c1d53fe7e5f0e431c4d1c4dfe5e5f036cadfe4e234f5e1c4d13
    3dfe7e4f4e237d215e132bce4f0c3b233d3c213f532b5e132e4f4c233d232b23be4f4e4f4c131c1d43213d2e3cce4f4c
    33cd3e5c1f8e4f4c638d1f2e4c1f9e4f5c535d2b5e2cce4f8c1d132e113b7e1fae4f7c3d232b213f4e1fae4f8c4d831e
    5fbe4f8c2d231c131c4d13de5f9c1d3c232c9d9e5f8c2f3e5f1c8d8e5f0c1b6cef8d7e5f1b1d5c5f1e6f1c7d134e5f3d
    3c1e4f3e7f2c2d4c3e5f3d3c1e1f7e8f136c1f2e2f1e0c2d3c1e1f9ebf235e2f1e1c4d1e1fbeef4e1f2e6d1e1fde7f9e
    2f1e5dfefe5e1f1e5dfe5e3fbe1f1e5dfe0e6fbe131f1e5d2fee1ffe2e2f7d3ffefe0e2f7d5fde4fbe2f7d6fbe2f23be
    2f8d8f6e4f1c13ae2f8daf3e5f438e2f0e
`

// ---------------------------------------------------------------- art
// Gal: dark brown hair with a fringe, red shirt with black collar, red shorts,
// white socks and light-blue boots - just like in the pictures

const PLAYER_A = img`
    ...eeeeee...
    ..eeeeeeee..
    ..eeeeeeee..
    ..edfddfde..
    ...dddddd...
    ....dddd....
    ..22ffff22..
    .2222222222.
    .d22222222d.
    .d22222222d.
    ...222222...
    ...22..22...
    ...dd..dd...
    ...11..11...
    ...11..11...
    ..999..999..
`
const PLAYER_B = img`
    ...eeeeee...
    ..eeeeeeee..
    ..eeeeeeee..
    ..edfddfde..
    ...dddddd...
    ....dddd....
    ..22ffff22..
    .2222222222.
    .d22222222d.
    d.22222222.d
    ...222222...
    ..22....22..
    ..dd....dd..
    .11......11.
    .11......11.
    99........99
`
const KEEPER_IMG = img`
    .....ffff.....
    ....ffffff....
    ....fddddf....
    ....dddddd....
    .....dddd.....
    dd..555555..dd
    .d5555555555d.
    ..5555555555..
    ....555555....
    ....555555....
    ....111111....
    ....11..11....
    ....dd..dd....
    ....55..55....
    ....55..55....
    ...fff..fff...
`
// keeper diving to the LEFT (hands on the left)
const KEEPER_DIVE = img`
    dd..............
    ddfff...........
    .fddd555555511dd
    ..dd555555511ff.
    ................
`
// Gal sliding, feet to the RIGHT
const SLIDE_IMG = img`
    .ee.............
    eeed22222222dd19
    eddd22222222dd19
    .dd..d..........
`
const BALL_IMG = img`
    .111.
    1f1f1
    11f11
    1f1f1
    .111.
`
const AIM_IMG = img`
    ....2....
    ....2....
    ..22222..
    ..2...2..
    2222.2222
    ..2...2..
    ..22222..
    ....2....
    ....2....
`
const ARROW_RIGHT = img`
    ...1...
    ...11..
    111111.
    1111111
    111111.
    ...11..
    ...1...
`
const ARROW_UP = img`
    ...1...
    ..111..
    .11111.
    1111111
    ..111..
    ..111..
    ..111..
`

// Big title letters (6 x 9)
const HEB_BET = img`
    ......
    ......
    11111.
    ....1.
    ....1.
    ....1.
    ....1.
    ....1.
    111111
`
const HEB_HE = img`
    ......
    ......
    111111
    .....1
    .....1
    1....1
    1....1
    1....1
    1....1
`
const HEB_LAMED = img`
    1.....
    1.....
    1.....
    111111
    .....1
    .....1
    .....1
    ....1.
    ..11..
`
const HEB_GIMEL = img`
    ......
    ......
    1111..
    ...1..
    ...1..
    ...1..
    ...11.
    ..1.1.
    11..1.
`

function recolor(src: Image, from: number, to: number): Image {
    const im = src.clone()
    im.replace(from, to)
    return im
}
function flipped(src: Image): Image {
    const im = src.clone()
    im.flipX()
    return im
}
function flippedY(src: Image): Image {
    const im = src.clone()
    im.flipY()
    return im
}
// other teams: different shirt, black hair, black boots
function teamLook(src: Image, shirt: number): Image {
    return recolor(recolor(recolor(src, 2, shirt), 14, 15), 9, 15)
}
function makeBackView(): Image {
    const im = PLAYER_A.clone()
    im.fillRect(3, 3, 6, 2, 14)   // back of the head: hair
    im.fillRect(4, 7, 1, 3, 1)    // number 10 on the back
    im.fillRect(6, 7, 2, 3, 1)
    im.setPixel(6, 8, 2)
    return im
}

const ENEMY_A = teamLook(PLAYER_A, 8)
const ENEMY_B = teamLook(PLAYER_B, 8)
const PLAYER_BACK = makeBackView()
const KEEPER_DIVE_R = flipped(KEEPER_DIVE)
const FALLEN_ENEMY = flipped(teamLook(SLIDE_IMG, 8))
const ARROW_LEFT = flipped(ARROW_RIGHT)
const ARROW_DOWN = flippedY(ARROW_UP)

// ---------------------------------------------------------------- helpers

let keyBuf: string[] = []
// which game is running: 0 = Alona, 1 = Yiftach, 2 = Gal
let currentGame = 2
let totalScore = 0

controller.up.onEvent(ControllerButtonEvent.Pressed, () => { keyBuf.push("U") })
controller.down.onEvent(ControllerButtonEvent.Pressed, () => { keyBuf.push("D") })
controller.left.onEvent(ControllerButtonEvent.Pressed, () => { keyBuf.push("L") })
controller.right.onEvent(ControllerButtonEvent.Pressed, () => { keyBuf.push("R") })
controller.A.onEvent(ControllerButtonEvent.Pressed, () => { keyBuf.push("A") })
controller.B.onEvent(ControllerButtonEvent.Pressed, () => { keyBuf.push("B") })

function clearKeys() { keyBuf = [] }
function popKey(): string {
    if (keyBuf.length == 0) return null
    return keyBuf.shift()
}
// true if A was pressed since the last check (other keys are thrown away)
function popA(): boolean {
    let found = false
    while (keyBuf.length > 0) {
        if (keyBuf.shift() == "A") found = true
    }
    return found
}
function waitA() {
    clearKeys()
    pauseUntil(() => keyBuf.indexOf("A") >= 0)
    clearKeys()
}

function clearAll() {
    const kinds = [SpriteKind.Player, SpriteKind.Enemy, SpriteKind.Ball, SpriteKind.UI,
        SpriteKind.Keeper, SpriteKind.Food, SpriteKind.Projectile]
    for (const k of kinds) {
        for (const s of sprites.allOfKind(k)) s.destroy()
    }
    scene.centerCameraAt(80, 60)
}

function printCenter(bg: Image, s: string, y: number, color: number) {
    drawCenter(bg, textImg(s, color, 0), y)
}
function drawCenter(bg: Image, im: Image, y: number) {
    bg.drawTransparentImage(im, Math.floor((160 - im.width) / 2), y)
}
// swap a sprite's picture but keep it centered where it was (text changes width)
function setImageCentered(s: Sprite, im: Image) {
    const x = s.x
    const y = s.y
    s.setImage(im)
    s.setPosition(x, y)
}
function mk(im: Image, kind: number): Sprite { return ghost(sprites.create(im, kind)) }
function ghost(s: Sprite): Sprite {
    s.setFlag(SpriteFlag.Ghost, true)
    return s
}
function uiSprite(im: Image, x: number, y: number): Sprite {
    const s = mk(im, SpriteKind.UI)
    s.setPosition(x, y)
    s.z = 50
    s.setFlag(SpriteFlag.RelativeToCamera, true)
    return s
}
// big text that pops up for a moment
function banner(s: string, color: number, y: number, ms: number): Sprite {
    const sp = uiSprite(bigTextImg(s, color, 15), 80, y)
    sp.z = 100
    sp.lifespan = ms
    return sp
}
// our own little confetti (the built-in particle effects take too much room on the device)
function fx(x: number, y: number, spread: number, n: number, ms: number) {
    for (let i = 0; i < n; i++) {
        const d = mk(image.create(2, 2), SpriteKind.UI)
        d.image.fill(randint(1, 14))
        d.setPosition(x + randint(-spread, spread), y)
        d.vx = randint(-40, 40)
        d.vy = randint(-70, 10)
        d.ay = 120
        d.lifespan = ms
        d.z = 99
    }
}
function burst(s: Sprite, ms: number) {
    fx(s.x, s.y, 6, 12, ms)
}
function confetti(ms: number) {
    fx(80, 10, 80, 40, ms)
}
function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}
function bounceEase(x: number): number {
    const n1 = 7.5625
    const d1 = 2.75
    if (x < 1 / d1) return n1 * x * x
    if (x < 2 / d1) { x -= 1.5 / d1; return n1 * x * x + 0.75 }
    if (x < 2.5 / d1) { x -= 2.25 / d1; return n1 * x * x + 0.9375 }
    x -= 2.625 / d1
    return n1 * x * x + 0.984375
}

// a quick sweep from f0 to f1 played in the background
function snd(f0: number, f1: number, ms: number) {
    control.runInParallel(() => {
        for (let i = 0; i < 4; i++) music.playTone(f0 + (f1 - f0) * i / 3, ms / 4)
    })
}
// true on even animation frames: flips every n ticks
function anim(t: number, n: number): boolean { return Math.idiv(t, n) % 2 == 0 }
function sfxGoal() { snd(400, 1600, 500) }
function sfxKick() { snd(180, 60, 120) }
function sfxFail() { snd(1000, 150, 600) }
function sfxBeep() { music.playTone(988, 40) }
function sfxWhistle() { snd(1500, 1500, 250) }
function sfxJump() { snd(300, 1000, 150) }
function sfxHit() { snd(1200, 150, 300) }
function sfxKnock() { snd(250, 120, 60) }
function sfxSiren() { snd(700, 1100, 1500) }

// top bar: stage name on the right (Hebrew side), counters on the left
function hud(stageName: string, info: string): Image {
    const im = image.create(160, 11)
    im.fill(15)
    const n = textImg(stageName, 5, 0)
    im.drawTransparentImage(n, 158 - n.width, 0)
    im.drawTransparentImage(textImg(info, 1, 0), 2, 0)
    return im
}

// grass with mowing stripes
function grass(): Image {
    const bg = image.create(160, 120)
    bg.fill(7)
    for (let y = 0; y < 120; y++) {
        if (Math.idiv(y, 10) % 2 == 0) {
            for (let x = (y % 2) * 2; x < 160; x += 4) bg.setPixel(x, y, 6)
        }
    }
    return bg
}

// The name: גל גל להב (drawn left-to-right as ב ה ל _ ל ג _ ל ג)
function hebrewLetters(): Image[] {
    return [HEB_BET, HEB_HE, HEB_LAMED, null, HEB_LAMED, HEB_GIMEL, null, HEB_LAMED, HEB_GIMEL]
}
function letterTile(src: Image, color: number): Image {
    const tile = image.create(8, 11)
    tile.drawTransparentImage(recolor(src, 1, 15), 1, 1)
    tile.drawTransparentImage(recolor(src, 1, color), 0, 0)
    return tile.doubled()
}
function hebrewTitleImg(color: number): Image {
    const out = image.create(130, 22)
    let x = 0
    for (const l of hebrewLetters()) {
        if (l == null) { x += 8; continue }
        out.drawTransparentImage(letterTile(l, color), x, 0)
        x += 15
    }
    return out
}

// ---------------------------------------------------------------- welcome screen

function welcomeBg(): Image {
    const bg = grass()
    // sky
    bg.fillRect(0, 0, 160, 52, 9)
    // stadium crowd
    bg.fillRect(0, 52, 160, 14, 10)
    const crowd = [2, 5, 1, 4, 8, 3, 14]
    for (let y = 53; y < 65; y += 3) {
        for (let x = (y % 2) * 2; x < 160; x += 4) {
            bg.setPixel(x, y, crowd[randint(0, crowd.length - 1)])
            bg.setPixel(x, y + 1, 13)
        }
    }
    bg.fillRect(0, 65, 160, 2, 1)
    // goal on the right
    for (let y = 78; y < 104; y += 3) bg.drawLine(150, y, 159, y, 1)
    for (let x = 151; x < 160; x += 3) bg.drawLine(x, 76, x, 104, 1)
    bg.fillRect(148, 76, 2, 29, 1)
    bg.fillRect(148, 76, 12, 2, 1)
    // ground line
    bg.drawLine(0, 104, 160, 104, 1)
    return bg
}

function welcome() {
    clearAll()
    scene.setBackgroundImage(welcomeBg())

    // each letter is its own sprite so it can drop in and bounce
    const letters: Sprite[] = []
    let x = 10
    for (const l of hebrewLetters()) {
        if (l == null) { x += 8; continue }
        const s = uiSprite(letterTile(l, 5), x + 8, -20)
        letters.push(s)
        x += 15
    }
    // center the word
    const shift = Math.floor((160 - (x - 10 - 1)) / 2) - 10
    for (const s of letters) s.x += shift

    const sub = uiSprite(textImg("אתגר הכדורגל", 1, 8), 80, 44)
    sub.setFlag(SpriteFlag.Invisible, true)
    const pressA = uiSprite(textImg("לחץ A כדי לשחק", 5, 15), 80, 113)

    const runner = mk(PLAYER_A, SpriteKind.Player)
    const ball = mk(BALL_IMG, SpriteKind.Ball)

    clearKeys()
    let t = 0
    let c = 0
    while (!popA()) {
        t++
        c++

        // --- title letters drop in, then wave
        for (let i = 0; i < letters.length; i++) {
            const start = i * 6
            const p = (t - start) / 35
            if (p < 0) letters[i].y = -20
            else if (p < 1) letters[i].y = lerp(-20, 22, bounceEase(p))
            else letters[i].y = 22 + Math.sin((t + i * 5) / 7) * 2
        }
        if (t == 90) sub.setFlag(SpriteFlag.Invisible, false)
        pressA.setFlag(SpriteFlag.Invisible, t < 90 || Math.idiv(t, 15) % 2 == 0)

        // --- little soccer scene: dribble, shoot, GOAL!
        if (c < 90) {
            runner.x = lerp(-10, 108, c / 90)
            runner.y = 96
            runner.setImage(anim(c, 5) ? PLAYER_A : PLAYER_B)
            ball.x = runner.x + 9
            ball.y = 101 - Math.abs(Math.sin(c / 3)) * 3
            if (c == 89) sfxKick()
        } else if (c < 112) {
            const p = (c - 90) / 22
            ball.x = lerp(117, 154, p)
            ball.y = lerp(101, 90, p) - Math.sin(p * Math.PI) * 26
            runner.setImage(PLAYER_A)
        } else if (c == 112) {
            sfxGoal()
            scene.cameraShake(3, 300)
            burst(ball, 600)
            banner("גול!", 5, 78, 1400)
        } else if (c < 175) {
            // celebration jumps
            runner.y = 96 - Math.abs(Math.sin((c - 112) / 5)) * 10
            ball.y = Math.min(102, ball.y + 1)
        } else {
            c = 0
        }
        pause(20)
    }
    sfxWhistle()
}

// ---------------------------------------------------------------- player card (with Gal's photo)

function playerCard() {
    clearAll()
    const bg = image.create(160, 120)
    bg.fill(15)
    // gold rays
    for (let a = 0; a < 16; a++) {
        const ang = a * Math.PI / 8
        bg.drawLine(44, 60, 44 + Math.cos(ang) * 120, 60 + Math.sin(ang) * 120, a % 2 == 0 ? 12 : 14)
    }
    scene.setBackgroundImage(bg)

    // the card itself
    const card = image.create(58, 104)
    card.fill(12)
    card.drawRect(0, 0, 58, 104, 5)
    card.drawRect(1, 1, 56, 102, 14)
    card.drawImage(unpack(PHOTO_CARD, 48), 5, 5)
    card.drawRect(4, 4, 50, 76, 15)
    const name = textImg("גל להב", 15, 0)
    card.drawTransparentImage(name, Math.floor((58 - name.width) / 2), 89)
    // rating badge
    card.fillRect(5, 5, 15, 12, 15)
    card.print("99", 6, 7, 5)

    const cs = uiSprite(card, -40, 60)
    for (let i = 0; i <= 25; i++) {
        cs.x = lerp(-40, 44, bounceEase(i / 25))
        pause(20)
    }
    sfxWhistle()
    burst(cs, 500)

    const stats = ["מהירות 99", "בעיטה 98", "כדרור 99", "ראש 97", "כוח 99"]
    for (let i = 0; i < stats.length; i++) {
        pause(250)
        const s = uiSprite(textImg(stats[i], 1, 15), 0, 22 + i * 14)
        s.x = 154 - s.width / 2
        music.playTone(600 + i * 100, 60)
    }
    const big = uiSprite(bigTextImg("מספר 10", 5, 15), 115, 98)
    big.setFlag(SpriteFlag.Invisible, true)
    pause(300)
    big.setFlag(SpriteFlag.Invisible, false)
    const pressA = uiSprite(textImg("לחץ A", 9, 15), 115, 113)

    clearKeys()
    let t = 0
    while (!popA()) {
        t++
        cs.y = 60 + Math.sin(t / 12) * 2
        pressA.setFlag(SpriteFlag.Invisible, Math.idiv(t, 15) % 2 == 0)
        pause(20)
    }
}

// ---------------------------------------------------------------- stage screens

// show the intro, play the stage, and on a fail show the intro again and retry
function playStage(num: number, name: string, lines: string[], run: () => boolean) {
    stageIntro(num, name, lines)
    while (!run()) stageIntro(num, name, lines)
}
function stageIntro(num: number, name: string, lines: string[]) {
    clearAll()
    const bg = image.create(160, 120)
    bg.fill(15)
    for (let i = 0; i < 160; i += 8) {
        bg.fillRect(i, 0, 4, 4, 5)
        bg.fillRect(i + 4, 116, 4, 4, 5)
    }
    drawCenter(bg, bigTextImg("שלב " + num, 5, 2), 8)
    drawCenter(bg, bigTextImg(name, 1, 8), 34)
    let y = 62
    for (const l of lines) {
        printCenter(bg, l, y, 9)
        y += 12
    }
    printCenter(bg, "לחץ A", 103, 5)
    scene.setBackgroundImage(bg)
    sfxWhistle()
    waitA()
}

// ---------------------------------------------------------------- the big moment: a still frame from Gal's videos


// returns true when the stage was passed
function stageResult(label: string, got: number, outOf: number, need: number): boolean {
    pause(400)
    const passed = got >= need
    clearAll()
    const bg = image.create(160, 120)
    bg.fill(passed ? 8 : 14)
    drawCenter(bg, bigTextImg(label, 1, 15), 8)
    drawCenter(bg, bigTextImg(got + "/" + outOf, 5, 15), 36)
    // stars
    for (let i = 0; i < outOf; i++) {
        const cx = 80 + (outOf - 1) * 9 - i * 18
        bg.fillCircle(cx, 72, 6, i < got ? 5 : 11)
        bg.drawCircle(cx, 72, 6, 15)
    }
    if (passed) {
        drawCenter(bg, bigTextImg("עברת!", 5, 15), 84)
        confetti(1500)
        sfxGoal()
    } else {
        printCenter(bg, "צריך " + need + " כדי לעבור", 82, 1)
        printCenter(bg, "נסה שוב!", 94, 5)
        sfxFail()
    }
    printCenter(bg, "לחץ A", 107, 1)
    showAndWait(bg)
    return passed
}

// ---------------------------------------------------------------- STAGE 1: penalties

function penaltyBg(): Image {
    const bg = grass()
    // crowd behind the goal
    bg.fillRect(0, 0, 160, 12, 10)
    for (let x = 1; x < 160; x += 3) bg.setPixel(x, 3 + (x % 2) * 4, [2, 5, 1, 4, 8][x % 5])
    // net
    bg.fillRect(40, 14, 80, 30, 15)
    for (let x = 42; x < 120; x += 4) bg.drawLine(x, 14, x, 44, 11)
    for (let y = 16; y < 44; y += 4) bg.drawLine(40, y, 120, y, 11)
    // posts + bar
    bg.fillRect(38, 12, 3, 33, 1)
    bg.fillRect(119, 12, 3, 33, 1)
    bg.fillRect(38, 12, 84, 3, 1)
    // lines
    bg.drawLine(0, 44, 160, 44, 1)
    bg.drawRect(52, 44, 56, 14, 1)
    bg.drawRect(16, 44, 128, 60, 1)
    bg.fillRect(79, 87, 3, 2, 1)   // penalty spot
    return bg
}

function powerBarImg(p: number): Image {
    const im = image.create(8, 52)
    im.fill(15)
    const h = Math.floor(p / 2)
    const col = p > 88 ? 2 : (p > 60 ? 5 : 7)
    im.fillRect(1, 51 - h, 6, h, col)
    // "over the bar" line
    im.drawLine(0, 51 - 44, 7, 51 - 44, 2)
    im.drawRect(0, 0, 8, 52, 1)
    return im
}

// Penalties (Gal) and free kicks (Yiftach) share this stage.
// Penalty: the aim sweeps by itself, up/down = height. Free kick: aim with all arrows, beat the wall.
function stageShootout(fk: boolean): number {
    clearAll()
    scene.setBackgroundImage(penaltyBg())
    const keeper = mk(KEEPER_IMG, SpriteKind.Keeper)
    const gal = currentGame == 2
    const kicker = mk(gal ? PLAYER_BACK : YIF_BACK, SpriteKind.Player)
    const ball = mk(BALL_IMG, SpriteKind.Ball)
    const wall: Sprite[] = []
    if (fk) for (let i = 0; i < 3; i++) wall.push(mk(gal ? ENEMY_A : OPP_A, SpriteKind.Enemy))
    const aim = uiSprite(AIM_IMG, 80, 28)
    const bar = uiSprite(powerBarImg(0), 151, 80)
    const top = uiSprite(hud("", ""), 80, 5)
    const tip = uiSprite(textImg(" ", 1, 15), 80, 112)
    const title = fk ? "חופשית" : "פנדלים"
    const by = fk ? 88 : 86
    ball.z = 20
    aim.z = 60
    let goals = 0

    for (let shot = 1; shot <= 3; shot++) {
        top.setImage(hud(title, "בעיטה " + shot + "/3  גולים " + goals))
        const bx = fk ? randint(56, 104) : 80
        const wallX = Math.round(lerp(bx, 80, 0.45)) + randint(-6, 6)
        for (let i = 0; i < wall.length; i++) wall[i].setPosition(wallX - 11 + i * 11, 62)
        keeper.setImage(KEEPER_IMG)
        keeper.setPosition(80, 32)
        kicker.setPosition(bx, 104)
        ball.setPosition(bx, by)
        aim.setFlag(SpriteFlag.Invisible, false)
        bar.setImage(powerBarImg(0))

        // --- aim
        setImageCentered(tip, textImg(fk ? "חצים = לכוון  A = מוכן" : "חצים = גובה  A = כיוון", 1, 15))
        clearKeys()
        let ax = 80
        let ay = fk ? 30 : 28
        let dir = randint(0, 1) == 0 ? -1 : 1
        let t = 0
        while (!popA()) {
            t++
            if (fk) {
                if (controller.left.isPressed()) ax -= 0.8
                if (controller.right.isPressed()) ax += 0.8
            } else {
                ax += dir * (1.4 + shot * 0.3)
                if (ax >= 114) dir = -1
                if (ax <= 46) dir = 1
            }
            ax = Math.max(44, Math.min(116, ax))
            if (controller.up.isPressed()) ay -= fk ? 0.6 : 0.9
            if (controller.down.isPressed()) ay += fk ? 0.6 : 0.9
            ay = Math.max(18, Math.min(40, ay))
            aim.setPosition(ax, ay)
            keeper.x = 80 + Math.sin(t / 9) * 5
            pause(16)
        }
        sfxBeep()

        // --- power
        setImageCentered(tip, textImg("A = כוח", 1, 15))
        let p = 0
        let pd = 1
        while (!popA()) {
            t++
            p += pd * (2.2 + shot * 0.2)
            if (p >= 100) { p = 100; pd = -1 }
            if (p <= 0) { p = 0; pd = 1 }
            bar.setImage(powerBarImg(p))
            keeper.x = 80 + Math.sin(t / 9) * 5
            pause(16)
        }
        setImageCentered(tip, textImg(" ", 1, 15))
        aim.setFlag(SpriteFlag.Invisible, true)
        for (let i = 0; i < 9; i++) { kicker.y -= 1; pause(20) }
        sfxKick()

        // --- the shot; the keeper picks a side
        const over = p > 88
        const high = ay < 25
        const tx = ax
        const ty = over ? -6 : ay
        const diveDir = randint(-1, 1)
        const kx0 = keeper.x
        const kTarget = 80 + diveDir * 24
        if (diveDir < 0) keeper.setImage(KEEPER_DIVE)
        else if (diveDir > 0) keeper.setImage(KEEPER_DIVE_R)
        for (const w of wall) w.y = 58     // the wall jumps
        const frames = Math.max(13, Math.round(33 - p / 5))
        const reach = (diveDir == 0 ? 11 : 14) - p / 20 - (high && diveDir != 0 ? 3 : 0)
        const scores = !over && Math.abs(tx - kTarget) >= reach
        let blocked = false
        for (let i = 1; i <= frames; i++) {
            const f = i / frames
            const prevY = ball.y
            ball.x = lerp(bx, tx, f)
            ball.y = lerp(by, ty, f) - Math.sin(f * Math.PI) * (fk && high ? 16 : 6)
            if (fk && !over && !high && prevY > 62 && ball.y <= 62 && Math.abs(ball.x - wallX) < 17) {
                blocked = true
                break
            }
            const kf = Math.min(1, f * 1.5)
            keeper.x = lerp(kx0, kTarget, kf)
            if (diveDir != 0) keeper.y = 32 - Math.sin(kf * Math.PI) * 4
            pause(16)
        }
        for (const w of wall) w.y = 62

        // --- result: shots high in the corner are harder for the keeper to reach
        if (blocked) {
            failBanner("החומה עצרה!")
            for (let i = 1; i <= 15; i++) { ball.y += 2; ball.x += randint(-2, 2); pause(16) }
        } else if (over) {
            failBanner("מעל!")
        } else if (!scores) {
            failBanner("השוער עצר!")
            const rx = randint(30, 130)
            for (let i = 1; i <= 20; i++) {
                ball.x = lerp(tx, rx, i / 20)
                ball.y = lerp(ay, 70, i / 20)
                pause(16)
            }
        } else {
            goals++
            goalFx(ball)
        }
        top.setImage(hud(title, "בעיטה " + shot + "/3  גולים " + goals))
        pause(1500)
    }
    return goals
}
function failBanner(s: string) {
    banner(s, 2, 64, 1200)
    sfxFail()
}
// ---------------------------------------------------------------- CROSSBAR: hit the bar (or a post) 2 times in a row
// The aim swings across the woodwork; A when it is right on it.
function stageBar(): number {
    clearAll()
    scene.setBackgroundImage(penaltyBg())
    const kicker = mk(PLAYER_BACK, SpriteKind.Player)
    const ball = mk(BALL_IMG, SpriteKind.Ball)
    ball.z = 20
    const aim = uiSprite(AIM_IMG, 80, 13)
    aim.z = 60
    const aimOn = recolor(AIM_IMG, 2, 7)                             // green = right on the woodwork
    const top = uiSprite(hud("משקוף", ""), 80, 5)
    let streak = 0
    for (let shot = 1; shot <= 8 && streak < 2; shot++) {
        top.setImage(hud("משקוף", "ברצף " + streak + "/2  נשארו " + (9 - shot)))
        const post = randint(0, 2) == 0
        const px = randint(0, 1) == 0 ? 39 : 120
        const bx = randint(50, 110)
        kicker.setPosition(80, 104)
        ball.setPosition(80, 86)
        aim.setFlag(SpriteFlag.Invisible, false)
        let a = 0
        let t = randint(0, 50)
        clearKeys()
        while (!popA()) {
            t++
            a = Math.sin(t * (0.055 + streak * 0.01)) * 11          // distance from the woodwork
            if (post) aim.setPosition(px + a, 30)
            else aim.setPosition(bx, 13 + a)
            aim.setImage(Math.abs(a) < 3 ? aimOn : AIM_IMG)
            pause(16)
        }
        aim.setFlag(SpriteFlag.Invisible, true)
        for (let i = 0; i < 9; i++) { kicker.y -= 1; pause(20) }
        sfxKick()
        for (let i = 1; i <= 16; i++) {
            ball.x = lerp(80, aim.x, i / 16)
            ball.y = lerp(86, aim.y, i / 16) - Math.sin(i / 16 * Math.PI) * 8
            pause(16)
        }
        if (Math.abs(a) < 3) {
            streak++
            snd(1900, 1700, 400)                                   // DING!
            banner("דינג!", 5, 64, 1000)
            scene.cameraShake(2, 200)
            burst(ball, 500)
            for (let i = 1; i <= 16; i++) { ball.y += 3; ball.x += post ? (px < 80 ? 2 : -2) : 0; pause(16) }
        } else {
            streak = 0
            failBanner(post ? "פספסת!" : (a < 0 ? "מעל!" : "גול... אבל לא משקוף!"))
        }
        top.setImage(hud("משקוף", "ברצף " + streak + "/2  נשארו " + (8 - shot)))
        pause(1300)
    }
    return streak
}

function goalFx(ball: Sprite) {
    totalScore += 100
    banner("גול!", 5, 64, 1200)
    sfxGoal()
    scene.cameraShake(3, 300)
    burst(ball, 700)
}

// ---------------------------------------------------------------- STAGE 2: skills

class Skill {
    constructor(public name: string, public combo: string[], public ms: number, public anim: number) { }
}
const SKILLS = [
    new Skill("סטפ אובר", ["U", "D", "A"], 4000, 0),
    new Skill("קשת", ["U", "D", "A", "B", "A"], 4500, 1),
    new Skill("ספין 360", ["U", "L", "D", "R", "A", "B"], 5000, 3),
]

function keyIcon(k: string, bg: number): Image {
    const im = image.create(13, 13)
    im.fillRect(0, 0, 13, 13, bg)
    im.drawRect(0, 0, 13, 13, 1)
    let arrow: Image = null
    if (k == "U") arrow = ARROW_UP
    if (k == "D") arrow = ARROW_DOWN
    if (k == "L") arrow = ARROW_LEFT
    if (k == "R") arrow = ARROW_RIGHT
    if (arrow) im.drawTransparentImage(arrow, 3, 3)
    else im.print(k, 4, 3, 1)
    return im
}

// the combo is pressed left-to-right (like on the controller), title is Hebrew
function comboPanel(sk: Skill, done: number, failed: boolean, timeFrac: number): Image {
    const im = image.create(160, 34)
    im.fill(15)
    drawCenter(im, textImg(sk.name + "!", 5, 0), 0)
    const n = sk.combo.length
    const x0 = Math.floor((160 - n * 16 + 3) / 2)
    for (let i = 0; i < n; i++) {
        let col = 10
        if (i < done) col = 7
        else if (failed && i == done) col = 2
        else if (i == done) col = 8
        im.drawTransparentImage(keyIcon(sk.combo[i], col), x0 + i * 16, 12)
    }
    im.fillRect(4, 29, Math.floor(152 * timeFrac), 3, timeFrac > 0.3 ? 5 : 2)
    return im
}

function skillsBg(): Image {
    const bg = grass()
    bg.drawLine(0, 36, 160, 36, 1)
    bg.drawLine(0, 110, 160, 110, 1)
    bg.drawCircle(80, 73, 18, 1)
    bg.drawLine(80, 36, 80, 110, 1)
    return bg
}

// show the combo panel and wait for the keys; true = done in time without a mistake
function runCombo(sk: Skill, panel: Sprite, me: Sprite, Y: number): boolean {
    panel.setFlag(SpriteFlag.Invisible, false)
    clearKeys()
    let done = 0
    let failed = false
    const start = game.runtime()
    while (done < sk.combo.length && !failed) {
        const frac = 1 - (game.runtime() - start) / sk.ms
        if (frac <= 0) { failed = true; break }
        const k = popKey()
        if (k != null) {
            if (k == sk.combo[done]) {
                done++
                music.playTone(523 + done * 120, 60)
                me.y = Y + (done % 2 == 0 ? -3 : 3)
            } else {
                failed = true
            }
        }
        panel.setImage(comboPanel(sk, done, failed, Math.max(0, frac)))
        pause(16)
    }
    panel.setImage(comboPanel(sk, done, failed, 0))
    me.y = Y
    return !failed
}

// Things slide along a rail past a gold frame; press A when the right one is in the frame.
// Used for Yiftach's shirts and Alona's transition spot.
function railBg(wall: number, floor: number): Image {
    const bg = image.create(160, 120)
    bg.fill(wall)
    bg.fillRect(0, 70, 160, 50, floor)
    bg.fillRect(0, 30, 160, 2, 1)                 // the rail
    bg.drawRect(66, 28, 28, 28, 5)                // gold frame
    bg.drawRect(67, 29, 26, 26, 5)
    return bg
}
function railPick(imgs: Image[], target: number, speed: number, me: Sprite, a: Image, b: Image, okText: string, failText: string): boolean {
    const items: Sprite[] = []
    for (let i = 0; i < imgs.length; i++) {
        const sp = mk(imgs[i], SpriteKind.Food)
        sp.setPosition(180 + i * 30, 42)
        items.push(sp)
    }
    clearKeys()
    let result = 0       // 1 = right one, -1 = wrong one / missed it
    let t = 0
    while (result == 0) {
        t++
        for (const sp of items) sp.x -= speed
        me.setImage(anim(t, 5) ? a : b)
        if (popA()) {
            result = -1
            for (let i = 0; i < items.length; i++) {
                if (Math.abs(items[i].x - 80) < 8) result = i == target ? 1 : -1
            }
        }
        if (items[target].x < 66) result = -1
        pause(16)
    }
    me.setImage(a)
    if (result > 0) {
        totalScore += 100
        burst(items[target], 600)
        banner(okText, 5, 64, 1200)
        sfxGoal()
    } else {
        burst(items[target], 800)
        failBanner(failText)
    }
    pause(1500)
    for (const sp of items) sp.destroy()
    return result > 0
}

function stageSkills(): number {
    clearAll()
    scene.setBackgroundImage(skillsBg())
    const me = mk(PLAYER_A, SpriteKind.Player)
    const ball = mk(BALL_IMG, SpriteKind.Ball)
    const def = mk(ENEMY_A, SpriteKind.Enemy)
    const top = uiSprite(hud("", ""), 80, 5)
    const panel = uiSprite(image.create(160, 34), 80, 28)
    ball.z = 20
    let wins = 0
    const Y = 76

    for (let r = 0; r < SKILLS.length; r++) {
        const sk = SKILLS[r]
        top.setImage(hud("טריקים", "שחקן " + (r + 1) + "/" + SKILLS.length + "  ניצחת " + wins))
        panel.setFlag(SpriteFlag.Invisible, true)
        me.setPosition(14, Y)
        me.setImage(PLAYER_A)
        def.setPosition(176, Y)
        def.setImage(ENEMY_A)
        ball.setPosition(24, Y + 5)

        // --- dribble towards the defender
        let t = 0
        while (def.x - me.x > 34) {
            t++
            me.x += 1
            def.x -= 1.4
            me.setImage(anim(t, 5) ? PLAYER_A : PLAYER_B)
            def.setImage(anim(t, 5) ? ENEMY_A : ENEMY_B)
            ball.x = me.x + 9 + Math.sin(t / 4) * 2
            ball.y = Y + 5
            pause(16)
        }
        me.setImage(PLAYER_A)
        def.setImage(ENEMY_A)

        // --- combo time!
        if (runCombo(sk, panel, me, Y)) {
            wins++
            totalScore += 100
            sfxGoal()
            banner(sk.name + "!", 5, 64, 1500)
            doSkillAnim(sk.anim, me, ball, def, Y)
            def.setImage(FALLEN_ENEMY)
            burst(def, 1200)
            // run off with the ball
            for (let i = 0; i < 50; i++) {
                me.x += 2
                me.setImage(anim(i, 4) ? PLAYER_A : PLAYER_B)
                ball.x = me.x + 9
                ball.y = Y + 5
                pause(16)
            }
        } else {
            sfxFail()
            banner("חטפו לך!", 2, 64, 1500)
            // defender steals the ball and runs away
            for (let i = 0; i < 70; i++) {
                if (def.x > ball.x + 6) def.x -= 2
                else { def.x -= 2; ball.x = def.x - 8 }
                def.setImage(anim(i, 4) ? ENEMY_A : ENEMY_B)
                pause(16)
            }
        }
        top.setImage(hud("טריקים", "שחקן " + (r + 1) + "/" + SKILLS.length + "  ניצחת " + wins))
        pause(500)
    }
    return wins
}

// the cool part: animate the player getting around the defender
function doSkillAnim(kind: number, me: Sprite, ball: Sprite, def: Sprite, Y: number) {
    const sx = me.x
    const ex = def.x + 26
    const N = 40
    const defFlip = flipped(ENEMY_A)
    for (let i = 1; i <= N; i++) {
        const f = i / N
        me.setImage(anim(i, 4) ? PLAYER_A : PLAYER_B)
        if (kind == 0) {
            // step over: quick zig-zag then burst past
            me.x = lerp(sx, ex, f)
            me.y = Y + Math.sin(f * Math.PI * 3) * 14
            ball.x = me.x + 8
            ball.y = me.y + 5
        } else if (kind == 1) {
            // rainbow flick: ball flies high over the defender's head
            ball.x = lerp(sx + 8, ex + 8, f)
            ball.y = Y + 5 - Math.sin(f * Math.PI) * 40
            me.x = lerp(sx, ex, f)
            me.y = Y + Math.sin(f * Math.PI) * 18
        } else if (kind == 2) {
            // nutmeg: ball through the legs, player runs around the top
            ball.x = lerp(sx + 8, ex + 8, Math.min(1, f * 1.6))
            ball.y = Y + 5
            me.x = lerp(sx, ex, f)
            me.y = Y - Math.sin(f * Math.PI) * 20
        } else {
            // 360 spin: full circle around the defender
            const ang = Math.PI + f * Math.PI * 2
            const cx = def.x
            me.x = cx + Math.cos(ang) * 24 + f * 26
            me.y = Y + Math.sin(ang) * 20
            ball.x = me.x + Math.cos(ang + 1.2) * 8
            ball.y = me.y + Math.sin(ang + 1.2) * 8 + 4
        }
        if (i % 10 == 0) def.setImage(i % 20 == 0 ? ENEMY_A : defFlip)
        pause(20)
    }
    me.y = Y
}

// ---------------------------------------------------------------- STAGE 3: tackle

function tackleBg(): Image {
    const bg = grass()
    // our goal on the left
    bg.fillRect(0, 48, 8, 40, 15)
    for (let y = 50; y < 88; y += 3) bg.drawLine(0, y, 7, y, 11)
    bg.fillRect(7, 46, 2, 44, 1)
    bg.drawRect(0, 30, 34, 76, 1)
    bg.drawLine(0, 13, 160, 13, 1)
    return bg
}

const REACH = 24
function reachRing(color: number): Image {
    const c = REACH + 1
    const im = image.create(c * 2 + 1, c * 2 + 1)
    for (let a = 0; a < 32; a++) {
        if (a % 2 == 0) {
            const ang = a * Math.PI / 16
            im.fillRect(c + Math.round(Math.cos(ang) * REACH), c + Math.round(Math.sin(ang) * REACH), 2, 2, color)
        }
    }
    return im
}

function stageTackle(): number {
    clearAll()
    scene.setBackgroundImage(tackleBg())
    const ROUNDS = 3
    const me = mk(PLAYER_A, SpriteKind.Player)
    const att = mk(ENEMY_A, SpriteKind.Enemy)
    const ball = mk(BALL_IMG, SpriteKind.Ball)
    const ring = uiSprite(reachRing(1), 0, 0)
    ring.z = 1
    const top = uiSprite(hud("", ""), 80, 5)
    const tip = uiSprite(textImg(" ", 1, 15), 80, 112)
    ball.z = 20
    const RING_WHITE = reachRing(1)
    const RING_GREEN = reachRing(5)
    let wins = 0

    for (let r = 0; r < ROUNDS; r++) {
        top.setImage(hud("תיקולים", "התקפה " + (r + 1) + "/" + ROUNDS + "  ניצחת " + wins))
        setImageCentered(tip, textImg("תקל כשהטבעת זוהרת!", 1, 15))
        me.setImage(PLAYER_A)
        me.setPosition(44, 70)
        controller.moveSprite(me, 70, 80)
        me.setStayInScreen(true)
        ring.setFlag(SpriteFlag.Invisible, false)
        att.setImage(ENEMY_A)
        att.setPosition(172, randint(30, 100))
        let targetY = randint(30, 100)
        const speed = 0.5 + r * 0.12
        const period = 75 - r * 8           // frames per dribble touch
        let t = 0
        let missed = false
        let getUp = 0
        let won = false
        clearKeys()

        while (true) {
            t++
            // attacker dribbles towards our goal, weaving up and down
            att.x -= speed
            if (Math.abs(att.y - targetY) < 2) targetY = randint(26, 104)
            att.y += Math.sign(targetY - att.y) * 0.4
            // feint: in the last round he sometimes stops for a moment
            if (r == 2 && t % 100 > 85) att.x += speed
            att.setImage(anim(t, 6) ? ENEMY_A : ENEMY_B)

            // the ball: close to his feet, then a "heavy touch" pushes it out in front
            const ph = (t % period) / period
            const off = 5 + Math.max(0, Math.sin(ph * Math.PI * 2)) * 16
            ball.x = att.x - off
            ball.y = att.y + 5
            const loose = off > 8
            const dist = Math.sqrt((ball.x - me.x) ** 2 + (ball.y - me.y) ** 2)
            const canWin = loose && dist < REACH + 2

            ring.setPosition(me.x, me.y)
            ring.setImage(canWin ? RING_GREEN : RING_WHITE)

            if (missed) {
                // lying on the grass for a moment, then back up for another try
                getUp--
                if (getUp <= 0) {
                    missed = false
                    me.setImage(PLAYER_A)
                    controller.moveSprite(me, 70, 80)
                    ring.setFlag(SpriteFlag.Invisible, false)
                    setImageCentered(tip, textImg("קום! נסה שוב", 1, 15))
                    clearKeys()
                }
            } else if (popA()) {
                controller.moveSprite(me, 0, 0)
                me.setImage(SLIDE_IMG)
                sfxKick()
                if (canWin) { won = true; break }
                // whiff: slide and lie on the ground for a bit
                missed = true
                getUp = 35
                ring.setFlag(SpriteFlag.Invisible, true)
                for (let i = 0; i < 8; i++) { me.x += 2; pause(16) }
                setImageCentered(tip, textImg("החטאת!", 2, 15))
            }
            if (att.x < 4) break
            pause(16)
        }

        ring.setFlag(SpriteFlag.Invisible, true)
        controller.moveSprite(me, 0, 0)
        if (won) {
            wins++
            totalScore += 100
            sfxGoal()
            scene.cameraShake(2, 250)
            banner("תיקול נקי!", 5, 60, 1500)
            const bvx = randint(-1, 1)
            for (let i = 0; i < 30; i++) {
                me.x += i < 8 ? 2 : 0
                ball.x += 3
                ball.y += bvx * 2
                pause(16)
            }
            att.setImage(FALLEN_ENEMY)
            burst(att, 1000)
        } else {
            sfxFail()
            banner("הוא עבר!", 2, 60, 1500)
            for (let i = 0; i < 25; i++) {
                ball.x = Math.max(1, ball.x - 3)
                ball.y = lerp(ball.y, 68, 0.15)
                pause(16)
            }
        }
        top.setImage(hud("תיקולים", "התקפה " + (r + 1) + "/" + ROUNDS + "  ניצחת " + wins))
        pause(1500)
    }
    return wins
}

// ---------------------------------------------------------------- STAGE 4: the big fight (cartoon slapstick!)

const HEART = img`
    .22.22.
    2222222
    2222222
    .22222.
    ..222..
    ...2...
`
const HEART_EMPTY = recolor(HEART, 2, 11)
const CARD_YELLOW = img`
    5555
    5555
    5555
    5555
    5555
    5555
`
const CARD_RED = recolor(CARD_YELLOW, 5, 2)
const POW_WORDS = ["בום!", "באם!", "פאו!", "טראח!", "בונק!", "זבנג!"]

// all fighter images are 16 wide so punches can stick out
function pad16(src: Image): Image {
    const im = image.create(16, 16)
    im.drawTransparentImage(src, 2, 0)
    return im
}
function punchOf(src: Image): Image {
    const im = pad16(src)
    im.fillRect(12, 7, 3, 2, 13)     // arm
    im.fillRect(14, 6, 2, 4, 13)     // fist
    return im
}
function kickOf(src: Image): Image {
    const im = pad16(src)
    im.fillRect(11, 11, 4, 2, 13)    // leg
    im.fillRect(13, 10, 3, 4, 9)     // light-blue boot
    return im
}

// the fighter's look - Gal by default, Yiftach's game swaps it with setFightHero()
let ME_A = pad16(PLAYER_A)
let ME_B = pad16(PLAYER_B)
let ME_PUNCH_R = punchOf(PLAYER_A)
let ME_PUNCH_L = flipped(ME_PUNCH_R)
let ME_KICK_R = kickOf(PLAYER_A)
let ME_KICK_L = flipped(ME_KICK_R)
let ME_DOWN = SLIDE_IMG
function setFightHero(a: Image, b: Image, down: Image) {
    ME_A = pad16(a)
    ME_B = pad16(b)
    ME_PUNCH_R = punchOf(a)
    ME_PUNCH_L = flipped(ME_PUNCH_R)
    ME_KICK_R = kickOf(a)
    ME_KICK_L = flipped(ME_KICK_R)
    ME_DOWN = down
}

class Foe {
    sp: Sprite
    hp: number
    maxHp: number
    speed: number
    a: Image
    b: Image
    pr: Image
    pl: Image
    fallen: Image
    windup: number
    cool: number
    stun: number
    show: number
    thrower: boolean
    throwT: number
    constructor(a: Image, b: Image, fallen: Image, hp: number, speed: number, x: number, y: number) {
        this.a = pad16(a)
        this.b = pad16(b)
        this.pr = punchOf(a)
        this.pl = flipped(this.pr)
        this.fallen = fallen
        this.hp = hp
        this.maxHp = hp
        this.speed = speed
        this.windup = 0
        this.cool = 50
        this.stun = 0
        this.show = 0
        this.thrower = false
        this.throwT = 0
        this.sp = mk(this.a, SpriteKind.Enemy)
        this.sp.setPosition(x, y)
    }
}

function fightBg(): Image {
    const bg = grass()
    // dugout + bench at the top
    bg.fillRect(30, 12, 100, 4, 10)
    bg.fillRect(30, 16, 2, 14, 10)
    bg.fillRect(128, 16, 2, 14, 10)
    bg.fillRect(34, 26, 92, 3, 14)
    bg.fillRect(36, 29, 2, 3, 14)
    bg.fillRect(122, 29, 2, 3, 14)
    bg.drawLine(0, 34, 160, 34, 1)
    return bg
}

function powWord(x: number, y: number) {
    const w = POW_WORDS[randint(0, POW_WORDS.length - 1)]
    const s = uiSprite(textImg(w, 5, 2), x, y)
    s.z = 90
    s.vy = -40
    s.lifespan = 450
}

function fightHud(roundLabel: Image, hp: number, foes: Foe[]): Image {
    const im = image.create(160, 11)
    im.fill(15)
    // my hearts on the right, enemy health on the left
    for (let i = 0; i < 5; i++) {
        im.drawTransparentImage(i < hp ? HEART : HEART_EMPTY, 151 - i * 8, 2)
    }
    im.drawTransparentImage(roundLabel, 70, 0)
    let cur = 0
    let max = 0
    for (const f of foes) { cur += Math.max(0, f.hp); max += f.maxHp }
    im.drawRect(2, 2, 62, 7, 1)
    im.fillRect(3, 3, Math.floor(60 * cur / max), 5, 2)
    return im
}

function fightRound(r: number): boolean {
    clearAll()
    scene.setBackgroundImage(fightBg())
    const me = mk(ME_A, SpriteKind.Player)
    me.setPosition(30, 75)
    me.z = 10
    const foes: Foe[] = []
    let title = ""
    if (r == 0) {
        title = "נגד השחקן"
        foes.push(new Foe(ENEMY_A, ENEMY_B, FALLEN_ENEMY, 6, 0.6, 130, 75))
    } else if (r == 1) {
        title = "נגד הספסל"
        const subA = teamLook(PLAYER_A, 4)
        const subB = teamLook(PLAYER_B, 4)
        const subF = flipped(teamLook(SLIDE_IMG, 4))
        for (let i = 0; i < 3; i++) {
            foes.push(new Foe(subA, subB, subF, 2, 0.45 + i * 0.08, 55 + i * 25, 20))
        }
    } else if (r == 3) {
        // the whole team (Yiftach's yellow team)! they come running in one after the other
        title = "כל היריבים!"
        for (let i = 0; i < 6; i++) {
            foes.push(new Foe(OPP_A, OPP_B, OPP_DOWN, 2, 0.5 + (i % 3) * 0.1, 150 + i * 40, randint(45, 105)))
        }
    } else {
        title = "נגד השופט"
        const refA = recolor(teamLook(PLAYER_A, 15), 1, 15)
        const refB = recolor(teamLook(PLAYER_B, 15), 1, 15)
        const refF = flipped(recolor(teamLook(SLIDE_IMG, 15), 1, 15))
        const ref = new Foe(refA, refB, refF, 8, 0.6, 130, 75)
        ref.thrower = true
        foes.push(ref)
    }

    const roundLabel = textImg(r == 3 ? "קבוצה" : "סיבוב " + (r + 1), 5, 0)
    const top = uiSprite(fightHud(roundLabel, 5, foes), 80, 5)
    banner(title, 5, 60, 1300)
    sfxWhistle()
    pause(1300)
    banner("קרב!", 2, 60, 700)

    controller.moveSprite(me, 70, 55)
    let hp = 5
    let inv = 0
    let facing = 1
    let atk = 0
    let atkCool = 0
    const cards: Sprite[] = []
    let t = 0
    let won = false
    clearKeys()

    while (true) {
        t++
        // keep me on the pitch
        me.x = Math.max(8, Math.min(152, me.x))
        me.y = Math.max(40, Math.min(110, me.y))
        if (controller.left.isPressed()) facing = -1
        if (controller.right.isPressed()) facing = 1

        // --- my attacks: A = quick punch, B = big kick
        let k = popKey()
        while (k != null) {
            if ((k == "A" || k == "B") && atkCool == 0) {
                const kick = k == "B"
                const dmg = kick ? 2 : 1
                const range = kick ? 26 : 22
                atk = kick ? 14 : 9
                atkCool = kick ? 30 : 14
                if (kick) me.setImage(facing > 0 ? ME_KICK_R : ME_KICK_L)
                else me.setImage(facing > 0 ? ME_PUNCH_R : ME_PUNCH_L)
                music.playTone(kick ? 200 : 330, 20)
                for (const f of foes) {
                    if (f.hp <= 0) continue
                    const dx = f.sp.x - me.x
                    const dy = f.sp.y - me.y
                    if (dx * facing > 0 && Math.abs(dx) < range && Math.abs(dy) < 12) {
                        f.hp -= dmg
                        f.stun = 16
                        f.windup = 0
                        f.sp.x += facing * (kick ? 18 : 10)
                        powWord((me.x + f.sp.x) / 2, f.sp.y - 10)
                        sfxKnock()
                        scene.cameraShake(kick ? 4 : 2, 150)
                        if (f.hp <= 0) {
                            f.sp.setImage(f.fallen)
                            burst(f.sp, 2000)
                            sfxFail()
                        }
                    }
                }
            }
            k = popKey()
        }
        if (atk > 0) {
            atk--
        } else {
            const moving = controller.dx() != 0 || controller.dy() != 0
            me.setImage(moving && anim(t, 5) ? ME_B : ME_A)
        }
        if (atkCool > 0) atkCool--
        if (inv > 0) {
            inv--
            me.setFlag(SpriteFlag.Invisible, inv > 0 && inv % 6 < 3)
        }

        // --- the bad guys
        for (const f of foes) {
            if (f.hp <= 0) continue
            const dx = me.x - f.sp.x
            const dy = me.y - f.sp.y
            const dir = dx > 0 ? 1 : -1
            if (f.stun > 0) { f.stun--; continue }
            if (f.windup > 0) {
                // getting ready to swing - he shakes so you can see it coming
                f.windup--
                f.sp.x += (f.windup % 4 < 2) ? 1 : -1
                if (f.windup == 0) {
                    f.sp.setImage(dir > 0 ? f.pr : f.pl)
                    f.show = 12
                    f.cool = 70
                    if (Math.abs(dx) < 22 && Math.abs(dy) < 12 && inv == 0) {
                        hp--
                        inv = 60
                        me.x += dir * 14
                        sfxHit()
                        scene.cameraShake(3, 200)
                    }
                }
                continue
            }
            if (f.show > 0) {
                f.show--
                continue
            }
            if (f.cool > 0) f.cool--
            // walk to a spot right next to me
            const tx = me.x - dir * 16
            const ty = me.y
            if (Math.abs(tx - f.sp.x) > 1) f.sp.x += Math.sign(tx - f.sp.x) * f.speed
            if (Math.abs(ty - f.sp.y) > 1) f.sp.y += Math.sign(ty - f.sp.y) * f.speed * 0.8
            f.sp.setImage(anim(t, 7) ? f.a : f.b)
            if (Math.abs(dx) < 22 && Math.abs(dy) < 10 && f.cool == 0) f.windup = 32
            // the referee throws cards at you!
            if (f.thrower) {
                f.throwT++
                if (f.throwT > 110) {
                    f.throwT = 0
                    const c = mk(randint(0, 2) == 0 ? CARD_RED : CARD_YELLOW, SpriteKind.Projectile)
                    c.setPosition(f.sp.x, f.sp.y - 4)
                    const d = Math.max(1, Math.sqrt(dx * dx + dy * dy))
                    c.vx = dx / d * 55
                    c.vy = dy / d * 55
                    cards.push(c)
                    snd(1600, 400, 120)
                }
            }
        }

        // --- flying cards
        for (let i = cards.length - 1; i >= 0; i--) {
            const c = cards[i]
            const hit = Math.abs(c.x - me.x) < 7 && Math.abs(c.y - me.y) < 9
            if (hit && inv == 0) {
                hp--
                inv = 60
                sfxHit()
                scene.cameraShake(2, 150)
            }
            if (hit || c.x < -10 || c.x > 170 || c.y < -10 || c.y > 130) {
                c.destroy()
                cards.removeAt(i)
            }
        }

        top.setImage(fightHud(roundLabel, hp, foes))
        if (foes.every(f => f.hp <= 0)) { won = true; break }
        if (hp <= 0) break
        pause(16)
    }

    controller.moveSprite(me, 0, 0)
    me.setFlag(SpriteFlag.Invisible, false)
    for (const c of cards) c.destroy()
    if (won) {
        totalScore += 100
        me.setImage(ME_A)
        banner("נוקאאוט!", 5, 60, 1800)
        sfxGoal()
        confetti(1500)
        for (let i = 0; i < 40; i++) {
            me.y += (Math.idiv(i, 10) % 2 == 0) ? -1 : 1
            pause(20)
        }
    } else {
        me.setImage(ME_DOWN)
        burst(me, 1500)
        banner("הפסדת!", 2, 60, 1800)
        sfxFail()
        pause(800)
    }
    pause(1000)
    return won
}

function stageFight(): number {
    let wins = 0
    for (let r = 0; r < 3; r++) {
        if (fightRound(r)) wins++
    }
    return wins
}

// ---------------------------------------------------------------- STAGE 5: escape from the cops through a BIG stadium!
// The stadium is twice the screen in each direction; the camera follows Gal.
// Run with the arrows from the field, through the stands full of fans, out one of the
// small yellow exits in the outer wall. Cops are fast on the grass but slow over the seats.
// Stairs (light gray aisles) are fast for everyone. Fans run onto the field and block the cops.

const WORLD_W = 320
const WORLD_H = 240
const WALL = 6
const FIELD_L = 72
const FIELD_R = 248
const FIELD_T = 60
const FIELD_B = 180
// small exits: [side, position]  side 0 = top, 1 = right, 2 = bottom, 3 = left
const EXITS = [[52, 3], [317, 200], [270, 237], [3, 40]]
const FAN_COLORS = [2, 5, 1, 8, 4, 9, 13, 7]

function makeCop(src: Image): Image {
    // dark blue uniform, black boots, police cap with a gold badge
    const im = recolor(recolor(recolor(recolor(src, 2, 8), 1, 8), 9, 15), 14, 15)
    im.fillRect(3, 0, 6, 2, 8)
    im.fillRect(2, 2, 9, 1, 8)
    im.setPixel(5, 1, 5)
    im.setPixel(6, 1, 5)
    return im
}
const COP_A = makeCop(PLAYER_A)
const COP_B = makeCop(PLAYER_B)
const FAN_IMG = img`
    .ddd.
    .ddd.
    22222
    .222.
    .222.
    .f.f.
    .f.f.
`

function onField(x: number, y: number): boolean {
    return x >= FIELD_L - 4 && x <= FIELD_R + 4 && y >= FIELD_T - 4 && y <= FIELD_B + 4
}
function sideStand(y: number): boolean {
    return y >= FIELD_T - 6 && y <= FIELD_B + 6
}
function onStairs(x: number, y: number): boolean {
    if (onField(x, y)) return false
    return sideStand(y) ? (y % 40) < 6 : (x % 40) < 6
}
// how fast you can move here: grass and stairs are fast, seats are slow
function zoneSpeed(x: number, y: number, grass: number, stairs: number, seats: number): number {
    if (onField(x, y)) return grass
    if (onStairs(x, y)) return stairs
    return seats
}

function stadiumWorld(): Image {
    const bg = image.create(WORLD_W, WORLD_H)
    bg.fill(15)
    for (let y = WALL; y < WORLD_H - WALL; y++) {
        const side = sideStand(y)
        for (let x = WALL; x < WORLD_W - WALL; x++) {
            if (side ? (y % 40) < 6 : (x % 40) < 6) {
                bg.setPixel(x, y, (side ? x : y) % 3 == 0 ? 10 : 11)      // stairs
            } else if (side ? x % 3 == 0 : y % 3 == 0) {
                bg.setPixel(x, y, 10)                                      // seat row
            } else if ((x + y) % 2 == 0) {
                bg.setPixel(x, y, FAN_COLORS[(x * 7 + y * 13) % FAN_COLORS.length])   // fans
            }
        }
    }
    // advertising boards around the field
    for (let x = FIELD_L - 6; x < FIELD_R + 6; x += 8) {
        const c = Math.idiv(x, 8) % 2 == 0 ? 2 : 1
        bg.fillRect(x, FIELD_T - 6, 8, 2, c)
        bg.fillRect(x, FIELD_B + 5, 8, 2, c)
    }
    for (let y = FIELD_T - 6; y < FIELD_B + 6; y += 8) {
        const c = Math.idiv(y, 8) % 2 == 0 ? 5 : 8
        bg.fillRect(FIELD_L - 6, y, 2, 8, c)
        bg.fillRect(FIELD_R + 5, y, 2, 8, c)
    }
    // the pitch
    bg.fillRect(FIELD_L - 4, FIELD_T - 4, FIELD_R - FIELD_L + 9, FIELD_B - FIELD_T + 9, 7)
    for (let x = FIELD_L; x < FIELD_R; x += 16) bg.fillRect(x, FIELD_T, 8, FIELD_B - FIELD_T + 1, 6)
    bg.drawRect(FIELD_L, FIELD_T, FIELD_R - FIELD_L + 1, FIELD_B - FIELD_T + 1, 1)
    const cx = (FIELD_L + FIELD_R) / 2
    const cy = (FIELD_T + FIELD_B) / 2
    bg.drawLine(cx, FIELD_T, cx, FIELD_B, 1)
    bg.drawCircle(cx, cy, 16, 1)
    bg.drawRect(FIELD_L, cy - 24, 20, 48, 1)
    bg.drawRect(FIELD_R - 19, cy - 24, 20, 48, 1)
    bg.fillRect(FIELD_L - 3, cy - 8, 3, 16, 1)
    bg.fillRect(FIELD_R + 1, cy - 8, 3, 16, 1)
    // small yellow exits in the outer wall, each with a sign
    const sign = textImg("יציאה", 15, 0)
    for (const e of EXITS) {
        bg.fillRect(e[0] - 6, e[1] - 6, 12, 12, 5)
        const sx = Math.max(10, Math.min(WORLD_W - 40, e[0] - 15))
        const sy = Math.max(8, Math.min(WORLD_H - 20, e[1] + 8))
        bg.fillRect(sx - 2, sy, 34, 12, 5)
        bg.drawTransparentImage(sign, sx, sy)
    }
    return bg
}

// little map in the corner: where am I, where are the cops, where are the exits
function miniMapBase(): Image {
    const m = image.create(42, 32)
    m.fill(15)
    m.fillRect(1, 1, 40, 30, 10)
    m.fillRect(1 + FIELD_L / 8, 1 + FIELD_T / 8, (FIELD_R - FIELD_L) / 8, (FIELD_B - FIELD_T) / 8, 7)
    for (const e of EXITS) m.fillRect(e[0] / 8, e[1] / 8, 3, 3, 5)
    return m
}

function escapeHud(lives: number): Image {
    const im = image.create(160, 11)
    im.fill(15)
    const title = textImg("בריחה", 5, 0)
    im.drawTransparentImage(title, 158 - title.width, 0)
    for (let i = 0; i < 3; i++) im.drawTransparentImage(i < lives ? HEART : HEART_EMPTY, 2 + i * 8, 2)
    return im
}

function cheerSound() {
    snd(1200, 600, 1500)
}

// walk a sprite towards (tx, ty)
function stepTo(s: Sprite, tx: number, ty: number, speed: number) {
    const dx = tx - s.x
    const dy = ty - s.y
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d < 0.5) return
    const k = Math.min(speed, d) / d
    s.x += dx * k
    s.y += dy * k
}
// a point on the loop the stadium guards walk through the stands
function guardPath(p: number): number[] {
    const L = 30, R = WORLD_W - 30, T = 30, B = WORLD_H - 30
    const w = R - L
    const h = B - T
    p = p % (2 * (w + h))
    if (p < w) return [L + p, T]
    p -= w
    if (p < h) return [R, T + p]
    p -= h
    if (p < w) return [R - p, B]
    p -= w
    return [L, B - p]
}
function randomFieldSpot(): number[] {
    return [randint(FIELD_L + 4, FIELD_R - 4), randint(FIELD_T + 4, FIELD_B - 4)]
}

function stageEscape(): boolean {
    clearAll()
    scene.setBackgroundColor(15)
    scene.setBackgroundImage(image.create(1, 1))
    const world = mk(stadiumWorld(), SpriteKind.UI)
    world.setPosition(WORLD_W / 2, WORLD_H / 2)
    world.z = -100
    const me = mk(PLAYER_A, SpriteKind.Player)
    me.z = 20
    const MIDX = (FIELD_L + FIELD_R) / 2
    const MIDY = (FIELD_T + FIELD_B) / 2
    const SPAWNS = [[FIELD_L + 6, FIELD_T + 6], [FIELD_R - 6, FIELD_T + 6], [FIELD_R - 6, FIELD_B - 6], [FIELD_L + 6, FIELD_B - 6]]
    const cops: Sprite[] = []
    const copStun: number[] = []
    for (let i = 0; i < 4; i++) {
        cops.push(mk(COP_A, SpriteKind.Enemy))
        copStun.push(0)
    }
    const guards: Sprite[] = []
    const guardP: number[] = [0, 300, 600]
    for (let i = 0; i < guardP.length; i++) {
        const g = mk(COP_A, SpriteKind.Enemy)
        const p = guardPath(guardP[i])
        g.setPosition(p[0], p[1])
        guards.push(g)
    }
    // fans pouring out of the stands onto the field
    const fans: Sprite[] = []
    const fanT: number[][] = []
    for (let i = 0; i < 10; i++) {
        const f = mk(recolor(FAN_IMG, 2, FAN_COLORS[i % FAN_COLORS.length]), SpriteKind.Food)
        f.setPosition(randint(20, WORLD_W - 20), i % 2 == 0 ? randint(15, 45) : randint(WORLD_H - 45, WORLD_H - 15))
        fans.push(f)
        fanT.push(randomFieldSpot())
    }
    let lives = 3
    const top = uiSprite(escapeHud(lives), 80, 5)
    const mapBase = miniMapBase()
    const mini = uiSprite(mapBase.clone(), 137, 102)
    mini.z = 60
    const tip = uiSprite(textImg("מצא יציאה צהובה!", 1, 15), 80, 60)
    tip.lifespan = 2000

    function resetPositions() {
        me.setPosition(MIDX, MIDY)
        for (let i = 0; i < cops.length; i++) {
            cops[i].setPosition(SPAWNS[i][0], SPAWNS[i][1])
            copStun[i] = 40
        }
    }
    resetPositions()
    sfxSiren()
    let t = 0
    let won = false
    let inv = 0

    while (true) {
        t++
        // Gal: fast on grass and stairs, slower climbing over the seats
        const sp = zoneSpeed(me.x, me.y, 90, 90, 60)
        controller.moveSprite(me, sp, sp)
        const moving = controller.dx() != 0 || controller.dy() != 0
        me.setImage(moving && anim(t, 4) ? PLAYER_B : PLAYER_A)

        // the outer wall - you can only get out through the small exits
        let free = false
        for (const e of EXITS) {
            const dx = Math.abs(me.x - e[0])
            const dy = Math.abs(me.y - e[1])
            if (dx < 6 && dy < 20 || dx < 20 && dy < 6) free = true
        }
        if (!free) {
            me.x = Math.max(WALL + 5, Math.min(WORLD_W - WALL - 5, me.x))
            me.y = Math.max(WALL + 7, Math.min(WORLD_H - WALL - 7, me.y))
        }
        if (me.x < 0 || me.x > WORLD_W || me.y < 0 || me.y > WORLD_H) { won = true; break }

        // camera follows Gal
        scene.centerCameraAt(Math.max(80, Math.min(WORLD_W - 80, me.x)), Math.max(55, Math.min(WORLD_H - 60, me.y)))

        // cops chase you - quick on the grass, slow over the seats
        for (let i = 0; i < cops.length; i++) {
            const c = cops[i]
            if (copStun[i] > 0) {
                copStun[i]--
                continue
            }
            stepTo(c, me.x, me.y, zoneSpeed(c.x, c.y, 1.15, 1.0, 0.4))
            c.setImage(anim(t + i * 2, 4) ? COP_A : COP_B)
        }
        // stadium guards walk around the stands, and come after you if you get close
        for (let i = 0; i < guards.length; i++) {
            const g = guards[i]
            const dx = me.x - g.x
            const dy = me.y - g.y
            if (dx * dx + dy * dy < 36 * 36) {
                stepTo(g, me.x, me.y, zoneSpeed(g.x, g.y, 0.8, 0.8, 0.5))
            } else {
                guardP[i] += 0.7
                const p = guardPath(guardP[i])
                stepTo(g, p[0], p[1], 0.9)
            }
            g.setImage(anim(t + 1, 5) ? COP_A : COP_B)
        }
        // fans run around the field and block the cops
        for (let i = 0; i < fans.length; i++) {
            const f = fans[i]
            stepTo(f, fanT[i][0], fanT[i][1], 1.3)
            if (Math.abs(f.x - fanT[i][0]) < 2 && Math.abs(f.y - fanT[i][1]) < 2) fanT[i] = randomFieldSpot()
            for (let j = 0; j < cops.length; j++) {
                if (copStun[j] == 0 && Math.abs(f.x - cops[j].x) < 7 && Math.abs(f.y - cops[j].y) < 8) {
                    copStun[j] = 40
                    burst(cops[j], 500)
                    sfxKnock()
                }
            }
        }

        // the little map
        if (t % 3 == 0) {
            const m = mini.image
            m.drawImage(mapBase, 0, 0)
            for (const c of cops) m.setPixel(1 + c.x / 8, 1 + c.y / 8, 2)
            for (const g of guards) m.setPixel(1 + g.x / 8, 1 + g.y / 8, 2)
            if (Math.idiv(t, 6) % 2 == 0) m.fillRect(1 + me.x / 8 - 1, 1 + me.y / 8 - 1, 2, 2, 1)
        }

        // caught?
        if (inv > 0) {
            inv--
            me.setFlag(SpriteFlag.Invisible, inv > 0 && inv % 6 < 3)
        } else {
            let caught = false
            for (const c of cops) if (Math.abs(c.x - me.x) < 7 && Math.abs(c.y - me.y) < 9) caught = true
            for (const g of guards) if (Math.abs(g.x - me.x) < 7 && Math.abs(g.y - me.y) < 9) caught = true
            if (caught) {
                lives--
                top.setImage(escapeHud(lives))
                sfxHit()
                scene.cameraShake(3, 250)
                if (lives <= 0) break
                banner("תפסו אותך!", 2, 60, 1000)
                resetPositions()
                inv = 60
            }
        }
        pause(16)
    }

    controller.moveSprite(me, 0, 0)
    me.setFlag(SpriteFlag.Invisible, false)
    if (!won) {
        me.setImage(SLIDE_IMG)
        sfxFail()
        banner("תפסו אותך!", 2, 60, 2000)
        pause(2000)
        return false
    }
    // escaped! the fans go wild
    me.setFlag(SpriteFlag.Invisible, true)
    cheerSound()
    sfxGoal()
    banner("ברחת!", 5, 60, 2500)
    fx(me.x, me.y - 50, 80, 40, 2500)
    for (let f = 0; f < 120; f++) {
        for (const fan of fans) fan.y += Math.sin((f + fan.x) / 3) * 1.5
        pause(20)
    }
    return true
}

// ---------------------------------------------------------------- final screen (Gal with the trophy!)

// photos are stored run-length packed (each byte = (run length - 1) * 16 + color), unpacked when shown
function unpack(buf: Buffer, w: number): Image {
    let n = 0
    for (let i = 0; i < buf.length; i++) n += (buf[i] >> 4) + 1
    const im = image.create(w, Math.idiv(n, w))
    let p = 0
    for (let i = 0; i < buf.length; i++) {
        const c = buf[i] & 15
        for (let k = buf[i] >> 4; k >= 0; k--) {
            im.setPixel(p % w, Math.idiv(p, w), c)
            p++
        }
    }
    return im
}

// shared by all three champion screens: starry background + photo in a gold frame on the right
function finaleBg(color: number, stars: number, photo: Image, py: number): Image {
    clearAll()
    const bg = image.create(160, 120)
    bg.fill(color)
    for (let i = 0; i < 40; i++) bg.setPixel(randint(0, 159), randint(0, 119), stars)
    bg.fillRect(100, py, 54, 78, 12)
    bg.drawRect(100, py, 54, 78, 5)
    bg.drawImage(photo, 103, py + 3)
    return bg
}
// text centered in the left part of the screen (next to the photo)
function leftText(bg: Image, im: Image, y: number) {
    bg.drawTransparentImage(im, 48 - im.width / 2, y)
}
function showAndWait(bg: Image) {
    scene.setBackgroundImage(bg)
    pause(600)
    waitA()
}
function finaleEnd(bg: Image) {
    scene.setBackgroundImage(bg)
    confetti(5000)
    sfxGoal()
    cheerSound()
    pause(800)
    waitA()
    game.reset()
}

function finale() {
    const bg = finaleBg(8, 1, unpack(PHOTO_TROPHY, 48), 34)
    drawCenter(bg, hebrewTitleImg(5), 3)
    leftText(bg, bigTextImg("אלוף!", 5, 15), 36)
    leftText(bg, textImg("ניקוד " + totalScore, 1, 15), 70)
    leftText(bg, textImg("A = שחק שוב", 9, 15), 100)
    finaleEnd(bg)
}

// ---------------------------------------------------------------- Gal's game: גל גל להב - אתגר כדורגל

// every stage is 3 tries, you need 2 to go on
const NEED = 2

function playGal() {
    welcome()
    playerCard()

    const FK = ["חצים = לכוון לכל מקום", "גבוה = מעל החומה!", "A = כוונת, A = כוח"]
    playStage(1, "בעיטה חופשית", FK, () => stageResult("גולים", stageShootout(true), 3, NEED))

    const INTRO1 = ["חצים למעלה/למטה = גובה", "A = עצור כוונת, A = כוח", "חזק מדי = מעל המשקוף!"]
    playStage(2, "פנדלים", INTRO1, () => stageResult("גולים", stageShootout(false), 3, NEED))

    const BAR = ["הכוונת זזה ליד הקורות", "A כשהיא ירוקה = על הקורה", "2 פגיעות ברצף!"]
    playStage(3, "משקוף", BAR, () => stageResult("ברצף", stageBar(), 2, 2))

    const INTRO2 = ["שחקן הגנה מגיע!", "לחץ על הקומבו מהר", "ותעשה טריק מגניב!"]
    playStage(4, "טריקים", INTRO2, () => stageResult("טריקים", stageSkills(), 3, NEED))

    const INTRO3 = ["חצים = לזוז לכל הכיוונים", "A = תיקול גלישה", "כשהטבעת זוהרת!"]
    playStage(5, "תיקולים", INTRO3, () => stageResult("תיקולים", stageTackle(), 3, NEED))

    const INTRO4 = ["שחקן, ספסל ושופט!", "A = אגרוף  B = בעיטה", "תתחמק מהכרטיסים!"]
    playStage(6, "קרב!", INTRO4, () => stageResult("נוקאאוטים", stageFight(), 3, NEED))

    const INTRO5 = ["המשטרה רודפת אחריך!", "ברח דרך היציע והמדרגות", "אל יציאה צהובה קטנה!"]
    playStage(7, "בריחה!", INTRO5, stageEscape)

    finale()
}

// ---------------------------------------------------------------- game picker: choose one of 3 games

const ICON_MEDAL = img`
    ..2....8..
    ...2..8...
    ....28....
    ...5555...
    ..555555..
    ..55cc55..
    ..555555..
    ...5555...
`
const ICON_BALL = img`
    ..1111..
    .1f11f1.
    11ff1111
    1111ff11
    11f11ff1
    1ff11111
    .11ff11.
    ..1111..
`

class GameEntry {
    constructor(public title: string, public sub: string, public icon: Image, public color: number) { }
}
const GAMES = [
    new GameEntry("אלונה טריאתלונה", "הדרך לאולימפיאדה", ICON_MEDAL.doubled(), 9),
    new GameEntry("יפתח התותח", "אגדת דשא", ICON_BALL.doubled(), 7),
    new GameEntry("גל גל להב", "אתגר כדורגל", PLAYER_A, 2),
]

function gameCard(g: GameEntry, selected: boolean): Image {
    const im = image.create(150, 28)
    im.fillRect(0, 0, 150, 28, selected ? 8 : 15)
    im.drawRect(0, 0, 150, 28, selected ? 5 : 10)
    if (selected) im.drawRect(1, 1, 148, 26, 5)
    // colored strip + icon on the right (Hebrew side)
    im.fillRect(126, 2, 22, 24, g.color)
    im.drawTransparentImage(g.icon, 137 - Math.idiv(g.icon.width, 2), 14 - Math.idiv(g.icon.height, 2))
    const t = textImg(g.title, selected ? 5 : 1, 15)
    im.drawTransparentImage(t, 122 - t.width, 2)
    const s = textImg(g.sub, selected ? 1 : 11, 0)
    im.drawTransparentImage(s, 122 - s.width, 15)
    return im
}

function gamePicker(): number {
    clearAll()
    const bg = image.create(160, 120)
    bg.fill(15)
    for (let i = 0; i < 50; i++) bg.setPixel(randint(0, 159), randint(0, 119), randint(0, 3) == 0 ? 5 : 1)
    drawCenter(bg, bigTextImg("בחר משחק", 5, 2), 1)
    scene.setBackgroundImage(bg)
    const cards: Sprite[] = []
    for (let i = 0; i < GAMES.length; i++) cards.push(uiSprite(gameCard(GAMES[i], false), 80, 41 + i * 32))
    let sel = 0
    let shown = -1
    let t = 0
    clearKeys()
    sfxWhistle()
    while (true) {
        t++
        const k = popKey()
        if (k == "U") { sel = (sel + GAMES.length - 1) % GAMES.length; music.playTone(660, 40) }
        if (k == "D") { sel = (sel + 1) % GAMES.length; music.playTone(660, 40) }
        if (k == "A") break
        if (sel != shown) {
            for (let i = 0; i < GAMES.length; i++) cards[i].setImage(gameCard(GAMES[i], i == sel))
            shown = sel
        }
        // the chosen card wiggles
        for (let i = 0; i < GAMES.length; i++) cards[i].x = i == sel ? 80 + Math.sin(t / 5) * 2 : 80
        pause(20)
    }
    sfxWhistle()
    burst(cards[sel], 400)
    pause(400)
    return sel
}

// ---------------------------------------------------------------- start: the game picker
// (main.ts is always loaded last, so this runs after every other file is ready)

while (true) {
    const choice = gamePicker()
    currentGame = choice
    if (choice == 0) playAlona()
    else if (choice == 1) playYiftach()
    else playGal()
}
