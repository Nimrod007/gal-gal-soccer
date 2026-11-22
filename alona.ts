// ============================================================
//  אלונה טריאתלונה - הדרך לאולימפיאדה
//  Three races against 3 rivals: swim, bike, run. Finish in the top 3 to go on.
//  Then the Olympic podium with Alona's medal photo.
// ============================================================

const PHOTO_ALONA = hex`
    0c032f0e133f1e8f6e133e1d0f0e130b2e230c0e1f030d3f032eaf030c0f031e0b2f0e030f2e031f0e13af033d6f1e1f
    030d0c0e2f4e1f2e13df040d030ebf0d0c2e471b076e7f1eff0f0e0304070b4e071b110b030e0f1b8f1eef2e1b1f073e
    0f0b172b0f070b5f04234eaf0b110b2e7f3e275f0e0c0f2e2b031e0f233f072b0e6f3e070f3e6f04071e0f0b01072e0f
    234f070b0e6f2e2f3e076f03071e0f0b0107730e2f0b0e8f1e1f4e076f070b0e1f27032e730b5fae9f271e171e6f4e1f
    2e731f2e8f278e9f1e137b030f2e8f270f2eef0e131b033c2d034e6f07030b0f1eef0e530b6d4e0b0e4f130b0f3e3f1e
    6f1e431b0c5d0e1f070d0b3f0e130d6e1f0e076f0e730b5d031f07030d0e2f13070d1b033e1f5e1f0e131b134b4d031f
    1e030b2f13070b133e6f0e031f0e237b4d032f1e032f0e0317033e7f0e031f133e331b4d032f074f0e070b0d131e1f3e
    2f0e030f0e0b331e331b3d032f0b5f0e034d0c432e530e1f1e531e232f076f0e070b9e1f2e930b0d039eff5f0eb31d03
    1f0e33cf8e2f0eb31d430b1e0f071e5f136e6f0e230b041d331d0c132d6e5f273e1f2e2f0ea36d031f1e1f0e0b4fce2f
    0e930d0c032d0c6f0e030d6f6e1f4e832d0e031d036f3e379e1f3e231e430c0d1e030d0e4f4e510b070e1f1e175f333e
    130c0d230c8f07015b210b075f1e0f0bd30c0e7f07010b034c070b311b4e1b730d04330e7f0e010b1e1c04230e0b610b
    171b1e731c0e6f1e0f07014e07032e0c5b410b031e730c072f1e5f031c130e0723070c036b113b531c1b01072f172f4e
    0b235c03011b416b33314e158e0c130e3c0e071b414b910e3f0e15076e432c03570b114b111b230d170f3e07152e0327
    0c6e030c370f2b070f1e231e33173f1e1543be370e2b0e27530c0d373f0e0705130b2c0e170f2e231e37110b57231403
    371f3e07130b0d040203071f0b1e131c0e372b7713570e1f0e0517331e031c03070e230c0e372bf7172f170e333e020c
    430c0e1b172bf7172f0e05074b0c031e020c430e6bf7172f27032b031d04131c130c0ef7a70f0e27731d141c040ef7a7
    1f6e330b0d030204030e170e0ff7773f072e1f0e63f7c73e0f07331e030c140c270f0ef7971e1f0e07031d0b33040d0c
    271f171f0e976e471e0f17030b4d1c1d270e0f170e1f0eb74e370e1f17230b3d3c171f272e672f278e071f07533c1d17
    1f272e570e3f270f1e0f472e2d04031e231d0c071f370f0e574f272f874d5304050e1f373e270e3fa72e17030b0c230d
    0b032d070f2e277e2f671b270f1ed30f3e374e171f0e171b575e330c2d1c134e0f374e172e073b570f3e03140c5d0c03
    0e1f1e0f473e271f072b670f3e039d030f5e373e171e0f471e275e038d0c7e370e1f0e172e472e175e038d036e0f377e
    1f875e13045d237e372e173e870e1f2e230c3d436e372e173e870e1f4e2314535e0f471e272e870e1f6e331c237e371e
    272e971f8e538e372e271e471e271f7e531e07034e0f471e271e971f6e130c4e177e372e172e870f5e43ee471e271e77
    6e
`

// --- Alona: long brown ponytail, navy + teal tri-suit, neon yellow shoes
const ALONA_RUN_A = img`
    ....eeee....
    ...eeeeee...
    ...eedddd...
    ..eeedfdd...
    .ee..dddd...
    .e...d88....
    e...888888..
    ...d868868d.
    ..d.888888.d
    ....888888..
    ....88..88..
    ...dd...dd..
    ..dd.....dd.
    .dd.......d.
    .55.......55
    ............
`
const ALONA_RUN_B = img`
    ....eeee....
    ...eeeeee...
    ...eedddd...
    ..eeedfdd...
    .ee..dddd...
    .e...d88....
    e...888888..
    ...d868868d.
    ...d888888d.
    ....888888..
    ....8888....
    .....dd.....
    .....dd.....
    .....dd.....
    ....555.....
    ............
`
// swimming, seen from above, head (green cap) to the right
const SWIM_A = img`
    ..........dd....
    ...........dd...
    dd..88888888777.
    .d888888888d7777
    .d888888888d7777
    dd..88888888777.
    ................
    ................
`
const CONE = img`
    ...4...
    ...4...
    ..414..
    ..111..
    .44444.
    .11111.
    4444444
    4444444
`
// on the bike, side view: Alona's upper body + two wheels; f = pedal frame 0/1
function bikeImg(f: number): Image {
    const im = image.create(18, 18)
    im.drawTransparentImage(ALONA_RUN_A, 3, 0)
    im.fillRect(0, 10, 18, 8, 0)                        // no running legs
    im.drawCircle(4, 14, 3, 15)
    im.drawCircle(14, 14, 3, 15)
    im.drawLine(4, 14, 9, 14, 6)                       // frame
    im.drawLine(9, 14, 7, 10, 6)
    im.drawLine(7, 10, 13, 10, 6)
    im.drawLine(13, 9, 14, 14, 6)
    im.drawLine(8, 10, 9, 14 - f * 2, 13)              // leg on the pedal
    im.setPixel(f == 0 ? 4 : 3, f == 0 ? 11 : 14, 15)  // spinning spokes
    im.setPixel(f == 0 ? 14 : 13, f == 0 ? 11 : 14, 15)
    return im
}
const RIVAL_SUITS = [2, 4, 10]

