// ============================================================
//  יפתח התותח - אגדת דשא
//  1 Free kicks over/around the wall  2 Headers from crosses  3 Dodge the tackles
//  4 Fight the whole team  5 Keepy-uppy: as many as you can, it gets harder and harder
// ============================================================

const PHOTO_YIFTACH = hex`
    f7d7eb21f7db0d210b170b410d0b011d275b671b7e0d5b471b3d0b21f70e5f2e010d077b370b1d0b21e78f1e1b17030e
    270a2b170305411a071b170b016e1f1e1f3e010d071b370b1a0b1703050d1b11271b170d0b01ae1f1e0f010d071b372b
    03270c03070d11274b0e0127be0f271bd7210e0a472b274e235f0bf70e211e273b171b8e3f271b87031b171d0b0e0f27
    7b2e9f271bb72b010d1fab0e3f131e3f0b0d071bc70e0d111f571b2703041e3d0b3e0d1b37db0d0ebb331d034f0701fb
    fb0b0c05023d034fa7bb176b170a14056d010e0f074b0a07fbab346d030f0b010d2b0a070d4b41bb0d170b13073d0e03
    0d2e071b271e674e571b130e0b070f1e173d0e03045ed75b177b37031d14030d040e0f671bf7073b6703041d131d030e
    8f0e875b771b07030c4d231e3f0e0a37fb710b0a050c3d139f0e276e175e473b1a04033d133e7f0ef7471e3a143d031e
    bff7573a0f14013d1e139f0ef7376a047d020e0a8ff7376a03055d020e1a8f0ef7172a0f0e0a1f0a0304151d031e3a6f
    0ef7171a1e6f03320e0a0f0c050b7ff7171a0f1e3a3f2e1a0f05310a4f0ef7071a1f0e1a9f0a0e030d0b215ff7071a2f
    1a5f1a5f0a215ff72a2f1a5f2a0b0e3f0b115f0ee73a1f1a4f4a5f0b0a5f0ee73a1f1a1f2a0b1f1a0f0e2a7f1ee73a1f
    7a1f1a3f1a4f3ee74a1faa0f6e1f2ef7074a1f5a1f2abee70c173a2f7a0b07def7072a6f3a01fe0ee70c0504024f3afe
    4ed70c14024f3a075e1a072e070a5ee70d1e0f070e2f2a7e1a2e2a5ec70c2d030a0b2f1a4e27010b0a2e3a1f2ec74d0b
    011f1a032f0e1a07010e1b1e0a370e0f03042da70c2d1a0b0e034d03072a0b110b271a3e2d030eb7042d1b4d04130e2a
    070b0a6e070b0d232eb7048d137e3a4b230d2ec7134d330f0a1e0a376a0b0e031d031ef703041d330e3a9e0a0b0e0f13
    0e0ff7070e0f430f2e0f0a3e372b071e23f7071c1f1e137e0a7b0a073ef7275f1e6a070b1a074b0f1ef7370a2f3e073a
    2e173b07013ef7371a2f3e7a6b0f1ef7473a0f4e7a2b010d3ef7473a1f4e7a1b070f2ef7570a0b0f2a7e4a074ef7676a
    fe0ef7772a1f1a3fbef7871a3b0f1a0bae1ff7877a1b0abff7873a4b0acff7877a0edf0ef7770e6a2f0e1b0a7f0ef787
    3a2f1a2b0a8f0ef787aaaf0ef7872a0304058f2a3f0ef7871a03050c046f4a2f1ef7872a0204037a8ff7879acfe7
`

// Yiftach: purple kit with an orange collar, purple socks, black boots, number 8
function yifLook(src: Image): Image {
    let im = recolor(src, 2, 10)
    im = recolor(im, 1, 10)
    im = recolor(im, 9, 15)
    im.fillRect(4, 6, 4, 1, 4)
    return im
}
// built when the game starts (main.ts, which has Gal's base sprites, is loaded last)
let YIF_A: Image = null
let YIF_B: Image = null
let YIF_DOWN: Image = null
let YIF_BACK: Image = null
let OPP_A: Image = null
let OPP_B: Image = null
let OPP_DOWN: Image = null
function initYiftachArt() {
    if (YIF_A) return
    YIF_A = yifLook(PLAYER_A)
    YIF_B = yifLook(PLAYER_B)
    YIF_DOWN = recolor(recolor(SLIDE_IMG, 2, 10), 9, 15)
    // the other team: yellow shirts, black hair and boots
    OPP_A = teamLook(PLAYER_A, 5)
    OPP_B = teamLook(PLAYER_B, 5)
    OPP_DOWN = flipped(teamLook(SLIDE_IMG, 5))
    YIF_BACK = YIF_A.clone()
    YIF_BACK.fillRect(3, 3, 6, 2, 14)     // back of the head
    YIF_BACK.fillRect(5, 7, 2, 3, 4)      // number 8 in orange
    YIF_BACK.setPixel(5, 8, 10)
    YIF_BACK.setPixel(6, 8, 4)
}
let jugglesBest = 0

