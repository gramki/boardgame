/**
 * @author ramki.g
 */

dojo.provide("game.model.Intersection");

dojo.declare("game.model.Intersection", [], {
    constructor: function(){
        this.cells=[];
    },
    setCornerCell: function(corner, cell){
        this.cells[corner] = cell;
    }
});

