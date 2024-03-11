class Tablero {
    constructor(fx, fy, numMinas, numBanderas) {
        this.fx = fx;
        this.fy = fy;
        this.numMinas = numMinas;
        this.numBanderas = numBanderas;
        this.tablero = this.generarTablero();
    }

    generarTablero() {
        let tablero = [];
        for (let i = 0; i < this.fx; i++) {
            let fila = [];
            for (let j = 0; j < this.fy; j++) {
                let casilla = new Casilla();
                fila.push(casilla);
            }
            tablero.push(fila);
        }
        return tablero;
    }

    calcularCasillasAdyacentes() {
        for (let i = 0; i < this.fx; i++) {
            for (let j = 0; j < this.fy; j++) {
                let casilla = this.tablero[i][j];

                if (i > 0 && j > 0 && this.tablero[i - 1][j - 1].mina) {
                    casilla.adyacentes++;
                }
                if (i > 0 && this.tablero[i - 1][j].mina) {
                    casilla.adyacentes++;
                }
                if (i > 0 && j < this.fy - 1 && this.tablero[i - 1][j + 1].mina) {
                    casilla.adyacentes++;
                }
                if (j > 0 && this.tablero[i][j - 1].mina) {
                    casilla.adyacentes++;
                }
                if (j < this.fy - 1 && this.tablero[i][j + 1].mina) {
                    casilla.adyacentes++;
                }
                if (i < this.fx - 1 && j > 0 && this.tablero[i + 1][j - 1].mina) {
                    casilla.adyacentes++;
                }
                if (i < this.fx - 1 && this.tablero[i + 1][j].mina) {
                    casilla.adyacentes++;
                }
                if (i < this.fx - 1 && j < this.fy - 1 && this.tablero[i + 1][j + 1].mina) {
                    casilla.adyacentes++;
                }
            }
        }
    }

    colocarBombas() {
        while (this.numMinas > 0) {
            let randomX = Math.floor(Math.random() * this.fx);
            let randomY = Math.floor(Math.random() * this.fy);
            if (!this.tablero[randomX][randomY].mina) {
                this.tablero[randomX][randomY].mina = 1;
                console.log(`Bomba en (${randomX}, ${randomY})`);
                this.numMinas--;
            }
        }
    }
}