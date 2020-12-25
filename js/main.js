let puzzle = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]];

let sudokuBox = document.createElement('div');
sudokuBox.classList.add('sudoku');

for(let i = 1; i<=9; i++) {
    let row = document.createElement('div');
    row.classList.add('sudoku__row')
    for(let j = 1; j<=9; j++) {
        let cell = document.createElement('div');
        cell.id = `id`+`${i}` + `${j}`;
        cell.classList.add('sudoku__cell')
        row.append(cell)
    }
    sudokuBox.append(row)
}

document.body.append(sudokuBox);

let cells = document.querySelector('.sudoku');

for(let i = 0; i<puzzle.length; i ++) {
    for(let j=0; j <puzzle[i].length; j++) {
        cells.querySelector(`#id${i+1}${j+1}`).textContent = (puzzle[i][j] || '').toString();
    }
}