// make a rival from one of Alona's pictures: other suit color, other hair, other cap
function rivalLook(src: Image, i: number): Image {
    let im = recolor(src, 5, 1)                 // white shoes
    im = recolor(im, 8, RIVAL_SUITS[i])
    im = recolor(im, 14, i == 1 ? 15 : 3)
    im = recolor(im, 7, [1, 5, 2][i])           // swim cap
    return im
}

// ---------------------------------------------------------------- welcome

function alonaWelcome() {
    clearAll()
    const bg = image.create(160, 120)
    bg.fill(8)
    for (let i = 0; i < 40; i++) bg.setPixel(randint(0, 159), randint(0, 70), 1)
    // olympic rings
    const ringCol = [8, 15, 2, 5, 7]
    for (let i = 0; i < 5; i++) {
        const cx = 56 + i * 12
        const cy = 64 + (i % 2) * 6
        bg.drawCircle(cx, cy, 6, i == 0 ? 9 : ringCol[i])
        bg.drawCircle(cx, cy, 5, i == 0 ? 9 : ringCol[i])
    }
    // running track at the bottom
    bg.fillRect(0, 84, 160, 36, 4)
    for (let y = 90; y < 120; y += 8) bg.drawLine(0, y, 160, y, 1)
    drawCenter(bg, bigTextImg("אלונה", 5, 15), 2)
    drawCenter(bg, bigTextImg("טריאתלונה", 1, 15), 26)
    drawCenter(bg, textImg("הדרך לאולימפיאדה", 9, 15), 48)
    scene.setBackgroundImage(bg)
    const runner = mk(ALONA_RUN_A, SpriteKind.Player)
    const pressA = uiSprite(textImg("לחץ A כדי להתחיל", 5, 15), 80, 112)
    clearKeys()
    let t = 0
    while (!popA()) {
        t++
        runner.x = (t * 1.5) % 200 - 20
        runner.y = 94
        runner.setImage(anim(t, 5) ? ALONA_RUN_A : ALONA_RUN_B)
        pressA.setFlag(SpriteFlag.Invisible, Math.idiv(t, 15) % 2 == 0)
        pause(20)
    }
    sfxWhistle()
}

// ---------------------------------------------------------------- after each race: which place?

const MEDAL_COLORS = [5, 11, 4]
const PLACE_NAMES = ["זהב", "כסף", "ארד"]
let alonaMedals: number[] = []

function medalImg(place: number): Image {
    const im = image.create(16, 22)
    im.fillRect(4, 0, 3, 8, 2)
    im.fillRect(9, 0, 3, 8, 8)
    im.fillCircle(8, 14, 7, MEDAL_COLORS[place - 1])
    im.drawCircle(8, 14, 7, 15)
    im.print("" + place, 6, 10, 15)
    return im
}

// returns true when she finished in the top 3
function raceResult(name: string, place: number): boolean {
    pause(300)
    clearAll()
    const passed = place <= 3
    const bg = image.create(160, 120)
    bg.fill(passed ? 8 : 14)
    drawCenter(bg, bigTextImg(name, 1, 15), 6)
    drawCenter(bg, bigTextImg("מקום " + place, 5, 15), 32)
    if (passed) {
        alonaMedals.push(place)
        drawCenter(bg, medalImg(place).doubled(), 58)
        printCenter(bg, "מדליית " + PLACE_NAMES[place - 1] + "!", 104, 1)
        confetti(1500)
        sfxGoal()
    } else {
        printCenter(bg, "צריך להגיע לפודיום", 66, 1)
        printCenter(bg, "נסה שוב!", 80, 5)
        printCenter(bg, "לחץ A", 104, 1)
        sfxFail()
    }
    showAndWait(bg)
    return passed
}

// ---------------------------------------------------------------- SWIM and RUN: side-view lane races
// Alternate LEFT / RIGHT arrows to go fast (same arrow twice = no push).
// swim: every few strokes you must breathe - press A when the bubble shows.
// run: you get tired - grab water (A) at the water stations.

const BIKE_CONES = [150, 250, 330, 420, 500]
const CONE_SHIFT = [40, 0, 60, 25]      // each lane has its cones a bit further along
const WATER = [200, 420, 620]

function laneWorld(kind: number, w: number): Image {
    const bg = image.create(w, 120)
    if (kind == 0) {
        // pool: blue water, lane ropes, black lane lines, start + finish walls
        bg.fill(9)
        for (let i = 0; i < 4; i++) bg.fillRect(0, 34 + i * 23, w, 2, 8)
        for (let i = 0; i <= 4; i++) {
            for (let x = 0; x < w; x += 4) bg.fillRect(x, 23 + i * 23, 2, 2, Math.idiv(x, 4) % 4 == 0 ? 2 : 1)
        }
        bg.fillRect(0, 0, w, 22, 11)
        bg.fillRect(0, 22, 8, 98, 11)
    } else if (kind == 2) {
        // road through the hills
        bg.fill(9)
        for (let x = 0; x < w; x++) bg.drawLine(x, 30 + Math.sin(x / 23) * 6, x, 44, 7)
        bg.fillRect(0, 44, w, 76, 11)
        for (let i = 0; i <= 4; i++) {
            for (let x = (i % 2) * 6; x < w; x += 12) bg.fillRect(x, 46 + i * 18, 6, 1, 1)
        }
        for (let L = 0; L < 4; L++) for (const ox of BIKE_CONES) bg.drawTransparentImage(CONE, ox + CONE_SHIFT[L] - 3, 46 + L * 18)
    } else {
        // running track: crowd, orange lanes, white lines
        bg.fill(7)
        bg.fillRect(0, 0, w, 40, 10)
        for (let x = 0; x < w; x += 2) bg.setPixel(x, 14 + (x % 3) * 6, [1, 5, 2, 9][x % 4])
        bg.fillRect(0, 44, w, 76, 4)
        for (let i = 0; i <= 4; i++) bg.drawLine(0, 46 + i * 18, w, 46 + i * 18, 1)
        // water stations
        for (const sx of WATER) {
            bg.fillRect(sx - 8, 36, 16, 6, 14)
            for (let k = 0; k < 4; k++) bg.fillRect(sx - 7 + k * 4, 33, 2, 3, 9)
        }
    }
    // finish line
    for (let y = 22; y < 120; y += 4) {
        bg.fillRect(w - 24, y, 2, 2, 15)
        bg.fillRect(w - 22, y + 2, 2, 2, 15)
        bg.fillRect(w - 24, y + 2, 2, 2, 1)
        bg.fillRect(w - 22, y, 2, 2, 1)
    }
    return bg
}

