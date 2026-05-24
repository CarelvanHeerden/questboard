from PIL import Image
import os

os.makedirs('public/sprites/icons', exist_ok=True)

P = {
    '.': (0,0,0,0), 'K': (26,18,16,255), 'W': (240,236,222,255),
    'R': (204,51,51,255), 'G': (68,170,68,255), 'B': (51,102,204,255),
    'Y': (238,187,34,255), 'O': (238,119,34,255), 'P': (153,68,187,255),
    'C': (51,187,204,255), 'N': (136,85,51,255), 'S': (136,136,136,255),
    'L': (200,200,200,255), 'D': (68,68,68,255), 'M': (238,136,170,255),
    'F': (34,136,51,255), 'T': (221,187,136,255), 'V': (85,51,34,255),
    'U': (153,204,238,255), 'Q': (255,221,0,255), 'A': (221,136,34,255),
    'J': (136,221,68,255), 'H': (255,250,238,255), 'X': (136,34,34,255),
    'E': (238,187,153,255), 'Z': (42,26,10,255),
}

def make(name, rows):
    img = Image.new('RGBA', (16,16), (0,0,0,0))
    for y, row in enumerate(rows[:16]):
        r = (row + '.'*16)[:16]
        for x, c in enumerate(r):
            if c in P:
                img.putpixel((x,y), P[c])
    img.save(f'public/sprites/icons/{name}.png')
    print(f'  {name}')

# ── CHORE ICONS ──────────────────────────────────────────────

# dishes: fork (left) + plate (right)
make('dishes', [
    '................',
    '.K.K.K.KKKKKK..',
    '.K.K.K.K....K..',
    '.KKKK..K.WW.K..',
    '..K....K....K..',
    '..K....K.WW.K..',
    '..K....K....K..',
    '..K....KKKKKK..',
    '..K............',
    '..K............',
])

# wipedown: spray bottle (vertical body, trigger, nozzle left, spray drops)
make('wipedown', [
    '.CC............',
    '.CC............',
    '....KKKKK......',
    '....KSSSSK.....',
    'KKKKS....SK....',
    '....KS...SK....',
    '....KS...SK....',
    '....KSSSSK.....',
    '....KSSSSK.....',
    '.....KKKK......',
])

# toys: colorful building blocks
make('toys', [
    '................',
    '.KKKK.KKKK.....',
    '.KRRK.KBBK.....',
    '.KRRK.KBBK.....',
    '.KKKK.KKKK.....',
    '..KKKK.........',
    '..KYYK.........',
    '..KYYK.........',
    '..KKKK.........',
    '................',
])

# feedpet: bowl with paw print above
make('feedpet', [
    '..K.K.K........',
    '...KKK.........',
    '..K...K........',
    '...KKK.........',
    '................',
    '..KKKKKKK......',
    '..K.....K......',
    '..K.....K......',
    '...KKKKK.......',
    '....KKK........',
])

# setatable: fork / knife / spoon
make('setatable', [
    '.K..K..K.......',
    '.K..K..KK......',
    '.K..K...K......',
    '.KK.K...K......',
    '..K.K...K......',
    '..K.K...K......',
    '..K.K...K......',
    '..K.K...K......',
    '..K.K..KK......',
    '..K.K.K........',
])

# makebeds: bed from side with pillow
make('makebeds', [
    '................',
    '.KKKKKKKKKKKK..',
    '.KWWWWWWWWWWK..',
    '.KWWWWWWWWWWK..',
    '.KKKKKKKKKKKK..',
    '.KTTTTTTTTTTK..',
    '.KTTTTTTTTTTK..',
    '.KTTTTTTTTTTK..',
    '.KKKKKKKKKKKK..',
    '..K..........K.',
    '..KKKKKKKKKKKK.',
])

# walkdog: paw print
make('walkdog', [
    '...KK....KK....',
    '..KNNK..KNNK...',
    '..KNNK..KNNK...',
    '...KK....KK....',
    '.KK...KK.......',
    'KNNK.KNNK......',
    'KNNK.KNNK......',
    '.KK...KK.......',
    '..KKKKKK.......',
    '..KNNNNK.......',
    '..KNNNNK.......',
    '...KKKK........',
])

