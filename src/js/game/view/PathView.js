/**
 * @author ramki.g
 */
dojo.provide("game.view.PathView");

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
