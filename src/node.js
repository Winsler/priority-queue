class Node {
	constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;

	}

	appendChild(node) {
    if (!this.left) {
      node.parent = this;
      this.left = node;
    } else if (!this.right) {
      node.parent = this;
      this.right = node;
    };
	}

	removeChild(node) {
    if (this.left == node) {
      node.parent = null;
      this.left = null;
      return
    } else if (this.right == node) {
      node.parent = null;
      this.right = null;
      return
    } else {
      throw new Error('Passed node is not a child of this node')
    };
	}

	remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    };
	}

	swapWithParent() {
    if (this.parent) {

      let self = this,
          selfLeft = self.left,
          selfRight = self.right,
          oldParent = self.parent,
          oldGrandPa = oldParent.parent;

      //oldParent.parent
      self.parent = oldGrandPa || null;
      if (oldGrandPa && oldGrandPa.left == oldParent) {
        oldGrandPa.left = self;
      } else if (oldGrandPa) {
        oldGrandPa.right = self;
      } else {
        self.parent = null;
      };
      oldParent.parent = self;



      //oldParent.child
      if (oldParent.left) {
        if (oldParent.left == self) {
          self.left = oldParent;
        } else {
          self.left = oldParent.left;
          self.left.parent = self;
        }
      } else {
        self.left = null;
      };

      if (oldParent.right) {
        if (oldParent.right == self) {
          self.right = oldParent;
        } else {
          self.right = oldParent.right;
          self.right.parent = self;
        }
      } else {
        self.right = null;
      };


      //self.childs
      if (selfLeft) {
        oldParent.left = selfLeft;
        selfLeft.parent = oldParent;
      } else {
        oldParent.left = null;
      };

      if (selfRight) {
        oldParent.right = selfRight;
        selfRight.parent = oldParent;
      } else {
        oldParent.right = null;
      };

		};
	}
}

module.exports = Node;