# sweep: broom
make('sweep', [
    '..K............',
    '...K...........',
    '....K..........',
    '.....K.........',
    '......K........',
    '.....KKKKKK....',
    '....KTTTTTKKK..',
    '...KTTTTTTTTK..',
    '...KTTTTTTTTK..',
    '..KTTTTTTTTTK..',
    '...KKKKKKKKKK..',
])

# unloaddw: dishwasher open door with rack
make('unloaddw', [
    '.KKKKKKKKKK....',
    '.KSSSSSSSK.....',
    '.KSSSSSSSK.....',
    '.KSSSSSSSK.....',
    '.KKKKKKKKKK....',
    '.K.K.K.K..K....',
    '.KL.L.L...K....',
    '.K.K.K.K..K....',
    '.KL.L.L...K....',
    '.KKKKKKKKKK....',
])

# clearclutter: pile of boxes
make('clearclutter', [
    '....KKK........',
    '....KTTK.......',
    '...KTTTK.KK....',
    '..KTTTTK.TK....',
    '..KTTTTK.KK....',
    '..KKKKKKKK.....',
    '................',
])

# cook: pot with steam
make('cook', [
    '..C..C.........',
    '...CC..........',
    '................',
    '.K.KKKKKKK.K...',
    '.K.K.....K.K...',
    '..KKSSSSSKK....',
    '..KSSSSSSK.....',
    '..KSSSSSSK.....',
    '..KSSSSSSK.....',
    '..KKKKKKK......',
    '..K.....K......',
    '..KKKKKKK......',
])

# laundry: front-load washer
make('laundry', [
    '.KKKKKKKKKK....',
    '.KSSSSSSSK.....',
    '.KSSK.....K....',
    '.KSK.KKKK.K....',
    '.KK.KUUUUK.K...',
    '.K..KUUUUK.K...',
    '.K..KUUUUK.K...',
    '.K...KKKK..K...',
    '.KKKKKKKKKK....',
])

# catbox: litter box with paw
make('catbox', [
    '..K.K.K........',
    '...KKK.........',
    '..K...K........',
    '...KKK.........',
    '................',
    '..KKKKKKKK.....',
    '..KTTTTTTK.....',
    '..KTTTTTTK.....',
    '..KTTTTTTK.....',
    '..KKKKKKKK.....',
])

# foldlaundry: folded shirt
make('foldlaundry', [
    '................',
    '.KKK.....KKK...',
    '.KBBKKKKKBBK...',
    '.K.BBBBBBB.K...',
    '.K.BBBBBBB.K...',
    '.K.BBBBBBB.K...',
    '.K.BBBBBBB.K...',
    '.KKKKKKKKKKK...',
    '................',
])

# packlunch: paper lunch bag
make('packlunch', [
    '....KK.........',
    '...K..K........',
    '....KK.........',
    '...KTTTK.......',
    '...KTTTK.......',
    '...KTTTK.......',
    '...KT.TK.......',
    '...KTTTK.......',
    '...KTTTK.......',
    '....KKK........',
])

# wipestove: stove top with burner
make('wipestove', [
    '................',
    '.KKKKKKKKKKKK..',
    '.KSSSSSSSSSSK..',
    '.KSS.KKK.SSK...',
    '.KSS.K.K.SSK...',
    '.KSS.KKK.SSK...',
    '.KSS.K.K.SSK...',
    '.KSS.KKK.SSK...',
    '.KSSSSSSSSSSK..',
    '.KKKKKKKKKKKK..',
])

# water: watering can
make('water', [
    '...........K...',
    '..........K.K..',
    '...KKKKK..K.K..',
    '..K.....KKK....',
    '..K........K...',
    '..KTTTTTTTTK...',
    '..KTTTTTTTTK...',
    '..KTTTTTTTTK...',
    '...KKKKKKKKK...',
    '....BBBBBB.....',
])

