/**
 * @author ramki.g
 */
dojo.provide("game.view.CellView");

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