const canvas  = document.getElementById("canvas");
const grille = canvas.getContext('2d');
const tX = canvas.getAttribute('width');
const tY = canvas.getAttribute('height');
let tabPions = [[0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 2, 0, 0, 0],
                [0, 0, 0, 2, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]];
const largeurGrille = 400;
const c = largeurGrille/8;
let col, row;
let compteN,compteB,pionVide;


let tabExplo = [];

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
            if (tabPions[py][px] === 0){
                grille.fillStyle = "rgb(0,128,0)";
                grille.beginPath();
                grille.arc(px*50+25, py*50+25, (c/2)-8, 0, 2*Math.PI, true);
                grille.fill();
            }
            if(tabPions[py][px] === 1){
                grille.fillStyle = "#FFFFFF";
                grille.beginPath();
                grille.arc(px*50+25, py*50+25, (c/2)-8, 0, 2*Math.PI, true);
                grille.fill();
            }
            if(tabPions[py][px] === 2){
                grille.fillStyle = "#000000";
                grille.beginPath();
                grille.arc(px*50+25, py*50+25, (c/2)-8, 0, 2*Math.PI, true);
                grille.fill();
            }
        }
    }
}


function exploration(coox,cooy,modx,mody,actif,autre,n){
    if((tabPions[cooy][coox]===0 || (n!==1 &&tabPions[cooy][coox]===autre) ) && (coox+modx>-1 && coox+modx<8) && (cooy+mody>-1 && cooy+mody<8) && tabPions[cooy+mody][coox+modx]===autre){
        return exploration(coox+modx,cooy+mody,modx,mody,actif,autre,n+1);
    }
    return n !== 1 && (coox + modx > -1 && coox + modx < 8) && (cooy + mody > -1 && cooy + mody < 8) && tabPions[cooy + mody][coox + modx] === actif;
}

function mainExplo(actif,autre){
    tabExplo=[];
    for(let x=0;x<8;x++){
        for(let y=0;y<8;y++){
            let ex1=exploration(x,y,0,1,actif,autre,1);//bas
            let ex2=exploration(x,y,1,1,actif,autre,1);//bas+droite
            let ex3=exploration(x,y,1,0,actif,autre,1);//droite
            let ex4=exploration(x,y,1,-1,actif,autre,1);//haut+droite
            let ex5=exploration(x,y,0,-1,actif,autre,1);//haut
            let ex6=exploration(x,y,-1,-1,actif,autre,1);//haut+gauche
            let ex7=exploration(x,y,-1,0,actif,autre,1);//gauche
            let ex8=exploration(x,y,-1,1,actif,autre,1);//bas+gauche
            if(ex1===true||ex2===true||ex3===true||ex4===true||ex5===true||ex6===true||ex7===true||ex8===true){
                tabExplo.push([x,y]);
            }
        }
    }
}

function changeCoul(coox,cooy,modx,mody,actif,autre,n){
    if((coox+modx>-1 && coox+modx<8) && (cooy+mody>-1 && cooy+mody<8) && tabPions[cooy+mody][coox+modx]===autre){
        let temp = changeCoul(coox+modx,cooy+mody,modx,mody,actif,autre,n+1);
        if(temp){
            tabChang.push([coox+modx,cooy+mody]);
            return true;
        }
    }
    return n !== 1 && (coox + modx > -1 && coox + modx < 8) && (cooy + mody > -1 && cooy + mody < 8) && tabPions[cooy + mody][coox + modx] === actif;
}


function mainChangeCoul(actif,autre){
    tabChang=[];
    changeCoul(col,row,0,1,actif,autre,1);
    changeCoul(col,row,1,1,actif,autre,1);
    changeCoul(col,row,1,0,actif,autre,1);
    changeCoul(col,row,1,-1,actif,autre,1);
    changeCoul(col,row,0,-1,actif,autre,1);
    changeCoul(col,row,-1,-1,actif,autre,1);
    changeCoul(col,row,-1,0,actif,autre,1);
    changeCoul(col,row,-1,1,actif,autre,1);

    for(let i=0;i<tabChang.length;i++){
        var x=tabChang[i][0];
        var y=tabChang[i][1];
        tabPions[y][x]=actif;
        //compte autre -1
        //compte actif +1
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function highlight(actif, autre){
    mainExplo(actif, autre);
    for (let i = 0 ; i < tabExplo.length ; i++) {
        grille.fillStyle = "rgb(234,246,13)";
        grille.beginPath();
        grille.arc(tabExplo[i][0] * 50+25, tabExplo[i][1] * 50+25, (c/2)-20, 0, 2*Math.PI, true);
        grille.fill();
    }
}

function testFin(){
    comptePions();
    if((pionVide===0)||(compteN===0)||(compteB===0)){
        if(compteN>compteB){
            ("Les noirs gagnent la partie");}
        if(compteN<compteB){alert("Les blancs gagnent la partie");}
        if(compteN===compteB){alert("égalité");}

    }
}

function tourOrdi() {
    mainExplo(1,2);
    let random = getRandomInt(tabExplo.length);
    col = tabExplo[random][0];
    row = tabExplo[random][1];
    tabPions[row][col] = 1;
    mainChangeCoul(1,2);
    dessinePion();
}

function game() {
    dessineG();
    dessinePion();
}

function comptePions(){
    compteB=0;
    compteN=0;
    for (let j=0;j<8;j++){
        for(let i=0;i<8;i++){
            if(tabPions[j][i]===1){
                compteB+=1;
            }
            if(tabPions[j][i]===2){
                compteN+=1;
            }
            if(tabPions[j][i]===0){
                pionVide+=1;
            }
        }
    }
}


game();
highlight(2,1);
$("#canvas").click(function(e){
    let x = e.pageX - this.offsetLeft;
    let y = e.pageY - this.offsetTop

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
    mainExplo(2,1);
    for(let i = 0; i < tabExplo.length; i++) {
        if((tabExplo[i][0] === col) && (tabExplo[i][1] === row)) {
            tabPions[row][col] = 2;
            mainChangeCoul(2,1);
            dessinePion();
            comptePions();
            testFin();
            tourOrdi();
            testFin();
            comptePions();
            highlight(2,1);

        }
    }
    //setTimeout(fonctionAExecuter, 2000);

});