# vacuum: upright vacuum
make('vacuum', [
    '....K..........',
    '....K..........',
    '....K..........',
    '....K.KKKKK....',
    '....KKSSSSSK...',
    '.....KSSSSSSK..',
    '.....KSSSSSSK..',
    '.....KSSSSSSK..',
    '......KKKKKK...',
    '...K.......K...',
    '...KKKKKKKKK...',
])

# mop: mop head + handle
make('mop', [
    '......K........',
    '......K........',
    '......K........',
    '......K........',
    '......K........',
    '......K........',
    '......K........',
    '....KKKKK......',
    '...K.K.K.K.....',
    '...K.K.K.K.....',
    '...K.K.K.K.....',
    '..KKKKKKKKK....',
])

# trash: trash can with lid
make('trash', [
    '...KKKKKKK.....',
    '....K...K......',
    '....KKKKK......',
    '....K...K......',
    '...KKDDDKK.....',
    '...KDDDDDDK....',
    '...KDDDDDDK....',
    '...KDDDDDDK....',
    '...KDDDDDDK....',
    '...KDDDDDDK....',
    '...KKKKKKKK....',
])

# recycling: arrow triangle symbol
make('recycling', [
    '.....GG........',
    '....GKKG.......',
    '...GKKGKG......',
    '...GKGGKKG.....',
    '....KGGGGKG....',
    '.GKK.GGGG.KKG..',
    'GKGG.GGGG.GGK..',
    'GKGGGGGGGGGKG..',
    '.GKKKKKKKKKG...',
    '..GGGGGGGGG....',
])

# groceries: shopping bag with produce
make('groceries', [
    '..K...K........',
    '.K.....K.......',
    '.KGGGGGK.......',
    '.KG.R.GK.......',
    '.KGGGGGK.......',
    '.KG.Y.GK.......',
    '.KGGGGGK.......',
    '.KGGGGGK.......',
    '..KKKKK........',
])

# dogpoop: waste bag
make('dogpoop', [
    '..KKKKKK.......',
    '.KNNNNNNK......',
    '.KNNNNNNK......',
    '.KNNNNNNK......',
    '..KKKKKK.......',
    '...K..K........',
    '...K..K........',
    '....KK.........',
    '................',
])

# bathroom: toilet
make('bathroom', [
    '...KKKKKK......',
    '...KWWWWK......',
    '...KWWWWK......',
    '...KKKKKK......',
    '..K......K.....',
    '..K......K.....',
    '..K......K.....',
    '..KK....KK.....',
    '..K......K.....',
    '..KKKKKKKK.....',
    '..K......K.....',
    '..KKKKKKKK.....',
])

# compost: bin with leaf on top
make('compost', [
    '....FF.........',
    '...FFF.........',
    '..FFFFFF.......',
    '...FFFFF.......',
    '....FKF........',
    '...KTTTK.......',
    '...KTTTK.......',
    '...KTTTK.......',
    '...KTTTK.......',
    '....KKK........',
])

# microwave: rectangle with circle window
make('microwave', [
    '.KKKKKKKKKKKK..',
    '.KSSSSSSSSSK...',
    '.KSK......SK...',
    '.KSK......SK...',
    '.KSK......SK...',
    '.KSSSSSSSSSK...',
    '.KS.K.K.K.SK...',
    '.KSSSSSSSSSK...',
    '.KKKKKKKKKKKK..',
])

# yardwork: rake
make('yardwork', [
    '....K..........',
    '....K..........',
    '....K..........',
    '....K..........',
    '....K..........',
    '....K..........',
    '....K..........',
    '...KKKKKKK.....',
    '..K.K.K.K.K....',
    '................',
])

# sheets: folded sheet stack
make('sheets', [
    '..KKKKKKKKKK...',
    '..KWWWWWWWWK...',
    '..KWWWWWWWWK...',
    '..KKKKKKKKKK...',
    '..KBBBBBBBBK...',
    '..KBBBBBBBBK...',
    '..KKKKKKKKKK...',
    '................',
])

