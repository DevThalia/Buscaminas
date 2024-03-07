class Tablero {
    fx
    fy
    numMinas
    numBanderas
    tablero
    //constructor
    constructor(fx, fy, numMinas, numBanderas) {
        this.fx = fx
        this.fy = fy
        this.numMinas = numMinas
        this.numBanderas = numBanderas
        this.tablero = this.generarTablero()
    }
    //metodos
    generarTablero() {
        let tablero = []
        for (let i = 0; i < this.fx; i++) {
            let fila = []
            for (let j = 0; j < this.fy; j++) {
                let casilla = new Casilla(this.fx, this.fy)
                fila.push(casilla)
            }
            tablero.push(fila)
        }
        return tablero
    }

    calcularCasillasAdyacentes() {
        for (let i = 0; i < this.fx; i++) {
            for (let j = 0; j < this.fy; j++) {
                let casilla = this.tablero[i][j]
                //casilla.mina = 0
                if (i > 0 && j > 0 && this.tablero[i - 1][j - 1].mina) {
                    casilla.adyacentes++
                }
                if (i > 0 && this.tablero[i - 1][j].mina) {
                    casilla.adyacentes++
                }
                if (i > 0 && j < this.fy - 1 && this.tablero[i - 1][j + 1].mina) {
                    casilla.adyacentes++
                }
                if (j > 0 && this.tablero[i][j - 1].mina) {
                    casilla.adyacentes++
                }
                if (j < this.fy - 1 && this.tablero[i][j + 1].mina) {
                    casilla.adyacentes++
                }
                if (i < this.fx - 1 && j > 0 && this.tablero[i + 1][j - 1].mina) {
                    casilla.adyacentes++
                }
                if (i < this.fx - 1 && this.tablero[i + 1][j].mina) {
                    casilla.adyacentes++
                }
                if (i < this.fx - 1 && j < this.fy - 1 && this.tablero[i + 1][j + 1].mina) {
                    casilla.adyacentes++
                }
            }
        }
    }

    colocarBombas() {
        // Generar minas
        while (this.numMinas > 0) {
            let randomX = Math.floor(Math.random() * this.fx)
            let randomY = Math.floor(Math.random() * this.fy)
            if (!this.tablero[randomX][randomY].mina) {
                this.tablero[randomX][randomY].mina = 1
                console.log(`Bomba en (${randomX}, ${randomY})`)
                this.numMinas--
            }
        }
    }

}

class Casilla {
    mina
    adyacentes
    descubierta
    bandera

    constructor() {
        this.mina = 0
        this.adyacentes = 0
        this.descubierta = false
        this.bandera = false
    }
}

function anadirDOM(tablero) {
    let contenedor = document.getElementById("tablero");
    for (let i=0;i<tablero.fx;i++) {
        let filaDOM = document.createElement('div');
        filaDOM.setAttribute("id", "filaDiv")
        for (let j=0;j<tablero.fy;j++) {
            let casilla = document.createElement('div');

            casilla.classList.add("casilla");
            casilla.setAttribute("coordenadaX",i);
            casilla.setAttribute("coordenadaY",j);
             
            casilla.addEventListener("click",revelarCasilla);
            casilla.addEventListener("contextmenu",colocarBandera);
            filaDOM.appendChild(casilla);
        }
        contenedor.appendChild(filaDOM);
    }
}

function revelarCasilla(e) {
    let cellsToReveal = tablero.fx * tablero.fy - tablero.numMinas;
    let revealedCells = 0;

    const coordenadaX = parseInt(this.getAttribute("coordenadaX"));
    const coordenadaY = parseInt(this.getAttribute("coordenadaY"));
    console.log(`Casilla revelada en (${coordenadaX}, ${coordenadaY})`);
    if(tablero.tablero[coordenadaX][coordenadaY].mina){
        this.style.backgroundColor = "red"
        alert("Game over!")
        for (let i = 0; i < tablero.fx; i++) {
            for (let j = 0; j < tablero.fy; j++) {
                if(tablero.tablero[i][j].mina){
                    document.querySelector(`[coordenadaX="${i}"][coordenadaY="${j}"]`).style.backgroundColor = "red"
                }
            }
        }
    }else{
        this.style.backgroundColor = "grey"
        this.textContent=tablero.tablero[coordenadaX][coordenadaY].adyacentes
    }

    if (!tablero.tablero[coordenadaX][coordenadaY].mina) {
        revealedCells++;
        if (revealedCells === cellsToReveal) {
            alert("You Win!");
        }
    }
}

function colocarBandera(e) {
    const coordenadaX = parseInt(this.getAttribute("coordenadaX"));
    const coordenadaY = parseInt(this.getAttribute("coordenadaY"));
    console.log(`Bandera colocada en (${coordenadaX}, ${coordenadaY})`);
    if(tablero.tablero[coordenadaX][coordenadaY].bandera){
        this.style.backgroundColor = "blue"
    }else{
        this.style.backgroundColor = "white"
    }
}

function jugarDeNuevo(){
    location.reload();

}


function init() {
    tablero.colocarBombas()
    tablero.calcularCasillasAdyacentes()
    anadirDOM(tablero)
    console.log(tablero)
}
let tablero = new Tablero(4, 4, 2)