function laneRace(kind: number): number {
    clearAll()
    scene.setBackgroundColor(15)
    const W = kind == 0 ? 440 : (kind == 1 ? 760 : 580)
    const NAME = ["שחייה", "ריצה", "רכיבה"][kind]
    const FINISH = W - 24
    const world = mk(laneWorld(kind, W), SpriteKind.UI)
    world.setPosition(W / 2, 60)
    world.z = -100
    const imgA = kind == 0 ? SWIM_A : (kind == 1 ? ALONA_RUN_A : bikeImg(0))
    const imgB = kind == 0 ? flippedY(SWIM_A) : (kind == 1 ? ALONA_RUN_B : bikeImg(1))
    const laneY = kind == 0 ? [34, 57, 80, 103] : [54, 72, 90, 108]
    // Alona swims/runs in lane 2, rivals in the others
    const racers: Sprite[] = []
    const rivalA: Image[] = []
    const rivalB: Image[] = []
    const rivalSpeed = [1.2, 1.35, 1.5]
    const rivalLane = [0, 2, 3]
    for (let i = 0; i < 3; i++) {
        rivalA.push(rivalLook(imgA, i))
        rivalB.push(rivalLook(imgB, i))
        const r = mk(rivalA[i], SpriteKind.Enemy)
        r.setPosition(14, laneY[rivalLane[i]])
        if (kind > 0) r.bottom = laneY[rivalLane[i]]
        else {
            r.setImage(rivalLook(ALONA_RUN_A, i))            // standing on the block
            r.setPosition(5, laneY[rivalLane[i]] - 12)
        }
        racers.push(r)
    }
    const me = mk(imgA, SpriteKind.Player)
    me.setPosition(14, laneY[1])
    if (kind > 0) me.bottom = laneY[1]
    else {
        me.setImage(ALONA_RUN_A)                         // everyone starts on the blocks
        me.setPosition(5, laneY[1] - 12)
    }
    me.z = 10
    const bubble = uiSprite(recolor(ARROW_UP, 1, 5), 0, 0)
    bubble.setFlag(SpriteFlag.RelativeToCamera, false)
    bubble.setFlag(SpriteFlag.Invisible, true)
    const top = uiSprite(hud(NAME, ""), 80, 5)
    const tip = uiSprite(textImg(kind == 0 ? "חץ למעלה = קפיצה למים!" : "A B A B מהר!", 1, 15), 80, 112)
    tip.lifespan = 3000

    // 3-2-1 GO
    for (const c of ["3", "2", "1"]) {
        banner(c, 5, 60, 500)
        music.playTone(440, 150)
        pause(550)
    }
    banner("צא!", 7, 60, 600)
    music.playTone(880, 300)

    let v = 0
    let last = ""
    let strokes = 0
    let breathT = 0
    let energy = 100
    let hopT = 0
    let stun = 0
    // swim: Alona waits on the block until she dives in (up arrow) - the quicker, the better
    let dived = kind != 0
    let cone = 0
    let t = 0
    const rivalDone: number[] = [0, 0, 0]
    clearKeys()
    while (me.x < FINISH) {
        t++
        // --- strokes / steps
        let k = popKey()
        while (k != null) {
            if (!dived) {
                if (k == "U") {
                    dived = true
                    v = Math.max(0.6, 3.2 - t * 0.06)
                    if (t < 15) banner("זינוק מושלם!", 5, 40, 700)
                    music.playTone(600, 60)
                    me.setImage(imgA)
                    me.setPosition(26, laneY[1])
                }
                k = popKey()
                continue
            }
            if ((k == "A" || k == "B") && breathT == 0 && stun == 0) {
                if (k != last) {
                    let push = 0.55
                    if (kind == 1 && energy < 20) push = 0.2      // too tired
                    v = Math.min(3, v + push)
                    strokes++
                    if (kind == 1) energy = Math.max(0, energy - 1.9)
                    if (kind == 0) music.playTone(300 + randint(0, 60), 15)
                }
                last = k
            }
            if (k == "U") {
                if (kind == 2) {
                    if (hopT == 0) { hopT = 22; sfxJump() }
                } else if (breathT > 0) {
                    // took a breath in time
                    breathT = 0
                    bubble.setFlag(SpriteFlag.Invisible, true)
                    music.playTone(700, 40)
                } else if (kind == 1 && WATER.some(w => Math.abs(me.x - w) < 18)) {
                    energy = Math.min(100, energy + 60)
                    banner("מים!", 9, 40, 500)
                    music.playTone(900, 60)
                }
            }
            k = popKey()
        }
        // swimming: time to breathe every 8 strokes
        if (kind == 0 && breathT == 0 && strokes >= 8) {
            breathT = 45
            strokes = 0
            bubble.setFlag(SpriteFlag.Invisible, false)
        }
        if (breathT > 0) {
            breathT--
            bubble.setPosition(me.x + 6, me.y - 10)
            if (breathT == 0) {
                // missed the breath: swallow water and slow down
                v *= 0.3
                bubble.setFlag(SpriteFlag.Invisible, true)
                banner("בלעת מים!", 2, 40, 700)
                sfxHit()
            }
        }
        if (kind == 1) energy = Math.min(100, energy + 0.05)
        if (stun > 0) stun--
        // bike: hop over the cones with A
        if (kind == 2) {
            if (hopT > 0) hopT--
            me.bottom = laneY[1] - Math.sin(Math.PI * hopT / 22) * 12
            if (cone < BIKE_CONES.length && me.x + 6 > BIKE_CONES[cone]) {
                if (hopT == 0) {
                    v = 0
                    stun = 45
                    banner("אאוץ'!", 2, 40, 600)
                    sfxHit()
                    scene.cameraShake(2, 200)
                }
                cone++
            }
        }
        v *= 0.965
        me.x += v
        if (v > 0.3) me.setImage(anim(t, kind == 0 ? 8 : 5) ? imgA : imgB)

        // --- rivals keep a steady pace (with small changes)
        for (let i = 0; i < 3; i++) {
            const r = racers[i]
            if (kind == 0 && t <= 10 + i * 5) {
                if (t < 10 + i * 5) continue
                r.setPosition(26, laneY[rivalLane[i]])          // dive in
            }
            if (r.x < FINISH) {
                r.x += rivalSpeed[i] + (kind == 1 ? 0.25 : 0) + Math.sin((t + i * 30) / 20) * 0.15
                if (kind == 2) {
                    // rivals hop over the cones in their lane
                    let h = 0
                    for (const c of BIKE_CONES) {
                        const d = r.x + 6 - c - CONE_SHIFT[rivalLane[i]]
                        if (d > -14 && d < 8) h = Math.sin(Math.PI * (d + 14) / 22) * 12
                    }
                    r.bottom = laneY[rivalLane[i]] - h
                }
                if (r.x >= FINISH) rivalDone[i] = t
            }
            r.setImage(anim(t + i * 3, kind == 0 ? 8 : 5) ? rivalA[i] : rivalB[i])
        }

        // --- camera + top bar
        scene.centerCameraAt(Math.max(80, Math.min(W - 80, me.x + 30)), 60)
        if (t % 5 == 0) {
            let place = 1
            for (const r of racers) if (r.x > me.x) place++
            let info = "מקום " + place
            if (kind == 1) info += "  כוח " + Math.round(energy)
            top.setImage(hud(NAME, info))
        }
        pause(16)
    }
    let place = 1
    for (let i = 0; i < 3; i++) if (rivalDone[i] > 0) place++
    sfxWhistle()
    banner(place == 1 ? "ניצחון!" : "סיום!", 5, 60, 1500)
    pause(1500)
    return place
}

