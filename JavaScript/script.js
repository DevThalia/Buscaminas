
let tablero;
let revealedCells = 0;

function revelarCasilla(e) {
    let cellsToReveal = tablero.fx * tablero.fy - tablero.numMinas;
    console.log(cellsToReveal);
    console.log(tablero.numMinas);

    const coordenadaX = parseInt(this.getAttribute("coordenadaX"));
    const coordenadaY = parseInt(this.getAttribute("coordenadaY"));
    console.log(`Casilla revelada en (${coordenadaX}, ${coordenadaY})`);

    if (tablero.tablero[coordenadaX][coordenadaY].mina) {
        this.style.backgroundColor = "red";
        alert("Game over!");
        for (let i = 0; i < tablero.fx; i++) {
            for (let j = 0; j < tablero.fy; j++) {
                if (tablero.tablero[i][j].mina) {
                    document.querySelector(`[coordenadaX="${i}"][coordenadaY="${j}"]`).style.backgroundColor = "red";
                }
            }
        }
    } else {
        this.style.backgroundColor = "lightgrey";
        this.textContent = tablero.tablero[coordenadaX][coordenadaY].adyacentes;
        revealedCells++;
        console.log(revealedCells);
    } if (revealedCells === cellsToReveal) {
        alert("You win!");
    }
}

function colocarBandera(e) {
    const coordenadaX = parseInt(this.getAttribute("coordenadaX"));
    const coordenadaY = parseInt(this.getAttribute("coordenadaY"));
    console.log(`Bandera colocada en (${coordenadaX}, ${coordenadaY})`);
    if (tablero.tablero[coordenadaX][coordenadaY].bandera) {
        this.style.backgroundColor = "blue";
    } else {
        this.style.backgroundColor = "white";
    }
}

function jugarDeNuevo() {
    location.reload();
}

function anadirDOM(tablero) {
    let contenedor = document.getElementById("tablero");
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
            casilla.addEventListener("dblclick", colocarBandera);

        }
        contenedor.appendChild(filaDOM);
    }
}

function init() { 
    tablero = new Tablero(4, 4, 2);
    tablero.colocarBombas();
    console.log("numero de minas: " + tablero.numMinas);
    tablero.calcularCasillasAdyacentes();
    anadirDOM(tablero);
}