# windows: window panes + sparkle
make('windows', [
    '.KKKKKKKKKK....',
    '.KUUKKKUUUK....',
    '.KUUKKKUUUK....',
    '.KKKKKKKKKK....',
    '.KUUKKKUUUK....',
    '.KUUKKKUUUK....',
    '.KKKKKKKKKK....',
    '......Y........',
    '.....YYY.......',
    '......Y........',
])

# bathdog: dog face in bathtub
make('bathdog', [
    '....E.CC.......',
    '...EEEK.C......',
    '..EENNEK.......',
    '..KEEK.........',
    '..KUKUKUKUK....',
    '..KUUUUUUUK....',
    '..KUUUUUUUK....',
    '..KKKKKKKKKK...',
    '.K..........K..',
    '.KKKKKKKKKKKK..',
])

# homework: paper with pencil
make('homework', [
    '.KKKKKKKKK.....',
    '.KWWWWWWWK.....',
    '.KWWWWWWWK.K...',
    '.KWWWWWWWK.YK..',
    '.KWWWWWWWK.YK..',
    '.KWWWWWWWK.YK..',
    '.KWWWWWWWK.YK..',
    '.KWWWWWWWK.TK..',
    '.KWWWWWWWK..K..',
    '.KKKKKKKKK.K...',
])

# brushteeth: toothbrush
make('brushteeth', [
    '.........KKWWK.',
    '.........KWWWK.',
    '.........KWWWK.',
    '.........KKKKK.',
    '..........K....',
    '..........K....',
    '..........K....',
    '..........K....',
    '..........K....',
    '..........K....',
    '..........K....',
    '.........KKK...',
])

# getdressed: t-shirt
make('getdressed', [
    '................',
    '.KKK.....KKK...',
    '.KBBKKKKKBBK...',
    '.K.BBBBBBB.K...',
    '.K.BBBBBBB.K...',
    '.K.BBBBBBB.K...',
    '.K.BBBBBBB.K...',
    '.K.BBBBBBB.K...',
    '.KKKKKKKKKKK...',
    '................',
])

# reading: open book
make('reading', [
    '..KKKKKKKKKK...',
    '..KWWKKKWWWK...',
    '..KWWKKKWWWK...',
    '..KWWKKKWWWK...',
    '..KWWKKKWWWK...',
    '..KWWKKKWWWK...',
    '..KWWKKKWWWK...',
    '..KKKKKKKKKK...',
    '.K..........K..',
    '.KKKKKKKKKKKK..',
])

# backpack: backpack with straps
make('backpack', [
    '...KKKKKKK.....',
    '..K.......K....',
    '..KK.....KK....',
    '..K.BBBBB.K....',
    '..K.BBBBB.K....',
    '..KKKBBBKKK....',
    '..K.BBBBB.K....',
    '..K.BBBBB.K....',
    '..K.BBBBB.K....',
    '..KKKKKKKK.....',
])

# pjamas: crescent moon + stars
make('pjamas', [
    '....Y...Y......',
    '................',
    '....KKKKK......',
    '...KY....KK....',
    '..KY......K....',
    '..KY......K....',
    '...KY....KK....',
    '....KKKKK......',
    '................',
    '...Y......Y....',
])

# tidyroom: tidy shelf unit
make('tidyroom', [
    '.KKKKKKKKKK....',
    '.K........K....',
    '.KBBK.KRRK.....',
    '.KBBK.KRRK.....',
    '.KKKKKKKKKK....',
    '.K........K....',
    '.KYYK.KNNK.....',
    '.KYYK.KNNK.....',
    '.KKKKKKKKKK....',
])

# deepclean: scrub brush with bubbles
make('deepclean', [
    '...C.....C.....',
    '....C...C......',
    '................',
    '..KKKKKKKK.....',
    '..KSSSSSSK.....',
    '..KTTTTTTK.....',
    '..KTTTTTTK.....',
    '..KKKKKKKK.....',
    '.K.K.K.K.K.....',
    '..K.K.K.K......',
])