// ---------------------------------------------------------------- the Olympic finale

function alonaFinale() {
    const bg = finaleBg(8, 1, unpack(PHOTO_ALONA, 48), 22)
    leftText(bg, bigTextImg("אלונה!", 5, 15), 4)
    leftText(bg, textImg("אלופה אולימפית!", 1, 15), 30)
    // her medals from the three races
    for (let i = 0; i < alonaMedals.length; i++) {
        bg.drawTransparentImage(medalImg(alonaMedals[i]), 14 + i * 24, 48)
    }
    leftText(bg, textImg("שחייה  רכיבה  ריצה", 9, 0), 72)
    leftText(bg, textImg("A = לתפריט", 5, 15), 100)
    finaleEnd(bg)
}

// ---------------------------------------------------------------- TRANSITIONS: find spot 2418 and change
// Run along the transition area; press A when spot 2418 is in the frame, then do the change combo.

function spotImg(num: string): Image {
    const im = image.create(26, 24)
    im.fillRect(0, 0, 26, 10, 1)
    im.drawRect(0, 0, 26, 10, 15)
    im.print(num, 1, 1, 15)
    im.fillRect(12, 10, 2, 14, 11)
    return im
}

// other spots: look-alikes and other 3 or 4 digit numbers
function decoySpot(): string {
    const r = randint(0, 4)
    if (r < 2) return ["2481", "2148", "4218", "2419", "1418", "2408", "2318"][randint(0, 6)]
    if (r == 2) return ["241", "418", "248", "218"][randint(0, 3)]
    const n = r == 3 ? randint(1000, 9999) : randint(100, 999)
    return n == 2418 ? "2481" : "" + n
}

function transition(n: number): boolean {
    clearAll()
    scene.setBackgroundImage(railBg(7, 11))
    const me = mk(n == 0 ? SWIM_A : bikeImg(0), SpriteKind.Player)
    me.setPosition(80, 84)
    const top = uiSprite(hud("מעבר", "המקום שלך: 2418"), 80, 5)
    const panel = uiSprite(image.create(160, 34), 80, 28)
    panel.setFlag(SpriteFlag.Invisible, true)
    const imgs: Image[] = []
    const target = randint(5, 8)
    for (let i = 0; i < 11; i++) imgs.push(spotImg(i == target ? "2418" : decoySpot()))
    const runA = n == 0 ? ALONA_RUN_A : bikeImg(0)
    const runB = n == 0 ? ALONA_RUN_B : bikeImg(1)
    if (!railPick(imgs, target, 1.5, me, runA, runB, "2418!", "לא המקום שלך!")) return false
    const sk = n == 0 ? new Skill("קסדה ואופניים", ["U", "A", "D", "B"], 4000, 0) : new Skill("נעלי ריצה", ["D", "B", "U", "A", "B"], 4000, 0)
    if (!runCombo(sk, panel, me, 84)) {
        failBanner("איטי מדי!")
        pause(1500)
        return false
    }
    me.setImage(n == 0 ? bikeImg(0) : ALONA_RUN_A)
    banner("מעבר מהיר!", 5, 64, 1500)
    sfxGoal()
    pause(1600)
    return true
}

// ---------------------------------------------------------------- BONUS: the cheaters on the podium
// Two made-up cheaters "won" after appeals. Alona sprints (left/right), slaps them both (A),
// they fall into the fire and she takes first place.

function bonusBg(): Image {
    const bg = image.create(160, 120)
    bg.fill(9)
    bg.fillRect(0, 40, 160, 20, 10)
    for (let x = 1; x < 160; x += 3) bg.setPixel(x, 44 + (x % 3) * 5, [2, 5, 1, 4, 8][x % 5])
    bg.fillRect(0, 60, 160, 60, 4)                   // track
    for (let y = 70; y < 120; y += 12) bg.drawLine(0, y, 160, y, 1)
    return bg
}
// podium: 2nd on the left, 1st in the middle, 3rd on the right; top-of-block y values
const POD_X = [98, 116, 134]
const POD_TOP = [86, 78, 90]
function drawPodium(bg: Image) {
    for (let i = 0; i < 3; i++) {
        bg.fillRect(POD_X[i] - 9, POD_TOP[i], 18, 100 - POD_TOP[i], i == 1 ? 12 : (i == 0 ? 11 : 4))
        bg.drawRect(POD_X[i] - 9, POD_TOP[i], 18, 100 - POD_TOP[i], 1)
        bg.print("" + [2, 1, 3][i], POD_X[i] - 2, POD_TOP[i] + 3, 15)
    }
    bg.fillRect(0, 100, 160, 2, 1)
}
const BIRD = img`
    f......f
    .f....f.
    ..f44f..
    ...ff...
`

