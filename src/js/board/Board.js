/**
 * @author ramki.g
 */
dojo.provide("board.Board");
dojo.require("board.Cell");

/*********************************************************
 *
 *
 *
 *               C7
 *            C3     C12
 *         C0    C8      C16
 *            C4     C13
 *         C1    C9      C17
 *            C5     C14
 *         C2    C10     C18
 *            C6     C15
 *               C11
 *
 *
 */
dojo.declare("board.Board", [], {
    constructor: function(){
        var c, s, i;
        c = this.cells = [];
        for (i = 0; i < 19; i++) {
            c[i] = new board.Cell(this);
            c[i].cellId = i;
        }
        s = c[0].SIDE;
        c[0].setCellOnSide(s.TOPRIGHT, c[3]);
        c[0].setCellOnSide(s.BOTTOMRIGHT, c[4]);
        c[0].setCellOnSide(s.BOTTOM, c[1]);
        
        c[1].setCellOnSide(s.TOPRIGHT, c[4]);
        c[1].setCellOnSide(s.BOTTOMRIGHT, c[5]);
        c[1].setCellOnSide(s.BOTTOM, c[2]);
        
        c[2].setCellOnSide(s.TOPRIGHT, c[5]);
        c[2].setCellOnSide(s.BOTTOMRIGHT, c[6]);
        
        // Second Column
        c[3].setCellOnSide(s.TOPRIGHT, c[7]);
        c[3].setCellOnSide(s.BOTTOMRIGHT, c[8]);
        c[3].setCellOnSide(s.BOTTOM, c[4]);
        
        c[4].setCellOnSide(s.TOPRIGHT, c[8]);
        c[4].setCellOnSide(s.BOTTOMRIGHT, c[9]);
        c[4].setCellOnSide(s.BOTTOM, c[5]);
        
        c[5].setCellOnSide(s.TOPRIGHT, c[9]);
        c[5].setCellOnSide(s.BOTTOMRIGHT, c[10]);
        c[5].setCellOnSide(s.BOTTOM, c[6]);
        
        c[6].setCellOnSide(s.TOPRIGHT, c[10]);
        c[6].setCellOnSide(s.BOTTOMRIGHT, c[11]);
        
        // third column        
        c[7].setCellOnSide(s.BOTTOMRIGHT, c[12]);
        c[7].setCellOnSide(s.BOTTOM, c[8]);
        
        c[8].setCellOnSide(s.TOPRIGHT, c[12]);
        c[8].setCellOnSide(s.BOTTOMRIGHT, c[13]);
        c[8].setCellOnSide(s.BOTTOM, c[9]);
        
        c[9].setCellOnSide(s.TOPRIGHT, c[13]);
        c[9].setCellOnSide(s.BOTTOMRIGHT, c[14]);
        c[9].setCellOnSide(s.BOTTOM, c[10]);
        
        c[10].setCellOnSide(s.TOPRIGHT, c[14]);
        c[10].setCellOnSide(s.BOTTOMRIGHT, c[15]);
        c[10].setCellOnSide(s.BOTTOM, c[11]);
        
        c[11].setCellOnSide(s.TOPRIGHT, c[15]);
        
        // fourth column        
        c[12].setCellOnSide(s.BOTTOMRIGHT, c[16]);
        c[12].setCellOnSide(s.BOTTOM, c[13]);
        
        c[13].setCellOnSide(s.TOPRIGHT, c[16]);
        c[13].setCellOnSide(s.BOTTOMRIGHT, c[17]);
        c[13].setCellOnSide(s.BOTTOM, c[14]);
        
        c[14].setCellOnSide(s.TOPRIGHT, c[17]);
        c[14].setCellOnSide(s.BOTTOMRIGHT, c[18]);
        c[14].setCellOnSide(s.BOTTOM, c[15]);
        
        c[15].setCellOnSide(s.TOPRIGHT, c[18]);
        
        //fifth column
        c[16].setCellOnSide(s.BOTTOM, c[17]);
        c[17].setCellOnSide(s.BOTTOM, c[18]);
        
        this._setPaths();
    },
    _setPaths: function(){
        var sides = [0, 1, 2, 3, 4, 5];
        dojo.forEach(this.cells, function(cell){
            dojo.forEach(sides, function(side){
                var path = cell.pathOnSide(side);
                path.addAdjacent(cell.pathOnSide(side == 0 ? 5 : side - 1));
                path.addAdjacent(cell.pathOnSide(side == 5 ? 0 : side + 1));
            });
        });
        var boundaryPath = [{
            cell: 0,
            side: 0
        }, {
            cell: 3,
            side: 5
        }, {
            cell: 3,
            side: 0
        }, {
            cell: 7,
            side: 5
        }, {
            cell: 7,
            side: 0
        }, {
            cell: 7,
            side: 1
        }, {
            cell: 12,
            side: 0
        }, {
            cell: 12,
            side: 1
        }, {
            cell: 16,
            side: 0
        }, {
            cell: 16,
            side: 1
        }, {
            cell: 16,
            side: 2
        }, {
            cell: 17,
            side: 1
        }, {
            cell: 17,
            side: 2
        }, {
            cell: 18,
            side: 1
        }, {
            cell: 18,
            side: 2
        }, {
            cell: 18,
            side: 3
        }, {
            cell: 15,
            side: 2
        }, {
            cell: 15,
            side: 3
        }, {
            cell: 11,
            side: 2
        }, {
            cell: 11,
            side: 3
        }, {
            cell: 11,
            side: 4
        }, {
            cell: 6,
            side: 3
        }, {
            cell: 6,
            side: 4
        }, {
            cell: 2,
            side: 3
        }, {
            cell: 2,
            side: 4
        }, {
            cell: 2,
            side: 5
        }, {
            cell: 1,
            side: 4
        }, {
            cell: 1,
            side: 5
        }, {
            cell: 0,
            side: 4
        }, {
            cell: 0,
            side: 5
        }, {
            cell: 0,
            side: 0
        }];
        dojo.forEach(boundaryPath, function(segment, index){
            var nextSegment = boundaryPath[index + 1];
            if (!nextSegment) {
                return;
            }
            segment = this.cells[segment.cell].pathOnSide(segment.side);
            nextSegment = this.cells[nextSegment.cell].pathOnSide(nextSegment.side);
            segment.addAdjacent(nextSegment);
            nextSegment.addAdjacent(segment);
        }, this);
        
    },
    cellCoordinates: function(cellId){
        var start = [];
        start[0] = {
            x: 0,
            y: root3 * r
        };
        start[1] = {
            x: 0,
            y: 2 * root3 * r
        };
        start[2] = {
            x: 0,
            y: 3 * root3 * r
        };
        start[3] = {
            x: 3 / 2 * r,
            y: root3 / 2 * r
        };
        start[4] = {
            x: 3 / 2 * r,
            y: 3 * root3 / 2 * r
        };
        start[5] = {
            x: 3 / 2 * r,
            y: 5 * root3 / 2 * r
        };
        start[6] = {
            x: 3 / 2 * r,
            y: 7 * root3 / 2 * r
        };
        start[7] = {
            x: 3 * r,
            y: 0
        };
        start[8] = {
            x: 3 * r,
            y: root3 * r
        };
        start[9] = {
            x: 3 * r,
            y: 2 * root3 * r
        };
        start[10] = {
            x: 3 * r,
            y: 3 * root3 * r
        };
        start[11] = {
            x: 3 * r,
            y: 4 * root3 * r
        };
        start[12] = {
            x: 9 / 2 * r,
            y: root3 / 2 * r
        };
        start[13] = {
            x: 9 / 2 * r,
            y: 3 * root3 / 2 * r
        };
        start[14] = {
            x: 9 / 2 * r,
            y: 5 * root3 / 2 * r
        };
        start[15] = {
            x: 9 / 2 * r,
            y: 7 * root3 / 2 * r
        };
        start[16] = {
            x: 6 * r,
            y: root3 * r
        };
        start[17] = {
            x: 6 * r,
            y: 2 * root3 * r
        };
        start[18] = {
            x: 6 * r,
            y: 3 * root3 * r
        };
        return start[cellId];
    },
    allSideCoordinates: function(r){
        var sides = [{
            x: r / 2,
            y: 0
        }, {
            x: 3 / 2 * r,
            y: 0
        }, {
            x: 2 * r,
            y: root3 / 2 * r
        }, {
            x: 3 / 2 * r,
            y: root3 * r
        }, {
            x: r / 2,
            y: root3 * r
        }, {
            x: 0,
            y: root3 / 2 * r
        }, {
            x: r / 2,
            y: 0
        }];
        return sides;
    },
    
    /*
     *               C7
     *            C3     C12
     *         C0    C8      C16
     *            C4     C13
     *         C1    C9      C17
     *            C5     C14
     *         C2    C10     C18
     *            C6     C15
     *               C11
     */
    testCells: function(){
        var adj = {
            0: [3, 4, 1],
            1: [0, 4, 5, 2],
            2: [1, 5, 6],
            3: [0, 4, 7, 8],
            4: [0, 1, 3, 5, 8, 9],
            5: [1, 2, 4, 6, 9, 10],
            6: [2, 5, 10, 11],
            7: [3, 8, 12],
            8: [3, 4, 7, 9, 12, 13],
            9: [4, 5, 8, 10, 13, 14],
            10: [5, 6, 9, 11, 14, 15],
            11: [6, 10, 15],
            12: [7, 8, 13, 16],
            13: [8, 9, 12, 14, 16, 17],
            14: [9, 10, 13, 15, 17, 18],
            15: [10, 11, 14, 18],
            16: [12, 13, 17],
            17: [13, 14, 16, 18],
            18: [14, 15, 17]
        };
        var c = this.cells;
        var correctCellLayout = dojo.every(this.cells, function(cell, index){
            var adjacent = dojo.map(adj[index], function(cellIndex){
                return c[cellIndex];
            });
            var allAdjacent = dojo.every(cell.adjCells, function(aCell){
                if (aCell && aCell.isValid()) {
                    if (-1 === dojo.indexOf(adjacent, aCell)) {
                        return false;
                    }
                }
                return true;
            });
            if (!allAdjacent) {
                console.error("Invalid adjacency list for cell at index " + index, cell);
                return false;
            }
            return true;
        });
        if (!correctCellLayout) {
            return false;
        }
        return true;
    }
});