// ---------------------------------------------------------------- welcome

function yiftachWelcome() {
    clearAll()
    const bg = image.create(160, 120)
    bg.fill(15)
    for (let x = -120; x < 160; x += 16) bg.drawLine(x, 120, x + 120, 0, 10)
    bg.fillRect(0, 96, 160, 24, 7)
    bg.drawLine(0, 96, 160, 96, 1)
    drawCenter(bg, bigTextImg("יפתח התותח", 5, 15), 6)
    drawCenter(bg, bigTextImg("אגדת דשא", 1, 15), 32)
    scene.setBackgroundImage(bg)
    const me = mk(YIF_A, SpriteKind.Player)
    me.setPosition(80, 88)
    const ball = mk(BALL_IMG, SpriteKind.Ball)
    const pressA = uiSprite(textImg("לחץ A כדי להתחיל", 5, 15), 80, 112)
    clearKeys()
    let t = 0
    while (!popA()) {
        t++
        // keepy-uppy show
        const ph = (t % 30) / 30
        ball.setPosition(84, 93 - Math.sin(ph * Math.PI) * 30)
        me.setImage(ph < 0.1 ? YIF_B : YIF_A)
        pressA.setFlag(SpriteFlag.Invisible, Math.idiv(t, 15) % 2 == 0)
        pause(20)
    }
    sfxWhistle()
}

// ---------------------------------------------------------------- STAGE 1: free kicks
// Aim anywhere with the arrows. A wall of 3 defenders stands between the ball and the goal:
// aim high to curl it over, or aim past the side of the wall.

// ---------------------------------------------------------------- STAGE 1: find your shirt
// Shirts slide along the rail in the locker room. Press A when Yiftach's own shirt
// (purple, orange collar, number 8) is in the gold frame. Lots of shirts look almost the same!

function shirtImg(body: number, num: string): Image {
    const im = image.create(14, 14)
    im.fillRect(3, 1, 8, 13, body)
    im.fillRect(0, 1, 3, 5, body)       // sleeves
    im.fillRect(11, 1, 3, 5, body)
    im.fillRect(5, 0, 4, 2, 4)          // orange collar
    im.print(num, 5, 5, 4)
    return im
}

function stageShirt(): number {
    clearAll()
    const bg = railBg(14, 11)                     // wooden locker room
    for (let x = 0; x < 160; x += 20) bg.fillRect(x, 0, 18, 28, 6)   // lockers
    scene.setBackgroundImage(bg)
    const me = mk(YIF_BACK, SpriteKind.Player)
    me.setPosition(80, 84)
    const mine = shirtImg(10, "8")
    const top = uiSprite(hud("", ""), 80, 5)
    uiSprite(textImg("A כשהחולצה שלך במסגרת!", 1, 15), 80, 112)
    uiSprite(mine, 140, 100)                       // "this is your shirt"
    let got = 0
    for (let r = 0; r < 3; r++) {
        top.setImage(hud("החולצה", "סיבוב " + (r + 1) + "/3  מצאת " + got))
        const imgs: Image[] = []
        const target = randint(5, 9)
        for (let i = 0; i < 13; i++) {
            // near misses: a purple shirt with another number, or an 8 on another color
            let body = 10
            let num = 8
            while (body == 10 && num == 8) {
                body = randint(0, 1) == 0 ? 10 : randint(0, 1) * 6 + 2
                num = randint(0, 1) == 0 ? 8 : randint(0, 2) * 3 + 1
            }
            imgs.push(i == target ? mine : shirtImg(body, "" + num))
        }
        if (railPick(imgs, target, 1.3 + r * 0.5, me, YIF_BACK, YIF_BACK, "זאת שלי!", "לא החולצה שלך!")) got++
    }
    return got
}