function bonusStage() {
    clearAll()
    const bg = bonusBg()
    drawPodium(bg)
    scene.setBackgroundImage(bg)
    // the girl stands on 1st place, her dad next to the podium, two other racers on 2nd and 3rd
    const girl = mk(rivalLook(ALONA_RUN_A, 0), SpriteKind.Enemy)
    girl.x = POD_X[1]
    girl.bottom = POD_TOP[1]
    const dad = mk(recolor(recolor(PLAYER_A, 2, 11), 14, 15), SpriteKind.Enemy)
    dad.x = 78
    dad.bottom = 100
    for (const i of [0, 2]) {
        const o = mk(rivalLook(ALONA_RUN_A, i == 0 ? 1 : 2), SpriteKind.Food)
        o.x = POD_X[i]
        o.bottom = POD_TOP[i]
    }
    const me = mk(ALONA_RUN_A, SpriteKind.Player)
    me.bottom = 100
    me.x = 10
    // the announcer
    const lines = ["ועכשיו במקום הראשון", "אחרי ערעורים וחפירות:", "הרמאית ואבא שלה!"]
    const ann: Sprite[] = []
    for (let i = 0; i < 3; i++) ann.push(uiSprite(textImg(lines[i], i == 2 ? 2 : 1, 15), 80, 7 + i * 12))
    sfxSiren()
    let t = 0
    for (let i = 0; i < 120; i++) {
        t++
        girl.bottom = POD_TOP[1] - Math.abs(Math.sin(t / 6)) * 3      // smug little jumps
        pause(20)
    }
    for (const a of ann) a.destroy()
    const tip = uiSprite(textImg("A B A B מהר! תפוס אותם!", 5, 15), 80, 20)

    // sprint: alternate A / B
    clearKeys()
    let last = ""
    let v = 0
    while (me.x < dad.x - 16) {
        t++
        const k = popKey()
        if ((k == "A" || k == "B") && k != last) { v = Math.min(3, v + 0.55); last = k }
        v *= 0.95
        me.x += v
        me.setImage(v > 0.3 && anim(t, 4) ? ALONA_RUN_B : ALONA_RUN_A)
        girl.bottom = POD_TOP[1] - Math.abs(Math.sin(t / 6)) * 3
        pause(16)
    }
    me.setImage(ALONA_RUN_A)
    girl.bottom = POD_TOP[1]

    // two slaps: first the dad, then the girl
    const who = [dad, girl]
    for (const w of who) {
        setImageCentered(tip, textImg("A = סטירה!", 5, 15))
        waitA()
        const sx = me.x
        const sy = me.y
        for (let k = 1; k <= 8; k++) {
            me.x = lerp(sx, w.x - 10, k / 8)
            me.y = lerp(sy, w.y, k / 8) - Math.sin(k / 8 * Math.PI) * 6
            pause(16)
        }
        sfxKnock()
        sfxKick()
        scene.cameraShake(4, 300)
        banner("טראח!", 2, 50, 700)
        w.setImage(flipped(w.image))
        burst(w, 600)
        pause(500)
    }
    tip.destroy()

    // off they go to the side to cry
    for (let k = 0; k < 40; k++) {
        for (let i = 0; i < 2; i++) {
            const w = who[i]
            w.x = lerp(w.x, 24 + i * 30, 0.08)
            w.bottom = lerp(w.bottom, 100, 0.15)
        }
        pause(20)
    }
    const tears = image.create(2, 3)
    tears.fill(9)
    const poop = image.create(4, 3)
    poop.fill(1)
    poop.setPixel(1, 0, 13)
    banner("בוכים בצד...", 9, 54, 1500)
    // now YOU are a bird: arrows = fly, A = drop. Hit both of them before the time runs out.
    const B2 = BIRD.doubled()
    const bird = mk(B2, SpriteKind.UI)
    const top = uiSprite(hud("ציפור", ""), 80, 5)
    const btip = uiSprite(textImg("חצים = לעוף, A = להפציץ!", 5, 15), 80, 112)
    let done = false
    while (!done) {
        bird.setPosition(140, 26)
        const stuck: Sprite[] = [null, null]
        let drop: Sprite = null
        let hits = 0
        clearKeys()
        for (let k = 0; k < 400 && hits < 2; k++) {
            if (controller.left.isPressed()) bird.x = Math.max(4, bird.x - 1.8)
            if (controller.right.isPressed()) bird.x = Math.min(156, bird.x + 1.8)
            bird.setImage(anim(k, 5) ? B2 : flippedY(B2))
            if (popA() && !drop) {
                drop = mk(poop, SpriteKind.UI)
                drop.setPosition(bird.x, bird.y + 6)
                drop.vy = 80
                snd(900, 200, 150)
            }
            // they walk back and forth, crying
            for (let i = 0; i < 2; i++) {
                const w = who[i]
                w.x = 24 + i * 30 + Math.sin(k / 18 + i * 2) * 14
                if (k % 8 == 0) {
                    const d = mk(tears, SpriteKind.UI)
                    d.setPosition(w.x + randint(-3, 3), w.top + 4)
                    d.vy = 30
                    d.lifespan = 300
                }
                if (stuck[i]) stuck[i].setPosition(w.x, w.top)
                else if (drop && Math.abs(drop.x - w.x) < 6 && drop.bottom >= w.top + 1) {
                    stuck[i] = drop                                   // splat, right on the head
                    drop.vy = 0
                    drop = null
                    hits++
                    banner("איכס!", 5, 54, 800)
                    snd(300, 100, 200)
                }
            }
            if (drop && drop.y > 100) { drop.destroy(); drop = null }
            if (k % 10 == 0) {
                top.setImage(hud("ציפור", "זמן " + Math.idiv(400 - k, 50) + "  פגיעות " + hits + "/2"))
                snd(500, 300, 100)                                   // boo hoo
            }
            pause(20)
        }
        if (drop) drop.destroy()
        done = hits == 2
        for (const p of stuck) if (p) p.destroy()
        if (!done) {
            failBanner("לאט מדי! עוד פעם")
            pause(1500)
        }
    }
    pause(800)
    bird.destroy()
    top.destroy()
    btip.destroy()

    // Alona takes her place on top
    const mx = me.x
    const my = me.bottom
    for (let k = 1; k <= 14; k++) {
        me.x = lerp(mx, POD_X[1], k / 14)
        me.bottom = lerp(my, POD_TOP[1], k / 14) - Math.sin(k / 14 * Math.PI) * 12
        pause(20)
    }
    uiSprite(medalImg(1), POD_X[1], POD_TOP[1] - 24).z = 60
    sfxGoal()
    cheerSound()
    banner("מקום ראשון!", 5, 34, 3000)
    confetti(3000)
    pause(3000)
}

