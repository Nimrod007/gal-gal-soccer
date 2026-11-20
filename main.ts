// ============================================================
//  GAL GAL SOCCER  -  גל גל להב
//  Welcome -> Player card -> 1 Penalties -> 2 Skills -> 3 Tackle -> 4 Fight -> Champion
//  All on-screen text is Hebrew, drawn with our own pixel font (right-to-left).
//  Custom colors live in pxt.json "palette": 3 = tan skin, a/b = grays, c = gold, d = skin, e = dark brown
// ============================================================

namespace SpriteKind {
    export const Ball = SpriteKind.create()
    export const UI = SpriteKind.create()
    export const Keeper = SpriteKind.create()
}

// ---------------------------------------------------------------- Hebrew pixel font
// Each glyph is 5 wide. Rows are separated by spaces, 7 body rows.
// "U" prefix = has 2 rows going up (lamed), "D" prefix = has 2 rows going down (final letters).

const HEB_CHARS = "אבגדהוזחטיכךלמםנןסעפףצץקרשת"
const HEB_GLYPHS = [
    "#...# .#..# ..#.# ..##. .#.#. .#..# .#..#",          // א
    "####. ...#. ...#. ...#. ...#. ...#. #####",          // ב
    "###.. ..#.. ..#.. ..#.. ..##. .#.#. #..#.",          // ג
    "##### ...#. ...#. ...#. ...#. ...#. ...#.",          // ד
    "##### ....# ....# #...# #...# #...# #...#",          // ה
    ".##.. ..#.. ..#.. ..#.. ..#.. ..#.. ..#..",          // ו
    "##### ..#.. ..#.. ..#.. ..#.. ..#.. ..#..",          // ז
    "##### #...# #...# #...# #...# #...# #...#",          // ח
    "#..## #.#.# #...# #...# #...# #...# #####",          // ט
    ".##.. ..#.. ..#.. ..... ..... ..... .....",          // י
    "####. ....# ....# ....# ....# ....# ####.",          // כ
    "D##### ....# ....# ....# ....# ....# ....# ....# ....#",   // ך
    "U#.... #.... ##### ....# ....# ...#. ..#.. .#... .#...",   // ל
    "#.##. .#..# #...# #...# #...# #...# #.###",          // מ
    "##### #...# #...# #...# #...# #...# #####",          // ם
    ".##.. ...#. ...#. ...#. ...#. ...#. ####.",          // נ
    "D.##.. ..#.. ..#.. ..#.. ..#.. ..#.. ..#.. ..#.. ..#..",   // ן
    "####. #...# #...# #...# #...# #...# .###.",          // ס
    "#...# #...# .#..# ..#.# ...#. ..#.. ##...",          // ע
    "##### #...# ##..# ....# ....# ....# #####",          // פ
    "D##### #...# ##..# ....# ....# ....# ....# ....# ....#",   // ף
    "#...# #...# .#.#. ..#.. ...#. ....# #####",          // צ
    "D#...# #..#. #.#.. ##... #.... #.... #.... #.... #....",   // ץ
    "D##### ....# ....# #...# #..#. #.... #.... #.... #....",   // ק
    "####. ....# ....# ....# ....# ....# ....#",          // ר
    "#.#.# #.#.# #.#.# #.#.# #..## #...# #####",          // ש
    "##### .#..# .#..# .#..# .#..# .#..# ##..#",          // ת
]