# carwash: car silhouette with bubbles
make('carwash', [
    '....C..C.......',
    '.....CC........',
    '...KKKKKK......',
    '..KSSSSSSSK....',
    '.KSSSSSSSSSK...',
    '.KSSSSSSSSSK...',
    '..KKKKKKKKKK...',
    '..K.KKK..KKK...',
    '..KKKKKK.KKKK..',
    '................',
])

# deepvac: vacuum + sparkle stars
make('deepvac', [
    '..Y.....Y......',
    '...Y...Y.......',
    '....K..........',
    '....K..........',
    '....K..KKKKK...',
    '....KKKSSSSSK..',
    '.......SSSSSSK.',
    '.......KSSSSSK.',
    '........KKKKKK.',
    '...K.......K...',
    '...KKKKKKKKK...',
])

# oilchange: oil can with drip
make('oilchange', [
    '....KKK........',
    '....KNNNK......',
    '....KNNNK......',
    '....KKKKK......',
    '...KNNNNNK.....',
    '...KNNNNNK.....',
    '...KNNNNNK.K...',
    '...KNNNNNKK....',
    '...KKKKKK......',
    '....NNNNN......',
    '.....NNN.......',
    '......N........',
])

# gardening: trowel + sprout
make('gardening', [
    '.....F.........',
    '....FFF........',
    '...FFFFF.......',
    '....FFF........',
    '.....FK........',
    '....KTTK.......',
    '...KTTTK.......',
    '..KTTTTK.......',
    '..KTTTK........',
    '...KKK.........',
])

# organize: shelving with sorted items
make('organize', [
    '.KKKKKKKKKK....',
    '.K........K....',
    '.KTTK.KBBK.....',
    '.KTTK.KBBK.....',
    '.KKKKKKKKKK....',
    '.K........K....',
    '.KRRK.KYYK.....',
    '.KRRK.KYYK.....',
    '.KKKKKKKKKK....',
])

# donate: box with heart inside
make('donate', [
    '.....M.........',
    '....MMM........',
    '...MMMMM.......',
    '....MMM........',
    '.....M.........',
    '..KKKKKKKK.....',
    '..KTTTTTTTK....',
    '..KTTTTTTTK....',
    '...KKKKKKK.....',
])

# closetclean: clothes hanger
make('closetclean', [
    '....KK.........',
    '...K..K........',
    '...K..K........',
    '....KKK........',
    '...KKKKKKKKK...',
    '..K.........K..',
    '.K...........K.',
    '...K.......K...',
    '....KKKKKKK....',
    '................',
])

# toybox: wooden chest with star
make('toybox', [
    '..KKKKKKKKK....',
    '..KNNNNNNNK....',
    '..KNNNNNNNK....',
    '..KKKKKKKKK....',
    '..KNNN.NNNK....',
    '..KNNN.NNNK....',
    '..KNNNYNNNK....',
    '..KNNN.NNNK....',
    '..KKKKKKKKK....',
])

# ── REWARD ICONS ──────────────────────────────────────────────

# extracandy: lollipop
make('extracandy', [
    '....KKKK.......',
    '...KMMMM K.....',
    '..KMR.RMMK.....',
    '..KMRRRMMK.....',
    '..KMR.RMMK.....',
    '...KMMMMMK.....',
    '....KKKK.......',
    '.....K.........',
    '.....K.........',
    '.....KK........',
])

# screentime: glowing tablet
make('screentime', [
    '................',
    '..KKKKKKKKKK...',
    '..KUUUUUUUUK...',
    '..KUUUUUUUUK...',
    '..KU.UUUU.UK...',
    '..KUUUUUUUUK...',
    '..KUUUUUUUUK...',
    '..KKKKKKKKKK...',
    '....KKKKK......',
    '................',
])

# dessert: cake slice with cherry
make('dessert', [
    '......R........',
    '.....RRR.......',
    '......K........',
    '....KWWWK......',
    '....KWWWK......',
    '...KYYYYYK.....',
    '...KYYYYYK.....',
    '...KNNNNNK.....',
    '...KNNNNNK.....',
    '....KKKKK......',
])