// ---------------------------------------------------------------- FINISH: weave through the runners to the gate
// We look through the finish gate; the runners come towards us. A/B = run, left/right = steer.

// Alona from the front (B frame = mirrored)
const ALONA_FRONT = img`
    ....eeee....
    ...eeeeee...
    ...edddde...
    ...dfddfd...
    ...edddde...
    .....dd.....
    ...888888...
    ..d868868d..
    ..d888888d..
    ..d.8888.d..
    ....8888....
    ....d..d....
    ....d..d....
    ....d..55...
    ...55.......
    ............
`
const FIN_F = 25
function finishRun(): boolean {
    clearAll()
    const bg = image.create(160, 120)
    bg.fill(9)
    bg.fillRect(0, 22, 160, 22, 10)                                 // the crowd
    for (let x = 1; x < 160; x += 2) bg.setPixel(x, 26 + (x % 3) * 5, [1, 5, 2, 4][x % 4])
    bg.fillRect(0, 44, 160, 76, 7)
    for (let y = 44; y < 120; y++) {
        const w = (y - 30) * 0.82
        bg.drawLine(80 - w, y, 80 + w, y, 4)                        // the road to the gate
    }
    for (let x = 0; x < 160; x += 4) bg.fillRect(x, 112 + Math.idiv(x, 4) % 2 * 3, 4, 3, 1)
    scene.setBackgroundImage(bg)
    // the gate we look through
    const gate = image.create(160, 120)
    gate.fillRect(0, 10, 8, 110, 1)
    gate.fillRect(152, 10, 8, 110, 1)
    gate.fillRect(0, 10, 160, 14, 2)
    drawCenter(gate, textImg("סיום", 1, 15), 13)
    uiSprite(gate, 80, 60).z = 90
    const top = uiSprite(hud("קו הסיום", ""), 80, 5)

    const imgs: Image[] = []
    const rs: Sprite[] = []
    const rz: number[] = []
    const rx: number[] = []
    const rv: number[] = []
    const rd: number[] = []
    for (let i = 0; i < 8; i++) {
        imgs.push(rivalLook(ALONA_FRONT, i % 3))
        rs.push(mk(imgs[i], SpriteKind.Enemy))
        rz.push(10 + i * 6)
        rv.push(Math.min(0.05 + randint(0, 3) * 0.015, rz[i] / 300))
        rx.push(randint(-8, 8) / 10)
        rd.push(0)
    }
    const me = mk(ALONA_FRONT, SpriteKind.Player)
    let z = 60
    const mark = uiSprite(flippedY(recolor(ARROW_UP, 1, 5)), 80, 0)
    mark.z = 95
    let lx = 0
    let v = 0
    let last = ""
    let stun = 0
    let t = 0
    // put a sprite at depth zz and side position xx (-1 left .. 1 right)
    function place(sp: Sprite, zz: number, xx: number) {
        const k = FIN_F / (zz + FIN_F)
        sp.scale = Math.max(0.3, 2 * k)
        sp.x = 80 + xx * 70 * k
        sp.bottom = 30 + 85 * k
        sp.z = 200 - zz
    }
    banner("צא!", 7, 60, 600)
    clearKeys()
    while (z > 0) {
        t++
        let k = popKey()
        while (k != null) {
            if ((k == "A" || k == "B") && k != last && stun == 0) { v = Math.min(0.7, v + 0.15); z -= 0.7; last = k }
            k = popKey()
        }
        if (controller.left.isPressed()) lx = Math.max(-0.9, lx - 0.03)
        if (controller.right.isPressed()) lx = Math.min(0.9, lx + 0.03)
        if (stun > 0) { stun--; v = 0 }
        v *= 0.97
        z -= v
        place(me, z, lx)
        mark.setPosition(me.x, me.top - 5 + Math.sin(t / 4) * 2)
        me.setImage(v > 0.03 && anim(t, 3) ? flipped(ALONA_FRONT) : ALONA_FRONT)
        if (v > 0.03) me.y -= Math.abs(Math.sin(t / 3)) * 3 * me.scale
        let ahead = 0
        for (let i = 0; i < 8; i++) {
            const r = rs[i]
            rz[i] -= rv[i]
            // runners drift from side to side
            if (randint(0, 40) == 0) rd[i] = randint(-1, 1) * 0.012
            rx[i] = Math.max(-0.85, Math.min(0.85, rx[i] + rd[i]))
            place(r, rz[i], rx[i])
            r.setImage(anim(t + i, 4) ? flipped(imgs[i]) : imgs[i])
            r.y -= Math.abs(Math.sin((t + i * 2) / 4)) * 3 * r.scale     // bobbing up and down as they run
            if (rz[i] < z) ahead++
            if (stun == 0 && rz[i] > 0 && Math.abs(rz[i] - z) < 3 && Math.abs(rx[i] - lx) < 0.22) {
                stun = 25
                z += 1.5
                sfxHit()
                banner("בום!", 2, 60, 500)
            }
        }
        if (t % 6 == 0) top.setImage(hud("קו הסיום", "מקום " + (ahead + 1)))
        pause(16)
    }
    let p = 1
    for (const r of rz) if (r <= 0) p++
    sfxWhistle()
    if (p == 1) {
        banner("ראשונה בקו!", 5, 60, 2000)
        confetti(2000)
        sfxGoal()
    } else {
        failBanner("מקום " + p + " - נסה שוב!")
    }
    pause(2000)
    return p == 1
}