// ---------------------------------------------------------------- STAGE: popsicles for coach Yarden
// Annoying coach Yarden wants popsicles at practice. Yiftach brings them... and throws them at him!
// Arrows = move, A = throw. Hit him 3 times before the popsicles run out.

const POPSICLE = img`
    .2.
    222
    252
    222
    .3.
    .3.
`

function stagePops(): boolean {
    clearAll()
    scene.setBackgroundImage(fightBg())
    const coachImg = teamLook(PLAYER_A, 6)
    coachImg.fillRect(3, 0, 6, 2, 2)         // red cap
    const coach = mk(coachImg, SpriteKind.Enemy)
    coach.setPosition(80, 24)
    const me = mk(YIF_BACK, SpriteKind.Player)
    me.setPosition(80, 100)
    banner("איפה הארטיקים?!", 1, 60, 1500)
    pause(1500)
    controller.moveSprite(me, 80, 0)
    const top = uiSprite(hud("", ""), 80, 5)
    const pops: Sprite[] = []
    let hits = 0
    let left = 12
    let dir = 1
    clearKeys()
    while (hits < 3 && (left > 0 || pops.length > 0)) {
        me.x = Math.max(8, Math.min(152, me.x))
        coach.x += dir * (0.8 + hits * 0.6)
        if (coach.x > 140) dir = -1
        else if (coach.x < 20) dir = 1
        else if (randint(0, 70) == 0) dir = -dir
        if (popA() && left > 0) {
            left--
            const p = mk(POPSICLE, SpriteKind.Projectile)
            p.setPosition(me.x, me.y - 10)
            p.vy = -110
            pops.push(p)
            sfxBeep()
        }
        for (let i = pops.length - 1; i >= 0; i--) {
            const p = pops[i]
            const hit = Math.abs(p.x - coach.x) < 8 && Math.abs(p.y - coach.y) < 10
            if (hit) {
                hits++
                banner("פגיעה!", 5, 60, 700)
                sfxKnock()
                burst(coach, 400)
            }
            if (hit || p.y < 0) {
                p.destroy()
                pops.removeAt(i)
            }
        }
        top.setImage(hud("ארטיקים", "פגיעות " + hits + "/3  יש " + left))
        pause(16)
    }
    controller.moveSprite(me, 0, 0)
    if (hits >= 3) {
        totalScore += 300
        banner("ירדן מלא ארטיק!", 5, 60, 2000)
        sfxGoal()
    } else {
        failBanner("נגמרו הארטיקים!")
    }
    pause(2000)
    return hits >= 3
}

// ---------------------------------------------------------------- STAGE 2: headers
// A cross comes in from the side. Watch the shadow, get under the ball, A = jump and head it.

