var canvas  = document.getElementById("canvas");
var grille = canvas.getContext('2d');
var tX = canvas.getAttribute('width');
var tY = canvas.getAttribute('height');
var tabPions = [[0, 0, 0, 0, 0, 0, 0, 0], 
				  [0, 0, 0, 0, 0, 0, 0, 0], 
				  [0, 0, 0, 0, 0, 0, 0, 0], 
				  [0, 0, 0, 1, 2, 0, 0, 0], 
				  [0, 0, 0, 2, 1, 0, 0, 0], 
                  [0, 0, 0, 0, 0, 0, 0, 0], 
                  [0, 0, 0, 0, 0, 0, 0, 0], 
				  [0, 0, 0, 0, 0, 0, 0, 0]];
var c = 400/8;

var tabExplo = [];

function dessineG(){
	grille.fillStyle = "rgb(0,128,0)";
 	grille.fillRect (0, 0, 400, 400);
	grille.strokeStyle="#000000";
	grille.lineWidth = 4;
	grille.beginPath();

    for (let n = 1; n < 8; n++) {
        grille.moveTo(n*c, 0);
        grille.lineTo(n*c, 400);
        grille.moveTo(400, n*c);
        grille.lineTo(c-45, n*c);

    }
	grille.stroke();
}

function dessinePionU(x,y) {
	grille.fillStyle = "#FFFFFF";
	grille.beginPath();
	grille.arc(x, y, (c/2)-8, 0, 2*Math.PI, true);
	grille.fill();
}


function dessinePionO(x,y) {
	grille.fillStyle = "#000000";
	grille.beginPath();
	grille.arc(x, y, (c/2)-8, 0, 2*Math.PI, true);
	grille.fill();
}