// a white speech bubble with a little tail pointing down at the speaker
function speechImg(s: string): Image {
    const t = textImg(s, 15, 0)
    const w = t.width + 6
    const im = image.create(w, 17)
    im.fillRect(1, 0, w - 2, 14, 1)
    im.fillRect(0, 1, w, 12, 1)
    im.fillRect(w / 2 - 2, 14, 4, 1, 1)
    im.fillRect(w / 2 - 1, 15, 2, 2, 1)
    im.drawTransparentImage(t, 3, 2)
    return im
}

// ---------------------------------------------------------------- BONUS 2: grab the announcer's mic
// The announcer never stops talking. Run to her booth, grab the mic, and get out
// through the exit before she catches you.

const MIC = img`
    .ffff.
    f1f1ff
    ff1f1f
    f1f1ff
    ff1f1f
    .ffff.
    ..bb..
    ..ff..
    ..ff..
    ..ff..
    ..ff..
    ..ff..
`
function micStage(): boolean {
    clearAll()
    const bg = image.create(160, 120)
    bg.fill(7)
    bg.fillRect(0, 0, 160, 54, 13)                                  // the stage floor
    for (let x = 0; x < 160; x += 8) bg.fillRect(x, 54, 4, 2, 1)
    // speakers
    for (const sx of [30, 116]) {
        bg.fillRect(sx, 24, 14, 24, 15)
        bg.drawCircle(sx + 7, 31, 4, 11)
        bg.fillCircle(sx + 7, 42, 3, 11)
    }
    // the exit, bottom left
    bg.fillRect(0, 98, 10, 22, 5)
    bg.drawTransparentImage(textImg("יציאה", 15, 0), 12, 106)
    scene.setBackgroundImage(bg)
    const ladyA = recolor(recolor(ALONA_FRONT, 8, 3), 14, 2)
    const ladyB = ladyA.clone()                                     // mouth open
    ladyB.fillRect(5, 4, 2, 1, 2)
    const lady = mk(ladyA, SpriteKind.Enemy)
    lady.setPosition(80, 32)
    // the table in front of her
    const tbl = image.create(50, 10)
    tbl.fill(14)
    tbl.drawRect(0, 0, 50, 10, 15)
    uiSprite(tbl, 80, 44).z = 5
    const mic = mk(MIC.doubled(), SpriteKind.Food)
    mic.z = 30
    const me = mk(ALONA_RUN_A, SpriteKind.Player)
    me.setPosition(146, 100)
    me.z = 20
    // people walking across the area get in the way
    const walkers: Sprite[] = []
    for (let i = 0; i < 3; i++) {
        const w = mk(rivalLook(ALONA_RUN_A, i), SpriteKind.Enemy)
        w.setPosition(randint(10, 150), 68 + i * 15)
        w.vx = (i % 2 == 0 ? 1 : -1) * (20 + i * 8)
        walkers.push(w)
    }
    const TALK = ["איזה יום יפה היום!", "מקווה שכולם נהנים!", "מי לקחה מקום שלישי?", "את רימית!", "בלה בלה בלה!", "שימו לב! שימו לב!"]
    const talk = mk(speechImg(TALK[0]), SpriteKind.UI)
    talk.z = 60
    let line = 0
    let has = false
    let stun = 0
    let dash = 0
    let t = 0
    let won = false
    while (true) {
        t++
        const sp = stun > 0 ? 0 : 1.4
        if (stun > 0) stun--
        if (controller.left.isPressed()) me.x -= sp
        if (controller.right.isPressed()) me.x += sp
        if (controller.up.isPressed()) me.y -= sp
        if (controller.down.isPressed()) me.y += sp
        me.x = Math.max(4, Math.min(156, me.x))
        me.y = Math.max(48, Math.min(112, me.y))
        if (controller.left.isPressed()) me.setImage(flipped(ALONA_RUN_A))
        else if (controller.right.isPressed()) me.setImage(ALONA_RUN_A)
        for (const w of walkers) {
            if (w.x < -8) w.x = 168
            if (w.x > 168) w.x = -8
            if (stun == 0 && Math.abs(w.x - me.x) < 8 && Math.abs(w.y - me.y) < 10) {
                stun = 30
                sfxKnock()
                banner("אופס!", 2, 60, 400)
            }
        }
        // she never stops talking
        if (t % 80 == 0) {
            line = (line + 1) % TALK.length
            talk.setImage(speechImg(has ? "תחזירי לי את זה!" : TALK[line]))
        }
        talk.x = Math.max(talk.width / 2, Math.min(160 - talk.width / 2, lady.x))
        talk.bottom = lady.top - 1
        // her mouth moves and the speakers buzz while she talks
        const open = Math.idiv(t, 6) % 2 == 0
        lady.setImage(open ? ladyB : ladyA)
        if (open && t % 12 == 0) snd(randint(300, 600), randint(200, 500), 60)
        if (!has) {
            mic.left = lady.right - 3                    // held up to her mouth
            mic.top = lady.top + 1
            if (Math.abs(me.x - lady.x) < 14 && me.y < 60) {
                has = true
                sfxGoal()
                banner("תפסת את המיקרופון!", 5, 60, 1200)
                dash = -35                                   // she is in shock for a moment
                talk.setImage(speechImg("תחזירי לי את זה!"))
            }
        } else {
            mic.setPosition(me.x + 6, me.y - 14)
            // she runs after you, and every so often makes a quick dash
            if (dash < 0) dash++
            else {
                if (t % 110 == 0) { dash = 22; sfxSiren() }
                if (dash > 0) dash--
                stepTo(lady, me.x, me.y, dash > 0 ? 1.8 : 0.8)
            }
            if (dash >= 0 && Math.abs(lady.x - me.x) < 8 && Math.abs(lady.y - me.y) < 10) break
            if (me.x < 10 && me.y > 96) { won = true; break }
        }
        pause(16)
    }
    for (const w of walkers) w.vx = 0
    if (!won) {
        failBanner("היא תפסה אותך!")
        pause(1800)
        return false
    }
    setImageCentered(talk, textImg("...", 15, 1))
    me.setFlag(SpriteFlag.Invisible, true)
    mic.setFlag(SpriteFlag.Invisible, true)
    banner("סוף סוף שקט!", 5, 60, 2500)
    confetti(2500)
    sfxGoal()
    pause(2500)
    return true
}

