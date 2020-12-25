let puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]];

let sudokuBox = document.createElement('div');
sudokuBox.classList.add('sudoku');

for (let i = 1; i <= 9; i++) {
    let row = document.createElement('div');
    row.classList.add('sudoku__row')
    for (let j = 1; j <= 9; j++) {
        let cell = document.createElement('div');
        cell.id = `id` + `${i}` + `${j}`;
        cell.classList.add('sudoku__cell')
        row.append(cell)
    }
    sudokuBox.append(row)
}

document.body.append(sudokuBox);


function fillSudoku() {
    let cells = document.querySelector('.sudoku');
    for (let i = 0; i < puzzle.length; i++) {
        for (let j = 0; j < puzzle[i].length; j++) {
            cells.querySelector(`#id${i + 1}${j + 1}`).textContent = (puzzle[i][j] || '').toString();
        }
    }
}

fillSudoku();


//находим вероятности
for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
        if (puzzle[i][j] === 0) {
            puzzle[i][j] = findPoss(puzzle, i, j)
        }
    }
}

function findHorizontalPos(puzzle, i, j) {
    let numbers = Array(...Array(9)).map((item, index) => index + 1);
    let contains = [];

    puzzle[i].forEach((pItem) => {
        if (pItem !== 0 && Number.isInteger(pItem)) contains.push(pItem)
    })

    for (let i = 0; i < numbers.length; i++) {
        if (contains.includes(numbers[i])) numbers[i] = 0;
    }

    let possibles = [];
    numbers.forEach(item => {
        if (item !== 0) possibles.push(item);
    })

    return possibles;
}

function findVerticalPos(puzzle, i, j) {
    let numbers = Array(...Array(9)).map((item, index) => index + 1);
    let contains = [];

    puzzle.forEach((pItem) => {
        if (Number.isInteger(pItem[j])) contains.push(pItem[j])
    })

    for (let i = 0; i < numbers.length; i++) {
        if (contains.includes(numbers[i])) numbers[i] = 0;
    }
    let possibles = [];
    numbers.forEach(item => {
        if (item !== 0) possibles.push(item);
    })

    return possibles;
}

function findBoxPos(puzzle, i, j) {
    let numbers = Array(...Array(9)).map((item, index) => index + 1);
    let contains = [];

    let hMulty = 0;
    let vMulty = 0;

    if(i < 3) {hMulty = 0}
    if(i>=3 && i<6) {hMulty = 1}
    if(i>=6) {hMulty = 2}

    if(j < 3) {vMulty = 0}
    if(j>=3 && j<6) {vMulty = 1}
    if(j>=6) {vMulty = 2}

    for(let x = hMulty*3; x <(hMulty+1)*3; x++) {
        for(let y = vMulty*3; y <(vMulty+1)*3; y++) {
            if (Number.isInteger(puzzle[x][y])) contains.push(puzzle[x][y])
        }
    }

    for (let i = 0; i < numbers.length; i++) {
        if (contains.includes(numbers[i])) numbers[i] = 0;
    }
    let possibles = [];
    numbers.forEach(item => {
        if (item !== 0) possibles.push(item);
    })

    return possibles;
}

function findPoss(puzzle, i, j) {
    let hPos = findHorizontalPos(puzzle, i, j);
    let vPos = findVerticalPos(puzzle, i, j);
    let bPos = findBoxPos(puzzle, i, j);

    let possibles = [];

    hPos.forEach(item => {
        if(vPos.includes(item) && bPos.includes(item)) possibles.push(item);
    })

    return possibles;
}

fillSudoku();