function stageHeaders(): number {
    clearAll()
    scene.setBackgroundImage(penaltyBg())
    const GROUND = 79
    const keeper = mk(KEEPER_IMG, SpriteKind.Keeper)
    keeper.setPosition(80, 32)
    const me = mk(YIF_A, SpriteKind.Player)
    me.setPosition(80, 70)
    me.z = 10
    const shadowImg = image.create(6, 2)
    shadowImg.fill(15)
    const shadow = mk(shadowImg, SpriteKind.UI)
    shadow.z = 5
    const ball = mk(BALL_IMG, SpriteKind.Ball)
    ball.z = 20
    const top = uiSprite(hud("", ""), 80, 5)
    const tip = uiSprite(textImg("A = קפיצה, חץ = כיוון הנגיחה", 1, 15), 80, 112)
    let goals = 0

    for (let r = 0; r < 3; r++) {
        top.setImage(hud("נגיחות", "הגבהה " + (r + 1) + "/3  גולים " + goals))
        keeper.setImage(KEEPER_IMG)
        keeper.setPosition(80, 32)
        me.setPosition(80, 70)
        const side = randint(0, 1) == 0 ? -1 : 1
        const sx = side < 0 ? -6 : 166
        const ex = side < 0 ? 166 : -6
        controller.moveSprite(me, 85, 0)
        sfxWhistle()
        pause(500)
        clearKeys()
        let pr = 0
        const dp = 1 / (120 - r * 12)
        let jumpT = 0
        let hit = false
        while (pr < 1) {
            pr += dp
            const h = 52 * (1 - pr) + 4
            ball.setPosition(lerp(sx, ex, pr), GROUND - h)
            shadow.setPosition(ball.x, GROUND + 1)
            keeper.x += Math.sign(Math.max(70, Math.min(90, ball.x)) - keeper.x) * 0.5
            me.x = Math.max(24, Math.min(136, me.x))
            if (jumpT == 0 && popA()) { jumpT = 26; sfxJump() }
            if (jumpT > 0) {
                jumpT--
                me.y = 70 - Math.sin(Math.PI * (26 - jumpT) / 26) * 13
                me.setImage(YIF_B)
            } else {
                me.y = 70
                me.setImage(YIF_A)
            }
            if (Math.abs(ball.x - me.x) < 9 && Math.abs(ball.y - (me.top + 2)) < 6) { hit = true; break }
            pause(16)
        }
        controller.moveSprite(me, 0, 0)
        if (hit) {
            sfxKick()
            // the arrow held at the moment of the header picks the corner
            let dir = 0
            if (controller.left.isPressed()) dir = -1
            else if (controller.right.isPressed()) dir = 1
            const gx = 80 + dir * 28
            // perfect timing = header right at the top of the jump: too fast to save
            const perfect = jumpT >= 8 && jumpT <= 18
            if (perfect) banner("נגיחה מושלמת!", 5, 90, 600)
            // the keeper guesses a side, and reacts a little late
            const guess = randint(-1, 1)
            const kx0 = keeper.x
            const kTarget = 80 + guess * 26
            const n = perfect ? 12 : 18
            const bx0 = ball.x
            const by0 = ball.y
            for (let i = 1; i <= n; i++) {
                ball.setPosition(lerp(bx0, gx, i / n), lerp(by0, 30, i / n))
                shadow.setPosition(ball.x, lerp(GROUND, 44, i / n))
                if (i == 4) {
                    if (guess < 0) keeper.setImage(KEEPER_DIVE)
                    else if (guess > 0) keeper.setImage(KEEPER_DIVE_R)
                }
                if (i >= 4) keeper.x = lerp(kx0, kTarget, Math.min(1, (i - 3) / (n - 6)))
                if (me.y < 70) me.y = Math.min(70, me.y + 2)
                pause(16)
            }
            me.y = 70
            if (guess == dir && !perfect) {
                failBanner("השוער עצר!")
            } else {
                goals++
                goalFx(ball)
            }
        } else {
            failBanner("פספסת!")
        }
        top.setImage(hud("נגיחות", "הגבהה " + (r + 1) + "/3  גולים " + goals))
        pause(1400)
    }
    return goals
}

// ---------------------------------------------------------------- STAGE 3: dodge the tackles
// Run with the ball towards the goal. Defenders charge and slide in:
// move up/down out of their way, or A = hop over the slide.