// ---------------------------------------------------------------- BONUS: behind their backs
// Two big faces look around. When BOTH look away, A = the middle finger. If one looks at you - caught!

// look: 0 = straight at you, 1 left, 2 right, 3 up, 4 down
function faceImg(hair: number, look: number, dad: boolean): Image {
    const im = image.create(44, 44)
    if (!dad) im.fillRect(3, 8, 38, 30, hair)                        // her long hair
    im.fillCircle(22, 24, 17, 13)
    im.fillRect(6, 3, 32, 9, hair)
    for (const ex of [15, 29]) {
        im.fillCircle(ex, 22, 5, 1)
        im.fillCircle(ex + [0, -3, 3, 0, 0][look], 22 + [0, 0, 0, -3, 3][look], 2, 15)
    }
    if (look == 0) {                                                // looking at you: angry eyebrows
        im.drawLine(10, 13, 19, 16, 15)
        im.drawLine(25, 16, 34, 13, 15)
    }
    if (dad) im.fillRect(14, 31, 16, 3, hair)                        // mustache
    im.drawLine(17, 35, 27, 35, 2)
    return im
}
function handImg(up: boolean): Image {
    const im = image.create(20, 30)
    im.fillRect(2, 14, 16, 12, 13)                                  // the fist
    for (let x = 6; x < 18; x += 4) im.drawLine(x, 14, x, 18, 14)
    if (up) {
        im.fillRect(8, 0, 5, 15, 13)                                 // the finger
        im.drawRect(8, 0, 5, 15, 14)
        im.fillRect(9, 1, 3, 2, 1)
    }
    im.fillRect(3, 26, 14, 4, 8)                                    // Alona's sleeve
    return im
}
function sneakStage(): boolean {
    clearAll()
    scene.setBackgroundImage(bonusBg())
    const imgs: Image[][] = [[], []]
    for (let f = 0; f < 2; f++) for (let l = 0; l < 5; l++) imgs[f].push(faceImg(f == 0 ? 3 : 15, l, f == 1))
    const faces = [uiSprite(imgs[0][1], 48, 42), uiSprite(imgs[1][2], 112, 42)]
    const look = [1, 2]
    const tm = [40, 70]
    const warn = [0, 0]
    const hey = speechImg("?!")
    const bub = [uiSprite(hey, 48, 14), uiSprite(hey, 112, 14)]
    const fist = handImg(false).doubled()
    const finger = handImg(true).doubled()
    const hand = uiSprite(fist, 80, 90)
    const top = uiSprite(hud("מאחורי הגב", ""), 80, 5)
    let done = 0
    let lives = 3
    let gest = 0
    clearKeys()
    while (done < 5 && lives > 0) {
        for (let f = 0; f < 2; f++) {
            let w = warn[f], l = look[f], t = tm[f] - 1
            if (w > 0) {                                            // "?!" = about to turn to you
                w--
                if (w == 0) { l = 0; t = randint(35, 55) }
            } else if (t <= 0) {
                if (l > 0 && randint(0, 2) == 0) w = 28 - done * 3
                else { l = randint(1, 4); t = randint(30, 70) - done * 6 }
            }
            warn[f] = w; look[f] = l; tm[f] = t
            faces[f].setImage(imgs[f][l])
            bub[f].setFlag(SpriteFlag.Invisible, w == 0)
        }
        if (gest > 0 && --gest == 0) hand.setImage(fist)
        if (gest == 0 && popA()) {                                  // judged the moment you press
            gest = 25
            hand.setImage(finger)
            if (look[0] == 0 || look[1] == 0) {
                lives--
                failBanner("נתפסת!")
                scene.cameraShake(3, 250)
                pause(900)
                gest = 1
            } else {
                done++
                banner("חחח! לא ראו!", 5, 64, 700)
                snd(600, 1200, 200)
            }
            clearKeys()
        }
        top.setImage(hud("מאחורי הגב", done + "/5  חיים " + lives))
        pause(16)
    }
    if (lives == 0) {
        pause(800)
        return false
    }
    sfxGoal()
    confetti(1500)
    pause(1500)
    return true
}

// ---------------------------------------------------------------- the whole game

function playAlona() {
    alonaMedals = []
    alonaWelcome()

    const SWIM = ["חץ למעלה מיד = זינוק!", "A B A B מהר = שחייה", "מופיע חץ? למעלה = נשימה"]
    playStage(1, "שחייה", SWIM, () => raceResult("שחייה", laneRace(0)))

    const TR = ["A כשמקום 2418 במסגרת", "ואז הקומבו של ההחלפה", "מהר ובלי טעויות!"]
    playStage(2, "מעבר", TR, () => transition(0))

    const BIKE = ["A B A B מהר = דיווש", "חץ למעלה = קפיצה מעל קונוס", "תגיע לפודיום!"]
    playStage(3, "רכיבה", BIKE, () => raceResult("רכיבה", laneRace(2)))

    playStage(4, "מעבר", TR, () => transition(1))

    const RUN = ["A B A B מהר = ריצה", "נגמר הכוח? תאט קצת", "חץ למעלה ליד המים = שתייה"]
    playStage(5, "ריצה", RUN, () => raceResult("ריצה", laneRace(1)))

    const FIN = ["A B A B מהר = ריצה", "חצים = ימינה ושמאלה", "עקוף את כולם עד השער!"]
    playStage(6, "קו הסיום", FIN, finishRun)

    stageIntro(7, "בונוס!", ["A B A B מהר = ריצה", "A = סטירה", "קח את המקום הראשון!"])
    bonusStage()

    const SN = ["כשהם מסתכלים לצדדים...", "A = האצבע האמצעית! 5 פעמים", "?! = עוד רגע מסתכלים עליך"]
    playStage(8, "מאחורי הגב", SN, sneakStage)

    const MI = ["הקריינית לא מפסיקה לדבר!", "חצים = לחטוף את המיקרופון", "וברח ליציאה בלי שתתפוס!"]
    playStage(9, "בונוס: המיקרופון", MI, micStage)
    alonaFinale()
}
