import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"

kaboom({
  global: true,
  debug: true,
  background: [0,0,0,],
})
loadRoot('https://i.imgur.com/')
loadSprite('mario', 'Wb1qfhK.png')
// loadSprite('mario', 'mario.png')


scene('game', (record) => {

  gravity(2400)

  const mario = add([
    sprite('mario'),
    scale(2),
    pos(80,height()/2),
    area(),
    body(),
  ])
  
  keyPress('space', () => { 
    if (mario.grounded()) {
      mario.jump()
    }
  })
  mouseClick(() => { 
    if (mario.grounded()) {
      mario.jump()
    }
  })
  mario.collides('tree', () => {
    addKaboom(mario.pos)
    shake()
    go('lose', score, hiScore)
  })
  
  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(), 
    solid(), 
    color(141, 79, 58),
  ])
  
  function spawnTree() {
    add([
      rect(48, rand(24,64)),
      area(),    
      outline(4),
      pos(width(), height()-48),
      origin('botleft'),
      color(44, 176, 26),
      move(LEFT, 400),
      'tree',
    ])
    wait(rand(0.5, 1.5), () => {
      spawnTree()
    })
  }
  spawnTree()

  let score = 0
  const scoreLabel = add([
    text(score),
    scale(0.5),
    pos(24,24),
  ])

  let hiScore = 0
  if(record != null){
    hiScore = record
  }
  const hiScoreLabel = add([
    text(hiScore),
    scale(0.5),
    origin('topright'),
    pos(width()-24,24),
  ])

  action(() => {
    score++
    scoreLabel.text = score
    if(score > hiScore) {
      hiScore = score
      hiScoreLabel.text = hiScore
    }
  })
  
})

scene('lose', (score, hiScore) => {
  let record = hiScore
  add([
    sprite('mario'),
    pos(width() /2, height()/2-40),
    scale(6),
    origin('center')
  ])
  add([
    text(score),
    pos(width()/2, height()/2 + 80),
    scale(2),
    origin('center'),
  ])
  add([
    text(record),
    origin('topright'),
    pos(width()-24,24),
  ])
  wait(1, () => {
    keyPress('space', () => {
      go('game', record)
    })
    mouseClick(() => {
      go('game', record)
    })
  })
})

go('game')
