const game = document.querySelector(".game");
const player = game.querySelector(".player");
const monster = game.querySelector(".monster")
const health = document.querySelector("#healthfiller").style;
const health_m = document.querySelector("#healthfiller_m").style;
const player_speed = 20;
let monster_speedx = 10;
let monster_speedy = 10;
let heln = 200; 
let heln_m = 200; 
let bombLimit = 1;
let laserLimit = 5;
let x = 100;
let y = 100;
let monsterx = 400;
let monstery = 200;
let bomby=0;
let bombx=0;
document.querySelector("h5").innerHTML = laserLimit;
function fire () {
    const bomb = game.querySelector(".bomb");
    bomb.style.backgroundImage ="url(fire.gif)";
    window.setTimeout(fireF,1000);
    if ( monstery< bomby+100 && monstery > bomby-150 && monsterx< bombx+100 && monsterx >bombx-150 ) {
        healthdmg_m()
    }
    if ( y< bomby+100 && y > bomby-150 && x< bombx+100 && x >bombx-150 ) {
        healthdmg(89)
    }
}
function fireF() {
    bombLimit = 1;
    game.querySelector(".bomb").remove();
}
function laserfire () {
    game.querySelector(".laser").remove();
    document.querySelector("h5").innerHTML = laserLimit;

}
function player_move (x,y){
    player.style.left = x + "px";   
    player.style.top = y + "px";
}
player_move(x,y);

function healthdmg(z) {
    if (heln > 10) {
        heln -= z;
        health.width = heln + "px";
    } else {
        alert("Game Over!")
        window.location.reload()
    }
}
function healthdmg_m() {
    if (heln_m > 40) {
        heln_m -= 41;
        health_m.width = heln_m + "px";
    } else {
        alert("You Won!")
        window.location.reload()
    }
}

function Monstermove() {
    if ( monstery > 0 && monstery < 500) { monstery += monster_speedy} else {monstery -= monster_speedy;monster_speedy=-monster_speedy;}
    monster.style.top = monstery +"px";
    if ( monsterx > 0 && monsterx < 1150) { monsterx += monster_speedx} else {monsterx -= monster_speedx;monster_speedx=-monster_speedx;}
    monster.style.left = monsterx +"px";
    if ( monster_speedx>0 ) {monster.style.transform = "scaleX(1)"} else {monster.style.transform = "scaleX(-1)"}
    window.setTimeout(Monstermove,40)
    if ( monstery< y+50 && monstery > y-100 && monsterx< x+50 && monsterx >x-100 ) {
        healthdmg(11)
    }
}
Monstermove()

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37) {
        if(x>0) {x -= player_speed;player_move(x,y);player.style.transform = "scaleX(-1)";}

    } else if (event.keyCode == 38) {
        if(y>0) {y -= player_speed;player_move(x,y);}

    } else if (event.keyCode == 39) { 
        if (x<1200) {x += player_speed;player_move(x,y);player.style.transform = "scaleX(1)";}

    } else if (event.keyCode == 40) {
        if(y<530) {y += player_speed;player_move(x,y);}

    } else if (event.keyCode == 32) {
        if(bombLimit>0) {
            bombLimit --;
            const newBomb = document.createElement("div");
            bombx = x;
            bomby = y;
            newBomb.setAttribute("class","bomb");
            newBomb.style.left = x + "px";
            newBomb.style.top = y + "px";
            game.appendChild(newBomb);
            window.setTimeout(fire, 2000)
        }
    } else if (event.keyCode == 17) {
        if(laserLimit>0) {
            let jahat
            if(player.style.transform=="scaleX(-1)") {
                jahat = x +50 - 1300;
            } else {
                jahat = x + 50;
            } 
            const laser = document.createElement("div");
            laser.classList.add("laser");
            laser.style.top= y+50 + "px";
            laser.style.left = jahat + "px";
            game.appendChild(laser);
            window.setTimeout(laserfire, 50);
            if(monstery< y+50 && monstery > y-100 ) {healthdmg_m()}
            laserLimit--;
        }

    }
});
