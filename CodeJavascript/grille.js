const canvas  = document.getElementById("canvas");
const grille = canvas.getContext('2d');
const tX = canvas.getAttribute('width');
const tY = canvas.getAttribute('height');
var tabPions = [[0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 2, 0, 0, 0],
                [0, 0, 0, 2, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]];
const largeurGrille = 400;
const c = largeurGrille/8;

var tabExplo = [];

function dessineG(){                                //fonction qui trace le plateau
    grille.fillStyle = "rgb(0,128,0)";
    grille.fillRect (0, 0, largeurGrille, largeurGrille);
    grille.strokeStyle="#000000";
    grille.lineWidth = 4;
    grille.beginPath();

    for (let n = 1; n < 8; n++) {                       // et la grille
        grille.moveTo(n*c, 0);
        grille.lineTo(n*c, 400);
        grille.moveTo(400, n*c);
        grille.lineTo(0, n*c);

    }
    grille.stroke();
}

function dessinePion(){
    for (let py = 0; py < 8; py++) {
        for(let px = 0; px < 8; px++) {                             // on parcoure le tableau de jeu
            if (tabPions[px][py] === 0){
                grille.fillStyle = "rgb(0,128,0)";
                grille.beginPath();
                grille.arc(px*50+25, py*50+25, (c/2)-8, 0, 2*Math.PI, true);
                grille.fill();
            }
            if(tabPions[px][py] === 1){
                grille.fillStyle = "#FFFFFF";
                grille.beginPath();
                grille.arc(px*50+25, py*50+25, (c/2)-8, 0, 2*Math.PI, true);
                grille.fill();
            }
            if(tabPions[px][py] === 2){
                grille.fillStyle = "#000000";
                grille.beginPath();
                grille.arc(px*50+25, py*50+25, (c/2)-8, 0, 2*Math.PI, true);
                grille.fill();
            }
        }
    }
}

function changerCouleur(px, py, actif, autre) {
        if (tabPions[px + 1][py] === autre) {
            let x = px + 1;
            while (tabPions[x][py] === autre) {
                x++;
            }
            if (tabPions[x][py] === actif) {
                x--;
                while (x !== px) {
                    tabPions[x][py] = actif;
                    x--;
                }
            }
        }
        if (tabPions[px + 1][py + 1] === autre) {
            let x = px + 1;
            let y = py + 1;
            while (tabPions[x][y] === autre) {
                x++;
                y++;
            }
            if (tabPions[x][y] === actif) {
                x--;
                y--;
                while ((x !== px) || (y !== py)) {
                    tabPions[x][y] = actif;
                    x--;
                    y--;
                }
            }
        }
        if (tabPions[px][py + 1] === autre) {
            let y = py + 1;
            while (tabPions[px][y] === autre) {
                y++;
            }
            if (tabPions[px][y] === actif) {
                y--;
                while (y !== py) {
                    tabPions[px][y] = actif;
                    y--;
                }
            }
        }
        if (tabPions[px - 1][py + 1] === autre) {
            let y = py + 1;
            let x = px - 1;
            while (tabPions[x][y] === autre) {
                x--;
                y++;
            }
            if (tabPions[x][y] === actif) {
                x++;
                y--;
                while ((y !== py) || (x !== px)) {
                    tabPions[x][y] = actif;
                    y--;
                    x++;
                }
            }
        }
        if (tabPions[px - 1][py] === autre) {
            let x = px - 1;
            while (tabPions[x][py] === autre) {
                x--;
            }
            if (tabPions[x][py] === actif) {
                x++;
                while (x !== px) {
                    tabPions[x][py] = actif;
                    x++;
                }
            }
        }
        if (tabPions[px - 1][py - 1] === autre) {
            let x = px - 1;
            let y = py - 1;
            while (tabPions[x][y] === autre) {
                x--;
                y--;
            }
            if (tabPions[x][y] === actif) {
                x++;
                y++;
                while ((y !== py) || (x !== px)) {
                    tabPions[x][y] = actif;
                    x++;
                    y++;
                }
            }
        }
        if (tabPions[px][py - 1] === autre) {
            let y = py - 1;
            while (tabPions[px][y] === autre) {
                y--;
            }
            if (tabPions[px][y] === actif) {
                y++;
                while (y !== py) {
                    tabPions[px][y] = actif;
                    y++;
                }
            }
        }
        if (tabPions[px + 1][py - 1] === autre) {
            let x = px - 1;
            let y = py - 1;
            while (tabPions[x][y] === autre) {
                y--;
                x++;
            }
            if (tabPions[x][y] === actif) {
                y++;
                x--;
                while ((y !== py) || (x !== px)) {
                    tabPions[px][y] = actif;
                    y++;
                }
            }
        }
        dessinePion();
}

