/**
 * @author ramki.g
 */
dojo.provide("board.Path");
dojo.declare("board.Path", [], {
    constructor: function(){
        this.adjPaths=[];
    },
    addAdjacent: function(path){
       if(-1 === dojo.indexOf(this.adjPaths, path)){
           this.adjPaths.push(path);
       } 
    }
});