function exploration(macouleur, tacouleur){
    tabExplo = [];
    var x=0;
    var y=0;
    var tp = [];
    for(let py = 0; py < 8; py++) {                             // on parcoure le tableau de jeu
        for(let px = 0; px < 8; px++) {                         // et on examine chaque case dans
            if(tabPions[py][px] === 0) {                    // les huit directions si la case
                if((px+1 < 8) && (tabPions[py][px+1] === tacouleur)) {              // est vide, bien entendu
                    x = px + 1;
                    while(tabPions[py][x] === tacouleur) {          // tant qu'il y a des pions adverses
                        x  ++;
                    }                                   // on avance d'une case
                    if(tabPions[py][x] === macouleur) {        // pion ordi = limite
                            tp = [px,py];
                            tabExplo.push(tp);
                    }
                }                                       // on renseigne la table d'évaluation : // sens, nbre de pions, valeur de la case, 
                                                        // et position de départ
                        
                if((py+1 < 8) && (px+1 < 8) && (tabPions[py+1][px+1] === tacouleur)) {
                    x = px + 1;
                    y = py + 1;
                    while(tabPions[y][x] === tacouleur) {
                        x ++;
                        y ++;
                    }
                    if(tabPions[y][x] === macouleur) {
                        tp = [px,py];
                        tabExplo.push(tp);
                    }
                }

                if((py+1 < 8) && (tabPions[py+1][px] === tacouleur)) {
                    y = py + 1;
                    while(tabPions[y][px] === tacouleur) {
                        y ++;
                    }
                    if(tabPions[y][px] === 2) {
                        tp = [px,py];
                        tabExplo.push(tp);
                    }
                }        

                if((py+1 < 8) && (px-1 >= 0) && (tabPions[py+1][px-1] === tacouleur)) {
                    x = px - 1;
                    y = py + 1;
                    while(tabPions[y][x] === tacouleur) {
                        x --;
                        y ++;
                    }
                    if(tabPions[y][x] === macouleur) {
                        tp = [px,py];
                        tabExplo.push(tp);
                    }
                }

                if((px-1 >= 0) && (tabPions[py][px-1] === tacouleur)) {
                    x = px - 1;
                    while(tabPions[py][x] === tacouleur) {
                        x --;
                    }
                    if(tabPions[py][x] === macouleur) {
                        tp = [px,py];
                        tabExplo.push(tp);
                    }
                }

                if((py-1 >= 0) && (px-1 >= 0) && (tabPions[py-1][px-1] === tacouleur)) {
                    x = px - 1;
                    y = py - 1;
                    while(tabPions[y][x] === tacouleur) {
                        x --;
                        y --;
                    }
                    if(tabPions[y][x] === macouleur) {
                        tp = [px,py];
                        tabExplo.push(tp);
                    }
                }

                if((py-1 >= 0) && (tabPions[py-1][px] === tacouleur)) {
                    y = py - 1;
                    while(tabPions[y][px] === tacouleur) {
                        y --;
                    }
                    if(tabPions[y][px] === macouleur) {
                        tp = [px,py];
                        tabExplo.push(tp);
                    }
                }
                
                if((py-1 >= 0) && (px+1 < 8) && (tabPions[py-1][px+1] === tacouleur)) {
                    x = px + 1;
                    y = py - 1;
                    while(tabPions[y][x] === tacouleur) {
                        x ++;
                        y --;
                    }
                    if(tabPions[y][x] === macouleur) {
                        tp = [px,py];
                        tabExplo.push(tp);
                    }
                }
            }
        }
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function highlight(macouleur, tacouleur){
    exploration(macouleur, tacouleur);
    for (var i = 0 ; i < tabExplo.length ; i++) {
        grille.fillStyle = "rgb(234,246,13)";
        //grille.fillRect(tabExplo[i][0] * 50+25, tabExplo[i][1] * 50+25, (tabExplo[i][0] + 1) * 50, (tabExplo[i + 1][1] + 1) * 50);
        grille.beginPath();
        grille.arc(tabExplo[i][0] * 50+25, tabExplo[i][1] * 50+25, (c/2)-20, 0, 2*Math.PI, true);
        grille.fill();
    }
}

function tourOrdi() {
    var xo = 0;
    var yo = 0;
    exploration(1,2);
    var random = getRandomInt(tabExplo.length);
    dessinePionO(tabExplo[random][0]*50+25,tabExplo[random][1]*50+25);
}

function game() {
	dessineG();
	dessinePionU(175,225)
	dessinePionU(225,175);
	dessinePionO(175,175);
	dessinePionO(225,225);
}


game();
highlight(2,1);

$("#canvas").click(function(e){
	var x = e.pageX - this.offsetLeft;
	var y = e.pageY - this.offsetTop;
	var cercleX = 0;
	var cercleY = 0;
	var col = 0;
	var row = 0;
	
	if(x < c) { 
		cercleX = c/2; col = 0; }
	else if(x < 2*c) { 
		cercleX = 3*(c/2); col = 1; }
	else if(x < 3*c) { 
		cercleX = 5*(c/2); col = 2; }
	else if(x < 4*c) { 
		cercleX = 7*(c/2); col = 3; }
	else if(x < 5*c) { 
		cercleX = 9*(c/2); col = 4; }
	else if(x < 6*c) { 
		cercleX = 11*(c/2); col = 5; }
	else if(x < 7*c) { 
		cercleX = 13*(c/2); col = 6; }
	else if(x < 8*c) { 
		cercleX = 15*(c/2); col = 7; }
	else { 
		cercleX = 17*c/2; col = 8; }
	
	if(y < c) { 
		cercleY = c/2; row = 0; }
	else if(y < 2*c) { 
		cercleY = 3*(c/2); row = 1; }
	else if(y < 3*c) { 
		cercleY = 5*(c/2); row = 2; }
	else if(y < 4*c) { 
		cercleY = 7*(c/2); row = 3; }
	else if(y < 5*c) { 
		cercleY = 9*(c/2); row = 4; }
	else if(y < 6*c) { 
		cercleY = 11*(c/2); row = 5; }
	else if(y < 7*c) { 
		cercleY = 13*(c/2); row = 6; }
	else if(y < 8*c) { 
		cercleY = 15*(c/2); row = 7; }
	else { 
		cercleY = 17*c/2; row = 8; }
    exploration(2,1);
    for(let i = 0; i < 8; i++) {
    	if((tabExplo[i][0] === row) && (tabExplo[i][1] === col)) {
    		tabPions[col][row] = 2;
    		dessinePionU(cercleX,cercleY);
            tourOrdi();
    	}
    }
    highlight(2,1);
});



/*var canvas  = document.getElementById("canvas");
var grille = canvas.getContext('2d');
var tX = canvas.getAttribute('width');
var tY = canvas.getAttribute('height');
var tabPions = [[0, 0, 0, 0, 0, 0, 0, 0], 
                  [0, 0, 0, 0, 0, 0, 0, 0], 
                  [0, 0, 0, 0, 0, 0, 0, 0], 
                  [0, 0, 0, 1, 2, 0, 0, 0], 
                  [0, 0, 0, 2, 1, 0, 0, 0], 
                  [0, 0, 0, 0, 0, 0, 0, 0], 
                  [0, 0, 0, 0, 0, 0, 0, 0], 
                  [0, 0, 0, 0, 0, 0, 0, 0]];
var c = 400/8;

var tabExplo = [];

function dessineG(){
    grille.fillStyle = "rgb(0,128,0)";
    grille.fillRect (0, 0, 400, 400);
    grille.strokeStyle="#000000";
    grille.lineWidth = 4;
    grille.beginPath();

    for (let n = 1; n < 8; n++) {
        grille.moveTo(n*c, 0);
        grille.lineTo(n*c, 400);
        grille.moveTo(400, n*c);
        grille.lineTo(c-45, n*c);

    }
    grille.stroke();
}

function dessinePion(x,y) {
    if(tabPions[x][y] === 2) {
        grille.fillStyle = "#FFFFFF";
        grille.beginPath();
        grille.arc(x, y, (c/2)-8, 0, 2*Math.PI, true);
        grille.fill();
    }
    else if(tabPions[x][y] === 1) {
        grille.fillStyle = "#000000";
        grille.beginPath();
        grille.arc(x, y, (c/2)-8, 0, 2*Math.PI, true);
        grille.fill();
    }
}

function exploration(macouleur, tacouleur){
    tabExplo = [];
    var x=0;
    var y=0;
    var tp = [];
    for(let py = 0; py < 8; py++) {                             // on parcoure le tableau de jeu
        for(let px = 0; px < 8; px++) {                         // et on examine chaque case dans
            if(tabPions[py][px] === 0) {                    // les huit directions si la case
                if((px+1 < 8) && (tabPions[py][px+1] === tacouleur)) {              // est vide, bien entendu
                    xo = px + 1;
                    while(tabPions[py][x] === tacouleur) {          // tant qu'il y a des pions adverses
                        x  ++;
                    }                                   // on avance d'une case
                    if(tabPions[py][x] === macouleur) {        // pion ordi = limite
                            tp = [py,px];
                            tabExplo.push(tp);
                    }
                }                                       // on renseigne la table d'évaluation : // sens, nbre de pions, valeur de la case, 
                                                        // et position de départ
                        
                if((py+1 < 8) && (px+1 < 8) && (tabPions[py+1][px+1] === tacouleur)) {
                    x = px + 1;
                    y = py + 1;
                    while(tabPions[y][x] === tacouleur) {
                        x ++;
                        y ++;
                    }
                    if(tabPions[y][x] === macouleur) {
                        tp = [py,px];
                        tabExplo.push(tp);
                    }
                }

                if((py+1 < 8) && (tabPions[py+1][px] === tacouleur)) {
                    y = py + 1;
                    while(tabPions[y][px] === tacouleur) {
                        y ++;
                    }
                    if(tabPions[y][px] === 2) {
                        tp = [py,px];
                        tabExplo.push(tp);
                    }
                }        

                if((py+1 < 8) && (px-1 >= 0) && (tabPions[py+1][px-1] === tacouleur)) {
                    x = px - 1;
                    y = py + 1;
                    while(tabPions[y][x] === tacouleur) {
                        x --;
                        y ++;
                    }
                    if(tabPions[y][x] === macouleur) {
                        tp = [py,px];
                        tabExplo.push(tp);
                    }
                }

                if((px-1 >= 0) && (tabPions[py][px-1] === tacouleur)) {
                    x = px - 1;
                    while(tabPions[py][x] === tacouleur) {
                        x --;
                    }
                    if(tabPions[py][x] === macouleur) {
                        tp = [py,px];
                        tabExplo.push(tp);
                    }
                }

                if((py-1 >= 0) && (px-1 >= 0) && (tabPions[py-1][px-1] === tacouleur)) {
                    x = px - 1;
                    y = py - 1;
                    while(tabPions[y][x] === tacouleur) {
                        x --;
                        y --;
                    }
                    if(tabPions[y][x] === macouleur) {
                        tp = [py,px];
                        tabExplo.push(tp);
                    }
                }

                if((py-1 >= 0) && (tabPions[py-1][px] === tacouleur)) {
                    y = py - 1;
                    while(tabPions[y][px] === tacouleur) {
                        y --;
                    }
                    if(tabPions[y][px] === macouleur) {
                        tp = [py,px];
                        tabExplo.push(tp);
                    }
                }
                
                if((py-1 >= 0) && (px+1 < 8) && (tabPions[py-1][px+1] === tacouleur)) {
                    x = px + 1;
                    y = py - 1;
                    while(tabPions[y][x] === tacouleur) {
                        x ++;
                        y --;
                    }
                    if(tabPions[y][x] === macouleur) {
                        tp = [py,px];
                        tabExplo.push(tp);
                    }
                }
            }
        }
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function highlight(macouleur, tacouleur){
    exploration(macouleur, tacouleur);
    for (var i = 0 ; i < tabExplo.length ; i++) {
        grille.fillStyle = "rgb(234,246,13)";
        //grille.fillRect(tabExplo[i][0] * 50+25, tabExplo[i][1] * 50+25, (tabExplo[i][0] + 1) * 50, (tabExplo[i + 1][1] + 1) * 50);
        grille.beginPath();
        grille.arc(tabExplo[i][0] * 50+25, tabExplo[i][1] * 50+25, (c/2)-20, 0, 2*Math.PI, true);
        grille.fill();
    }
}

function tourOrdi() {
    var xo = 0;
    var yo = 0;
    exploration(1,2);
    var random = getRandomInt(tabExplo.length);
    dessinePion(tabExplo[random][0]*50+25,tabExplo[random][1]*50+25);
}

function changeColor(px,py,macouleur,tacouleur) {
    var cx = 0;
    var cy = 0;
    if((px+1 < 8) && (tabPions[py][px+1] === tacouleur)) {              // est vide, bien entendu
                    x = px + 1;
                    while(tabPions[py][x] === tacouleur) {          // tant qu'il y a des pions adverses
                        x  ++;
                    }                                   // on avance d'une case
                    if(tabPions[py][x] === macouleur) {        // pion ordi = limite
                            while(cx < x) {
                                dessinePion(cx,py);
                                tabPions[py][cx] = macouleur;
                            }
                    }
                }                                       // on renseigne la table d'évaluation : // sens, nbre de pions, valeur de la case, 
                                                        // et position de départ
                        
                if((py+1 < 8) && (px+1 < 8) && (tabPions[py+1][px+1] === tacouleur)) {
                    x = px + 1;
                    y = py + 1;
                    while(tabPions[y][x] === tacouleur) {
                        x ++;
                        y ++;
                    }
                    if(tabPions[y][x] === macouleur) {
                        while((cx < x) && (cy < y)) {
                                dessinePion(cx,cy);
                                tabPions[cy][cx] = macouleur;
                            }
                    }
                }

                if((py+1 < 8) && (tabPions[py+1][px] === tacouleur)) {
                    y = py + 1;
                    while(tabPions[y][px] === tacouleur) {
                        y ++;
                    }
                    if(tabPions[y][px] === 2) {
                        while(cy < y) {
                                dessinePion(px,cy);
                                tabPions[cy][px] = macouleur;
                            }
                    }
                }        

                if((py+1 < 8) && (px-1 >= 0) && (tabPions[py+1][px-1] === tacouleur)) {
                    x = px - 1;
                    y = py + 1;
                    while(tabPions[y][x] === tacouleur) {
                        x --;
                        y ++;
                    }
                    if(tabPions[y][x] === macouleur) {
                        while((cx < x) && (cy > y)) {
                                dessinePion(cx,cy);
                                tabPions[cy][cx] = macouleur;
                        }
                    }
                }

                if((px-1 >= 0) && (tabPions[py][px-1] === tacouleur)) {
                    x = px - 1;
                    while(tabPions[py][x] === tacouleur) {
                        x --;
                    }
                    if(tabPions[py][x] === macouleur) {
                        while((cx > x)) {
                                dessinePion(cx,py);
                                tabPions[py][cx] = macouleur;
                        }
                    }
                }

                if((py-1 >= 0) && (px-1 >= 0) && (tabPions[py-1][px-1] === tacouleur)) {
                    x = px - 1;
                    y = py - 1;
                    while(tabPions[y][x] === tacouleur) {
                        x --;
                        y --;
                    }
                    if(tabPions[y][x] === macouleur) {
                        while((cx > x) && (cy > y)) {
                                dessinePion(cx,cy);
                                tabPions[cy][cx] = macouleur;
                        }
                    }
                }

                if((py-1 >= 0) && (tabPions[py-1][px] === tacouleur)) {
                    y = py - 1;
                    while(tabPions[y][px] === tacouleur) {
                        y --;
                    }
                    if(tabPions[y][px] === macouleur) {
                        while((cy > y)) {
                                dessinePion(cx,cy);
                                tabPions[cy][px] = macouleur;
                        }
                    }
                }
                
                if((py-1 >= 0) && (px+1 < 8) && (tabPions[py-1][px+1] === tacouleur)) {
                    x = px + 1;
                    y = py - 1;
                    while(tabPions[y][x] === tacouleur) {
                        x ++;
                        y --;
                    }
                    if(tabPions[y][x] === macouleur) {
                        while((cx < x) && (cy > y)) {
                                dessinePion(cx,cy);
                                tabPions[cy][cx] = macouleur;
                        }
                    }
                }
}

function game() {
    dessineG();
    dessinePion(175,225)
    dessinePion(225,175);
    dessinePion(175,175);
    dessinePion(225,225);
}


game();
highlight(2,1);

$("#canvas").click(function(e){
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    var cercleX = 0;
    var cercleY = 0;
    var col = 0;
    var row = 0;
    
    if(x < c) { 
        cercleX = c/2; col = 0; }
    else if(x < 2*c) { 
        cercleX = 3*(c/2); col = 1; }
    else if(x < 3*c) { 
        cercleX = 5*(c/2); col = 2; }
    else if(x < 4*c) { 
        cercleX = 7*(c/2); col = 3; }
    else if(x < 5*c) { 
        cercleX = 9*(c/2); col = 4; }
    else if(x < 6*c) { 
        cercleX = 11*(c/2); col = 5; }
    else if(x < 7*c) { 
        cercleX = 13*(c/2); col = 6; }
    else if(x < 8*c) { 
        cercleX = 15*(c/2); col = 7; }
    else { 
        cercleX = 17*c/2; col = 8; }
    
    if(y < c) { 
        cercleY = c/2; row = 0; }
    else if(y < 2*c) { 
        cercleY = 3*(c/2); row = 1; }
    else if(y < 3*c) { 
        cercleY = 5*(c/2); row = 2; }
    else if(y < 4*c) { 
        cercleY = 7*(c/2); row = 3; }
    else if(y < 5*c) { 
        cercleY = 9*(c/2); row = 4; }
    else if(y < 6*c) { 
        cercleY = 11*(c/2); row = 5; }
    else if(y < 7*c) { 
        cercleY = 13*(c/2); row = 6; }
    else if(y < 8*c) { 
        cercleY = 15*(c/2); row = 7; }
    else { 
        cercleY = 17*c/2; row = 8; }
    exploration(2,1);
    for(let i = 0; i < 8; i++) {
        if((tabExplo[i][0] === row) && (tabExplo[i][1] === col)) {
            tabPions[col][row] = 2;
            dessinePion(cercleX,cercleY);
            changeColor(cercleX,cercleY,2,1);
            tourOrdi();
        }
    }
    highlight(2,1);
});*/