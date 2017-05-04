// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var canvas_ui = document.getElementById("canvas_ui")
var ctx = canvas.getContext("2d");
var ctx_ui = canvas_ui.getContext("2d");
var dir = -10, grd = 100;
var w = canvas.width;
var h = canvas.height;
var w_ui = canvas_ui.width;
var h_ui = canvas_ui.height;
var ghostDie = -1;
var speedBasic = 2;
var speedBasicGhost = 1;
var renderFruitTime = 0;
var fruitRec = false;
var fruitPointsTimer = 0;
var timeOld = 0;
var timeLevel = 0;
var audios = {};
var volBackup = 0;
var timeBackup;
let rdm =Math.floor(Math.random()*9);
let offPacman = 2;
let mapHeight = 25;
let lifesInit = 3;
let eatPoints = 200;
let PILL_SIZE = 2;
let ghostOffX = 2;
let ghostOffY = 1;
let widthBar = 1;
let ghostInitialSpeed = 1;
let ghostColHome = 10;
let ghostRowHome = 12;
let fruitX = w/2-8;
let fruitY = h/2+28;
let volMax = 1;
let steps = 20;
let volStep = volMax/steps;


// GAME FRAMEWORK 
var GF = function () {

// variables para contar frames/s, usadas por measureFPS
    var frameCount = 0;
    var lastTime;
    var fpsContainer;
    var fps;

    //  variable global temporalmente para poder testear el ejercicio
    inputStates = {}
    //Teclas
    keys = {}

    // variación sobre test 14 (dinamico) 
    const TILE_HEIGHT = h/mapHeight;
    const TILE_WIDTH = TILE_HEIGHT;
        var numGhosts = 4;
    var ghostcolor = {};
    ghostcolor[0] = "rgba(255, 0, 0, 255)";
    ghostcolor[1] = "rgba(255, 128, 255, 255)";
    ghostcolor[2] = "rgba(128, 255, 255, 255)";
    ghostcolor[3] = "rgba(255, 128, 0,   255)";
    ghostcolor[4] = "rgba(50, 50, 255,   255)"; // blue, vulnerable ghost
    ghostcolor[5] = "rgba(255, 255, 255, 255)"; // white, flashing ghost

    // hold ghost objects
    var ghosts = {};

    var Ghost = function (id, ctx) {

        this.x = 0;
        this.y = 0;
        this.velX = 0;
        this.velY = 0;
        this.speed = speedBasicGhost;
        this.radius = TILE_WIDTH / 2 - offPacman;

        this.nearestRow = 0;
        this.nearestCol = 0;

        this.ctx = ctx;

        this.id = id;
        this.homeX = -120;
        this.homeY = -120;

        this.state = Ghost.NORMAL;

        this.draw = function (x, y) {
            // Pintar cuerpo de fantasma

            // Tu código aquí
            
            // Pintar ojos 
        
            // Tu código aquí
            
            // test12 Tu código aquí
            // Asegúrate de pintar el fantasma de un color u otro dependiendo del estado del fantasma y de thisGame.ghostTimer
            // siguiendo el enunciado

            // test13 Tu código aquí
            // El cuerpo del fantasma sólo debe dibujarse cuando el estado del mismo es distinto a Ghost.SPECTACLES

            if (ghosts[id].state == Ghost.VULNERABLE) {
                this.drawVulnerable(x, y);
            }
            else if (ghosts[id].state == Ghost.SPECTACLES) {

                ctx.fillStyle = 'rgba(255,255,255,255)';
                ctx.fillRect(x + 2 + ghostOffX, y + 1 + ghostOffY, 4, 3);
                ctx.fillRect(x + 3 + ghostOffX, y + ghostOffY, 2, 5);
                ctx.fillRect(x + 8 + ghostOffX, y + 1 + ghostOffY, 4, 3);
                ctx.fillRect(x + 9 + ghostOffX, y + ghostOffY, 2, 5);
                ctx.fillStyle = 'rgba(35,64,140,255)';
                ctx.fillRect(x + 3 + ghostOffX, y + ghostOffY, 2, 2);
                ctx.fillRect(x + 9 + ghostOffX, y + ghostOffY, 2, 2);
            }
            else {


                if (this.id == 0) {
                    ctx.fillStyle = ghostcolor[0];
                    this.drawNormal(x, y);

                }
                else if (this.id == 1) {
                    ctx.fillStyle = ghostcolor[1];
                    this.drawNormal(x, y);
                }
                else if (this.id == 2) {
                    ctx.fillStyle = ghostcolor[2];
                    this.drawNormal(x, y);
                }
                else if (this.id == 3) {
                    ctx.fillStyle = ghostcolor[3];
                    this.drawNormal(x, y);
                }
            }
        }; // draw
        
        this.drawNormal = function (x, y) {


            if (Math.floor(Date.now() / thisLevel.animationGhostTime) % 2) {
                ctx.fillRect(x + ghostOffX, y + 6 + ghostOffY, widthBar, 10);
                ctx.fillRect(x + 1 + ghostOffX, y + 3 + ghostOffY, widthBar, 14);
                ctx.fillRect(x + 2 + ghostOffX, y + 2 + ghostOffY, widthBar, 15);
                ctx.fillRect(x + 3 + ghostOffX, y + 1 + ghostOffY, widthBar, 15);
                ctx.fillRect(x + 4 + ghostOffX, y + 1 + ghostOffY, widthBar, 13);
                ctx.fillRect(x + 5 + ghostOffX, y + ghostOffY, widthBar, 16);
                ctx.fillRect(x + 6 + ghostOffX, y + ghostOffY, widthBar, 17);
                ctx.fillRect(x + 7 + ghostOffX, y + ghostOffY, widthBar, 17);
                ctx.fillRect(x + 8 + ghostOffX, y + ghostOffY, widthBar, 16);
                ctx.fillRect(x + 9 + ghostOffX, y + 1 + ghostOffY, widthBar, 13);
                ctx.fillRect(x + 10 + ghostOffX, y + 1 + ghostOffY, widthBar, 15);
                ctx.fillRect(x + 11 + ghostOffX, y + 2 + ghostOffY, widthBar, 15);
                ctx.fillRect(x + 12 + ghostOffX, y + 3 + ghostOffY, widthBar, 14);
                ctx.fillRect(x + 13 + ghostOffX, y + 6 + ghostOffY, widthBar, 10);

            }

            else {
                ctx.fillRect(x + ghostOffX, y + 6 + ghostOffY, widthBar, 11);
                ctx.fillRect(x + 1 + ghostOffX, y + 3 + ghostOffY, widthBar, 13);
                ctx.fillRect(x + 2 + ghostOffX, y + 2 + ghostOffY, widthBar, 13);
                ctx.fillRect(x + 3 + ghostOffX, y + 1 + ghostOffY, widthBar, 15);
                ctx.fillRect(x + 4 + ghostOffX, y + 1 + ghostOffY, widthBar, 16);
                ctx.fillRect(x + 5 + ghostOffX, y + ghostOffY, widthBar, 17);
                ctx.fillRect(x + 6 + ghostOffX, y + ghostOffY, widthBar, 15);
                ctx.fillRect(x + 7 + ghostOffX, y + ghostOffY, widthBar, 15);
                ctx.fillRect(x + 8 + ghostOffX, y + ghostOffY, widthBar, 17);
                ctx.fillRect(x + 9 + ghostOffX, y + 1 + ghostOffY, widthBar, 16);
                ctx.fillRect(x + 10 + ghostOffX, y + 1 + ghostOffY, widthBar, 15);
                ctx.fillRect(x + 11 + ghostOffX, y + 2 + ghostOffY, widthBar, 13);
                ctx.fillRect(x + 12 + ghostOffX, y + 3 + ghostOffY, widthBar, 13);
                ctx.fillRect(x + 13 + ghostOffX, y + 6 + ghostOffY, widthBar, 11);
            }

            if (this.velY < 0) {

                ctx.fillStyle = 'rgba(255,255,255,255)';
                ctx.fillRect(x + 2 + ghostOffX, y + 1 + ghostOffY, 4, 3);
                ctx.fillRect(x + 3 + ghostOffX, y + ghostOffY, 2, 5);
                ctx.fillRect(x + 8 + ghostOffX, y + 1 + ghostOffY, 4, 3);
                ctx.fillRect(x + 9 + ghostOffX, y + ghostOffY, 2, 5);
                ctx.fillStyle = 'rgba(35,64,140,255)';
                ctx.fillRect(x + 3 + ghostOffX, y + ghostOffY, 2, 2);
                ctx.fillRect(x + 9 + ghostOffX, y + ghostOffY, 2, 2);
            }
            else if (this.velX > 0) {

                ctx.fillStyle = 'rgba(255,255,255,255)';
                ctx.fillRect(x + 3 + ghostOffX, y + 4 + ghostOffY, 4, 3);
                ctx.fillRect(x + 4 + ghostOffX, y + 3 + ghostOffY, 2, 5);
                ctx.fillRect(x + 9 + ghostOffX, y + 4 + ghostOffY, 4, 3);
                ctx.fillRect(x + 10 + ghostOffX, y + 3 + ghostOffY, 2, 5);
                ctx.fillStyle = 'rgba(35,64,140,255)';
                ctx.fillRect(x + 5 + ghostOffX, y + 5 + ghostOffY, 2, 2);
                ctx.fillRect(x + 11 + ghostOffX, y + 5 + ghostOffY, 2, 2);
            }
            else if (this.velY > 0) {

                ctx.fillStyle = 'rgba(255,255,255,255)';
                ctx.fillRect(x + 2 + ghostOffX, y + 7 + ghostOffY, 4, 3);
                ctx.fillRect(x + 3 + ghostOffX, y + 6 + ghostOffY, 2, 5);
                ctx.fillRect(x + 8 + ghostOffX, y + 7 + ghostOffY, 4, 3);
                ctx.fillRect(x + 9 + ghostOffX, y + 6 + ghostOffY, 2, 5);
                ctx.fillStyle = 'rgba(35,64,140,255)';
                ctx.fillRect(x + 3 + ghostOffX, y + 9 + ghostOffY, 2, 2);
                ctx.fillRect(x + 9 + ghostOffX, y + 9 + ghostOffY, 2, 2);
            }
            else {
                
                ctx.fillStyle = 'rgba(255,255,255,255)';
                ctx.fillRect(x + ghostOffX, y + 4 + ghostOffY, 4, 3);
                ctx.fillRect(x + 1 + ghostOffX, y + 3 + ghostOffY, 2, 5);
                ctx.fillRect(x + 6 + ghostOffX, y + 4 + ghostOffY, 4, 3);
                ctx.fillRect(x + 7 + ghostOffX, y + 3 + ghostOffY, 2, 5);
                ctx.fillStyle = 'rgba(35,64,140,255)';
                ctx.fillRect(x + ghostOffX, y + 5 + ghostOffY, 2, 2);
                ctx.fillRect(x + 6 + ghostOffX, y + 5 + ghostOffY, 2, 2);
            }
        };

        this.drawVulnerable = function(x,y){

        if(thisGame.ghostTimer > 120){
                ctx.fillStyle = ghostcolor[4];
                if(Math.floor(Date.now() / thisLevel.animationGhostTime) %2){
                    
                    ctx.fillRect(x+ghostOffX,y+6+ghostOffY,widthBar,10);
                    ctx.fillRect(x+1+ghostOffX,y+3+ghostOffY,widthBar,14);
                    ctx.fillRect(x+2+ghostOffX,y+2+ghostOffY,widthBar,15);
                    ctx.fillRect(x+3+ghostOffX,y+1+ghostOffY,widthBar,15);
                    ctx.fillRect(x+4+ghostOffX,y+1+ghostOffY,widthBar,13);
                    ctx.fillRect(x+5+ghostOffX,y+ghostOffY,widthBar,16);
                    ctx.fillRect(x+6+ghostOffX,y+ghostOffY,widthBar,17);
                    ctx.fillRect(x+7+ghostOffX,y+ghostOffY,widthBar,17);
                    ctx.fillRect(x+8+ghostOffX,y+ghostOffY,widthBar,16);
                    ctx.fillRect(x+9+ghostOffX,y+1+ghostOffY,widthBar,13);
                    ctx.fillRect(x+10+ghostOffX,y+1+ghostOffY,widthBar,15);
                    ctx.fillRect(x+11+ghostOffX,y+2+ghostOffY,widthBar,15);
                    ctx.fillRect(x+12+ghostOffX,y+3+ghostOffY,widthBar,14);
                    ctx.fillRect(x+13+ghostOffX,y+6+ghostOffY,widthBar,10);

                }
                else{
                    
                    ctx.fillRect(x+ghostOffX,y+6+ghostOffY,widthBar,11);
                    ctx.fillRect(x+1+ghostOffX,y+3+ghostOffY,widthBar,13);
                    ctx.fillRect(x+2+ghostOffX,y+2+ghostOffY,widthBar,13);
                    ctx.fillRect(x+3+ghostOffX,y+1+ghostOffY,widthBar,15);
                    ctx.fillRect(x+4+ghostOffX,y+1+ghostOffY,widthBar,16);
                    ctx.fillRect(x+5+ghostOffX,y+ghostOffY,widthBar,17);
                    ctx.fillRect(x+6+ghostOffX,y+ghostOffY,widthBar,15);
                    ctx.fillRect(x+7+ghostOffX,y+ghostOffY,widthBar,15);
                    ctx.fillRect(x+8+ghostOffX,y+ghostOffY,widthBar,17);
                    ctx.fillRect(x+9+ghostOffX,y+1+ghostOffY,widthBar,16);
                    ctx.fillRect(x+10+ghostOffX,y+1+ghostOffY,widthBar,15);
                    ctx.fillRect(x+11+ghostOffX,y+2+ghostOffY,widthBar,13);
                    ctx.fillRect(x+12+ghostOffX,y+3+ghostOffY,widthBar,13);
                    ctx.fillRect(x+13+ghostOffX,y+6+ghostOffY,widthBar,11);
                }
                
                ctx.fillStyle = 'rgba(253,199,139,255)';
                ctx.fillRect(x+3+ghostOffX,y+4+ghostOffY,2,2);
                ctx.fillRect(x+9+ghostOffX,y+4+ghostOffY,2,2);
                ctx.fillRect(x+1+ghostOffX,y+12+ghostOffY,1,1);
                ctx.fillRect(x+2+ghostOffX,y+11+ghostOffY,2,1);
                ctx.fillRect(x+4+ghostOffX,y+12+ghostOffY,2,1);
                ctx.fillRect(x+6+ghostOffX,y+11+ghostOffY,2,1);
                ctx.fillRect(x+8+ghostOffX,y+12+ghostOffY,2,1);
                ctx.fillRect(x+10+ghostOffX,y+11+ghostOffY,2,1);
                ctx.fillRect(x+12+ghostOffX,y+12+ghostOffY,1,1);
                
        }
        else{
            if(Math.floor(Date.now() / 400) %2){
                ctx.fillStyle = ghostcolor[4];
                if(Math.floor(Date.now() / thisLevel.animationGhostTime) %2){
                    ctx.fillRect(x+ghostOffX,y+6+ghostOffY,widthBar,10);
                    
                    ctx.fillRect(x+1+ghostOffX,y+3+ghostOffY,widthBar,14);
                    ctx.fillRect(x+2+ghostOffX,y+2+ghostOffY,widthBar,15);
                    ctx.fillRect(x+3+ghostOffX,y+1+ghostOffY,widthBar,15);
                    ctx.fillRect(x+4+ghostOffX,y+1+ghostOffY,widthBar,13);
                    ctx.fillRect(x+5+ghostOffX,y+ghostOffY,widthBar,16);
                    ctx.fillRect(x+6+ghostOffX,y+ghostOffY,widthBar,17);
                    ctx.fillRect(x+7+ghostOffX,y+ghostOffY,widthBar,17);
                    ctx.fillRect(x+8+ghostOffX,y+ghostOffY,widthBar,16);
                    ctx.fillRect(x+9+ghostOffX,y+1+ghostOffY,widthBar,13);
                    ctx.fillRect(x+10+ghostOffX,y+1+ghostOffY,widthBar,15);
                    ctx.fillRect(x+11+ghostOffX,y+2+ghostOffY,widthBar,15);
                    ctx.fillRect(x+12+ghostOffX,y+3+ghostOffY,widthBar,14);
                    ctx.fillRect(x+13+ghostOffX,y+6+ghostOffY,widthBar,10);

                }
                else{
                    
                    ctx.fillRect(x+ghostOffX,y+6+ghostOffY,widthBar,11);
                    ctx.fillRect(x+1+ghostOffX,y+3+ghostOffY,widthBar,13);
                    ctx.fillRect(x+2+ghostOffX,y+2+ghostOffY,widthBar,13);
                    ctx.fillRect(x+3+ghostOffX,y+1+ghostOffY,widthBar,15);
                    ctx.fillRect(x+4+ghostOffX,y+1+ghostOffY,widthBar,16);
                    ctx.fillRect(x+5+ghostOffX,y+ghostOffY,widthBar,17);
                    ctx.fillRect(x+6+ghostOffX,y+ghostOffY,widthBar,15);
                    ctx.fillRect(x+7+ghostOffX,y+ghostOffY,widthBar,15);
                    ctx.fillRect(x+8+ghostOffX,y+ghostOffY,widthBar,17);
                    ctx.fillRect(x+9+ghostOffX,y+1+ghostOffY,widthBar,16);
                    ctx.fillRect(x+10+ghostOffX,y+1+ghostOffY,widthBar,15);
                    ctx.fillRect(x+11+ghostOffX,y+2+ghostOffY,widthBar,13);
                    ctx.fillRect(x+12+ghostOffX,y+3+ghostOffY,widthBar,13);
                    ctx.fillRect(x+13+ghostOffX,y+6+ghostOffY,widthBar,11);
                }

                
                ctx.fillStyle = 'rgba(253,199,139,255)';
                
                ctx.fillRect(x+3+ghostOffX,y+4+ghostOffY,2,2);
                ctx.fillRect(x+9+ghostOffX,y+4+ghostOffY,2,2);
                ctx.fillRect(x+1+ghostOffX,y+12+ghostOffY,1,1);
                ctx.fillRect(x+2+ghostOffX,y+11+ghostOffY,2,1);
                ctx.fillRect(x+4+ghostOffX,y+12+ghostOffY,2,1);
                ctx.fillRect(x+6+ghostOffX,y+11+ghostOffY,2,1);
                ctx.fillRect(x+8+ghostOffX,y+12+ghostOffY,2,1);
                ctx.fillRect(x+10+ghostOffX,y+11+ghostOffY,2,1);
                ctx.fillRect(x+12+ghostOffX,y+12+ghostOffY,1,1);
                    
             }
             else{
                ctx.fillStyle = ghostcolor[5];
                if(Math.floor(Date.now() / thisLevel.animationGhostTime) %2){
                    
                    ctx.fillRect(x+ghostOffX,y+6+ghostOffY,widthBar,10);
                    ctx.fillRect(x+1+ghostOffX,y+3+ghostOffY,widthBar,14);
                    ctx.fillRect(x+2+ghostOffX,y+2+ghostOffY,widthBar,15);
                    ctx.fillRect(x+3+ghostOffX,y+1+ghostOffY,widthBar,15);
                    ctx.fillRect(x+4+ghostOffX,y+1+ghostOffY,widthBar,13);
                    ctx.fillRect(x+5+ghostOffX,y+ghostOffY,widthBar,16);
                    ctx.fillRect(x+6+ghostOffX,y+ghostOffY,widthBar,17);
                    ctx.fillRect(x+7+ghostOffX,y+ghostOffY,widthBar,17);
                    ctx.fillRect(x+8+ghostOffX,y+ghostOffY,widthBar,16);
                    ctx.fillRect(x+9+ghostOffX,y+1+ghostOffY,widthBar,13);
                    ctx.fillRect(x+10+ghostOffX,y+1+ghostOffY,widthBar,15);
                    ctx.fillRect(x+11+ghostOffX,y+2+ghostOffY,widthBar,15);
                    ctx.fillRect(x+12+ghostOffX,y+3+ghostOffY,widthBar,14);
                    ctx.fillRect(x+13+ghostOffX,y+6+ghostOffY,widthBar,10);

                }
                else{
                    
                    ctx.fillRect(x+ghostOffX,y+6+ghostOffY,widthBar,11);
                    ctx.fillRect(x+1+ghostOffX,y+3+ghostOffY,widthBar,13);
                    ctx.fillRect(x+2+ghostOffX,y+2+ghostOffY,widthBar,13);
                    ctx.fillRect(x+3+ghostOffX,y+1+ghostOffY,widthBar,15);
                    ctx.fillRect(x+4+ghostOffX,y+1+ghostOffY,widthBar,16);
                    ctx.fillRect(x+5+ghostOffX,y+ghostOffY,widthBar,17);
                    ctx.fillRect(x+6+ghostOffX,y+ghostOffY,widthBar,15);
                    ctx.fillRect(x+7+ghostOffX,y+ghostOffY,widthBar,15);
                    ctx.fillRect(x+8+ghostOffX,y+ghostOffY,widthBar,17);
                    ctx.fillRect(x+9+ghostOffX,y+1+ghostOffY,widthBar,16);
                    ctx.fillRect(x+10+ghostOffX,y+1+ghostOffY,widthBar,15);
                    ctx.fillRect(x+11+ghostOffX,y+2+ghostOffY,widthBar,13);
                    ctx.fillRect(x+12+ghostOffX,y+3+ghostOffY,widthBar,13);
                    ctx.fillRect(x+13+ghostOffX,y+6+ghostOffY,widthBar,11);
                }

                
                ctx.fillStyle = 'red';
                ctx.fillRect(x+3+ghostOffX,y+4+ghostOffY,2,2);
                ctx.fillRect(x+9+ghostOffX,y+4+ghostOffY,2,2);
                ctx.fillRect(x+1+ghostOffX,y+12+ghostOffY,1,1);
                ctx.fillRect(x+2+ghostOffX,y+11+ghostOffY,2,1);
                ctx.fillRect(x+4+ghostOffX,y+12+ghostOffY,2,1);
                ctx.fillRect(x+6+ghostOffX,y+11+ghostOffY,2,1);
                ctx.fillRect(x+8+ghostOffX,y+12+ghostOffY,2,1);
                ctx.fillRect(x+10+ghostOffX,y+11+ghostOffY,2,1);
                ctx.fillRect(x+12+ghostOffX,y+12+ghostOffY,1,1);
                        
             }
                
             
                
        }


        ctx.fillRect(x+3+ghostOffX,y+4+ghostOffY,2,2);
        ctx.fillRect(x+9+ghostOffX,y+4+ghostOffY,2,2);
        ctx.fillRect(x+1+ghostOffX,y+12+ghostOffY,1,1);
        ctx.fillRect(x+2+ghostOffX,y+11+ghostOffY,2,1);
        ctx.fillRect(x+4+ghostOffX,y+12+ghostOffY,2,1);
        ctx.fillRect(x+6+ghostOffX,y+11+ghostOffY,2,1);
        ctx.fillRect(x+8+ghostOffX,y+12+ghostOffY,2,1);
        ctx.fillRect(x+10+ghostOffX,y+11+ghostOffY,2,1);
        ctx.fillRect(x+12+ghostOffX,y+12+ghostOffY,1,1);

    };

        this.setStateGhost = function (newState) {

            if (newState == Ghost.NORMAL) {
                this.state = Ghost.NORMAL;
                this.speed = speedBasicGhost;
            }
            else if (newState == Ghost.VULNERABLE) {
                this.state = Ghost.VULNERABLE;
                if (this.speed > 1) {
                    this.speed = this.speed - 1;
                }
            }
            else if (newState == Ghost.SPECTACLES) {
                this.state = Ghost.SPECTACLES;
                this.speed = +2;
            }
        };


        this.move = function (id, x, y) {


            // Tu código aquí
            //
            //
            // Test13 Tu código aquí
            // Si esl estado del fantasma es Ghost.SPECTACLES
            // Mover el fantasma lo más recto posible hacia la casilla de salida

            row = pointsToCoordsRnd(x,y)[1];
            col = pointsToCoordsRnd(x,y)[0];


            if(row % 1 == 0 && col % 1 == 0){
                possibleMoves = [[0,-1],[1,0],[0,1],[-1,0]];
                solvers = [];

                for(j = 0; j < 4; j++){
                    if(j==0){
                        if(!thisLevel.checkIfHitWall(x,y-this.speed) && ghosts[id].velY <= 0){
                            solvers.push(possibleMoves[0]);
                        }
                    }
                    else if(j==1){
                        if(!thisLevel.checkIfHitWall(x+this.speed,y) && ghosts[id].velX >= 0){
                            solvers.push(possibleMoves[1]);
                        }
                    }
                    else if(j==2){
                        if(!thisLevel.checkIfHitWall(x,y+this.speed) && ghosts[id].velY >= 0){
                            solvers.push(possibleMoves[2]);
                        }
                    }
                    else if(j==3){
                        if(!thisLevel.checkIfHitWall(x-this.speed,y) && ghosts[id].velX <= 0){
                            solvers.push(possibleMoves[3]);
                        }
                    }
                }
                
                if (solvers.length > 0) {

                    if (ghosts[id].state == Ghost.SPECTACLES) {
                        var difBestInd = [];
                        var bestDifference = Number.POSITIVE_INFINITY;
                        for (var i = 0; i < solvers.length; i++) {

                            xDiff = Math.abs((pointsToCoords(ghosts[id].x, ghosts[id].y)[0] + solvers[i][0]) - ghostColHome);
                            yDiff = Math.abs((pointsToCoords(ghosts[id].x, ghosts[id].y)[1] + solvers[i][1]) - ghostRowHome);
                            diff = xDiff + yDiff;

                            if (diff <= bestDifference) {
                                if (diff == bestDifference) {
                                    difBestInd.push(i);
                                }
                                else {
                                    difBestInd = [];
                                    difBestInd.push(i);
                                }
                                bestDifference = diff;

                            }
                        }
                        randIndex = Math.floor(Math.random() * difBestInd.length);
                        index = difBestInd[randIndex];
                        ghosts[id].velX = solvers[index][0] * ghosts[id].speed;
                        ghosts[id].velY = solvers[index][1] * ghosts[id].speed;

                        if (pointsToCoords(ghosts[id].x, ghosts[id].y)[0] == ghostColHome && pointsToCoords(ghosts[id].x, ghosts[id].y)[1] == ghostRowHome) {
                            if(audios['ghost_eaten'].playing() == false){
                                audios['ghost_eaten'].play();
                            }
                            this.setStateGhost(Ghost.NORMAL);
                        }

                    }
                    else {
                        randIndex = Math.floor(Math.random() * solvers.length);
                        ghosts[id].velX = solvers[randIndex][0] * ghosts[id].speed;
                        ghosts[id].velY = solvers[randIndex][1] * ghosts[id].speed;
                    }

                }
                else {
                    ghosts[id].velX = 0;
                    ghosts[id].velY = 0;
                }

                }

            if (ghosts[id] !== undefined) {
                ghosts[id].x = ghosts[id].x + ghosts[id].velX;
                ghosts[id].y = ghosts[id].y + ghosts[id].velY;
                thisLevel.checkIfGhostHitSomething(id, ghosts[id].x, ghosts[id].y)
            }


        }; //fin clase Ghost

        // static variables

        Ghost.NORMAL = 1;
        Ghost.VULNERABLE = 2;
        Ghost.SPECTACLES = 3;

    };

    function pointsToCoords(x,y){
        return [Math.floor(x/thisGame.TILE_WIDTH),Math.floor(y/thisGame.TILE_HEIGHT)];
    }

    function pointsToCoordsRnd(x,y){
        return [x/thisGame.TILE_WIDTH,y/thisGame.TILE_HEIGHT];
    }

    function coordToPoint(x,y){
        return [Math.floor(x*thisGame.TILE_WIDTH),Math.floor(y*thisGame.TILE_HEIGHT)];
    }



    var Level = function (ctx) {
        this.acumPointsGhost = eatPoints;
        this.ctx = ctx;
        this.lvlWidth = 0;
        this.lvlHeight = 0;
        this.map = [];
        this.pellets = 0;
        this.powerPelletBlinkTimer = 300; //valor modificado del test 14
        this.animationGhostTime = 180;
        this.homeX = -120;
        this.homeY = -120;
        this.upDoor;
        this.downDoor;
        this.leftDoor;
        this.rightDoor;



       this.setMapTile = function(row, col, newValue){
            // tu código aquí
            // test
            if (row == 16 && col == 14 && newValue == 3){
                this.map[thisGame.screenTileSize[1]*row+col]=3;
            }
            else{
                this.map.push(newValue);    
            }
            
            
            if(newValue == 4){
                this.homeX = col*thisGame.TILE_WIDTH;
                this.homeY = row*thisGame.TILE_HEIGHT;
                reset();

            }
            else if(newValue == 2 || newValue == 3){
                this.pellets++;
            }
            else if(newValue == 20 || newValue == 21){
                if(newValue == 20){
                    if(col == 0){
                        this.leftDoor = [row,col];
                    }
                    else{
                        this.rightDoor = [row,col];
                    }
                }
                else{
                    if(row == 0){
                        this.upDoor = [row,col];
                    }
                    else{
                        this.downDoor = [row,col];
                    }
                }
                
            }
            else if(newValue >= 10 && newValue <= 13){
                if(ghosts[0] !== undefined){
                    if(newValue == 10){
                    ghosts[0].homeX = coordToPoint(row,col)[1];
                    ghosts[0].homeY = coordToPoint(row,col)[0];

                    }
                    else if(newValue == 11){
                        ghosts[1].homeX = coordToPoint(row,col)[1];
                        ghosts[1].homeY = coordToPoint(row,col)[0];

                    }
                    else if(newValue == 12){
                        ghosts[2].homeX = coordToPoint(row,col)[1];
                        ghosts[2].homeY = coordToPoint(row,col)[0];
                        
                    }
                    else if(newValue == 13){
                        ghosts[3].homeX = coordToPoint(row,col)[1];
                        ghosts[3].homeY = coordToPoint(row,col)[0];
                        
                    }
                }
                

            }
        };


        this.getMapTile = function(row, col){
            // tu código aquí
            index = thisGame.screenTileSize[1]*row+col;
            return this.map[index];
        };

        this.printMap = function(){
            console.log(thisLevel.map);
        };


        this.loadLevel = function(levelNum){
            // leer res/levels/1.txt y guardarlo en el atributo map 
            // haciendo uso de setMapTile
            console.log('loadLevel - levelNum: '+levelNum);
            filasProps = 0;

            $.get({url:'res/levels/1.txt',
                success:function(data){
                    var lines = data.split("\n");
                    for (i = 0; i < thisGame.screenTileSize[0]+filasProps; i++) {
                        if(lines[i] != undefined){
                            lineStrs = lines[i].split(" "); 
                        }else{lineStrs = "";}
                        for(j = 0; j < thisGame.screenTileSize[1];j++){
                            
                            if(lineStrs[j] == "#" || lineStrs.length <= 1){
                                filasProps++;
                                break;
                            }
                            
                            thisLevel.setMapTile(i-filasProps,j,lineStrs[j]);
                        }
                    }
                },
                dataType:'text'
            });


            
        };

        this.reloadLvl = function (levelNum) {
            this.ctx = ctx;
            this.lvlWidth = 0;
            this.lvlHeight = 0;
            this.map = [];
            this.pellets = 0;


            // leer res/levels/1.txt y guardarlo en el atributo map 
            // haciendo uso de setMapTile
            console.log('loadLevel - levelNum: '+levelNum);
            filasProps = 0;

            $.get({url:'res/levels/1.txt',
                success:function(data){
                    var lines = data.split("\n");
                    for (i = 0; i < thisGame.screenTileSize[0]+filasProps; i++) {
                        if(lines[i] != undefined){
                            lineStrs = lines[i].split(" "); 
                        }else{lineStrs = "";}
                        for(j = 0; j < thisGame.screenTileSize[1];j++){
                            
                            if(lineStrs[j] == "#" || lineStrs.length <= 1){
                                filasProps++;
                                break;
                            }
                            
                            thisLevel.setMapTile(i-filasProps,j,lineStrs[j]);
                        }
                    }
                },
                dataType:'text'
            });


            
        };

        this.drawMap = function(){

            var TILE_WIDTH = thisGame.TILE_WIDTH;
            var TILE_HEIGHT = thisGame.TILE_HEIGHT;
            var tileID = {
                'door-h' : 20,
                'door-v' : 21,
                'pellet_power' : 3
            };

            // Tu código aquí

            PILL_SIZE = TILE_WIDTH/7;

            for(rowCont = 0; rowCont < thisGame.screenTileSize[0]; rowCont++){
                for(blockCont = 0; blockCont < thisGame.screenTileSize[1]; blockCont++){
                    drawBlock(rowCont, blockCont);
                }
            }
            this.drawFruit();
            this.fruitsMin();
            this.lifesMin();


        };

        this.getFruit = function(){
            switch (thisGame.getLevelNum()){
                case 1:
                    return this.fruit_cherry1_sprite;
                    break;
                case 2:
                    return this.fruit_strawberry2_sprite;
                    break;
                case 3:
                    return this.fruit_orange3_sprite;
                    break;
                case 4:
                    return this.fruit_apple4_sprite;
                    break;
                case 5:
                    return this.fruit_watermelon5_sprite;
                    break;
                case 6:
                    return this.fruit_fenix6_sprite;
                    break;
                case 7:
                    return this.fruit_bell7_sprite;
                    break;
                case 8:
                    return this.fruit_key8_sprite;

            }
        };

        this.getFruitPoints = function(){
            switch (thisGame.getLevelNum()){
                case 1:
                    return 100;
                case 2:
                    return 300;
                case 3:
                    return 500;
                case 4:
                    return 700;
                case 5:
                    return 1000;
                case 6:
                    return 2000;
                case 7:
                    return 3000;
                case 8:
                    return 5000;
                
            }
        }


        this.drawFruit = function(){
            if(fruitRec == false && thisGame.mode != thisGame.PAUSE && thisGame.mode != thisGame.WAIT_TO_CONTINUE) {
                if (timeLevel % 600 == 0 && timeLevel != 0) {
                    renderFruitTime++;
                }
                if (renderFruitTime > 0 && renderFruitTime < 500) {
                    thisLevel.getFruit().render();
                    renderFruitTime++;
                }
                else if (renderFruitTime >= 500) {
                    if (Math.floor(Date.now() / thisLevel.animationGhostTime) % 2) {
                        thisLevel.getFruit().render();
                    }
                    renderFruitTime++;
                }
                if (renderFruitTime == 600) {
                    renderFruitTime = 0;
                    timeLevel = 0;
                }
            }
            else{
                if(fruitPointsTimer > 0 && fruitPointsTimer <= 61){
                    thisLevel.fruitPoints();
                    fruitPointsTimer++;
                }
                else if (fruitPointsTimer == 62){
                    fruitPointsTimer = 0;
                }

            }

        };


        function drawBlock(fila, columna) {
            //movido de checkIfHitSomething (test12)

            var tileID = {
                'pacman': 4,
                'empty': 0,
                'pellet': 2,
                'pellet_power': 3,
                'door-h': 20,
                'door-v': 21
                
            };


            elem = thisLevel.getMapTile(fila, columna);
            elemInt = parseInt(elem);
            if (elem == tileID.empty) {
                ctx.fillStyle = 'rgba(0,0,0,0)';
                ctx.fillRect(blockCont * thisGame.TILE_WIDTH, rowCont * thisGame.TILE_WIDTH, thisGame.TILE_WIDTH, thisGame.TILE_HEIGHT);
            }
            if (elem >= 100 && elem < 200) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(blockCont * thisGame.TILE_WIDTH, rowCont * thisGame.TILE_WIDTH, thisGame.TILE_WIDTH, thisGame.TILE_HEIGHT);
            }
            else if (elem == tileID.pellet) {
                ctx.beginPath();
                ctx.arc(blockCont * thisGame.TILE_WIDTH + player.radius, rowCont * thisGame.TILE_WIDTH + player.radius, PILL_SIZE, 0, 2 * Math.PI, false);
                ctx.fillStyle = "white";
                ctx.fill();

            }
            else if (elem == tileID.pellet_power) {
                if (Math.floor(Date.now() / thisLevel.powerPelletBlinkTimer) % 2) {
                    ctx.beginPath();
                    ctx.arc(blockCont * thisGame.TILE_WIDTH + player.radius, rowCont * thisGame.TILE_WIDTH + player.radius, PILL_SIZE * 2.5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = "red";
                    ctx.fill();
                }

            }
            else if (elem == 200) {
                ctx.fillStyle = 'rgba(0,0,0,255)';
                ctx.fillRect(blockCont * thisGame.TILE_WIDTH, rowCont * thisGame.TILE_WIDTH, thisGame.TILE_WIDTH, thisGame.TILE_HEIGHT);
            }
            /*test
            else{
                ctx.fillStyle = 'rgba(255,255,255,255)';
                ctx.fillRect(blockCont * thisGame.TILE_WIDTH, rowCont * thisGame.TILE_WIDTH, thisGame.TILE_WIDTH, thisGame.TILE_HEIGHT);
            }*/



        };

        this.checkIfHitWall = function(possiblePlayerX, possiblePlayerY, row, col){
            // Tu código aquí
            // Determinar si el jugador va a moverse a una fila,columna que tiene pared 
            // Hacer uso de isWall
            var wall = false;
            var clipWidth = thisGame.TILE_WIDTH;
            var clipHeight = thisGame.TILE_HEIGHT;
            var clipLength = clipWidth * clipHeight;
            var colorList = ctx.getImageData(possiblePlayerX, possiblePlayerY, 2*player.radius, 2*player.radius);

            for (var i = 0; i < clipLength * 4; i += 4) {   
                if (colorList.data[i] == 0 && colorList.data[i+1] == 0 && colorList.data[i+2] == 255) {     
                    wall = true;
                    break;
                }
            }

            return wall;

        };

        this.checkIfHit = function (playerX, playerY, x, y, holgura, id) {

            // Tu código aquí
            
            colision = false;

            if (pointsToCoords(playerX + player.radius, playerY + player.radius)[0] == pointsToCoords(x + ghosts[id].radius, y + ghosts[id].radius)[0] && pointsToCoords(playerX + player.radius, playerY + player.radius)[1] == pointsToCoords(x + ghosts[id].radius, y + ghosts[id].radius)[1]) {
                if (ghosts[id].state == Ghost.NORMAL) {//Pacman muere
                    if(audios['die'].playing() == false){
                        audios['die'].play();
                    }
                    thisGame.setMode(thisGame.colision_GHOST);
                    thisGame.lifes--;
                    thisGame.setMode(thisGame.PACMAN_DIES);

                }
                else if (ghosts[id].state == Ghost.VULNERABLE) {//Ghost muere
                    if(audios['eat_ghost'].playing() == false){
                        audios['eat_ghost'].play();
                    }
                    ghosts[id].setStateGhost(Ghost.SPECTACLES);
                    thisGame.setMode(thisGame.PACMAN_EATS);
                    thisGame.addToScore(thisLevel.acumPointsGhost);

                }
                colision = true;
            }

            return colision;

        };


        this.checkIfHitSomething = function(x,y){

            // Tu código aquí
            //  Gestiona la recogida de píldoras
            //
            // test12 TU CÓDIGO AQUÍ
            // Gestiona la recogida de píldoras de poder
            // (cambia el estado de los fantasmas)

            if(thisLevel.rightDoor !== undefined && thisLevel.leftDoor!== undefined && thisLevel.upDoor !== undefined && thisLevel.downDoor !== undefined){
                thisLevel.collectPellets(x,y);
                thisLevel.collectFruit(x, y);
                if(x - 2*player.radius == coordToPoint(thisLevel.rightDoor[0],thisLevel.rightDoor[1])[1]){
                    destPoint = coordToPoint(thisLevel.leftDoor[0],thisLevel.leftDoor[1]);
                    player.x = destPoint[1];
                    player.y = destPoint[0];
                }
                else if(x + 2*player.radius == coordToPoint(thisLevel.leftDoor[0],thisLevel.leftDoor[1])[1]){
                    destPoint = coordToPoint(thisLevel.rightDoor[0],thisLevel.rightDoor[1]);
                    player.x = destPoint[1];
                    player.y = destPoint[0];
                }
                else if(y + 2*player.radius == coordToPoint(thisLevel.upDoor[0],thisLevel.upDoor[1])[0]){
                    destPoint = coordToPoint(thisLevel.downDoor[0],thisLevel.downDoor[1]);
                    player.x = destPoint[1];
                    player.y = destPoint[0];
                }
                else if(y - 2*player.radius == coordToPoint(thisLevel.downDoor[0],thisLevel.downDoor[1])[0]){
                    destPoint = coordToPoint(thisLevel.upDoor[0],thisLevel.upDoor[1]);
                    player.x = destPoint[1];
                    player.y = destPoint[0];
                }

            }
            

        }// end Level

        this.drawDetails = function () {
            if(thisLevel.rightDoor !== undefined){
                ctx.fillStyle = 'rgba(0,0,0,255)';
                ctx.fillRect(thisLevel.rightDoor[1] * thisGame.TILE_WIDTH + thisGame.TILE_WIDTH, thisLevel.rightDoor[0] * thisGame.TILE_HEIGHT, thisGame.TILE_WIDTH, thisGame.TILE_HEIGHT); 
            }       
        };


        this.checkIfGhostHitSomething = function(id,x,y){

            if(thisLevel.rightDoor !== undefined && thisLevel.leftDoor!== undefined && thisLevel.upDoor !== undefined && thisLevel.downDoor !== undefined){
                if(x - 2*player.radius == coordToPoint(thisLevel.rightDoor[0],thisLevel.rightDoor[1])[1]){
                    destPoint = coordToPoint(thisLevel.leftDoor[0],thisLevel.leftDoor[1]);
                    ghosts[id].x = destPoint[1];
                    ghosts[id].y = destPoint[0];
                }
                else if(x + 2*player.radius == coordToPoint(thisLevel.leftDoor[0],thisLevel.leftDoor[1])[1]){
                    destPoint = coordToPoint(thisLevel.rightDoor[0],thisLevel.rightDoor[1]);
                    ghosts[id].x = destPoint[1];
                    ghosts[id].y = destPoint[0];
                }
                else if(y + 2*player.radius == coordToPoint(thisLevel.upDoor[0],thisLevel.upDoor[1])[0]){
                    destPoint = coordToPoint(thisLevel.downDoor[0],thisLevel.downDoor[1]);
                    ghosts[id].x = destPoint[1];
                    ghosts[id].y = destPoint[0];
                }
                else if(y - 2*player.radius == coordToPoint(thisLevel.downDoor[0],thisLevel.downDoor[1])[0]){
                    destPoint = coordToPoint(thisLevel.upDoor[0],thisLevel.upDoor[1]);
                    ghosts[id].x = destPoint[1];
                    ghosts[id].y = destPoint[0];
                }

            }
        }// end Level

        this.collectFruit = function (x, y) {

            coords = pointsToCoords(x + player.radius, y + player.radius);
            if(coords[0] == 10 && coords[1] == 14 && fruitRec == false){
                if (renderFruitTime > 0){
                    audios['eat_fruit'].play();
                    fruitRec = true;
                    renderFruitTime = 0;
                    thisGame.addToScore(this.getFruitPoints());
                    thisGame.displayScore();
                    fruitPointsTimer++;
                }
            }
        };


        this.collectPellets = function (x, y) {
            coords = pointsToCoords(x + player.radius, y + player.radius);
            tile = thisLevel.getMapTile(coords[1], coords[0]);

            if (tile == '2') {
                thisLevel.mapUpdate(coords[1], coords[0], 0);
                this.pellets--;
                thisGame.addToScore(1);
                thisGame.displayScore();
                audios['eating'].play();

            }
            else if (tile == '3') {
                thisLevel.mapUpdate(coords[1], coords[0], 0);
                this.pellets--;
                for (var numFant = 0; numFant < numGhosts; numFant++) {
                    if (ghosts[numFant].state != Ghost.SPECTACLES) {
                        ghosts[numFant].setStateGhost(Ghost.VULNERABLE);
                    }
                }
                thisGame.ghostTimer = 360;
                thisGame.addToScore(50);
                thisGame.displayScore();
                audios['eat_pill'].play();
            }


        };


        this.mapUpdate = function(row,col,newValue){
            index = thisGame.screenTileSize[1]*row+col;
            this.map[index] = newValue;

        }

        this.lifesMin = function(){

            var width_ui = 24;

            switch (thisGame.loseLife()){
                case -1:
                    break;
                case 0:
                    break;
                case 1:
                    this.pacman_life_sprite.renderOverride(offPacman*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    break;
                case 2:
                    this.pacman_life_sprite.renderOverride(offPacman*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    break;
                case 3:
                    this.pacman_life_sprite.renderOverride(offPacman*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    break;
                case 4:
                    this.pacman_life_sprite.renderOverride(offPacman*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui*3,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    break;
                case 5:
                    this.pacman_life_sprite.renderOverride(offPacman*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui*3,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui*offPacman*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    break;
                default:
                    this.pacman_life_sprite.renderOverride(offPacman*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui*3,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.pacman_life_sprite.renderOverride(offPacman*2+width_ui*4,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    ctx_ui.font = "20px Consolas";
                    ctx_ui.fillStyle = 'white';
                    ctx_ui.textAlign = "center";
                    ctx_ui.fillText('x'+thisGame.loseLife(), offPacman*6+width_ui*5,h_ui-width_ui/4);
                    break;


            }
        };



        this.fruitsMin = function(){

            var width_ui = 24;

            switch (thisGame.getLevelNum()){
                case 1:
                    this.fruit_cherry1_sprite.renderOverride(w_ui-width_ui,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    break;
                case 2:
                    this.fruit_cherry1_sprite.renderOverride(w_ui-width_ui,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_strawberry2_sprite.renderOverride(w_ui-width_ui*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    break;
                case 3:
                    this.fruit_cherry1_sprite.renderOverride(w_ui-width_ui,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_strawberry2_sprite.renderOverride(w_ui-width_ui*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_orange3_sprite.renderOverride(w_ui-width_ui*3,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    break;
                case 4:
                    this.fruit_cherry1_sprite.renderOverride(w_ui-width_ui,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_strawberry2_sprite.renderOverride(w_ui-width_ui*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_orange3_sprite.renderOverride(w_ui-width_ui*3,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_apple4_sprite.renderOverride(w_ui-width_ui*4,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    break;
                case 5:
                    this.fruit_cherry1_sprite.renderOverride(w_ui-width_ui,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_strawberry2_sprite.renderOverride(w_ui-width_ui*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_orange3_sprite.renderOverride(w_ui-width_ui*3,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_apple4_sprite.renderOverride(w_ui-width_ui*4,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_watermelon5_sprite.renderOverride(w_ui-width_ui*5,h_ui-width_ui,width_ui,width_ui,ctx_ui);

                    break;
                case 6:
                    this.fruit_cherry1_sprite.renderOverride(w_ui-width_ui,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_strawberry2_sprite.renderOverride(w_ui-width_ui*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_orange3_sprite.renderOverride(w_ui-width_ui*3,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_apple4_sprite.renderOverride(w_ui-width_ui*4,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_watermelon5_sprite.renderOverride(w_ui-width_ui*5,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_fenix6_sprite.renderOverride(w_ui-width_ui*6,h_ui-width_ui,width_ui,width_ui,ctx_ui);

                    break;
                case 7:
                    this.fruit_cherry1_sprite.renderOverride(w_ui-width_ui,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_strawberry2_sprite.renderOverride(w_ui-width_ui*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_orange3_sprite.renderOverride(w_ui-width_ui*3,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_apple4_sprite.renderOverride(w_ui-width_ui*4,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_watermelon5_sprite.renderOverride(w_ui-width_ui*5,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_fenix6_sprite.renderOverride(w_ui-width_ui*6,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_bell7_sprite.renderOverride(w_ui-width_ui*7,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    break;
                case 8:
                    this.fruit_cherry1_sprite.renderOverride(w_ui-width_ui,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_strawberry2_sprite.renderOverride(w_ui-width_ui*2,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_orange3_sprite.renderOverride(w_ui-width_ui*3,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_apple4_sprite.renderOverride(w_ui-width_ui*4,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_watermelon5_sprite.renderOverride(w_ui-width_ui*5,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_fenix6_sprite.renderOverride(w_ui-width_ui*6,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_bell7_sprite.renderOverride(w_ui-width_ui*7,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    this.fruit_key8_sprite.renderOverride(w_ui-width_ui*8,h_ui-width_ui,width_ui,width_ui,ctx_ui);
                    break;
                
            }
        };

        this.eatPoints = function () {
            ctx.fillStyle = 'green';
            ctx.font = "14px Arial";
            ctx.fillText(this.acumPointsGhost, player.x - player.radius - offPacman, player.y + player.radius + offPacman);
        };

        this.fruitPoints = function () {
            ctx.fillStyle = 'green';
            ctx.font = "14px Arial";
            ctx.fillText(this.getFruitPoints(), fruitX, fruitY+player.radius+offPacman);
        };

        
        this.loadSprites = function(){
            this.ready_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 547,
                sourceY: 164,
                sourceWidth: 130,
                sourceHeight: 25,
                destinationX: w/2-81/2,
                destinationY: h/2+28,
                destinationWidth: 81,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

            this.gameover_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 462,
                sourceY: 212,
                sourceWidth: 220,
                sourceHeight: 30,
                destinationX: w/2-110/2,
                destinationY: h/2+28,
                destinationWidth: 115,
                destinationHeight: 15,
                image: resources.get('res/img/sprites.png')
            });

            this.pacman_explodes_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 664,
                sourceY: 2,
                sourceWidth: 14,
                sourceHeight: 16,
                destinationX: 0,
                destinationY: 0,
                destinationWidth: 14,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

            this.fruit_cherry1_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 488,
                sourceY: 49,
                sourceWidth: 16,
                sourceHeight: 16,
                destinationX: fruitX,
                destinationY: fruitY,
                destinationWidth: 16,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

            this.fruit_strawberry2_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 504,
                sourceY: 49,
                sourceWidth: 16,
                sourceHeight: 16,
                destinationX: fruitX,
                destinationY: fruitY,
                destinationWidth: 16,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

            this.fruit_orange3_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 520,
                sourceY: 49,
                sourceWidth: 16,
                sourceHeight: 16,
                destinationX: fruitX,
                destinationY: fruitY,
                destinationWidth: 16,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

            this.fruit_apple4_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 536,
                sourceY: 49,
                sourceWidth: 16,
                sourceHeight: 16,
                destinationX: fruitX,
                destinationY: fruitY,
                destinationWidth: 16,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

            this.fruit_watermelon5_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 552,
                sourceY: 49,
                sourceWidth: 16,
                sourceHeight: 16,
                destinationX: fruitX,
                destinationY: fruitY,
                destinationWidth: 16,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

            this.fruit_fenix6_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 568,
                sourceY: 49,
                sourceWidth: 16,
                sourceHeight: 16,
                destinationX: fruitX,
                destinationY: fruitY,
                destinationWidth: 16,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

            this.fruit_bell7_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 584,
                sourceY: 49,
                sourceWidth: 16,
                sourceHeight: 16,
                destinationX: fruitX,
                destinationY: fruitY,
                destinationWidth: 16,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

            this.fruit_key8_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 600,
                sourceY: 49,
                sourceWidth: 16,
                sourceHeight: 16,
                destinationX: fruitX,
                destinationY: fruitY,
                destinationWidth: 16,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

            this.pacman_life_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 586,
                sourceY: 16,
                sourceWidth: 16,
                sourceHeight: 16,
                destinationX: 0,
                destinationY: 0,
                destinationWidth: 16,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

            this.number_1_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 612,
                sourceY: 49,
                sourceWidth: 12,
                sourceHeight: 16,
                destinationX: w/2-offPacman,
                destinationY: h/2+28,
                destinationWidth: 14,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

            this.number_2_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 624,
                sourceY: 49,
                sourceWidth: 14,
                sourceHeight: 16,
                destinationX: w/2-offPacman,
                destinationY: h/2+28,
                destinationWidth: 14,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

            this.number_3_sprite = Sprite({
                context: canvas.getContext("2d"),
                sourceX: 638,
                sourceY: 49,
                sourceWidth: 14,
                sourceHeight: 16,
                destinationX: w/2-offPacman,
                destinationY: h/2+28,
                destinationWidth: 14,
                destinationHeight: 16,
                image: resources.get('res/img/sprites.png')
            });

        };

    }; // end Level

    var Pacman = function () {
        this.radius = TILE_WIDTH/2; //con 10 problema!
        this.x = 0;
        this.y = 0;
        this.speed = speedBasic;
        this.angle1 = 0.25;
        this.angle2 = 1.75;
    };
    Pacman.prototype.move = function() {

        // Tu código aquí
        //
        // tras actualizar this.x  y  this.y... 
         // check for collisions with other tiles (pellets, etc)

        
        if(inputStates.left){
            posssibleXIzda = player.x - player.speed;
            if(thisLevel.checkIfHitWall(posssibleXIzda,player.y,0,0) == false){ 
                player.x = player.x - player.speed; 
                thisLevel.checkIfHitSomething(player.x,player.y);
            }   
        }
        else if(inputStates.up){
            possibleYArriba = player.y - player.speed;
            if(thisLevel.checkIfHitWall(player.x,possibleYArriba ,0,0) == false){
                player.y = player.y - player.speed;
                thisLevel.checkIfHitSomething(player.x,player.y);
                

            }
        }
        else if(inputStates.right){
            posssibleXDcha = player.x + player.speed;
            if(thisLevel.checkIfHitWall(posssibleXDcha, player.y,0,0) == false){
                player.x = player.x + player.speed;
                thisLevel.checkIfHitSomething(player.x,player.y);
                
            }
        }
        else if(inputStates.down ){
            possibleYAbajo = player.y + player.speed;
            if(thisLevel.checkIfHitWall(player.x,possibleYAbajo,0,0) == false){
                player.y = player.y + player.speed;
                thisLevel.checkIfHitSomething(player.x,player.y);       
            }
        }

        for(var numFant = 0; numFant < numGhosts; numFant++){


            if(thisLevel.checkIfHit(player.x,player.y,ghosts[numFant].x,ghosts[numFant].y,0,numFant) == true){
                ghostDie = numFant;
            }
            
        }

        // ....
        // test13 Tu código aquí Si chocamos contra un fantasma y su estado es Ghost.VULNERABLE
        // cambiar velocidad del fantasma y pasarlo a modo Ghost.SPECTACLES
        //
        // test14 Tu código aquí. 
        // Si chocamos contra un fantasma cuando éste esta en estado Ghost.NORMAL --> cambiar el modo de juego a HIT_GHOST
        
    };


    // Función para pintar el Pacman
    Pacman.prototype.draw = function (x, y, grd) {

        // Pac Man
        
        // tu código aquí

        var opGr = grd/100;

        if (inputStates.right) {
            ctx.beginPath();
            ctx.arc(player.x + player.radius, player.y + player.radius, player.radius - offPacman, opGr * 0.25 * Math.PI, (2 - opGr * 0.25) * Math.PI);
            ctx.lineTo(player.x + player.radius, player.y + player.radius);
            ctx.closePath();
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }
        else if (inputStates.up) {
            ctx.beginPath();
            ctx.arc(player.x + player.radius, player.y + player.radius, player.radius - offPacman, (1.25 + (opGr-0.01) * 0.25) * Math.PI, (1.75 - (opGr-0.01)*0.25) * Math.PI, true);
            ctx.lineTo(player.x + player.radius, player.y + player.radius);
            ctx.closePath();
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }
        else if (inputStates.down) {
            ctx.beginPath();
            ctx.arc(player.x + player.radius, player.y + player.radius, player.radius - offPacman,(0.5 + (opGr+0.01)*0.25)* Math.PI, (0.5 - (opGr+0.01)*0.25) * Math.PI, false);
            ctx.lineTo(player.x + player.radius, player.y + player.radius);
            ctx.closePath();
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }
        else if (inputStates.left) {
            ctx.beginPath();
            ctx.arc(player.x + player.radius, player.y + player.radius, player.radius - offPacman,(0.75 + (opGr-0.01) * 0.25) * Math.PI, (1.25 - (opGr-0.01)*0.25) * Math.PI, true);
            ctx.lineTo(player.x + player.radius, player.y + player.radius);
            ctx.closePath();
            ctx.fillStyle = 'yellow';
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(player.x + player.radius, player.y + player.radius, player.radius - offPacman, opGr * 0.25 * Math.PI, (2 - opGr * 0.25) * Math.PI);
            ctx.lineTo(player.x + player.radius, player.y + player.radius);
            ctx.closePath();
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }


    };

    Pacman.prototype.drawRight = function (x, y,grd) {
        var opGr = grd/100;
        ctx.beginPath();
        ctx.arc(x + this.radius, y + this.radius, this.radius - offPacman, opGr * 0.25 * Math.PI, (2 - opGr * 0.25) * Math.PI);
        ctx.lineTo(x + this.radius, this.y + this.radius);
        ctx.closePath();
        ctx.fillStyle = 'yellow';
        ctx.fill();
    };

    Pacman.prototype.drawLeft = function (x, y,grd) {
        var opGr = grd/100;
        ctx.beginPath();
        ctx.arc(x + this.radius, y + this.radius, this.radius - offPacman,(0.75 + (opGr-0.01) * 0.25) * Math.PI, (1.25 - (opGr-0.01)*0.25) * Math.PI, true);
        ctx.lineTo(x + this.radius, y + this.radius);
        ctx.closePath();
        ctx.fillStyle = 'yellow';
        ctx.fill();
    };


    Pacman.prototype.drawDead = function (x,y,grd) {

        if (inputStates.right) {
            ctx.beginPath();
            ctx.arc(player.x + player.radius, player.y + player.radius, player.radius - offPacman,
                grd * Math.PI, (2 - grd) * Math.PI);
            ctx.lineTo(player.x + player.radius, player.y + player.radius);
            ctx.closePath();
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }
        else if (inputStates.up) {
            ctx.beginPath();
            ctx.arc(player.x + player.radius, player.y + player.radius, player.radius - offPacman,
                (1.25 - grd*.75)  * Math.PI, (1.75+grd*.75)  * Math.PI, true);
            ctx.lineTo(player.x + player.radius, player.y + player.radius);
            ctx.closePath();
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }
        else if (inputStates.down) {
            ctx.beginPath();
            ctx.arc(player.x + player.radius, player.y + player.radius, player.radius - offPacman,
                (0.5 + grd)* Math.PI, (0.5 - grd) * Math.PI, false);
            ctx.lineTo(player.x + player.radius, player.y + player.radius);
            ctx.closePath();
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }
        else if (inputStates.left) {
            ctx.beginPath();
            ctx.arc(player.x + player.radius, player.y + player.radius, player.radius - offPacman,
                (0.75 - grd*.75) * Math.PI, (1.25 + grd*.75) * Math.PI, true);
            ctx.lineTo(player.x + player.radius, player.y + player.radius);
            ctx.closePath();
            ctx.fillStyle = 'yellow';
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(player.x + player.radius, player.y + player.radius, player.radius - offPacman,
                (1.25 - grd*.75)  * Math.PI, (1.75+grd*.75)  * Math.PI, true);
            ctx.lineTo(player.x + player.radius, player.y + player.radius);
            ctx.closePath();
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }

    }//End Pacman

    var player = new Pacman();
    for (var i = 0; i < numGhosts; i++) {
        ghosts[i] = new Ghost(i, canvas.getContext("2d"));

    }


    var thisGame = {
        getLevelNum: function () {
            return rdm;
        },
        setMode: function (mode) {
            this.mode = mode;
            this.modeTimer = 0;
        },
        loseLife:function(){
          return this.lifes;
        },
        addToScore: function (points) {
            this.points += points;
            if (thisLevel.pellets == 0) {
                this.setMode(this.WIN);
            }
        },
        displayScore: function () {

            $('p.score').html(this.points);
            if (this.points > this.highscore) {
                this.highscore = this.points;
                var localpoints = localStorage.getItem("high"); 
                if (this.highscore > localpoints){
                    $('p.highscore').html(this.points);
                    localStorage.setItem("high", this.points); 
                }
                else{
                    $('p.highscore').html(localpoints);
                }
                
                
            }
        },

        screenTileSize: [25, 21],
        TILE_WIDTH: TILE_WIDTH,
        TILE_HEIGHT: TILE_HEIGHT,
        ghostTimer: 0,
        NORMAL: 1,
        HIT_GHOST: 2,
        GAME_OVER: 3,
        WAIT_TO_START: 4,
        PACMAN_EATS: 5,
        PACMAN_DIES:6,
        HIGHSCORE:7,
        PAUSE:8,
        WAIT_TO_CONTINUE:9,
        WIN:10,
        modeTimer: 0,
        lifes: lifesInit,
        points: 0,
        highscore: 0,
        level: 1,

    };

    thisLevel = new Level(canvas.getContext("2d"));
    thisLevel.loadLevel( thisGame.getLevelNum() );

    var Sprite = function (options) {

        var flat = {};
        flat.image = options.image;
        flat.sourceX = options.sourceX;
        flat.sourceY = options.sourceY;
        flat.sourceWidth = options.sourceWidth;
        flat.sourceHeight = options.sourceHeight;
        flat.destinationX = options.destinationX;
        flat.destinationY = options.destinationY;
        flat.destinationWidth = options.destinationWidth;
        flat.destinationHeight = options.destinationHeight;
        flat.context = options.context;

        flat.render = function () {

            flat.context.drawImage(
                flat.image,
                flat.sourceX,
                flat.sourceY,
                flat.sourceWidth,
                flat.sourceHeight,
                flat.destinationX,
                flat.destinationY,
                flat.destinationWidth,
                flat.destinationHeight);
        };
        flat.renderOverride = function (destXOverride,destYOverride,destWOv,destHOv,contexto) {

            contexto.drawImage(
                flat.image,
                flat.sourceX,
                flat.sourceY,
                flat.sourceWidth,
                flat.sourceHeight,
                destXOverride,
                destYOverride,
                destWOv,
                destHOv);
        };

        return flat;

    };


    var measureFPS = function (newTime) {
        // la primera ejecución tiene una condición especial

        if (lastTime === undefined) {
            lastTime = newTime;
            return;
        }

        // calcular el delta entre el frame actual y el anterior
        var diffTime = newTime - lastTime;
        
        if (diffTime >= 1000) {

            fps = frameCount;
            frameCount = 0;
            lastTime = newTime;
        }

        // mostrar los FPS en una capa del documento
        // que hemos construído en la función start()
        fpsContainer.innerHTML = 'FPS: ' + fps;
        frameCount++;
    };

    // clears the canvas content
    var clearCanvas = function () {
        ctx.clearRect(0, 0, w, h);
        ctx_ui.clearRect(0,0,w_ui,h_ui)
    };

    var checkInputs = function () {
        
        // LEE bien el enunciado, especialmente la nota de ATENCION que
        // se muestra tras el test 7
        
        if ((keys[37] == true || keys[65] == true) && thisLevel.checkIfHitWall(player.x - 1, player.y, 0, 0) == false) {//IZQUIERDA
            inputStates.left = true;
            inputStates.right = false;
            inputStates.up = false;
            inputStates.down = false;

        }
        else if ((keys[38] == true || keys[87] == true) && thisLevel.checkIfHitWall(player.x, player.y - 1, 0, 0) == false) {//ARRIBA
            inputStates.left = false;
            inputStates.right = false;
            inputStates.up = true;
            inputStates.down = false;
        }
        else if ((keys[39] == true || keys[68] == true) && thisLevel.checkIfHitWall(player.x + 1, player.y, 0, 0) == false) {//DERECHA
            inputStates.left = false;
            inputStates.right = true;
            inputStates.up = false;
            inputStates.down = false;

        }
        else if ((keys[40] == true || keys[83] == true) && thisLevel.checkIfHitWall(player.x, player.y + 1, 0, 0) == false) {//ABAJO
            inputStates.left = false;
            inputStates.right = false;
            inputStates.up = false;
            inputStates.down = true;

        }
        else if (keys[32] == true && (thisGame.mode == thisGame.NORMAL || thisGame.mode == thisGame.PAUSE)) {
            if(thisGame.mode == thisGame.NORMAL){
                //Si entramos a Pause hay que guardar timers y recuperarlos después
                timeBackup = thisGame.modeTimer;
                thisGame.setMode(thisGame.PAUSE);
            }
            else{
                thisGame.setMode(thisGame.WAIT_TO_CONTINUE);
            }
        }

        return keys;
    };


    var updateTimers = function () {
        // tu código aquí (test12)
        // Actualizar thisGame.ghostTimer (y el estado de los fantasmas, tal y como se especifica en el enunciado)
        //
        // tu código aquí (test14)
        // actualiza modeTimer...        
        if (thisGame.ghostTimer > 0 && thisGame.mode != thisGame.PACMAN_EATS && thisGame.mode != thisGame.PAUSE && thisGame.mode != thisGame.WAIT_TO_CONTINUE) {
            thisGame.ghostTimer--;
        }

        if (thisGame.ghostTimer == 0) {
            for (var numFant = 0; numFant < numGhosts; numFant++) {
                ghosts[numFant].setStateGhost(Ghost.NORMAL); 
                thisLevel.acumPointsGhost = eatPoints;
            }
        }

        thisGame.modeTimer++;

    };

    var mainLoop = function (time) {

        //main function, called each frame 
        measureFPS(time);
        // test14
        // tu código aquí
            // sólo en modo NORMAL

        if (thisGame.mode == thisGame.NORMAL) {//Jugando normal

            timeLevel++;
            checkInputs();
            // Tu código aquí
            // Mover fantasmas
            player.move();
            // en modo HIT_GHOST
            //  seguir el enunciado...
            //
            //
            //  en modo WAIT_TO_START
            //  segur el enunciado...
            //
            //

            // Clear the canvas
            clearCanvas();

            thisLevel.drawMap();

            // Tu código aquí
            // Pintar fantasmas

            for (var numFant = 0; numFant < numGhosts; numFant++) {

                ghosts[numFant].draw(ghosts[numFant].x, ghosts[numFant].y);
                if (ghosts[numFant].state == Ghost.VULNERABLE) {
                    now = audios['waza'].seek();
                    if (audios['waza'].playing() == false || audios['waza'].seek() > 0.51) {
                        audios['waza'].seek(0);
                        audios['waza'].play();
                    }
                }
                else if (audios['siren'].playing() == false || audios['siren'].seek() > 1.57 ) {
                    audios['siren'].seek(0.01);
                    audios['siren'].play();
                }
            }
            for (numFant = 0; numFant < numGhosts; numFant++) {
                ghosts[numFant].move(numFant, ghosts[numFant].x, ghosts[numFant].y);
            }


            player.draw(player.x, player.y,(grd+=dir));
            // call the animation loop every 1/60th of second
            if (grd % 100 == 0) {
                dir = -dir;
            }

            updateTimers();

            thisLevel.drawDetails();
            requestAnimationFrame(mainLoop);

        }
        else if (thisGame.mode == thisGame.HIT_GHOST) {

            if (thisGame.modeTimer == 90) {
                clearCanvas();
                thisLevel.drawMap();
                reset();
                thisGame.setMode(thisGame.WAIT_TO_START);
            }
            updateTimers();
            requestAnimationFrame(mainLoop);

        }
        else if (thisGame.mode == thisGame.PACMAN_EATS) {


            if (thisGame.modeTimer == 60) {
                ghostDie = -1;
                thisGame.setMode(thisGame.NORMAL);
                thisLevel.acumPointsGhost = thisLevel.acumPointsGhost * 2;
            }

            clearCanvas();
            thisLevel.drawMap();
            for (var numFant = 0; numFant < numGhosts; numFant++) {
                if (numFant != ghostDie) {
                    ghosts[numFant].draw(ghosts[numFant].x, ghosts[numFant].y);
                }
            }
            //Escribir puntuación
            thisLevel.eatPoints(player.x, player.y)
            thisGame.displayScore();

            updateTimers();
            requestAnimationFrame(mainLoop);

        }
        else if (thisGame.mode == thisGame.WAIT_TO_START) {
            //console.log('waitToStart');

            if(audios['ready'].playing() == false){
                audios['ready'].play();
            }

            clearCanvas();


            if (thisGame.modeTimer == 240) {
                thisGame.setMode(thisGame.NORMAL);
            }


            thisLevel.drawMap();
            thisLevel.ready_sprite.render();
            for (var numFant = 0; numFant < numGhosts; numFant++) {
                ghosts[numFant].draw(ghosts[numFant].x, ghosts[numFant].y);
            }
            if(thisGame.modeTimer >= 180){
                player.draw(player.x,player.y,0);
            }

            updateTimers();
            requestAnimationFrame(mainLoop);
        }
        else if (thisGame.mode == thisGame.PAUSE) {
            if(thisGame.modeTimer > 30){
                checkInputs();
            }
            clearCanvas();
            thisLevel.drawMap();
            for (var numFant = 0; numFant < numGhosts; numFant++) {
                ghosts[numFant].draw(ghosts[numFant].x, ghosts[numFant].y);
            }

            player.draw(player.x,player.y,0);
            updateTimers();
            requestAnimationFrame(mainLoop);
        }
        else if (thisGame.mode == thisGame.WAIT_TO_CONTINUE) {
            clearCanvas();
            thisLevel.drawMap();
            for (var numFant = 0; numFant < numGhosts; numFant++) {
                ghosts[numFant].draw(ghosts[numFant].x, ghosts[numFant].y);
            }

            player.draw(player.x,player.y,0);

            if(thisGame.modeTimer <= 60){
                thisLevel.number_3_sprite.render();
            }
            else if(thisGame.modeTimer > 60 && thisGame.modeTimer <= 120){
                thisLevel.number_2_sprite.render();
            }
            else if(thisGame.modeTimer > 120 && thisGame.modeTimer <= 180){
                thisLevel.number_1_sprite.render();
            }

            if (thisGame.modeTimer == 180) {
                thisGame.setMode(thisGame.NORMAL,timeBackup);
            }

            updateTimers();
            requestAnimationFrame(mainLoop);
        }
        else if (thisGame.mode == thisGame.GAME_OVER) {
            thisLevel.gameover_sprite.render();
            if(thisGame.modeTimer == 120){
                endGame();
                restart();
                thisLevel.reloadLvl();
                thisGame.setMode(thisGame.WAIT_TO_START);
            }

            updateTimers();
            requestAnimationFrame(mainLoop);


        }
        else if(thisGame.mode == thisGame.PACMAN_DIES){

            if (thisGame.modeTimer >= 0 && thisGame.modeTimer < 30) {

            }
            else if (thisGame.modeTimer >= 30 && thisGame.modeTimer < 90) {
                clearCanvas();
                aux = (thisGame.modeTimer - 30) / 60;


                player.drawDead(player.x,player.y,aux);

                if(thisGame.modeTimer > 80){
                    thisLevel.pacman_explodes_sprite.renderOverride(player.x + offPacman,player.y,14,16,ctx);
                }

                thisLevel.drawMap();
            }
            else if(thisGame.modeTimer >= 90){
                clearCanvas();
                thisLevel.drawMap();

                if(thisGame.modeTimer == 120){

                    if(thisGame.lifes > 0){
                        restart();
                        thisGame.setMode(thisGame.WAIT_TO_START);
                    }
                    else{
                        thisGame.setMode(thisGame.GAME_OVER);
                        ctx.fillStyle = 'red';
                        ctx.font = "20px Arial";
                        ctx.fillText("Pulsar F5 para reiniciar",(w/2)-100,h/2+100);
                    }

                }

            }

            updateTimers();
            requestAnimationFrame(mainLoop);
        }
        else if (thisGame.mode == thisGame.WIN) {
            ctx.fillStyle = 'green';
            ctx.font = "35px Arial";
            ctx.fillText("¡YOU WIN!",(w/2)-75,h/2);
            ctx.fillStyle = 'green';
            ctx.font = "20px Arial";
            ctx.fillText("Pulsar F5 para reiniciar",(w/2)-100,h/2+100);
            if(thisGame.modeTimer == 120){
                endGame();
                restart();
                thisLevel.reloadLvl();
                thisGame.setMode(thisGame.WAIT_TO_START);
            }

            updateTimers();
            requestAnimationFrame(mainLoop);


        }

    };

    var addListeners = function(){
        //add the listener to the main, window object, and update the states
        // Tu código aquí

        $(document).keydown(function(e) {
            keys[e.keyCode] = true;
            
        });
        $(document).keyup(function(e) {
            delete keys[e.keyCode];
        });
    };

    var reset = function () {
        // Tu código aquí
        // Inicialmente Pacman debe empezar a moverse en horizontal hacia la derecha, con una velocidad igual a su atributo speed
        // inicializa la posición inicial de Pacman tal y como indica el enunciado
        // Tu código aquí (test10)
        // Inicializa los atributos x,y, velX, velY, speed de la clase Ghost de forma conveniente
        //
        // test14


        player.x = thisLevel.homeX;
        player.y = thisLevel.homeY;

        for (numFant = 0; numFant < numGhosts; numFant++) {
            ghosts[numFant].x = ghosts[numFant].homeX;
            ghosts[numFant].y = ghosts[numFant].homeY;
            ghosts[numFant].setStateGhost(Ghost.NORMAL);
        }

        inputStates.up = false;
        inputStates.down = false;
        inputStates.right = true;
        inputStates.left = false;

    };

    var restart = function () {

        blankCh = document.getElementById('blank');
        while (blankCh.firstChild) {
            blankCh.removeChild(blankCh.firstChild);
        }
        timeLevel = 0;
        renderFruitTime = 0;
        fruitRec = false;
        player.x = thisLevel.homeX;
        player.y = thisLevel.homeY;
        speedBasicGhost = ghostInitialSpeed;
        for (numFant = 0; numFant < numGhosts; numFant++) {
            ghosts[numFant].x = ghosts[numFant].homeX;
            ghosts[numFant].y = ghosts[numFant].homeY;
            ghosts[numFant].speed = speedBasicGhost;
        }

        if(thisGame.lifes == 0){
            thisGame.lifes = lifesInit;
            thisGame.points = 0;
            thisGame.level = 1;
        }
        thisGame.displayScore();

        thisGame.setMode(thisGame.NORMAL);

        for (numFant = 0; numFant < numGhosts; numFant++) {
            ghosts[numFant].x = ghosts[numFant].homeX;
            ghosts[numFant].y = ghosts[numFant].homeY;
        }

        inputStates.left = false;
        inputStates.up = false;
        inputStates.down = false;
        inputStates.right = true;


    };

    function loadAssets(){
        resources.load(['res/img/sprites.png']);
        resources.onReady(init);
        loadSounds();
    };

    function loadSounds() {
        var waza = new Howl({
            src: ['res/sounds/waza.mp3'],
            volume: 0.5
        });
        audios['waza'] = waza;
        var eatPill = new Howl({
            src: ['res/sounds/eat-pill.mp3'],
            volume: 0.5
        });
        audios['eat_pill'] = eatPill;
        var eatFruit = new Howl({
            src: ['res/sounds/eat-fruit.mp3'],
            volume: 0.5
        });
        audios['eat_fruit'] = eatFruit;

        var eating = new Howl({
            src: ['res/sounds/eating.mp3'],
            volume: 0.5
        });
        audios['eating'] = eating;

        var eatGhost = new Howl({
            src: ['res/sounds/eat-ghost.mp3'],
            volume: 0.5
        });
        audios['eat_ghost'] = eatGhost;

        var ghostEaten = new Howl({
            src: ['res/sounds/ghost-eaten.mp3'],
            volume: 0.5
        });
        audios['ghost_eaten'] = ghostEaten;

        var ready = new Howl({
            src: ['res/sounds/ready.mp3'],
            volume: 0.5
        });
        audios['ready'] = ready;
        var die = new Howl({
            src: ['res/sounds/die.mp3'],
            volume: 0.5
        });
        audios['die'] = die;

        var siren = new Howl({
            src: ['res/sounds/siren_vegas.mp3'],
            volume: 0.5
        });
        audios['siren'] = siren;

    };


    var loadPreferences = function () {

        for(var key in audios){
            audios[key].volume(parseFloat(localStorage.getItem('volume')));
        }

    };


    

    var init = function () {

        thisLevel.loadSprites();
        requestAnimationFrame(mainLoop);

    };


    var start = function () {
        var localpoints = localStorage.getItem("high"); 
        $('p.highscore').html(localpoints);
        loadAssets();
        loadPreferences();

        blankCh = document.getElementById('blank');
        while (blankCh.firstChild) {
            blankCh.removeChild(blankCh.firstChild);
        }

        fpsContainer = document.getElementById('fpscontainer');
        
        addListeners();

        reset();
        // start the animation
        thisGame.setMode(thisGame.WAIT_TO_START);


    };


    //our GameFramework returns a public API visible from outside its scope
    return {
        start: start,
        thisGame: thisGame
    };
};

var game = new GF();
game.start();