# cocktails: martini glass with olive
make('cocktails', [
    '...KGGGGGGGK...',
    '....KGGGGGK....',
    '.....KGGGK.....',
    '......KGK......',
    '.......K.......',
    '.......K.......',
    '......KKK......',
    '.....KKKKK.....',
    '.....K.GK......',
    '................',
])

# choosemeal: open menu card
make('choosemeal', [
    '...KKKKKK......',
    '...KWWWWK......',
    '...KW..WK......',
    '...KW..WK......',
    '...KW..WK......',
    '...KW..WK......',
    '...KW..WK......',
    '...KWWWWK......',
    '...KKKKKK......',
    '......K........',
])

# bookshop: colorful book stack
make('bookshop', [
    '..KKKKKKKK.....',
    '..KBBBBBBK.....',
    '..KBBBBBBK.....',
    '..KKKKKKKK.....',
    '..KRRRRRRK.....',
    '..KRRRRRRK.....',
    '..KKKKKKKK.....',
    '..KYYYYYYY.....',
    '..KYYYYYYY.....',
    '..KKKKKKKKK....',
])

# latenight: crescent moon + stars
make('latenight', [
    '....Y.....Y....',
    '................',
    '....KKKKK......',
    '...KY....KK....',
    '..KY......K....',
    '..KY......K....',
    '...KY....KK....',
    '....KKKKK......',
    '................',
    '..Y.......Y....',
])

# cookwithme: chef hat
make('cookwithme', [
    '...KKKKKKK.....',
    '..KWWWWWWWK....',
    '.KWWWWWWWWWK...',
    '.KWWWWWWWWWK...',
    '.KWWWWWWWWWK...',
    '..KWWWWWWWK....',
    '..KKKKKKKK.....',
    '..KTTTTTTK.....',
    '..KKKKKKKK.....',
])

# choosemovie: clapperboard
make('choosemovie', [
    '.KKKKKKKKKK....',
    '.KDKDKDKDKK....',
    '.KKKKKKKKKK....',
    '.KWWWWWWWWK....',
    '.KWWWWWWWWK....',
    '.KWWWWWWWWK....',
    '.KWWWWWWWWK....',
    '.KWWWWWWWWK....',
    '.KKKKKKKKKK....',
])

# craft: scissors
make('craft', [
    '..K...K........',
    '...K.K.........',
    '....KK.........',
    '..KKKKKK.......',
    '..K.....K......',
    '..KK...KK......',
    '...K...K.......',
    '...KK.KK.......',
    '....K.K........',
    '...K...K.......',
])

# icecream: cone with scoop
make('icecream', [
    '...KKKKK.......',
    '..KMMMMMMK.....',
    '..KMMMMMMK.....',
    '..KMMMMMMK.....',
    '...KKKKKK......',
    '....KTTK.......',
    '....KTTK.......',
    '....KTTK.......',
    '.....KK........',
    '................',
])

# nochore: broom with red X
make('nochore', [
    '..K...R...R....',
    '...K..RR.RR....',
    '....K..RRR.....',
    '.....KKKKKK....',
    '....KTTTTTKKK..',
    '...KTTTTTTTTK..',
    '...KTTTTTTTTK..',
    '...KKKKKKKKKK..',
    '................',
])

# gamenight: two dice
make('gamenight', [
    '..KKKKK.KKKKK..',
    '..KWWWK.KWWWK..',
    '..KW.WK.K.W.K..',
    '..KWWWK.KWWWK..',
    '..K.W.K.KW.WK..',
    '..KWWWK.K.W.K..',
    '..KKKKK.KKKKK..',
    '................',
])

# hike: mountain peak
make('hike', [
    '.......K.......',
    '......KYK......',
    '.....KYYK......',
    '....KYYYYK.....',
    '...KYYYYYYK....',
    '..KYYYYYYYK....',
    '.KFFFFFFFFK....',
    '.KFFFFFFFFK....',
    '.KFFFFFFFFK....',
    '.KKKKKKKKKK....',
])

