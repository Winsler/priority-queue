const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.heapSize++;
	}

	pop() {
		if (!this.isEmpty()) {
			const root = this.detachRoot();
			this.restoreRootFromLastInsertedNode(root);
			this.shiftNodeDown(this.root);
			this.heapSize--;
			return root.data;
		};
	}

	detachRoot() {
		let root = this.root,
		rootIndex = this.parentNodes.indexOf(root);
		this.root = null;
		if (rootIndex != -1) {
			this.parentNodes.splice(rootIndex, 1);
		};

		return root;
		
	}


	restoreRootFromLastInsertedNode(detached) {
		let last = this.parentNodes.pop();

		if (last) {

			if (this.parentNodes.indexOf(last.parent) == -1 && last.parent != detached) {
				this.parentNodes.unshift(last.parent);
			};

			last.remove();
			last.left = detached.left;
			if (last.left) {
				last.left.parent = last;
			};
			last.right = detached.right;
			if (last.right) {
				last.right.parent = last;
			};
			this.root = last;
			if (!last.right || !last.left) {
				this.parentNodes.unshift(last);
			};
			//this.shiftNodeDown(last);
		};

	}



	size() {
		return this.heapSize;
	}

	isEmpty() {
		return this.root === null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {

		if (this.isEmpty()) {
			this.root = node;	
		} else {
			let parent = this.parentNodes[0];
			parent.appendChild(node);
			if (parent.right && parent.left) {
				this.parentNodes.shift();
			};
		};

		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {

		if (node.parent === null){
			this.root = node;
			node.parent = null;
		} else if (node.priority > node.parent.priority) {
			
			const parentIndex = this.parentNodes.indexOf(node.parent),
			nodeIndex = this.parentNodes.indexOf(node);

			
			if (parentIndex != -1) {
				this.parentNodes[parentIndex] = node;
			}
			if (nodeIndex != -1) {
				this.parentNodes[nodeIndex] = node.parent;
			};

			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}


	shiftNodeDown(node) {

		if (node === null) {
			return;
		}

		let childToShift,
		childToShiftPriority = node.priority;

		if (node.left) {
			childToShift = node.left;
			childToShiftPriority = node.left.priority;
		};
		if (node.right && node.right.priority > childToShiftPriority) {
			childToShift = node.right;
			childToShiftPriority = node.right.priority;
		};

		if (childToShift && node.priority < childToShiftPriority) {
			
			const childIndex = this.parentNodes.indexOf(childToShift),
			nodeIndex = this.parentNodes.indexOf(node);

			
			if (childIndex != -1) {
				this.parentNodes[childIndex] = node;
			}
			if (nodeIndex != -1) {
				this.parentNodes[nodeIndex] = childToShift;
			};
			if (node.parent == null) {
				this.root = childToShift;
			};
			childToShift.swapWithParent();
			this.shiftNodeDown(node);
		}

	}

}

module.exports = MaxHeap;
