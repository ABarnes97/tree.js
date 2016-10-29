function(){
  var Tree = function(value){
    this._parent = null;
    this._children = [];
    this.value = value;
  };
  Tree.prototype.setParent = function(parent){
    this._parent = parent;
    this._parent._children.push(this);
  };
  Tree.prototype.addChild = function(tree){
    this._children.push(tree);
    tree._parent = this;
  };
  Tree.prototype.getRoot = function(){
    var currentNode = this;
    while(currentNode._parent !== null){
      currentNode = currentNode._parent;
    }
    return currentNode;
  };
  Tree.prototype.hasChild = function(node, validator){
    for (var i = 0; i < this._children.length; i++) {
      if(validator(node, this._children[i])){
        return true;
      }
    }
    return false;
  };
  Tree.prototype.findNode = function(tree, validator){
    validator = validator || function(a,b){return a.value === b.value;};
    if(validator(tree, this)){
      return this;
    }
    for (var i = 0; i < this._children.length; i++) {
      var foundNode = this._children[i].findNode(tree, validator);
      if(foundNode){
        return foundNode;
      }
    }
    return undefined;
  };
  Tree.prototype.removeDescendant = function(tree, validator){
    validator = validator || function(a,b){return a.value === b.value;};
    var foundNode = this.findNode(tree, validator);
    if(!foundNode){
      return false;
    }
    var parent = foundNode._parent;
    parent._children = _.reject(parent._children, function(vizNode){
      return validator(vizNode, tree);
    });
    return tree;
  };
  Tree.prototype.contains = function(node, validator){
    validator = validator || function(a,b){return a.value === b.value;};
    if(validator(this, node)){
      return true;
    }
    var result = false;
    for (var i = 0; i < this._children.length; i++) {
      result = this._children[i].contains(node);
      if(result){
        break;
      }
    }
    return result;
  };
  return Tree;
}();