function stageDodge(): boolean {
    clearAll()
    scene.setBackgroundImage(grass())
    const stripes: Sprite[] = []
    const stripeImg = image.create(10, 98)
    stripeImg.fill(6)
    for (let i = 0; i < 6; i++) {
        const s = mk(stripeImg, SpriteKind.UI)
        s.setPosition(i * 32, 64)
        s.z = -2
        stripes.push(s)
    }
    const lineImg = image.create(160, 1)
    lineImg.fill(1)
    uiSprite(lineImg, 80, 14).z = -1
    uiSprite(lineImg, 80, 114).z = -1
    const me = mk(YIF_A, SpriteKind.Player)
    me.z = 10
    const ball = mk(BALL_IMG, SpriteKind.Ball)
    ball.z = 11
    let baseY = 64
    let lives = 3
    const top = uiSprite(escapeHud(lives), 80, 5)
    top.setImage(dodgeHud(lives, 0))
    const tip = uiSprite(textImg("חצים = לזוז, A = קפיצה", 1, 15), 80, 60)
    tip.lifespan = 2000
    const TOTAL = DODGE_TOTAL
    const defs: Sprite[] = []
    const sliding: boolean[] = []
    let spawned = 0
    let passed = 0
    let hopT = 0
    let inv = 0
    let t = 0
    clearKeys()

    while (passed < TOTAL && lives > 0) {
        t++
        // move up / down
        if (controller.up.isPressed()) baseY = Math.max(22, baseY - 1.5)
        if (controller.down.isPressed()) baseY = Math.min(106, baseY + 1.5)
        if (hopT == 0 && popA()) { hopT = 24; sfxJump() }
        let hop = 0
        if (hopT > 0) {
            hopT--
            hop = Math.sin(Math.PI * (24 - hopT) / 24) * 9
        }
        me.setPosition(36, baseY - hop)
        me.setImage(anim(t, 5) ? YIF_A : YIF_B)
        ball.setPosition(46, baseY + 5 - hop * 0.3 + Math.sin(t / 3))
        for (const s of stripes) {
            s.x -= 1.6
            if (s.x < -6) s.x += 192
        }
        // new defender every so often
        if (spawned < TOTAL && t % 52 == 20) {
            const d = mk(OPP_A, SpriteKind.Enemy)
            d.setPosition(170, randint(26, 102))
            defs.push(d)
            sliding.push(false)
            spawned++
        }
        for (let i = defs.length - 1; i >= 0; i--) {
            const d = defs[i]
            if (!sliding[i]) {
                d.x -= 1.7 + spawned * 0.07
                d.y += Math.sign(baseY - d.y) * 0.65
                d.setImage(anim(t, 5) ? OPP_A : OPP_B)
                if (d.x - me.x < 40) {
                    sliding[i] = true
                    d.setImage(OPP_DOWN)
                    sfxKnock()
                }
            } else {
                d.x -= 3.8
            }
            const close = Math.abs(d.x - me.x) < 10 && Math.abs(d.y - baseY) < 8
            if (close && hopT == 0 && inv == 0) {
                lives--
                inv = 50
                sfxHit()
                scene.cameraShake(3, 200)
                top.setImage(dodgeHud(lives, passed))
            }
            if (d.x < -16) {
                d.destroy()
                defs.removeAt(i)
                sliding.removeAt(i)
                passed++
                top.setImage(dodgeHud(lives, passed))
            }
        }
        if (inv > 0) {
            inv--
            me.setFlag(SpriteFlag.Invisible, inv > 0 && inv % 6 < 3)
        }
        pause(16)
    }
    me.setFlag(SpriteFlag.Invisible, false)
    for (const d of defs) d.destroy()
    if (lives <= 0) {
        me.setImage(YIF_DOWN)
        sfxFail()
        banner("חטפו לך!", 2, 60, 1800)
        pause(1800)
        return false
    }
    // made it! the goal comes into view, shoot into the net
    const goalImg = image.create(12, 44)
    goalImg.fillRect(0, 0, 3, 44, 1)
    goalImg.fillRect(0, 0, 12, 2, 1)
    goalImg.fillRect(0, 42, 12, 2, 1)
    for (let y = 4; y < 42; y += 4) goalImg.drawLine(3, y, 11, y, 11)
    const goal = mk(goalImg, SpriteKind.UI)
    const gy = Math.max(36, Math.min(92, baseY))
    goal.setPosition(172, gy)
    const keeper = mk(KEEPER_IMG, SpriteKind.Keeper)
    keeper.setPosition(180, gy)
    for (let i = 0; i < 40; i++) {
        goal.x -= 1.5
        keeper.x -= 1.5
        baseY += Math.sign(gy - baseY)
        me.setPosition(36, baseY)
        ball.setPosition(46, baseY + 5)
        me.setImage(anim(i, 5) ? YIF_A : YIF_B)
        pause(16)
    }
    // timing bar: press A when the needle is in the green
    let scored = false
    for (let attempt = 0; attempt < 2 && !scored; attempt++) {
        ball.setPosition(46, baseY + 5)
        keeper.setImage(KEEPER_IMG)
        keeper.setPosition(goal.x - 8, gy)
        const zone = randint(20, 72)
        const ZW = 12
        const bar = uiSprite(kickBarImg(zone, ZW, 0), 80, 108)
        const kt = uiSprite(textImg(attempt == 0 ? "A בירוק = בעיטה!" : "ניסיון אחרון!", 5, 15), 80, 96)
        clearKeys()
        let n = 0
        let nd = 1
        let k = 0
        while (!popA()) {
            k++
            n += nd * 2.6
            if (n >= 99) { n = 99; nd = -1 }
            if (n <= 0) { n = 0; nd = 1 }
            bar.setImage(kickBarImg(zone, ZW, n))
            keeper.y = gy + Math.sin(k / 8) * 10
            pause(16)
        }
        const good = n >= zone && n <= zone + ZW
        sfxKick()
        const ty = good ? (keeper.y > gy ? gy - 15 : gy + 15) : keeper.y
        const tx = good ? goal.x + 2 : keeper.x
        const bx0 = ball.x
        const by0 = ball.y
        for (let i = 1; i <= 14; i++) {
            ball.setPosition(lerp(bx0, tx, i / 14), lerp(by0, ty, i / 14))
            pause(16)
        }
        bar.destroy()
        kt.destroy()
        if (good) scored = true
        else {
            keeper.setImage(KEEPER_DIVE)
            sfxFail()
            banner("השוער תפס!", 2, 60, 1200)
            pause(1300)
        }
    }
    if (!scored) return false
    sfxGoal()
    banner("גול!", 5, 60, 1500)
    confetti(1500)
    totalScore += 300
    pause(1600)
    return true
}

