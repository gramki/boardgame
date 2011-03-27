/**
 * @author ramki.g
 */

dojo.provide("board.Intersection");

dojo.declare("board.Intersection", [], {
    constructor: function(){
        this.cells=[];
    },
    setCornerCell: function(corner, cell){
        this.cells[corner] = cell;
    }
});

