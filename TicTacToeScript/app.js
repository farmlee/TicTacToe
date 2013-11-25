/// <reference path="jquery.d.ts" />
var currCanvas;
var mark = [];
var turn;
var firstcell;

var cell = (function () {
    function cell() {
    }
    return cell;
})();

function canvasClicked(canvasnumber) {
    var row = Math.floor(canvasnumber / 3);
    var column = canvasnumber % 3;
    if (mark[row][column] == '') {
        if (turn == 1) {
            markX(canvasnumber);
        } else {
            markO(canvasnumber);
        }
    }

    computerturn();
}

function computerturn() {
    var comp;
    var opp;
    if (turn == 0) {
        comp = 'O';
        opp = 'X';
    } else {
        comp = 'X';
        opp = 'O';
    }

    //#1 CHECK TO WIN
    var win = checkToWinOrBlock(comp, opp, comp);

    if (win == false) {
        var block = checkToWinOrBlock(comp, opp, opp);
    }
    //#3 CREATE FORK
    //#4 BLOCK FORK
    //#5 CENTER
    //#6 OPPOSITE CORNER
    //#7 EMPTY CORNER
    //#8 EMPTY SIDE
}

function checkToWinOrBlock(comp, opp, compare) {
    for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
            if (verify(a, b + 1) && verify(a, b + 2)) {
                if (mark[a][b] == mark[a][b + 1] && mark[a][b] == compare) {
                    if (mark[a][b + 2] == '') {
                        //win in 3rd box
                        mark[a][b + 2] = comp;
                        var canvasnumber = a * 3 + (b + 2);
                        if (comp == 'X') {
                            markX(canvasnumber);
                            return true;
                        }
                        if (comp == 'O') {
                            markO(canvasnumber);
                            return true;
                        }
                    }
                }
                if (mark[a][b + 1] == mark[a][b + 2] && mark[a][b + 1] == compare) {
                    if (mark[a][b] == '') {
                        mark[a][b] = comp;
                        var canvasnumber = a * 3 + b;
                        if (comp == 'X') {
                            markX(canvasnumber);
                            return true;
                        }
                        if (comp == 'O') {
                            markO(canvasnumber);
                            return true;
                        }
                    }
                }
                if (mark[a][b] == mark[a][b + 2] && mark[a][b] == compare) {
                    if (mark[a][b + 1] == '') {
                        mark[a][b + 1] = comp;
                        var canvasnumber = (a * 3) + b + 1;
                        if (comp == 'X') {
                            markX(canvasnumber);
                            return true;
                        }
                        if (comp == 'O') {
                            markO(canvasnumber);
                            return true;
                        }
                    }
                }
            }

            if (verify(a + 1, b) && verify(a + 2, b)) {
                if (mark[a][b] == mark[a + 1][b] && mark[a][b] == compare) {
                    if (mark[a + 2][b] == '') {
                        //win in 3rd box
                        mark[a + 2][b] = comp;
                        var canvasnumber = (a + 2) * 3 + b;
                        if (comp == 'X') {
                            markX(canvasnumber);
                            return true;
                        }
                        if (comp == 'O') {
                            markO(canvasnumber);
                            return true;
                        }
                    }
                }
                if (mark[a + 1][b] == mark[a + 2][b] && mark[a + 1][b] == compare) {
                    if (mark[a][b] == '') {
                        mark[a][b] = comp;
                        var canvasnumber = (a * 3) + b;
                        if (comp == 'X') {
                            markX(canvasnumber);
                            return true;
                        }
                        if (comp == 'O') {
                            markO(canvasnumber);
                            return true;
                        }
                    }
                }
                if (mark[a][b] == mark[a + 2][b] && mark[a][b] == compare) {
                    if (mark[a + 1][b] == '') {
                        mark[a + 1][b] = comp;
                        var canvasnumber = (a + 1) * 3 + b;
                        if (comp == 'X') {
                            markX(canvasnumber);
                            return true;
                        }
                        if (comp == 'O') {
                            markO(canvasnumber);
                            return true;
                        }
                    }
                }
            }

            if (verify(a + 1, b + 1) && verify(a + 2, b + 2)) {
                if (mark[a][b] == mark[a + 1][b + 1] && mark[a][b] == compare) {
                    if (mark[a + 2][b + 2] == '') {
                        //win in 3rd box
                        mark[a + 2][b + 2] = comp;
                        var canvasnumber = (a + 2) * 3 + b + 2;
                        if (comp == 'X') {
                            markX(canvasnumber);
                            return true;
                        }
                        if (comp == 'O') {
                            markO(canvasnumber);
                            return true;
                        }
                    }
                }
            }

            if (verify(a + 1, b - 1) && verify(a + 2, b - 2)) {
                if (mark[a][b] == mark[a + 1][b - 1] && mark[a][b] == compare) {
                    if (mark[a + 2][b - 2] == '') {
                        //win in 3rd box
                        mark[a + 2][b - 2] = comp;
                        var canvasnumber = (a + 2) * 3 + b - 2;
                        if (comp == 'X') {
                            markX(canvasnumber);
                            return true;
                        }
                        if (comp == 'O') {
                            markO(canvasnumber);
                            return true;
                        }
                    }
                }
            } else {
                return false;
            }
        }
    }
}

function createFork(input) {
    var check = input;
    for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
            if (mark[a][b] == '') {
                var WinPositions = countFork(a, b, check);
            }
        }
    }
}

function countFork(row, column, check) {
    mark[row][column] = check;
    for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
        }
    }

    mark[row][column] = '';
}

function verify(row, column) {
    if (row > 2 || column > 2)
        return false;
else
        return true;
}

function setUp() {
    for (var d = 0; d < 3; d++) {
        mark[d] = [];
        for (var f = 0; f < 3; f++) {
            mark[d][f] = '';
        }
    }
    turn = 1;
}

function markX(canvasnumber) {
    currCanvas = "canvas" + canvasnumber;
    var canvasElement = document.getElementById(currCanvas);
    var c = canvasElement.getContext("2d");

    c.beginPath();
    c.moveTo(10, 10);
    c.lineTo(40, 40);
    c.moveTo(40, 10);
    c.lineTo(10, 40);
    c.stroke();
    c.closePath();
    var row = Math.floor(canvasnumber / 3);
    var column = canvasnumber % 3;
    mark[row][column] = 'X';
    turn = 0;
}

function markO(canvasnumber) {
    currCanvas = "canvas" + canvasnumber;
    var canvasElement = document.getElementById(currCanvas);
    var c = canvasElement.getContext("2d");

    c.beginPath();
    c.arc(25, 25, 20, 0, Math.PI * 2, true);
    c.stroke();
    c.closePath();
    var row = Math.floor(canvasnumber / 3);
    var column = canvasnumber % 3;
    mark[row][column] = 'O';
    turn = 1;
}

window.onload = function () {
    setUp();
};
//# sourceMappingURL=app.js.map