const DODGE_TOTAL = 10

function kickBarImg(zone: number, zw: number, needle: number): Image {
    const im = image.create(104, 8)
    im.fill(15)
    im.fillRect(2, 2, 100, 4, 11)
    im.fillRect(2 + zone, 1, zw, 6, 7)
    im.fillRect(2 + Math.round(needle), 0, 2, 8, 5)
    return im
}

function dodgeHud(lives: number, passed: number): Image {
    const im = escapeHud(lives)
    im.fillRect(30, 0, 80, 11, 15)
    const s = textImg("עקפת " + passed + "/" + DODGE_TOTAL, 1, 0)
    im.drawTransparentImage(s, 80 - s.width / 2, 0)
    const n = textImg("התחמקות", 5, 0)
    im.fillRect(100, 0, 60, 11, 15)
    im.drawTransparentImage(n, 158 - n.width, 0)
    return im
}

// ---------------------------------------------------------------- STAGE 5: keepy-uppy
// Press A when the ball drops to Yiftach's foot. Move under it with the arrows.
// Every touch makes it a bit faster and wilder. Best score is saved on the device.

function stageJuggle(): number {
    clearAll()
    scene.setBackgroundImage(welcomeBg())
    const me = mk(YIF_A, SpriteKind.Player)
    me.setPosition(80, 96)
    me.z = 10
    const ball = mk(BALL_IMG, SpriteKind.Ball)
    ball.setPosition(80, 30)
    ball.z = 20
    if (settings.exists("yif_juggle")) jugglesBest = settings.readNumber("yif_juggle")
    const counter = uiSprite(bigTextImg("0", 5, 15), 80, 24)
    const bestS = uiSprite(textImg("שיא " + jugglesBest, 1, 15), 130, 6)
    const tip = uiSprite(textImg("A כשהכדור ליד הרגל!", 1, 15), 80, 50)
    tip.lifespan = 2500
    const meter = uiSprite(juggleMeterImg(ball.y, false), 153, 62)
    meter.z = 55
    let vx = 0
    let vy = 0
    let g = 0.12
    let n = 0
    let cool = 0
    let kickT = 0
    clearKeys()
    while (true) {
        vy += g
        ball.x += vx
        ball.y += vy
        if (ball.x < 6) { ball.x = 6; vx = -vx }
        if (ball.x > 140) { ball.x = 140; vx = -vx }
        // Yiftach runs under the ball by himself - the only thing to get right is the timing
        me.x += Math.max(-3, Math.min(3, ball.x - me.x))
        const ready = vy > 0 && ball.y > 74 && ball.y < 108
        meter.setImage(juggleMeterImg(ball.y, ready))
        if (cool > 0) cool--
        if (kickT > 0) { kickT--; if (kickT == 0) me.setImage(YIF_A) }
        if (popA() && cool == 0) {
            if (ready) {
                n++
                vy = -(3.5 + randint(0, 4) * 0.1)
                const wild = Math.min(1.8, 0.3 + n * 0.05)
                vx = (randint(-10, 10) / 10) * wild
                g = Math.min(0.22, 0.12 + n * 0.004)
                me.setImage(YIF_B)
                kickT = 8
                music.playTone(500 + Math.min(n, 40) * 15, 40)
                setImageCentered(counter, bigTextImg("" + n, 5, 15))
                if (n % 10 == 0) {
                    banner(n + "!", 2, 60, 800)
                    cheerSound()
                }
            } else {
                cool = 3     // kicked at nothing - wait a moment
            }
        }
        if (ball.y > 108) break
        pause(16)
    }
    controller.moveSprite(me, 0, 0)
    sfxFail()
    banner("נפל!", 2, 60, 1200)
    pause(1300)
    return n
}