# picnic: basket + checkered cloth
make('picnic', [
    '..KKKKKKKK.....',
    '..KNNNNNNNK....',
    '..KNK...KNK....',
    '..KNNNNNNNK....',
    '..K..KKK..K....',
    '.KWRWRWRWRWK...',
    '.KWRWRWRWRWK...',
    '.KWRWRWRWRWK...',
    '.KWRWRWRWRWK...',
    '..KKKKKKKKK....',
])

# videogameday: game controller
make('videogameday', [
    '................',
    '..KKKKKKKKK....',
    '.K.........K...',
    '.K.K.RRRR..K...',
    '.KKK.R..R..K...',
    '.K.K.RRRR..K...',
    '.K...R..R..K...',
    '..K.......K....',
    '...KKKKKKK.....',
    '................',
])

# sleepover: sleeping bag under stars
make('sleepover', [
    '...Y....Y......',
    '................',
    '..KBBBBBBBK....',
    '..KBBBBBBBK....',
    '..KBB...BBK....',
    '..KBB.E.BBK....',
    '..KBB...BBK....',
    '..KBBBBBBBK....',
    '..KBBBBBBBK....',
    '...KKKKKKK.....',
])

# toyshop: gift bag with star
make('toyshop', [
    '..K...K........',
    '.K.....K.......',
    '.KPPPPPK.......',
    '.KPPYPPK.......',
    '.KPPPPPK.......',
    '.KPPYPPK.......',
    '.KPPPPPK.......',
    '..KKKKK........',
    '................',
])

# movie: popcorn bucket
make('movie', [
    '..YYYYYY.......',
    '..Y.Y.YY.......',
    '..KKKKKK.......',
    '..KRWRWK.......',
    '..KWRWRK.......',
    '..KRWRWK.......',
    '..KWRWRK.......',
    '..KRWRWK.......',
    '...KKKK........',
    '................',
])

# brunch: coffee cup with steam
make('brunch', [
    '..C.C..........',
    '...C...........',
    '..KKKKK........',
    '..KNNNK.K......',
    '..KNNNK.K......',
    '..KNNNKKK......',
    '..KNNNK........',
    '..KKKKK........',
    '.KKKKKKK.......',
    '................',
])

# arcade: classic joystick
make('arcade', [
    '....K..........',
    '...KSK.........',
    '..KSSSK........',
    '..K.S.K........',
    '..K.S.K........',
    '..K.S.K........',
    '..K.S.K........',
    '..K.S.K........',
    '.KSSSSSK.......',
    '.KKKKKKKK......',
    '..K....K.......',
    '..KKKKKK.......',
])

# spa: candle with flame
make('spa', [
    '.....O.........',
    '....OOO........',
    '.....O.K.......',
    '.....KYK.......',
    '.....KYK.......',
    '.....KYK.......',
    '...KKKKKK......',
    '...KWWWWK......',
    '...KWWWWK......',
    '...KWWWWK......',
    '...KWWWWK......',
    '....KKKK.......',
])

# dinner: wine glass + candle
make('dinner', [
    '.....O..KGGK...',
    '.....K..KGGK...',
    '.....KYK.KK....',
    '.....KYK..K....',
    '....KYYYK.K....',
    '....K...K.K....',
    '.....KKK..K....',
    '.....K....K....',
    '....KKK...K....',
    '...K...K.KK....',
])

# waterpark: water wave with sun
make('waterpark', [
    '....YYYY.......',
    '...YOYYY.......',
    '....YYYY.......',
    '................',
    '.BKBBKBBKBBK...',
    'KBBKBBKBBKBBK..',
    'KBBKBBKBBKBBK..',
    'KBBKBBKBBKBBK..',
    '.KKKKKKKKKKKK..',
    '................',
])

# camping: tent with campfire
make('camping', [
    '....K..........',
    '...KFK.........',
    '..KFFFK........',
    '.KFFFFFK.......',
    'KFFFFFFFK......',
    'KKKKKKKKKK.....',
    '......O.O......',
    '.....KOOOK.....',
    '......KKK......',
    '......NNN......',
])

print('Done! All icons generated.')
