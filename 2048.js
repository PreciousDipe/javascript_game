// Declare a variable to represent the game board
var board;
// Initialize the score to 0
var score = 0;
// Set the number of rows in the game board
var rows = 4;
// Set the number of columns in the game board
var columns = 4;

// When the window is loaded, execute the setGame function
window.onload = function() {
    setGame();
}

// Define the setGame function
function setGame() {
    //Initialize the board as a 4x4 grid, filled with zeros
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ]
    // Iterate over each row
    for (let row = 0; row < rows; row++) {
        // Iterate over each column in the current row
        for (let column = 0; column < columns; column++) {
            //creates a div tag
            let tile = document.createElement("div");
            //adds an id to the div tag and assigns it to the tile variable
            //like this <div id="0-0"></div>
            tile.id = row.toString() + "-" + column.toString();
            //gets the number from the tile
            let num = board[row][column];
            //used to update the tile
            updateTile(tile, num);
            //adds style div tag to board
            document.getElementById("board").append(tile); 

        }
        
    }
    setTwo();
    setTwo();
}
function hasEmptyTile() {
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (board[row][column] == 0) {
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    // Create two random numbers
    let found = false;
    while (!found) {
        let randomRow = Math.floor(Math.random() * rows); // 0 - 1 * 4 = 0, 3
        let randomColumn = Math.floor(Math.random() * columns);

        if (board[randomRow][randomColumn] == 0) {
            board[randomRow][randomColumn] = 2;
            let tile = document.getElementById(randomRow.toString() + "-" + randomColumn.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }

    }
}
//function to update the tile
function updateTile(tile, num) {
    //clears the tile
    tile.innerText = "";
    //clears the class list
    tile.classList.value = "";
    //adds the class back to the tile
    tile.classList.add("tile");
    //checks if the number is greater than 0
    if (num > 0) {
        tile.innerText = num;
        //set any number less than or equal to 4096 to a class
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else{
            tile.classList.add("x16384");
        }
    }
}

//creates the sliding logic using the keydown, keyup, keyleft and keyright
document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (event.code === "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (event.code === "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (event.code === "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
    
})

function fliterZero(rowArr){
    return rowArr.filter(num => num != 0); //creates a new array that follows the condition
}
function slide(rowArr) {
    //[0, 2, 2, 2]
    rowArr = fliterZero(rowArr); //gets rid of zeros => [2, 2, 2]
    
    //slide 
    for (let i = 0; i < rowArr.length - 1; i++) {
        //checks every 2
        if (rowArr[i] == rowArr[i + 1]) {
            rowArr[i] *= 2;
            rowArr[i + 1] = 0;
            score += rowArr[i];
        } // [2, 2, 2] => [4, 0, 2]
    }

    rowArr = fliterZero(rowArr); //gets rid of zeros => [4, 2]

    //adds zeros back => [4, 2, 0, 0]
    while (rowArr.length < columns) {
        rowArr.push(0);
    }
    return rowArr;

}

function slideLeft() {
    for (let row = 0; row < rows; row++) {
        let rowArr = board[row];
        rowArr = slide(rowArr); 
        board[row] = rowArr;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(row.toString() + "-" + c.toString());
            let num = board[row][c];
            updateTile(tile, num);
        }

    }
}

function slideRight() {
    for (let row = 0; row < rows; row++) {
        let rowArr = board[row];
        rowArr.reverse();
        rowArr = slide(rowArr);
        rowArr.reverse(); 
        board[row] = rowArr;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(row.toString() + "-" + c.toString());
            let num = board[row][c];
            updateTile(tile, num);
        }

    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let columnArr = [];
        for (let row = 0; row < rows; row++) {
            columnArr.push(board[row][c]);
        }
        columnArr = slide(columnArr);
        for (let row = 0; row < rows; row++) {
            board[row][c] = columnArr[row];
            let tile = document.getElementById(row.toString() + "-" + c.toString());
            let num = board[row][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let columnArr = [];
        columnArr.reverse();
        for (let row = 0; row < rows; row++) {
            columnArr.push(board[row][c]);
        }
        columnArr = slide(columnArr);
        columnArr.reverse();
        for (let row = 0; row < rows; row++) {
            board[row][c] = columnArr[row];
            let tile = document.getElementById(row.toString() + "-" + c.toString());
            let num = board[row][c];
            updateTile(tile, num);
        }
    }
}

function checkLose() {
    // Check if there is any empty cell
    for (let row = 0; row < rows; row++) {
        for (let c = 0; c < columns; c++) {
            if (board[row][col] == 0) {
                return false; // There's an empty cell, so the player hasn't lost yet
            }
        }
    }
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns - 1; col++) {
            if (board[row][col] == board[row][col + 1]) {
                return false; // Adjacent horizontal cells can be combined, so the player hasn't lost yet
            }
        }
    }
    for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows - 1; row++) {
            if (board[row][col] == board[row + 1][col]) {
                return false; // Adjacent vertical cells can be combined, so the player hasn't lost yet
            }
        }
    }
    return true;
}



