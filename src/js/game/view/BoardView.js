
dojo.provide("game.view.BoardView");

var root3 = 1.732;

dojo.require("game.view.CellView");
dojo.require("game.view.PathView");


dojo.declare("game.view.BoardView", [], {
    constructor: function(board, surface, radius){
        this.board = board;
        this.surface = surface;
        this._g = surface.createGroup();
        this.radius = radius ? radius : 100;
    },
    clear: function(){
    
    },
    draw: function(){
        var cells = [];
        var coords;
        var r = this.radius;
        for (var i = 0; i < 19; i++) {
            cells[i] = game.view.CellView(this, i);
            coords = this.cellCoordinates(i);
            cells[i].getShape().applyTransform(dojox.gfx.matrix.translate(coords.x, coords.y));
            this._g.add(cells[i].getShape());
        }
        var paths = {};
        var sides = [0, 1, 2, 3, 4, 5];
        dojo.forEach(this.board.cells, function(cell){
            dojo.forEach(sides, function(side){
                var path = cell.pathOnSide(side);
                if (!paths[path.id]) {
                    var pathView = game.view.PathView(this, cell.cellId, side);
                    paths[path.id] = pathView;
                    this._g.add(pathView.getShape());
                }
            }, this);
        }, this);
        this.cells = cells;
        this.paths = paths;
        this._g.applyTransform(dojox.gfx.matrix.translate(0, 10));
    },
    cellCoordinates: function(cellId){
        var r = this.radius;
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
    }
});

