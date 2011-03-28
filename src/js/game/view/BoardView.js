
dojo.provide("game.view.BoardView");

var root3 = 1.732;

dojo.declare("game.view.CellView", [], {
    constructor: function(boardView, cellId){
        var s = boardView.surface;
        var b = boardView.board;
        var r = boardView.radius;
        
        this.boardView = boardView;
        this.cellId = cellId;
        this.cell = boardView.board.cellById(cellId);
        
        var hex = s.createPolyline(this.pathCoordinates(r));
        hex.setStroke({
            color: 'blue',
            width: 2
        });
        this.hex = hex;
    },
    getShape: function(){
        return this.hex;
    },
    pathCoordinates: function(r){
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
    }
});
game.view.CellView.pathCoordinates = game.view.CellView.prototype.pathCoordinates;


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

dojo.declare("game.view.PathView", [], {
    constructor: function(boardView, cellId, side){
        this.boardView = boardView;
        this.path = boardView.board.cellById(cellId).pathOnSide(side);
        this.side = side;
        this.cellId = cellId;
        this.draw();
        this.connectShapeEvents();
    },
    draw: function(){
        var s = game.model.Cell.SIDE;
        var r = this.boardView.radius;
        var points = game.view.CellView.pathCoordinates(r);
        var side = this.side;
        var start = points[side];
        var end = points[side + 1];
        var line = this.boardView.surface.createLine({
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y
        });
        line.setStroke({
            color: 'yellow',
            width: 8
        });
        var move = this.boardView.cellCoordinates(this.cellId);
        line.applyTransform(dojox.gfx.matrix.translate(move.x, move.y));
        this.line = line;
    },
    connectShapeEvents: function(){
        var line = this.line;
        line.connect('mouseover', dojo.hitch(this, function(){
            this.line.setStroke({
                color: 'blue',
                width: 8
            });
            //temporary, remove adjacent highlighting later
            if (this.path) {
                dojo.forEach(this.path.adjPaths, function(adj){
                    var pathView = this.boardView.paths[adj.id];
                    pathView.getShape().setStroke({
                        color: 'red',
                        width: 8
                    });
                }, this);
            };
                    }));
        line.connect('mouseout', dojo.hitch(this, function(){
            this.line.setStroke({
                color: 'yellow',
                width: 8
            });
            if (this.path) {
                dojo.forEach(this.path.adjPaths, function(adj){
                    var pathView = this.boardView.paths[adj.id];
                    pathView.getShape().setStroke({
                        color: 'yellow',
                        width: 8
                    });
                }, this);
            };
                    }));
    },
    getShape: function(){
        return this.line;
    }
});

