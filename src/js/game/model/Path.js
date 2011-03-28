/**
 * @author ramki.g
 */
dojo.provide("game.model.Path");
dojo.declare("game.model.Path", [], {
    constructor: function(){
        this.adjPaths=[];
    },
    addAdjacent: function(path){
       if(-1 === dojo.indexOf(this.adjPaths, path)){
           this.adjPaths.push(path);
       } 
    }
});
