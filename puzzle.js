// var rows = 4;
// var columns = 4;
// var turns = 0;
// var currTile, otherTile;
// var board = document.getElementById("board");
// var correctOrder = [];
// var pieces = [];

// window.onload = function() {
//     initBoard();
//     shufflePieces();
// };

// function initBoard() {
//     for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < columns; c++) {
//             let tile = document.createElement("img");
//             tile.src = "./images/blank.jpg"; // Initially blank

//             tile.setAttribute("data-value", r * columns + c + 1); // Store position in data-value
//             tile.addEventListener("dragstart", dragStart);
//             tile.addEventListener("dragover", dragOver);
//             tile.addEventListener("dragenter", dragEnter);
//             tile.addEventListener("dragleave", dragLeave);
//             tile.addEventListener("drop", dragDrop);
//             tile.addEventListener("dragend", dragEnd);

//             correctOrder.push(tile.src);
//             board.append(tile);
//         }
//     }
// }

// // Shuffle pieces and display them
// function shufflePieces() {
//     for (let i = 1; i <= rows * columns; i++) {
//         pieces.push(i);
//     }
//     pieces.sort(() => Math.random() - 0.5);

//     let pieceTiles = document.querySelectorAll("#board img");
//     for (let i = 0; i < pieceTiles.length; i++) {
//         let randomPiece = pieces[i];
//         pieceTiles[i].src = "./images/" + randomPiece + ".png"; // Change to shuffled images
//         pieceTiles[i].setAttribute("data-value", randomPiece);
//     }
// }

// function dragStart() {
//     currTile = this; // The tile that was clicked to drag
// }

// function dragOver(e) {
//     e.preventDefault();
// }

// function dragEnter(e) {
//     e.preventDefault();
// }

// function dragLeave() {

// }

// function dragDrop() {
//     otherTile = this;
// }

// function dragEnd() {
//     // Swap the images
//     let currImg = currTile.src;
//     let otherImg = otherTile.src;
//     currTile.src = otherImg;
//     otherTile.src = currImg;

//     // Swap the data-value as well
//     let currValue = currTile.getAttribute("data-value");
//     let otherValue = otherTile.getAttribute("data-value");
//     currTile.setAttribute("data-value", otherValue);
//     otherTile.setAttribute("data-value", currValue);

//     turns++;
//     document.getElementById("turns").innerText = turns;

//     // Check if the player has won
//     checkWin();
// }

// // Check if the current board configuration matches the correct order
// function checkWin() {
//     let tiles = document.querySelectorAll("#board img");
//     let isWin = true;
    
//     for (let i = 0; i < tiles.length; i++) {
//         let tileValue = tiles[i].getAttribute("data-value");
//         if (tileValue != (i + 1).toString()) {
//             isWin = false;
//         }
//         else {
//             tiles[i].removeEventListener("dragstart", dragStart);
//             tiles[i].removeEventListener("dragover", dragOver);
//             tiles[i].removeEventListener("dragenter", dragEnter);
//             tiles[i].removeEventListener("dragleave", dragLeave);
//             tiles[i].removeEventListener("drop", dragDrop);
//             tiles[i].removeEventListener("dragend", dragEnd);

//             tiles[i].style.opacity = "0.5";
//         }

//     }

//     if (isWin) {
//         document.getElementById("status").innerText = "Congratulations! You solved the puzzle!";

//         // 禁用所有拖拽功能
//         tiles.forEach(tile => {
//             tile.removeEventListener("dragstart", dragStart);
//             tile.removeEventListener("dragover", dragOver);
//             tile.removeEventListener("dragenter", dragEnter);
//             tile.removeEventListener("dragleave", dragLeave);
//             tile.removeEventListener("drop", dragDrop);
//             tile.removeEventListener("dragend", dragEnd);
//         });
//     }
// }

var rows = 4;
var columns = 4;
var turns = 0;
var currTile, otherTile;
var board = document.getElementById("board");
var correctOrder = [];
var pieces = [];

window.onload = function() {
    initBoard();
    shufflePieces();
};

function initBoard() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg"; // Initially blank

            tile.setAttribute("data-value", r * columns + c + 1); // Store position in data-value
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            // Add touch event listeners
            tile.addEventListener("touchstart", touchStart);
            tile.addEventListener("touchmove", touchMove);
            tile.addEventListener("touchend", touchEnd);

            correctOrder.push(tile.src);
            board.append(tile);
        }
    }
}

// Shuffle pieces and display them
function shufflePieces() {
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i);
    }
    pieces.sort(() => Math.random() - 0.5);

    let pieceTiles = document.querySelectorAll("#board img");
    for (let i = 0; i < pieceTiles.length; i++) {
        let randomPiece = pieces[i];
        pieceTiles[i].src = "./images/" + randomPiece + ".png"; // Change to shuffled images
        pieceTiles[i].setAttribute("data-value", randomPiece);
    }
}

// Drag and Drop events
function dragStart() {
    currTile = this; // The tile that was clicked to drag
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    swapTiles();
}

// Touch events for mobile
function touchStart(e) {
    currTile = e.target;
}

function touchMove(e) {
    e.preventDefault();
}

function touchEnd(e) {
    otherTile = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    if (otherTile && otherTile.tagName === "IMG") {
        swapTiles();
    }
}

// Swap the tiles
function swapTiles() {
    if (!otherTile || !currTile) return;

    // Swap the images
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    // Swap the data-value as well
    let currValue = currTile.getAttribute("data-value");
    let otherValue = otherTile.getAttribute("data-value");
    currTile.setAttribute("data-value", otherValue);
    otherTile.setAttribute("data-value", currValue);

    turns++;
    document.getElementById("turns").innerText = turns;

    // Check if the player has won
    checkWin();
}

// Check if the current board configuration matches the correct order
function checkWin() {
    let tiles = document.querySelectorAll("#board img");
    let isWin = true;
    
    for (let i = 0; i < tiles.length; i++) {
        let tileValue = tiles[i].getAttribute("data-value");
        if (tileValue != (i + 1).toString()) {
            isWin = false;
        } else {
            tiles[i].style.opacity = "0.5";
        }
    }

    if (isWin) {
        document.getElementById("status").innerText = "Congratulations! You solved the puzzle!";

        // Disable dragging and touch interactions
        tiles.forEach(tile => {
            tile.removeEventListener("dragstart", dragStart);
            tile.removeEventListener("dragover", dragOver);
            tile.removeEventListener("dragenter", dragEnter);
            tile.removeEventListener("dragleave", dragLeave);
            tile.removeEventListener("drop", dragDrop);
            tile.removeEventListener("dragend", dragEnd);

            tile.removeEventListener("touchstart", touchStart);
            tile.removeEventListener("touchmove", touchMove);
            tile.removeEventListener("touchend", touchEnd);
        });
    }
}