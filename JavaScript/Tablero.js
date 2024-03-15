class Tablero {
    constructor(fx, fy, numMinas) {
        this.fx = fx;
        this.fy = fy;
        this.numMinas = numMinas;
        this.numBanderas = numMinas;
        this.casillas = this.generarTablero();
    }

    generarTablero() {
        let casillas = [];
        for (let i = 0; i < this.fx; i++) {
            let fila = [];
            for (let j = 0; j < this.fy; j++) {
                let casilla = new Casilla();
                fila.push(casilla);
            }
            casillas.push(fila);
        }
        return casillas;
    }

    calcularCasillasAdyacentes() {
        for (let i = 0; i < this.fx; i++) {
            for (let j = 0; j < this.fy; j++) {
                let casilla = this.casillas[i][j];
                for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, this.fx - 1); x++) {
                    for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, this.fy - 1); y++) {
                        if (x !== i || y !== j) {
                            if (this.casillas[x][y].mina) {
                                casilla.adyacentes++;
                            }
                        }
                    }
                }
            }
        }
    }

    colocarBombas() {
        while (this.numMinas > 0) {
            let randomX = Math.floor(Math.random() * this.fx);
            let randomY = Math.floor(Math.random() * this.fy);
            if (!this.casillas[randomX][randomY].mina) {
                this.casillas[randomX][randomY].mina = 1;
                console.log(`Bomba en (${randomX}, ${randomY})`);
                this.numMinas--;
            }
        }
    }

}
