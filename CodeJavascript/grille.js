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

var texp = [];
var tjeu = [];

function dessineG(){
	grille.fillStyle = "rgb(0,128,0)";
 	grille.fillRect (0, 0, 400, 400);
	grille.strokeStyle="#000000";
	grille.lineWidth = 4;
	grille.beginPath();
	grille.moveTo(c, 0);
	grille.lineTo(c, 400);
	grille.moveTo(2*c, 0);
	grille.lineTo(2*c, 400);
	grille.moveTo(3*c, 0);
	grille.lineTo(3*c, 400);
	grille.moveTo(4*c, 0);
	grille.lineTo(4*c, 400);
	grille.moveTo(5*c, 0);
	grille.lineTo(5*c, 400);
	grille.moveTo(6*c, 0);
	grille.lineTo(6*c, 400);
	grille.moveTo(7*c, 0);
	grille.lineTo(7*c, 400);

	grille.moveTo(400, c);
	grille.lineTo(c-45, c);
	grille.moveTo(0, 2*c);
	grille.lineTo(400, 2*c);
	grille.moveTo(0, c);
	grille.lineTo(c-45, c);
	grille.moveTo(0, 3*c);
	grille.lineTo(400, 3*c);
	grille.moveTo(0, 4*c);
	grille.lineTo(400, 4*c);
	grille.moveTo(0, 5*c);
	grille.lineTo(400, 5*c);
	grille.moveTo(0, 6*c);
	grille.lineTo(400, 6*c);
	grille.moveTo(0, 7*c);
	grille.lineTo(400, 7*c);
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

/*function tourOrdi(){
    var nbex = 0;
    for(var py = 0; py < 9; py++) {               				// on parcoure le tableau de jeu
        for(var px = 0; px < 9; px++) {           				// et on examine chaque case dans
            if(tabPions[py][px] == false) {       				// les huit directions si la case
                if(tjeu[py][px+1] == 1) { 				// est vide, bien entendu
                    x = px + 1
                    n = 0
                    while(tjeu[py][x] == 1) { 			// tant qu'il y a des pions adverses
                        n += 1              			// nombre de pions
                        x += 1
                    }			              			// on avance d'une case
                    if(n > 0 and tjeu[py][x] == 2) {		// pion ordi = limite
					        nbex += 1
					        tp = (0,n,tval[py][px],px,py)
                        	texp.append(tp)
					}
				}   									// on renseigne la table d'évaluation : // sens, nbre de pions, valeur de la case, 
														// et position de départ
                        
                if(tjeu[py+1][px+1] == 1) {
                    x = px + 1
                    y = py + 1
                    n = 0
                    while(tjeu[y][x] == 1) {
                        n += 1
                        x += 1
                        y += 1
                    }
                    if(n > 0 and tjeu[y][x] == 2) {
                        nbex += 1
                        tp = (1,n,tval[py][px],px,py)
                        texp.append(tp)
                    }
                }

                if(tjeu[py+1][px] == 1) {
                    y = py + 1
                    n = 0
                    while(tjeu[y][px] == 1) {
                        n += 1
                        y += 1
                    }
                    if(n > 0 and tjeu[y][px] == 2) {
                        nbex += 1
                        tp = (2,n,tval[py][px],px,py)
                        texp.append(tp)
                    }
                }        

                if(tjeu[py+1][px-1] == 1) {
                    x = px - 1
                    y = py + 1
                    n = 0
                    while(tjeu[y][x] == 1) {
                        n += 1
                        x -= 1
                        y += 1
                    }
                    if(n > 0 and tjeu[y][x] == 2) {
                        nbex += 1
                        tp = (3,n,tval[py][px],px,py)
                        texp.append(tp)
                    }
                }

                if(tjeu[py][px-1] == 1) {
                    x = px - 1
                    n = 0
                    while(tjeu[py][x] == 1) {
                        n += 1
                        x -= 1
                    }
                    if(n > 0 and tjeu[py][x] == 2) {
                        nbex += 1
                        tp = (4,n,tval[py][px],px,py)
                        texp.append(tp)
                    }
                }
                if(tjeu[py-1][px-1] == 1) {
                    x = px - 1
                    y = py - 1
                    n = 0
                    while(tjeu[y][x] == 1) {
                        n += 1
                        x -= 1
                        y -= 1
                    }
                    if(n > 0 and tjeu[y][x] == 2) {
                        nbex += 1
                        tp = (5,n,tval[py][px],px,py)
                        texp.append(tp)
                    }
                }
                if(tjeu[py-1][px] == 1) {
                    y = py - 1
                    n = 0
                    while(tjeu[y][px] == 1) { 
                        n += 1
                        y -= 1
                    }
                    if(n > 0 and tjeu[y][px] == 2) {
                        nbex += 1
                        tp = (6,n,tval[py][px],px,py)
                        texp.append(tp)
                    }
                }
                if(tjeu[py-1][px+1] == 1) {
                    x = px + 1
                    y = py - 1
                    n = 0
                    while(tjeu[y][x] == 1) {
                        n += 1
                        x += 1
                        y -= 1
                    }
                    if(n > 0 and tjeu[y][x] == 2) {
                        nbex += 1
                        tp = (7,n,tval[py][px],px,py)
                        texp.append(tp)
                    }
                }
            }
        }
    }
}*/

function game() {
	dessineG();
	dessinePionU(175,225)
	dessinePionU(225,175);
	dessinePionO(175,175);
	dessinePionO(225,225);
}


game();


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
	
	if(!tabPions[col][row]) {
		tabPions[col][row] = 2;
		dessinePionU(cercleX,cercleY);
	}
	
});