// right-side timing meter: the marker follows the ball's height and
// lights up when it's in the green kick zone above Yiftach's foot
function juggleMeterImg(by: number, ready: boolean): Image {
    const H = 92
    const im = image.create(10, H)
    im.fill(15)
    im.fillRect(2, 1, 6, H - 2, 11)
    const zoneTop = Math.round((74 - 10) * (H - 2) / 94) + 1
    const zoneBot = Math.round((108 - 10) * (H - 2) / 94) + 1
    im.fillRect(2, zoneTop, 6, zoneBot - zoneTop, 7)
    const my = Math.max(1, Math.min(H - 3, Math.round((by - 10) * (H - 2) / 94) + 1))
    im.fillRect(0, my - 1, 10, 3, ready ? 1 : 2)
    if (ready) im.drawRect(0, 0, 10, H, 7)
    return im
}

function juggleResult(n: number, attempt: number) {
    clearAll()
    const bg = image.create(160, 120)
    bg.fill(10)
    drawCenter(bg, bigTextImg("קפיצות", 1, 15), 6)
    drawCenter(bg, bigTextImg("" + n, 5, 15), 32)
    const record = n > jugglesBest
    if (record) {
        jugglesBest = n
        settings.writeNumber("yif_juggle", n)
        drawCenter(bg, bigTextImg("שיא חדש!", 5, 2), 62)
        confetti(2000)
        sfxGoal()
    } else {
        printCenter(bg, "השיא: " + jugglesBest, 68, 1)
    }
    printCenter(bg, "ניסיון " + attempt + "/3", 88, 5)
    printCenter(bg, attempt < 3 ? "A = עוד ניסיון" : "לחץ A", 104, 9)
    showAndWait(bg)
}

// ---------------------------------------------------------------- finale

function yiftachFinale() {
    const bg = finaleBg(10, 5, unpack(PHOTO_YIFTACH, 48), 22)
    leftText(bg, bigTextImg("יפתח!", 5, 15), 8)
    leftText(bg, textImg("אגדת דשא!", 1, 15), 36)
    leftText(bg, textImg("ניקוד " + totalScore, 5, 15), 56)
    leftText(bg, textImg("שיא קפיצות " + jugglesBest, 1, 15), 70)
    leftText(bg, textImg("A = לתפריט", 9, 15), 100)
    finaleEnd(bg)
}

// ---------------------------------------------------------------- the whole game

function playYiftach() {
    initYiftachArt()
    yiftachWelcome()

    const SH = ["החולצות עוברות על המתלה", "A כשהחולצה שלך במסגרת", "חולצה סגולה עם 8!"]
    playStage(1, "מצא את החולצה", SH, () => stageResult("חולצות", stageShirt(), 3, NEED))

    const FK = ["חצים = לכוון לכל מקום", "גבוה = מעל החומה!", "A = כוונת, A = כוח"]
    playStage(2, "בעיטה חופשית", FK, () => stageResult("גולים", stageShootout(true), 3, NEED))

    const HD = ["חצים = לזוז מתחת לכדור", "A = קפיצה ונגיחה", "תסתכל על הצל!"]
    playStage(3, "נגיחות", HD, () => stageResult("נגיחות", stageHeaders(), 3, NEED))

    const PO = ["ירדן המעצבן רוצה ארטיקים", "חצים = לזוז, A = לזרוק", "תפגע בו 3 פעמים!"]
    playStage(4, "ארטיקים", PO, stagePops)

    const DG = ["חצים = למעלה ולמטה", "A = קפיצה מעל תיקול", "בסוף: A בזמן = בעיטה לשער!"]
    playStage(5, "התחמקות", DG, stageDodge)

    const FT = ["כל הקבוצה היריבה נגדך!", "A = אגרוף  B = בעיטה", "תילחם בכולם!"]
    setFightHero(YIF_A, YIF_B, YIF_DOWN)
    playStage(6, "קרב!", FT, () => fightRound(3))
    setFightHero(PLAYER_A, PLAYER_B, SLIDE_IMG)

    const JG = ["A כשהמחוון מימין ירוק", "יפתח רץ לבד מתחת לכדור", "3 ניסיונות - שבור שיא!"]
    stageIntro(7, "קפיצות", JG)
    for (let k = 1; k <= 3; k++) juggleResult(stageJuggle(), k)

    yiftachFinale()
}
