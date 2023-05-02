import { makeAutoObservable } from "mobx";

class Field {
  squares = [];
  rows = 15;
  columns = 15;
  complexity = 0.1;
  numberCleanSquares = 0;
  numberOpenSquares = 0;
  numberBombs = 0;
  start = false;
  play = true;
  win = false;

  constructor() {
    makeAutoObservable(this);
    this.makeSquares();
  }

  makeSquares() {
    this.play = true;
    this.squares = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.columns }, () => ({
        bomb: false,
        flag: false,
        open: false,
        status: 0,
      }))
    );
    this.start = false;
    this.numberCleanSquares = this.rows * this.columns;
    this.numberOpenSquares = 0;
    this.numberBombs = 0;
    this.win = false;
  }
  fillSquares(x, y) {
    this.start = true;
    const bombs = Math.round(this.rows * this.columns * this.complexity);
    this.numberCleanSquares = this.rows * this.columns - bombs;
    while (this.numberBombs < bombs) {
      const bombX = Math.floor(Math.random() * this.rows);
      const bombY = Math.floor(Math.random() * this.columns);
      if (
        (bombX - x) ** 2 + (bombY - y) ** 2 > 2 &&
        !(bombX === x || bombY === y) &&
        !this.squares[bombX][bombY].bomb
      ) {
        this.squares[bombX][bombY].bomb = true;
        this.numberBombs++;
      }
    }
  }
  openSquare(x, y) {
    if (!this.play || this.squares[x][y].flag) return;
    this.squares[x][y].open = true;
    if (!this.start) this.fillSquares(x, y);
    if (this.squares[x][y].bomb) {
      this.squares[x][y].status = -1;
      this.play = false;
      return;
    }
    let result = this.countBombs(x, y);
    if (result === 0) {
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          if (this.checkSquare(i, j) && !this.squares[i][j].open)
            this.openSquare(i, j);
        }
      }
    }
    this.squares[x][y].status = result;
    this.numberOpenSquares++;
    if (this.numberOpenSquares === this.numberCleanSquares) this.win = true;
  }
  countBombs(x, y) {
    let result = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (this.checkSquare(i, j) && this.squares[i][j].bomb) result++;
      }
    }
    return result;
  }
  checkSquare(x, y) {
    if (x > -1 && y > -1 && x < this.rows && y < this.columns) {
      return true;
    } else return false;
  }
  makeFlag(x, y) {
    this.squares[x][y].flag = !this.squares[x][y].flag;
  }
  changeSize(rows, columns) {
    this.rows = rows;
    this.columns = columns;
  }
  changeComplexity(complexity) {
    this.complexity = complexity;
  }
}

export default new Field();
