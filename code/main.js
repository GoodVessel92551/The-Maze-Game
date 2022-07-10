import kaboom from "kaboom"


kaboom({
    background:[45,45,45]
})

loadSprite("bean", "sprites/bean.png");
loadSprite("black_hole", "sprites/black_hole.png");
loadSprite("view", "sprites/view.png");
loadSprite("moss", "sprites/moss.png");
loadSprite("lava", "sprites/lava.png");
loadSprite("brick_wall", "sprites/brick_wall.png");


const SPEED = 200
var level = 1

const LEVELS = [
    [
        "xxxxxxxxxx",
        "x!=xx===xx",
        "xx====x=xx",
        "xxxxxxx==x",
        "xx===xx=xx",
        "xx1x====xx",
        "xxxx=xx=xx",
        "x====1=xxx",
        "x=xxx=xxxx",
        "xxxxxxxxxx",
    ],
    [
        "xxxxxxxxxx",
        "x!=xx1==xx",
        "xx=xx1x=xx",
        "x1=======x",
        "xxxxxxx=xx",
        "x=======xx",
        "x==xx=xxxx",
        "x=xxx===1x",
        "x=xxx=xxxx",
        "xxxxxxxxxx",
    ],
    [
        "xxxxxxxxxx",
        "x!=xx1xxxx",
        "xx=x1=xxxx",
        "x1======1x",
        "xxxxxx=1xx",
        "xxxxxx=xxx",
        "x1==x==1xx",
        "xxx=x=xxxx",
        "x=====1xxx",
        "xxxxxxxxxx",
    ],
    [
        "xxxxxxxxxx",
        "x!=====xxx",
        "xxxxxx=xxx",
        "x1xx===xxx",
        "x=xx=xxxxx",
        "x======xxx",
        "xxx=xx=xxx",
        "xx===x=xxx",
        "x==1xx=1xx",
        "xxxxxxxxxx",
    ],
    [
      " ",  
    ],
]

scene("game", ({levelIdx}) =>{
    gravity(0)
    addLevel(LEVELS[levelIdx || 0],{
        width:64,
        height:64,
        "=": () => [
            sprite("brick_wall"),
            area(),
        ],
        "x": () => [
            sprite("moss"),
            solid(),
            area(),
        ],
        "!": () => [
            sprite("black_hole"),
            area(),
            "end",
        ],
        "1": () => [
            sprite("lava"),
            area(),
            "kill",
        ],
        
})
const player = add([
    scale(0.7),
    sprite("bean"),
    origin("center"),
    pos(64,512),
    area(),
    body()
])
const view = add([
    scale(2),
    sprite("view"),
    pos(64,512),
    origin("center"),
])
onKeyDown("left", () => {
	player.move(-SPEED, 0)
})
onKeyDown("right", () => {
	player.move(SPEED, 0)
})
onKeyDown("up", () => {
	player.move(0, -SPEED)
})
onKeyDown("down", () => {
	player.move(0, SPEED)
})
player.onUpdate(() => {
    camPos(player.pos)
    view.pos = player.pos
})
player.onCollide("kill", () => {
    wait(0.2, () => {
        die()
    })
})
const textit = add([
    fixed(),
	text("Level:"+level),
	pos(20, 20),
	])
player.onCollide("end", () => {
    if (levelIdx == 3){
        level = "You have done them all!!"
        go("game",{
            levelIdx: 4
        })
    }
    else if(levelIdx < 4){
        level += 1
        go("game",{
            levelIdx: levelIdx + 1
        })
    }else{
        
    }
})
})
function start(){
    go("game",{
        levelIdx:0,
    })
}
function die(){
    temp_level = level-1
    go("game",{
        levelIdx:temp_level,
    })
}



start()