function exploration(actif, autre){
    tabExplo = [];
    let y, x=0;
    let coupJouable = [];
    for(let px = 0; px < 8; px++) {                                     // on parcoure le tableau de jeu
        for(let py = 0; py < 8; py++) {                                 // et on examine chaque case dans
            if(tabPions[px][py] === 0) {                                // les huit directions si la case
                if((py+1 < 8) && (tabPions[px][py+1] === autre)) {      // est vide, bien entendu
                    y = py + 1;
                    while(tabPions[px][y] === autre) {                  // tant qu'il y a des pions adverses
                        y++;
                    }                                                   // on avance d'une case
                    if(tabPions[px][y] === actif) {                     // pion ordi = limite
                        coupJouable = [px,py];
                        tabExplo.push(coupJouable);
                    }
                }                                                       // on renseigne la table d'évaluation
                if((px+1 < 8) && (py+1 < 8) && (tabPions[px+1][py+1] === autre)) {
                    y = py + 1;
                    x = px + 1;
                    while(tabPions[x][y] === autre) {
                        y++;
                        x++;
                    }
                    if(tabPions[x][y] === actif) {
                        coupJouable = [px,py];
                        tabExplo.push(coupJouable);
                    }
                }
                if((px+1 < 8) && (tabPions[px+1][py] === autre)) {
                    x = px + 1;
                    while(tabPions[x][py] === autre) {
                        x++;
                    }
                    if(tabPions[x][py] === 2) {
                        coupJouable = [px,py];
                        tabExplo.push(coupJouable);
                    }
                }
                if((px+1 < 8) && (py-1 >= 0) && (tabPions[px+1][py-1] === autre)) {
                    y = py - 1;
                    x = px + 1;
                    while(tabPions[x][y] === autre) {
                        y--;
                        x++;
                    }
                    if(tabPions[x][y] === actif) {
                        coupJouable = [px,py];
                        tabExplo.push(coupJouable);
                    }
                }
                if((py-1 >= 0) && (tabPions[px][py-1] === autre)) {
                    y = py - 1;
                    while(tabPions[px][y] === autre) {
                        y--;
                    }
                    if(tabPions[px][y] === actif) {
                        coupJouable = [px,py];
                        tabExplo.push(coupJouable);
                    }
                }
                if((px-1 >= 0) && (py-1 >= 0) && (tabPions[px-1][py-1] === autre)) {
                    y = py - 1;
                    x = px - 1;
                    while(tabPions[x][y] === autre) {
                        y--;
                        x--;
                    }
                    if(tabPions[x][y] === actif) {
                        coupJouable = [px,py];
                        tabExplo.push(coupJouable);
                    }
                }
                if((px-1 >= 0) && (tabPions[px-1][py] === autre)) {
                    x = px - 1;
                    while(tabPions[x][py] === autre) {
                        x--;
                    }
                    if(tabPions[x][py] === actif) {
                        coupJouable = [px,py];
                        tabExplo.push(coupJouable);
                    }
                }
                if((px-1 >= 0) && (py+1 < 8) && (tabPions[px-1][py+1] === autre)) {
                    y = py + 1;
                    x = px - 1;
                    while(tabPions[x][y] === autre) {
                        y++;
                        x--;
                    }
                    if(tabPions[x][y] === actif) {
                        coupJouable = [px,py];
                        tabExplo.push(coupJouable);
                    }
                }
            }
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function highlight(actif, autre){
    exploration(actif, autre);
    for (let i = 0 ; i < tabExplo.length ; i++) {
        grille.fillStyle = "rgb(234,246,13)";
        grille.beginPath();
        grille.arc(tabExplo[i][0] * 50+25, tabExplo[i][1] * 50+25, (c/2)-20, 0, 2*Math.PI, true);
        grille.fill();
    }
}

function tourOrdi() {
    exploration(1,2);
    let random = getRandomInt(tabExplo.length);
    let x = tabExplo[random][0];
    let y = tabExplo[random][1];
    tabPions[x][y] = 1;
    dessinePion();
    changerCouleur(x,y,1,2);
}

function game() {
    dessineG();
    dessinePion();
}


game();
highlight(2,1);
$("#canvas").click(function(e){
    let x = e.pageX - this.offsetLeft;
    let y = e.pageY - this.offsetTop
    let col, row;
    if(x < c) {
        col = 0; }
    else if(x < 2*c) {
        col = 1; }
    else if(x < 3*c) {
        col = 2; }
    else if(x < 4*c) {
        col = 3; }
    else if(x < 5*c) {
        col = 4; }
    else if(x < 6*c) {
        col = 5; }
    else if(x < 7*c) {
        col = 6; }
    else if(x < 8*c) {
        col = 7; }
    else {
        col = 8; }

    if(y < c) {
        row = 0; }
    else if(y < 2*c) {
        row = 1; }
    else if(y < 3*c) {
        row = 2; }
    else if(y < 4*c) {
        row = 3; }
    else if(y < 5*c) {
        row = 4; }
    else if(y < 6*c) {
        row = 5; }
    else if(y < 7*c) {
        row = 6; }
    else if(y < 8*c) {
        row = 7; }
    else {
        row = 8; }
    exploration(2,1);
    for(let i = 0; i < tabExplo.length; i++) {
        if((tabExplo[i][0] === col) && (tabExplo[i][1] === row)) {
            tabPions[col][row] = 2;
            dessinePion();
            tourOrdi();
            highlight(2,1);
        }
    }
    changerCouleur(col,row,2,1);
    //setTimeout(fonctionAExecuter, 2000);
});