const glyphCache: Image[] = []
function glyphImg(i: number, color: number): Image {
    const key = color * 32 + i
    while (glyphCache.length <= key) glyphCache.push(null)
    if (glyphCache[key]) return glyphCache[key]
    let src = HEB_GLYPHS[i]
    let row0 = 2
    if (src.charAt(0) == "U") { row0 = 0; src = src.substr(1) }
    else if (src.charAt(0) == "D") { src = src.substr(1) }
    const rows = src.split(" ")
    const im = image.create(5, 11)
    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < 5; x++) {
            if (rows[y].charAt(x) == "#") im.setPixel(x, row0 + y, color)
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
function bigTextImg(s: string, color: number, shadow: number): Image {
    return textImg(s, color, shadow).doubled()
}

// ---------------------------------------------------------------- photos of Gal

const PHOTO_CARD = img`
    aaaaaaaaaaaaaabdbaeea33aa3233bbbeabaab1bbbbbbb1b
    aaaaaaaaaaaaaabdbaee333aaeeebbbbeeeeeab1bbbbb11b
    aaaaaaaaaaaaaabdbaee3e3aaefebbaefffffeeaaaaaaaae
    aaaaaaaaaaaaaabdbae3333daeeaaeffffffffeeeffffffe
    aaaaaaaaaaaaaabdbad33d33bddbefffffffffffeffffffe
    aaaaaaaaaaaaaabdbbde3d33dddefffffffffffffffffffe
    aaaaaaaaaaaaaabdbbaffaaadddeffffeefeeffffffffffa
    aaaaaaaaaaaaaabdbaaaeaddbbbefffeee3eeeeeffffffeb
    aaaaaaaaaaaaaabddadddddbbbbaffe333de3eeeffffffab
    aaaaaaaaaaaaaaadbbbbbbbbbbbeffe3ddd33e33effffedd
    aaaaaaaaaaaaaaabbbdddddddddafe3333333aaaeefffabb
    aaaaaaaaaaaaaaabbbddddddddd3f33eee333ee3eefffabb
    aaaaaaaaaaaaaaabbbdbbbbbbb33e33eee33eeeeaeffebbb
    aaaaaaaaaaaaaaabbbdddddddd3333d3ee3deee3afffaddd
    aaaaaaaaaaaaaaabbbddddddddd333dd33dda3aa3fffbbbb
    aaaaaaaaaaaaaaabbbdddddddbd333ddddddddd3effa1bbb
    aaaaaaaaaaaaaaabbbdbbbbbbbbd33ddd3333dd3effbbb1b
    aaaaaaaaaaaaaaabbbddddddddddd33dddd3dd33ffabbbba
    aaaaaaaaaaaaaaabbbdddddddddbb333333333daffbbbbba
    aaaaaaaaaaaaaaabbbbbbbbbbbbbd333333333beffabbbba
    aaaaaaaaaaaaaaabbbbbbbbbbbbba333dd333baffffeb1be
    aaaaaaaaaaaaaaabbbbbbbbbbd3ff33333333beeeeaabbbe
    aaaaaaaaaaaaaaaababbbd3322ffe3333e33eebbbbbbbbbe
    aaaaaaaaaaaaaaaabbd2222222ff33333333ff23bbbbbbbe
    aaaaaaeeaaaaaaaaa2222222eeffe333333eff223bbbb1be
    aaaaaaeeaaaaaaaae2222ee222efed33333ffe2222dbbaae
    aaaaaaeaaaaaa322222ee222222ffdd3333ffe222223aaae
    aaaaeaaeaaa2222222222222222ffeddd3ffe22222223aae
    aaaaeaeeeae222222222eeeeee2efffeefff22222e222aae
    aeaaaaeeadee22222222eee222222fffffe22e2222e22aae
    aeaaaeee3d3f22222e222e22222222eee2222eee222223ae
    aaaaaee3dd3eabbaaee22222222222222222222eeeee23ae
    aaaaaeedd3abbbb1b8aee222222222222222222effe223ae
    aaaaaeaddb1111111aab8eee22222222222222effff22eae
    aaaaaaddabb11bbabbb88aeee2222222222223bafffe2eee
    aaaaeada1baeee88a1a88aeee22222222223bb11baffeeee
    aaaaeddb11b88888a1b8feae22222222222bb1dd11beeaee
    aaaead3bba888888aaa8ea1e2222222222e3d11dd11eeaee
    aaaeddeaabbbbab1a8aeeb1ee222222222eedd1dd1afaaee
    aaaaddaabbbab11beaaa81bee222222222e33ddddd33aaee
    aaaadddaaaaaab8ef81bb1bee22222222223dddddd33aaee
    aaae3d33daab118ff88bb1bee22222222233ddddddd3aaee
    aaaae3deeb1111beff8a8bafe2222222231d3333ddd3eeea
    aaaee3ddeeabbb1af88aa8eeeee222222b11b333333eeeea
    aaaeea33d3bbab1be88aafeeee222222e111bbbaeeeeeeee
    aaaeeaae3333aabbeb8eeeeeee22222eea11bbaeeeeeeaee
    aaeeaaaa33e3aaaaabaeeeeeee22222eaaea11eeeeeeeeee
    aaeeaaaeaeeeeaaeaaaeeeeee22e22eaaabaeefeeeeeeeee
    aaeaaaaaaaeeeeeeeaeeeee22eee2e3eaaeaaffeeeeeeeee
    aaeaaaaaaaaaaeaeaae2e2222222eeb1aeaafffeeeeeeeee
    aaeaaeeeeaaaeaaeaae2222e222ee22b1baeeffeeaaeeeee
    aeaaaaeeaaaaeaaeae222eeeeee2222e3b12effaeeeeeeee
    aaaaaaaaaaaaaaaeae22eeeeeee222222ee2efeaaaeeeeee
    aaaaaaaaaaaaaaeeae2eeeeeeeeee222e222efeaeeeeeeee
    aaaaaaaaaaaaaaaaaee2eeeeeeee222e2222efeaeeeeeeee
    aaaaaaaaaaaaaaaaaafe2eeeeee22ee22222efeeeeeeeeee
    abaaaeaaaaaaaaeaaeff222e2e22e222eee2eeaeeeeeeeee
    aaaaaaaaaaaaaaaaaeffee2222222222eee2feaaaaeeeeee
    aaaaaaaaaaaaaaaaafffeee2222222222222feaaaaeeeeee
    aaaaaaaaaaaaaaaaafffeeeee2222222222efaaaaeeeeeee
    aaaaaaaaaaaaaaaaaeff2eeeeee22222222eeaaaaeeeeeee
    aaaaaaaaaaaaaaaaaaaee2eeeeae2222222eeeaaaeeeeeee
    aaaaaaaaaaaaaaaaaaaa33eeeaa22222222eeaaaaaeeeeee
    aaaaaaaaaaaaaaaaaaaa33eeeaae22222223eaaaaaaaaaee
    aaaaaaaaaaaaaaaaaaaa3eeeaaae22222223eaaaaaaaaaee
    aaaaaaaaaaaaaaaaaaaa3ee3aaae222222eaaaaaaaaaaaae
    aaaaaaaaaaaaaaaaaaaa3ee3aaee22222eeaaaaaaaaaaaae
    aaaaaaaaaaaaaaaaaaaa3eeaaaea2222222aaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaeaaeaeae222222aaaaaaaeeaaaa
    aaaaaaaaaaaaaaaeaaaa1b1aeeea3222223aaaaaaaeeaaaa
    aaaaaaaaaeaaaaaeaae8aaaaeeeaa33333aaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaeaaea8888eeeaa33d333aaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaeaa88aeaaaa333333aaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaae3a8aaeaaaaa3ee33aaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaae3baaaaaaaaa33e3aaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaae3bbbbaaaaaa33e3aaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaeebabbaaaaaaa3eaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaeeabaaeaaaaa1aabaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaeeeaa8eaaaaa111baaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaeeeeeeeaaaaaaba8aaaaaaaaaaaaaa
`
const PHOTO_TROPHY = img`
    aeaaaabffeafefefefeaafeee22e222eeee3eeeeeeeeeeebbeaefeea
    3b111aaffaaefefefeeeaf3ae2e22ceeeeeeeeefeeeeeaeeaabefeaa
    ab111dfffeefeefefeeeefee222e2eeeeeeeefeefefeeeeaaefeabbb
    ebdbbaffffeeeefeffeeffeee22e2eeeeeeeeefeeeefeeeeeaabbbbb
    a3acacefeeaeeeeeeeeefffee222efeeeeeeeeefeeeefeeeea1bbbba
    eeaaaeeeeeceeeeeaeaeeeef223eefefefeeeeeeeeeeeeeaeebbaaab
    aeffeeeeeaeeeeeeeeeeeeeee22eeffefeeeeeaeeaeeeeeaeeaaabba
    daeeeeeeeeaeeeeeeeeeaeee3e22feffefeeeafeeeeaeaeeaeebaaea
    a3bbbaeeeeceececeeeeeeae22eeefeefeefaafeaaeeaeaeeaeaaabb
    aeb1baeeeaeeeeeeeceaeeeec2cefefeeee33ffa33eeaeeefaebbaae
    eaad3aeceeaececeeeeeeeaeee2fefe3eeeefe3333fedeeefeeaeaae
    eeaceaeeeceeaeeceeeaeeeceeefef3c3dc33dddd3eed3efeeeeaaaa
    aeaaacaeeeaececeaceeeeaec3efe33333ddcdcdcee3c3efefeaaaae
    eefeeaeeeeeceaeceeaeaeeaac3ee333eee233d33e3d33effeeaaaae
    feeeeeeeacaaacbacecececececeed33333e33d33dddd3efeeaaaaae
    eceeaeacaaacbbcbbcaaeaeac3c33cd2eeee33dcd2e3c33feeaaaaae
    cacccaceabdacbcbcbcececeac333dc33e3333d333eee33eeeaaaaae
    cacacaeaadbdddbddcaacaeacc3cdcdd33333ddceee33e3eeaaaaaae
    ccacaeecad1d1ddddcdcacaeccdd3ddcd3ddcddc33eeec3faaaaaaae
    cacaeeacbd1dddddcacaeacaacc3dcddddcdcddcd3333d3aeaaaaaae
    ccaceaccad1d1dddd3ceecacecdc3dcdcddcdddd3d3ddc33aeaaaaaa
    dccaeacbcbdbdddddc3eecaacac3cd3dcdcdddcddcddd332eaaaaaab
    cacaecdcea3b1ddddcceedcaecacd3c3d333dddcdddcdc3aaaeaaaaa
    cacaebcaaccdddddddc3ecacaceccd33dd32c3cdddddcd3eaaaaaaae
    ccacaacacaaccddcdc3eccaccacaccd23cdd33cdcdcdd3aaaaeaaaae
    dccaaacacacdd3cddccccdcacecc33dc233d3ddcdcdcdeaaaaaaaeae
    cbcdcaacacacc2dcc3dddccacacac3dd33232333c3d3eeaaeaaeaaae
    ccacaeadcbcdcddddddccdcaccac3cdd3dd3323cd33eaaaaaaaaaaae
    dcacacacdcadcdcdcdc3dd3eeeec33cdd32d3dd3d3eaaaaaaeaeaaae
    caccacacaecdcdcddcddcc3feecac33dddd3c3c3eeaaaaaaeaaaaeae
    bbaacaaee3cdcddcdcdcddceeecc333cdcddd3deeaaaaaaaaaeaaaae
    aaabecaecacdcdcd3ddc3dcde333d3333dcd333eaaaaaaaaeaaaeaae
    eeabeacaac3cd3dcdcddddc3f33c3c33e3333c3eaaaaaaaaaeaaaaee
    aebaeacaa3cddcddcddcc33ef333333333333d3eeaaaaaaeaaeaeaae
    eabeeacacaccddcdddcd3333f33cd3333333c3eeeaaaaeaaeaaaaaee
    ebaeeacaccd3cdddcd3e3d3ef33333333333d3eeeaaeeaeaaeaeaaae
    abaeeacacacddcdcd33333aefe3cd333c333eefeaeaeaaaeaaaaeaee
    baeeeacac3cdcdd3333edecaffee33cd33eeeeeeeaeaeaeaeaeaaaaf
    baeeecacac3dddc33da3ceaeeeffeeeeefeefeaeeeaaaaaaaaaeaeaf
    aeeeacacac3c33333a3baeeffeeefefefeeeaeeaeeeaeaeeaeaaaaee
    eeeeecacc33d3dce3d3dcfeeeeeeeeaeaeaeeaeeeaeaaaaaeaeaeaaf
    eeeacaca333c3d3eca3bcefeeeeeeeeeeeeaeeaeaeaaeaeaaaaeaeaf
    eeeecacac3c3cd2e33cbceeeeeeeeaeaeeeeafeeaeaeaeaeaeaaeaee
    eeeacacac33d3cc33cbdaeeeeeeeeeeeeaeafaeaeeaeaaeaeaeaaeaf
    eeacacac3c3cdd3c3adbcfeeeeeeaeeaeeeeaeaeaeaeeaaeaaaeaeaf
    eeecacacacd3dc3cecadaeeeeeeeeeeaeaeaeeaeeaeeaeaeaeaeaeaf
    eeacacaccd3dcd3c3cbdceeeeeeaeafaeeaeaeeaeeeaeaeaeaeaeaee
    eceacaca3dcddc3c3dcbaafeeeeeeeeeaeeaeaeeaeeeaeaeaeaeaeaf
    eacaaeaccd3ddcc3cbdccaeeeeeeaeaeeaeeeeaeeeeaeaeaeaeaeaef
    eeeeeaca3dcdcdc3ecbbcaeeeeeeeeeeeaeaaeaeeeaeeaeaeaeaeeaf
    eeeeeeaccd3ddc33ecbdbceeeeeeeaaaaeaeeaeeeeeaeaeaeaeaeaef
    acaaaca33dcdddcc33dbdaeeeeeaaaaaaaaaaeaeeeaeaeaeeaeeeeef
    caacaacac3dcdccccaddbaeeeefaafefeeaabafeeeeeaeaeeaeaeafe
    acaacaa33d3ddce3eabbaabaaeefeeaaaaefaaefeeeeeeeaeaeeaeef
    cacaacac3cdcdecacabbbdddcafeeeaccccafefeaeaeaeeeeaeeeeef
    acacace3333dc3cbcbdddddddaeeeeaccccceefeeaeeeeaeaeeaeaef
    caaacaac3333e3cbddddddddaeeeeeccccccefaeeeeaeeeaeaeeaeaf
    acacaecac3ec23cdcddd1bbaeeaeeeacccc3ffeeaeeeaaeaeeaeeaef
    cacaeacaa3cd33cbaaabbbaabaeeeeeecceefeeeeaaeaeaeaeeaeaee
    acacacacacd2deaeeaabbbbbeeeeeeeeeeeefeaeeeeaeaeeaeeeeeaf
    cacacaeacacdc3aaaaaaabbeeefffeeeeeeeefeaeeeeeaeeaeaeeeee
    acacaecacacdcccccacececccc33aefffeffaefeaeaeaeaeaeeeeefe
    cacaeacacacdd33acccaca3cddcdcdca3eeeeaeeeaeeeeaeeaeeeeff
    acacacacacacdc33d3c3e3c3ccdcddcdddddaeeaeeaeaeeaeeeaeffe
    cacacacacaeeee3eeeeeffee3ccdcddcdcdddaeeaeeaeaeeaeeefefe
    acacacacaceefffffefefeffee3cccdcdcdcdddeeeaeeaeaeeeffffe
    cbaacacacaeeeffefefeefefffee3ccdcdcdccd3aeeeaeeaaefffffa
    addcacacaaeefefefeeeeefeeffeee3ccdcdcdcdcdaeeeaeeefefffa
    ccacacacaaeeffeeeefeeeefefefffe33cccdcdc3333efeaeefefeea
    bcbcbcacceeeeeeeefeeeeeeeefeefffee333c3cdcd3effeafeffeae
    cbcacacbaeeeffeeeeeeefeefeefefeffffffee3233efeeeaefeffaa
    cacbcbcaaeeeeeeeeeeeeeeeeeefeefefeffffffeefeeeeeaeefeeae
    dcbcacbceeeefeeeeeeeeeeeeeeeefeeffefefeeeeefeeefaeeffaae
    cbcacbcaeeeeeeeeeeeeeeeeeeeeeeeeeefefefeeeeeeeefaeefffaa
    cacdcacaeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaeffeae
    dcbcbcaeeeeeeeeaeaeaeeeeeeeeeeeeefefeeeeeeeeeeeeeeaefeae
    cbcacbaeeeeeeeeeeeeeeeaeeeeeeeeeeeeeeeeeeeeeeeeeeaeefeae
    cacbccaeeeeeeeeeeeaeeeeeeeeeeeeeeeeeeaeeeeeeeeeeeeaaffea
    dcbcbcbaeefefeeaeeeeaeeeeeeeeeeeeeeeaeeaeeeeeeeeeaaeefff
    cbcacbcbbafffffeeaeeeeeeeeeeeaeeaefeaeeeeeeeeeeeeeaaffff
    dcacbcbcbeffffffeeeeeaeeaeeeeeeefffaaaeeeeeeeeeeeeaaeffe
    cbcbcbdbbeffffffffeeeeeeeeaeeaefffeaeceeeeeeeeeeeeaafffe
    dcbcbcbcbaffffffffffeeaeaeeeeeffffeacaeeeeeeeeeeeeaeffee
    dcbcbdddbafffffffffffffeeeaeefffffeaeeeceeeeeeeeeeeeffea
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
    effects.confetti.endScreenEffect()
    scene.centerCameraAt(80, 60)
}

function printCenter(bg: Image, s: string, y: number, color: number) {
    drawCenter(bg, textImg(s, color, 0), y)
}
function drawCenter(bg: Image, im: Image, y: number) {
    bg.drawTransparentImage(im, Math.floor((160 - im.width) / 2), y)
}
function ghost(s: Sprite): Sprite {
    s.setFlag(SpriteFlag.Ghost, true)
    return s
}
function uiSprite(im: Image, x: number, y: number): Sprite {
    const s = ghost(sprites.create(im, SpriteKind.UI))
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

function sfxGoal() { music.powerUp.play() }
function sfxKick() { music.thump.play() }
function sfxFail() { music.powerDown.play() }
function sfxBeep() { music.playTone(988, 40) }
function sfxWhistle() { music.baDing.play() }

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

    const runner = ghost(sprites.create(PLAYER_A, SpriteKind.Player))
    const ball = ghost(sprites.create(BALL_IMG, SpriteKind.Ball))

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
            runner.setImage(Math.idiv(c, 5) % 2 == 0 ? PLAYER_A : PLAYER_B)
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
            ball.startEffect(effects.confetti, 600)
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
    music.baDing.play()
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
    card.drawImage(PHOTO_CARD, 5, 5)
    card.drawRect(4, 4, 50, 82, 15)
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
    cs.startEffect(effects.confetti, 500)

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

const MOMENTS = [STILL_CATCH, STILL_SAVE, STILL_KICK, STILL_FLY]
const MOMENT_CAPTIONS = ["תפיסה של אלופים!", "עצירה מטורפת!", "בעיטה ענקית!", "שוער מעופף!"]
let nextMoment = 0

function showMoment() {
    clearAll()
    const i = nextMoment % MOMENTS.length
    nextMoment++
    const bg = image.create(160, 120)
    bg.fill(15)
    drawCenter(bg, textImg("הרגע הגדול", 5, 0), 1)
    drawCenter(bg, textImg(MOMENT_CAPTIONS[i], 1, 0), 108)
    scene.setBackgroundImage(bg)
    const pic = uiSprite(MOMENTS[i], 80, 60)
    // zoom in like a camera flash
    for (let k = 1; k <= 10; k++) {
        pic.scale = 0.5 + k * 0.05
        pause(20)
    }
    scene.cameraShake(2, 200)
    cheerSound()
    effects.confetti.startScreenEffect(2000)
    pause(1200)
    const pressA = uiSprite(textImg("לחץ A", 5, 15), 140, 108)
    waitA()
    effects.confetti.endScreenEffect()
}

// returns true when the stage was passed
function stageResult(label: string, got: number, outOf: number, need: number): boolean {
    pause(400)
    const passed = got >= need
    if (passed) showMoment()
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
        effects.confetti.startScreenEffect(1500)
        sfxGoal()
    } else {
        printCenter(bg, "צריך " + need + " כדי לעבור", 82, 1)
        printCenter(bg, "נסה שוב!", 94, 5)
        sfxFail()
    }
    printCenter(bg, "לחץ A", 107, 1)
    scene.setBackgroundImage(bg)
    pause(600)
    waitA()
    effects.confetti.endScreenEffect()
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

function stagePenalties(): number {
    clearAll()
    scene.setBackgroundImage(penaltyBg())
    const SHOTS = 3
    const keeper = ghost(sprites.create(KEEPER_IMG, SpriteKind.Keeper))
    const kicker = ghost(sprites.create(PLAYER_BACK, SpriteKind.Player))
    const ball = ghost(sprites.create(BALL_IMG, SpriteKind.Ball))
    const aim = uiSprite(AIM_IMG, 80, 28)
    const bar = uiSprite(powerBarImg(0), 151, 80)
    const top = uiSprite(hud("", ""), 80, 5)
    const tip = uiSprite(textImg(" ", 1, 15), 80, 112)
    ball.z = 20
    let goals = 0

    for (let shot = 1; shot <= SHOTS; shot++) {
        top.setImage(hud("פנדלים", "בעיטה " + shot + "/" + SHOTS + "  גולים " + goals))
        keeper.setImage(KEEPER_IMG)
        keeper.setPosition(80, 32)
        kicker.setPosition(80, 104)
        ball.setPosition(80, 86)
        aim.setFlag(SpriteFlag.Invisible, false)
        bar.setImage(powerBarImg(0))

        // --- aim
        tip.setImage(textImg("חצים = גובה  A = כיוון", 1, 15))
        clearKeys()
        let ax = 80
        let ay = 28
        let dir = randint(0, 1) == 0 ? -1 : 1
        const speed = 1.4 + shot * 0.3
        let t = 0
        while (!popA()) {
            t++
            ax += dir * speed
            if (ax > 114) { ax = 114; dir = -1 }
            if (ax < 46) { ax = 46; dir = 1 }
            // up / down arrows: aim high into the top corner or low along the grass
            if (controller.up.isPressed()) ay = Math.max(19, ay - 1)
            if (controller.down.isPressed()) ay = Math.min(40, ay + 1)
            aim.setPosition(ax, ay)
            keeper.x = 80 + Math.sin(t / 9) * 5
            pause(16)
        }
        sfxBeep()

        // --- power
        tip.setImage(textImg("A = כוח", 1, 15))
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
        tip.setImage(textImg(" ", 1, 15))
        aim.setFlag(SpriteFlag.Invisible, true)

        // --- run up & kick
        for (let i = 0; i < 10; i++) {
            kicker.y -= 1
            pause(20)
        }
        sfxKick()
        const over = p > 88
        const tx = ax + randint(-2, 2)
        const ty = over ? -6 : ay
        // keeper picks a side
        const diveDir = randint(-1, 1)
        const kx0 = keeper.x
        const kTarget = 80 + diveDir * 24
        if (diveDir < 0) keeper.setImage(KEEPER_DIVE)
        else if (diveDir > 0) keeper.setImage(KEEPER_DIVE_R)
        const frames = Math.max(12, Math.round(32 - p / 5))
        for (let i = 1; i <= frames; i++) {
            const f = i / frames
            ball.x = lerp(80, tx, f)
            ball.y = lerp(86, ty, f) - Math.sin(f * Math.PI) * 6
            const kf = Math.min(1, f * 1.5)
            keeper.x = lerp(kx0, kTarget, kf)
            if (diveDir != 0) keeper.y = 32 - Math.sin(kf * Math.PI) * 4
            pause(16)
        }

        // --- result: shots high in the corner are harder for the keeper to reach
        const high = ay < 25
        const reach = (diveDir == 0 ? 11 : 14) - p / 20 - (high && diveDir != 0 ? 3 : 0)
        if (over) {
            banner("מעל!", 2, 64, 1200)
            sfxFail()
        } else if (Math.abs(tx - kTarget) < reach) {
            banner("השוער עצר!", 2, 64, 1200)
            sfxFail()
            // ball bounces back out
            const bx = randint(30, 130)
            for (let i = 1; i <= 20; i++) {
                ball.x = lerp(tx, bx, i / 20)
                ball.y = lerp(ay, 70, i / 20)
                pause(16)
            }
        } else {
            goals++
            totalScore += 100
            banner("גול!", 5, 64, 1200)
            sfxGoal()
            scene.cameraShake(3, 300)
            ball.startEffect(effects.confetti, 700)
            ball.y = ay - 4
        }
        top.setImage(hud("פנדלים", "בעיטה " + shot + "/" + SHOTS + "  גולים " + goals))
        pause(1500)
    }
    return goals
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

function stageSkills(): number {
    clearAll()
    scene.setBackgroundImage(skillsBg())
    const me = ghost(sprites.create(PLAYER_A, SpriteKind.Player))
    const ball = ghost(sprites.create(BALL_IMG, SpriteKind.Ball))
    const def = ghost(sprites.create(ENEMY_A, SpriteKind.Enemy))
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
            me.setImage(Math.idiv(t, 5) % 2 == 0 ? PLAYER_A : PLAYER_B)
            def.setImage(Math.idiv(t, 5) % 2 == 0 ? ENEMY_A : ENEMY_B)
            ball.x = me.x + 9 + Math.sin(t / 4) * 2
            ball.y = Y + 5
            pause(16)
        }
        me.setImage(PLAYER_A)
        def.setImage(ENEMY_A)

        // --- combo time!
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

        if (!failed) {
            wins++
            totalScore += 100
            sfxGoal()
            banner(sk.name + "!", 5, 64, 1500)
            doSkillAnim(sk.anim, me, ball, def, Y)
            def.setImage(FALLEN_ENEMY)
            def.startEffect(effects.halo, 1200)
            // run off with the ball
            for (let i = 0; i < 50; i++) {
                me.x += 2
                me.setImage(Math.idiv(i, 4) % 2 == 0 ? PLAYER_A : PLAYER_B)
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
                def.setImage(Math.idiv(i, 4) % 2 == 0 ? ENEMY_A : ENEMY_B)
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
        me.setImage(Math.idiv(i, 4) % 2 == 0 ? PLAYER_A : PLAYER_B)
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
    const me = ghost(sprites.create(PLAYER_A, SpriteKind.Player))
    const att = ghost(sprites.create(ENEMY_A, SpriteKind.Enemy))
    const ball = ghost(sprites.create(BALL_IMG, SpriteKind.Ball))
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
        tip.setImage(textImg("תקל כשהטבעת זוהרת!", 1, 15))
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
            att.setImage(Math.idiv(t, 6) % 2 == 0 ? ENEMY_A : ENEMY_B)

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
                    tip.setImage(textImg("קום! נסה שוב", 1, 15))
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
                tip.setImage(textImg("החטאת!", 2, 15))
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
            att.startEffect(effects.halo, 1000)
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

const ME_A = pad16(PLAYER_A)
const ME_B = pad16(PLAYER_B)
const ME_PUNCH_R = punchOf(PLAYER_A)
const ME_PUNCH_L = flipped(ME_PUNCH_R)
const ME_KICK_R = kickOf(PLAYER_A)
const ME_KICK_L = flipped(ME_KICK_R)

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
        this.sp = ghost(sprites.create(this.a, SpriteKind.Enemy))
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
    const me = ghost(sprites.create(ME_A, SpriteKind.Player))
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
    } else {
        title = "נגד השופט"
        const refA = recolor(teamLook(PLAYER_A, 15), 1, 15)
        const refB = recolor(teamLook(PLAYER_B, 15), 1, 15)
        const refF = flipped(recolor(teamLook(SLIDE_IMG, 15), 1, 15))
        const ref = new Foe(refA, refB, refF, 8, 0.6, 130, 75)
        ref.thrower = true
        foes.push(ref)
    }

    const roundLabel = textImg("סיבוב " + (r + 1), 5, 0)
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
                        music.knock.play()
                        scene.cameraShake(kick ? 4 : 2, 150)
                        if (f.hp <= 0) {
                            f.sp.setImage(f.fallen)
                            f.sp.startEffect(effects.halo, 2000)
                            music.wawawawaa.play()
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
            me.setImage(moving && Math.idiv(t, 5) % 2 == 0 ? ME_B : ME_A)
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
                        music.zapped.play()
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
            f.sp.setImage(Math.idiv(t, 7) % 2 == 0 ? f.a : f.b)
            if (Math.abs(dx) < 22 && Math.abs(dy) < 10 && f.cool == 0) f.windup = 32
            // the referee throws cards at you!
            if (f.thrower) {
                f.throwT++
                if (f.throwT > 110) {
                    f.throwT = 0
                    const c = ghost(sprites.create(randint(0, 2) == 0 ? CARD_RED : CARD_YELLOW, SpriteKind.Projectile))
                    c.setPosition(f.sp.x, f.sp.y - 4)
                    const d = Math.max(1, Math.sqrt(dx * dx + dy * dy))
                    c.vx = dx / d * 55
                    c.vy = dy / d * 55
                    cards.push(c)
                    music.pewPew.play()
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
                music.zapped.play()
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
        effects.confetti.startScreenEffect(1500)
        for (let i = 0; i < 40; i++) {
            me.y += (Math.idiv(i, 10) % 2 == 0) ? -1 : 1
            pause(20)
        }
    } else {
        me.setImage(SLIDE_IMG)
        me.startEffect(effects.halo, 1500)
        banner("הפסדת!", 2, 60, 1800)
        sfxFail()
        pause(800)
    }
    pause(1000)
    effects.confetti.endScreenEffect()
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
const EXIT_HALF = 6
// small exits: [side, position]  side 0 = top, 1 = right, 2 = bottom, 3 = left
const EXITS = [[0, 52], [1, 200], [2, 270], [3, 40]]
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
        const p = e[1]
        if (e[0] == 0) { bg.fillRect(p - EXIT_HALF, 0, EXIT_HALF * 2, WALL, 5); bg.fillRect(p - 17, WALL + 2, 34, 12, 5); bg.drawTransparentImage(sign, p - 15, WALL + 2) }
        if (e[0] == 2) { bg.fillRect(p - EXIT_HALF, WORLD_H - WALL, EXIT_HALF * 2, WALL, 5); bg.fillRect(p - 17, WORLD_H - WALL - 14, 34, 12, 5); bg.drawTransparentImage(sign, p - 15, WORLD_H - WALL - 14) }
        if (e[0] == 3) { bg.fillRect(0, p - EXIT_HALF, WALL, EXIT_HALF * 2, 5); bg.fillRect(WALL + 2, p + 8, 34, 12, 5); bg.drawTransparentImage(sign, WALL + 4, p + 8) }
        if (e[0] == 1) { bg.fillRect(WORLD_W - WALL, p - EXIT_HALF, WALL, EXIT_HALF * 2, 5); bg.fillRect(WORLD_W - WALL - 36, p + 8, 34, 12, 5); bg.drawTransparentImage(sign, WORLD_W - WALL - 34, p + 8) }
    }
    return bg
}

// little map in the corner: where am I, where are the cops, where are the exits
function miniMapBase(): Image {
    const m = image.create(42, 32)
    m.fill(15)
    m.fillRect(1, 1, 40, 30, 10)
    m.fillRect(1 + FIELD_L / 8, 1 + FIELD_T / 8, (FIELD_R - FIELD_L) / 8, (FIELD_B - FIELD_T) / 8, 7)
    for (const e of EXITS) {
        const p = Math.idiv(e[1], 8) + 1
        if (e[0] == 0) m.fillRect(p - 1, 0, 3, 2, 5)
        if (e[0] == 2) m.fillRect(p - 1, 30, 3, 2, 5)
        if (e[0] == 3) m.fillRect(0, p - 1, 2, 3, 5)
        if (e[0] == 1) m.fillRect(40, p - 1, 2, 3, 5)
    }
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
    music.play(music.createSoundEffect(WaveShape.Noise, 1200, 600, 180, 0, 2500,
        SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
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
    const world = ghost(sprites.create(stadiumWorld(), SpriteKind.UI))
    world.setPosition(WORLD_W / 2, WORLD_H / 2)
    world.z = -100
    const me = ghost(sprites.create(PLAYER_A, SpriteKind.Player))
    me.z = 20
    const MIDX = (FIELD_L + FIELD_R) / 2
    const MIDY = (FIELD_T + FIELD_B) / 2
    const SPAWNS = [[FIELD_L + 6, FIELD_T + 6], [FIELD_R - 6, FIELD_T + 6], [FIELD_R - 6, FIELD_B - 6], [FIELD_L + 6, FIELD_B - 6]]
    const cops: Sprite[] = []
    const copStun: number[] = []
    for (let i = 0; i < 4; i++) {
        cops.push(ghost(sprites.create(COP_A, SpriteKind.Enemy)))
        copStun.push(0)
    }
    const guards: Sprite[] = []
    const guardP: number[] = [0, 300, 600]
    for (let i = 0; i < guardP.length; i++) {
        const g = ghost(sprites.create(COP_A, SpriteKind.Enemy))
        const p = guardPath(guardP[i])
        g.setPosition(p[0], p[1])
        guards.push(g)
    }
    // fans pouring out of the stands onto the field
    const fans: Sprite[] = []
    const fanT: number[][] = []
    for (let i = 0; i < 10; i++) {
        const f = ghost(sprites.create(recolor(FAN_IMG, 2, FAN_COLORS[i % FAN_COLORS.length]), SpriteKind.Food))
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
    music.siren.loop()
    let t = 0
    let won = false
    let inv = 0

    while (true) {
        t++
        // Gal: fast on grass and stairs, slower climbing over the seats
        const sp = zoneSpeed(me.x, me.y, 90, 90, 60)
        controller.moveSprite(me, sp, sp)
        const moving = controller.dx() != 0 || controller.dy() != 0
        me.setImage(moving && Math.idiv(t, 4) % 2 == 0 ? PLAYER_B : PLAYER_A)

        // the outer wall - you can only get out through the small exits
        let minX = WALL + 5
        let maxX = WORLD_W - WALL - 5
        let minY = WALL + 7
        let maxY = WORLD_H - WALL - 7
        for (const e of EXITS) {
            if (e[0] == 0 && Math.abs(me.x - e[1]) < EXIT_HALF) minY = -20
            if (e[0] == 2 && Math.abs(me.x - e[1]) < EXIT_HALF) maxY = WORLD_H + 20
            if (e[0] == 3 && Math.abs(me.y - e[1]) < EXIT_HALF) minX = -20
            if (e[0] == 1 && Math.abs(me.y - e[1]) < EXIT_HALF) maxX = WORLD_W + 20
        }
        me.x = Math.max(minX, Math.min(maxX, me.x))
        me.y = Math.max(minY, Math.min(maxY, me.y))
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
            c.setImage(Math.idiv(t + i * 2, 4) % 2 == 0 ? COP_A : COP_B)
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
            g.setImage(Math.idiv(t + 1, 5) % 2 == 0 ? COP_A : COP_B)
        }
        // fans run around the field and block the cops
        for (let i = 0; i < fans.length; i++) {
            const f = fans[i]
            stepTo(f, fanT[i][0], fanT[i][1], 1.3)
            if (Math.abs(f.x - fanT[i][0]) < 2 && Math.abs(f.y - fanT[i][1]) < 2) fanT[i] = randomFieldSpot()
            for (let j = 0; j < cops.length; j++) {
                if (copStun[j] == 0 && Math.abs(f.x - cops[j].x) < 7 && Math.abs(f.y - cops[j].y) < 8) {
                    copStun[j] = 40
                    cops[j].startEffect(effects.halo, 500)
                    music.knock.play()
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
                music.zapped.play()
                scene.cameraShake(3, 250)
                if (lives <= 0) break
                banner("תפסו אותך!", 2, 60, 1000)
                resetPositions()
                inv = 60
            }
        }
        pause(16)
    }

    music.stopAllSounds()
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
    effects.confetti.startScreenEffect(2500)
    for (let f = 0; f < 120; f++) {
        for (const fan of fans) fan.y += Math.sin((f + fan.x) / 3) * 1.5
        pause(20)
    }
    effects.confetti.endScreenEffect()
    showMoment()
    return true
}

// ---------------------------------------------------------------- final screen (Gal with the trophy!)

function finale() {
    clearAll()
    const bg = image.create(160, 120)
    bg.fill(8)
    for (let i = 0; i < 40; i++) bg.setPixel(randint(0, 159), randint(0, 119), 1)
    drawCenter(bg, hebrewTitleImg(5), 3)
    // photo in a gold frame on the right
    bg.fillRect(96, 28, 62, 90, 12)
    bg.drawRect(96, 28, 62, 90, 5)
    bg.drawImage(PHOTO_TROPHY, 99, 31)
    // text on the left
    const champ = bigTextImg("אלוף!", 5, 15)
    bg.drawTransparentImage(champ, 48 - champ.width / 2, 36)
    const sc = textImg("ניקוד " + totalScore, 1, 15)
    bg.drawTransparentImage(sc, 48 - sc.width / 2, 70)
    const again = textImg("A = שחק שוב", 9, 15)
    bg.drawTransparentImage(again, 48 - again.width / 2, 100)
    scene.setBackgroundImage(bg)
    effects.confetti.startScreenEffect()
    sfxGoal()
    pause(800)
    waitA()
    game.reset()
}

// ---------------------------------------------------------------- main flow

// every stage is 3 tries, you need 2 to go on
const NEED = 2

welcome()
playerCard()

const INTRO1 = ["חצים למעלה/למטה = גובה", "A = עצור כוונת, A = כוח", "חזק מדי = מעל המשקוף!"]
stageIntro(1, "פנדלים", INTRO1)
while (!stageResult("גולים", stagePenalties(), 3, NEED)) stageIntro(1, "פנדלים", INTRO1)

const INTRO2 = ["שחקן הגנה מגיע!", "לחץ על הקומבו מהר", "ותעשה טריק מגניב!"]
stageIntro(2, "טריקים", INTRO2)
while (!stageResult("טריקים", stageSkills(), 3, NEED)) stageIntro(2, "טריקים", INTRO2)

const INTRO3 = ["חצים = לזוז לכל הכיוונים", "A = תיקול גלישה", "כשהטבעת זוהרת!"]
stageIntro(3, "תיקולים", INTRO3)
while (!stageResult("תיקולים", stageTackle(), 3, NEED)) stageIntro(3, "תיקולים", INTRO3)

const INTRO4 = ["שחקן, ספסל ושופט!", "A = אגרוף  B = בעיטה", "תתחמק מהכרטיסים!"]
stageIntro(4, "קרב!", INTRO4)
while (!stageResult("נוקאאוטים", stageFight(), 3, NEED)) stageIntro(4, "קרב!", INTRO4)

const INTRO5 = ["המשטרה רודפת אחריך!", "ברח דרך היציע והמדרגות", "אל יציאה צהובה קטנה!"]
stageIntro(5, "בריחה!", INTRO5)
while (!stageEscape()) stageIntro(5, "בריחה!", INTRO5)

finale()
