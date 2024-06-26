
let tablero;
let revealedCells = 0;
let cellsToReveal = 16 - 2;
let gameOver = false;
let gameWon = false;


function anadirDOM(tablero) {
    let contenedor = document.getElementById("tablero");
    cellsToReveal = tablero.fx * tablero.fy - tablero.numMinas;
    for (let i = 0; i < tablero.fx; i++) {
        let filaDOM = document.createElement('div');
        filaDOM.setAttribute("id", "filaDiv")
        for (let j = 0; j < tablero.fy; j++) {
            let casilla = document.createElement('div');

            casilla.classList.add("casilla");
            casilla.setAttribute("coordenadaX", i);
            casilla.setAttribute("coordenadaY", j);

            filaDOM.appendChild(casilla);
            
            casilla.addEventListener("click", revelarCasilla);
            casilla.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                colocarBandera.call(this, e);
            });

        }
        contenedor.appendChild(filaDOM);
    }
}

function revelarCasilla(e) {
    if (gameOver || gameWon) return;

    const coordenadaX = parseInt(this.getAttribute("coordenadaX"));
    const coordenadaY = parseInt(this.getAttribute("coordenadaY"));
    const casilla = tablero.casillas[coordenadaX][coordenadaY];

    if (e.button === 2) {
        colocarBandera.call(this, e);
        return;
    }

    if (casilla.mina) {
        this.style.backgroundColor = "red";
        gameOver = true;
        mostrarMinas();
        return;
    }

    if (casilla.adyacentes === 0 && !casilla.descubierta) { 
        revelarCasillaAdyacenteRecursiva(coordenadaX, coordenadaY); 
    } else {
        actualizarCasillaVisualmente(this, casilla);
        revealedCells++;

        if (revealedCells === cellsToReveal) {
            const allFlagsCorrect = verificarBanderas();
            if (allFlagsCorrect) {
                gameWon = true;
                mostrarYouWin();
            }
        }
    }
}

function revelarCasillaAdyacenteRecursiva(x, y) {
    if (x < 0 || x >= tablero.fx || y < 0 || y >= tablero.fy) {
        return;
    }

    const casilla = tablero.casillas[x][y];
    if (casilla.descubierta || casilla.mina) {
        return;
    }

    casilla.descubierta = true;
    actualizarCasillaVisualmente(document.querySelector(`[coordenadaX="${x}"][coordenadaY="${y}"]`), casilla);
    revealedCells++;

    if (revealedCells === cellsToReveal) {
        gameWon = true;
        alert("You win!");
        return; 
    }

    if (casilla.adyacentes === 0) { 
        for (let i = Math.max(0, x - 1); i <= Math.min(tablero.fx - 1, x + 1); i++) {
            for (let j = Math.max(0, y - 1); j <= Math.min(tablero.fy - 1, y + 1); j++) {
                revelarCasillaAdyacenteRecursiva(i, j); 
            }
        }
    }
}

function colocarBandera(e) {
    if (gameOver || gameWon) return;

    e.preventDefault();

    const coordenadaX = parseInt(this.getAttribute("coordenadaX"));
    const coordenadaY = parseInt(this.getAttribute("coordenadaY"));

    tablero.casillas[coordenadaX][coordenadaY].bandera = !tablero.casillas[coordenadaX][coordenadaY].bandera;

    if (tablero.casillas[coordenadaX][coordenadaY].bandera) {
        this.style.backgroundColor = "blue";
    } else {
        this.style.backgroundColor = "white";
    }

    verificarBanderas();
}

function verificarBanderas() {
    let allFlagsCorrect = true;
    let allMinesFlagged = true;

    for (let i = 0; i < tablero.fx; i++) {
        for (let j = 0; j < tablero.fy; j++) {
            const casilla = tablero.casillas[i][j];
            if (casilla.mina && !casilla.bandera) {
                allMinesFlagged = false; 
            }
            if (!casilla.mina && casilla.bandera) {
                allFlagsCorrect = false; 
            }
        }
    }

    if (allMinesFlagged) {
        gameWon = true;
        mostrarYouWin();
    }

    return allFlagsCorrect;
}


function mostrarMinas() {
    for (let i = 0; i < tablero.fx; i++) {
        for (let j = 0; j < tablero.fy; j++) {
            if (tablero.casillas[i][j].mina) {
                const casilla = document.querySelector(`[coordenadaX="${i}"][coordenadaY="${j}"]`);
                casilla.style.backgroundColor = "red";
            }
        }
    }
}

function actualizarCasillaVisualmente(casillaDOM, casilla) {
    casillaDOM.style.backgroundColor = "lightgrey";
    casillaDOM.textContent = casilla.adyacentes;
}

function jugarDeNuevo() {
    location.reload();
}

function mostrarYouWin() {
    result = document.getElementById('result');
    result.innerHTML = "You win!";
    result.classList.add("result");
    mostrarMinas();
}

window.onload = function() {
    const parametrosURL = new URLSearchParams(window.location.search);
    const columnas = parseInt(parametrosURL.get('columnas'));
    const filas = parseInt(parametrosURL.get('filas'));
    const bombas = parseInt(parametrosURL.get('bombas'));
    init(columnas, filas, bombas);
};


function init(columnas,filas,bombas) {
    tablero = new Tablero(columnas, filas, bombas);
    tablero.colocarBombas();
    console.log("numero de minas: " + tablero.numMinas);
    tablero.calcularCasillasAdyacentes();
    tablero.colocarBombas();
    anadirDOM(tablero);
}