
let birdCurrentSpeed=0;
const gravity=20;
const gravetyPerFrame=gravity/60;
const frames=60;
const timeBetweenFrames=1000/frames;
const distanceBetweenPipes=300;
const pipeSpeed=3;
let eventID=0;
addEventListener("load",function () {
    resetBird();
    spawnPipe();
});
addEventListener("keypress",function(e){
    if (e.code==="Space"){
        if (eventID===0) {
            eventID=setInterval(update, timeBetweenFrames);

        } else {
            birdCurrentSpeed=-1;
            birdCurrentSpeed+=10;
        }

    }
});

function update() {
    let bird=getBird();
    let y=getY(bird);
    y-=birdCurrentSpeed;
    birdCurrentSpeed=Math.min(birdCurrentSpeed,10);
    birdCurrentSpeed=Math.max(birdCurrentSpeed,-20);
    setY(bird,y);
    birdCurrentSpeed-=gravetyPerFrame;

    if (getY(bird)>window.innerHeight) {
        lose();
        return;
    }
    let lastPipePlace=0;
    let pipes=getPipes();
    for (let i = 0; i < pipes.length; i++) {
        let pipe=pipes[i];
        let x=getX(pipe);
        x-=pipeSpeed;
        lastPipePlace=Math.max(x,lastPipePlace);
        if (x<-100) {
            pipe.remove();
        } else if (collision(bird,pipe) || collision(pipe,bird)) {
            lose();
            return;
        } else {
            setX(pipe,x);
        }
    }
    lastPipePlace=window.innerWidth-lastPipePlace;
    if (lastPipePlace>=distanceBetweenPipes ) {
        spawnPipe();
    }
}
function lose() {
    let pipes=getPipes();
    for (let i = 0; i < pipes.length; i++) {
        setX(pipes[i],-200);
    }
    resetBird();
    clearInterval(eventID);
    eventID=0;
}

function resetBird() {
    let windowHeight=window.innerHeight;
    let bird=getBird();
    setY(bird,windowHeight/2);
    birdCurrentSpeed=0;
}

function getPipes() {
    return document.getElementsByClassName("pipe");
}
function spawnPipe() {
    let bovenPipe=document.createElement("div");
    let onderPipe=document.createElement("div");
    let windowHeight=window.innerHeight;
    let aboveX=randomNumber(windowHeight/4,(windowHeight/2)+(windowHeight/8));
    let ofset= 200;
    let bird=getBird();

    bovenPipe.classList.add("pipe");
    onderPipe.classList.add("pipe");

    setHeight(bovenPipe,aboveX);

    setHeight(onderPipe,windowHeight-aboveX-ofset)

    setY(onderPipe,aboveX+ofset);
    setX(onderPipe,window.innerWidth+20);
    setX(bovenPipe,window.innerWidth+20);

    bird.insertAdjacentElement("afterend",bovenPipe);
    bird.insertAdjacentElement("afterend",onderPipe);
}

function getY(element) {
    return parseInt(element.style.top);
}

function getX(element) {
    return parseInt(element.style.left);
}

function setY(element, value) {
    element.style.top = value+"px";
}
function setX(element, value) {
    element.style.left = value+"px";
}
function getHeight(element) {
    return parseInt(element.style.height) || 0;
}

function setHeight(element, value) {
    element.style.height = value + "px";
}

function getWidth(element) {
    return parseInt(element.style.width) || 0;
}

function setWidth(element, value) {
    element.style.width = value + "px";
}
function getBird() {
    return document.getElementById("bird");
}



function randomNumber(min, max) {
    return  Math.floor(Math.random() * (max - min+1)) + min;
}

function collision(element1, element2) {
    let rect1 = element1.getBoundingClientRect();
    let rect2 = element2.getBoundingClientRect();

    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}