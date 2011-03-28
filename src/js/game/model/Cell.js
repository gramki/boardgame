/**
 * @author ramki.g
 */

dojo.provide("game.model.Cell");
dojo.require("game.model.Intersection");
dojo.require("game.model.Path");

/*
 * 
 *                    TOP
 *                 5------- 0
 *                 /       \
 *                /         \
 *               /           \ 1
 *              4\           /
 *                \         /
 *                 \       /
 *                 3------- 2
 *                  BOTTOM
 */
dojo.declare("game.model.Cell",[],{
    SIDE: {
        TOP: 0,
        TOPRIGHT: 1,
        BOTTOMRIGHT: 2,
        BOTTOM: 3,
        BOTTOMLEFT: 4,
        TOPLEFT: 5
    },
    RESOURCE: {
        WOOD: 1,
        BRICK: 2,
        IRON: 3,
        SHEEP: 4,
        FOOD: 5,
        BARREN: 6,
        NOT_PART_OF_GAME: 7
    },
    constructor: function(board){
        this.resource = this.RESOURCE.NOT_PART_OF_GAME;
        this.board = board;
        this.adjCells = [];
        this.paths = [];
        this.corners = [];
        this.thief = false;
        this.diceValue = 0;
        this._createPaths();
        this._createCorners();
    },
    _createPaths: function(){
        for(var i=0; i<6; i++){
            var path = new game.model.Path();
            this.paths[i] = path;
        }
    },
    _createCorners: function(){
        for(var i=0; i<6; i++){
            var intersection = new game.model.Intersection();
            this.corners[i] = intersection;
            intersection.setCornerCell(i, this);
        }
    },
    isValid: function(){
        return this.resource === this.RESOURCE.NOT_PART_OF_GAME;
    },
    diceValue: function(){
        return this.diceValue;
    },
    setDiceValue: function(/*Number {2..12}-{7}*/ value){
        this.diceValue = value;
        return this;
    },
    cellOnSide: function(/*game.model.Cell.SIDE*/ side){
        var cell = this.adjCells[side];
        return cell?cell:this.INVALID_CELL;
    },
    setCellOnSide: function(/*game.model.Cell.SIDE*/ side, /*game.model.Cell*/ cell){
        this.adjCells[side] = cell;
        //Merge Paths
        var s = this.SIDE;
        switch(side){
            case s.TOP:
                cell.adjCells[s.BOTTOM] = this;
                cell.paths[s.BOTTOM] = this.paths[s.TOP];                
                cell.corners[2] = this.corners[0];
                cell.corners[3] = this.corners[5];
                cell.corners[2].setCornerCell(2, cell);
                cell.corners[3].setCornerCell(3, cell);
                break;
            case s.TOPRIGHT:
                cell.adjCells[s.BOTTOMLEFT] = this;
                cell.paths[s.BOTTOMLEFT] = this.paths[s.TOPRIGHT];
                cell.corners[4] = this.corners[0];
                cell.corners[3] = this.corners[1];
                cell.corners[4].setCornerCell(4, cell);
                cell.corners[3].setCornerCell(3, cell);
                break;
            case s.BOTTOMRIGHT:
                cell.adjCells[s.TOPLEFT] = this;
                cell.paths[s.TOPLEFT] = this.paths[s.BOTTOMRIGHT];
                cell.corners[5] = this.corners[1];
                cell.corners[4] = this.corners[2];
                cell.corners[5].setCornerCell(5, cell);
                cell.corners[4].setCornerCell(4, cell);
                break;
            case s.BOTTOM:
                cell.adjCells[s.TOP] = this;
                cell.paths[s.TOP] = this.paths[s.BOTTOM];
                cell.corners[0] = this.corners[2];
                cell.corners[5] = this.corners[3];
                cell.corners[0].setCornerCell(0, cell);
                cell.corners[5].setCornerCell(5, cell);
                break;
            case s.BOTTOMLEFT:
                cell.adjCells[s.TOPRIGHT] = this;
                cell.paths[s.TOPRIGHT] = this.paths[s.BOTTOMLEFT];
                cell.corners[0] = this.corners[4];
                cell.corners[1] = this.corners[3];
                cell.corners[0].setCornerCell(0, cell);
                cell.corners[1].setCornerCell(1, cell);
                break;
            case s.TOPLEFT:
                cell.adjCells[s.BOTTOMRIGHT] = this;
                cell.paths[s.BOTTOMRIGHT] = this.paths[s.TOPLEFT];
                cell.corners[2] = this.corners[4];
                cell.corners[1] = this.corners[5];
                cell.corners[2].setCornerCell(2, cell);
                cell.corners[1].setCornerCell(1, cell);
                break;                
        }
        return this;
    },
    pathOnSide: function(/*game.model.Cell.SIDE*/ side){
        return this.paths[side];
    },
    setPathOnSide: function(/*game.model.Cell.SIDE*/ side, /*game.model.Path*/ path){
        this.paths[side] = path;
        return this;
    },
    intersection: function(/* */corner){
        return this.corners[corner];
    },
    setIntersection: function(/* */corner, /*game.model.Intersection*/ intersection){
        this.corners[corner] = intersection;
        return this;
    },
    setResource: function(/*game.model.Cell.RESOURCE*/ resource){
        this.resource = resource;
        return this;
    },
    setThief: function(/*Boolean*/ bool){
        this.thief = (typeof bool === 'undefined')?true:(bool?true:false);
        return this;
    }
});
game.model.Cell.prototype.INVALID_CELL = new game.model.Cell(null);
game.model.Cell.SIDE = game.model.Cell.prototype.SIDE;

