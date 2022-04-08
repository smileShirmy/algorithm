export default class BinaryTreeNode<T> {
  left: BinaryTreeNode<T> | null = null;

  right: BinaryTreeNode<T> | null = null;

  parent: BinaryTreeNode<T> | null = null;

  value: T | null;

  constructor(value: T | null = null) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;
  }

  get leftHeight(): number {
    if (!this.left) {
      return 0;
    }

    return this.left.height + 1;
  }

  get rightHeight(): number {
    if (!this.right) {
      return 0;
    }

    return this.right.height + 1;
  }

  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  get balanceFactor(): number {
    return this.leftHeight - this.rightHeight;
  }

  get uncle(): BinaryTreeNode<T> | undefined {
    if (!this.parent) {
      return undefined;
    }

    if (!this.parent.parent) {
      return undefined;
    }

    if (!this.parent.parent.left || !this.parent.parent.right) {
      return undefined;
    }

    if (this.parent === this.parent.parent.left) {
      return this.parent.parent.right;
    }

    return this.parent.parent.left;
  }

  setValue(value: T | null) {
    this.value = value;

    return this;
  }

  setLeft(node: BinaryTreeNode<T> | null) {
    // Reset parent for left node since it is going to be detached.
    if (this.left) {
      this.left.parent = null;
    }

    // Attach new node to the left.
    this.left = node;

    // Make current node to be a parent for new left one.
    if (this.left) {
      this.left.parent = this;
    }

    return this;
  }

  setRight(node: BinaryTreeNode<T> | null) {
    // Reset parent for right node since it is going to be detached.
    if (this.right) {
      this.right.parent = null;
    }

    // Attach new node to the right.
    this.right = node;

    // Make current node to be a parent for new right one.
    if (this.right) {
      this.right.parent = this;
    }

    return this;
  }

  removeChild(nodeToRemove: BinaryTreeNode<T>): boolean {
    if (this.left && this.left === nodeToRemove) {
      this.left = null;
      return true;
    }

    if (this.right && this.right === nodeToRemove) {
      this.right = null;
      return true;
    }

    return false;
  }

  replaceChild(
    nodeToReplace: BinaryTreeNode<T> | null,
    replacementNode: BinaryTreeNode<T> | null
  ) {
    if (!nodeToReplace || !replacementNode) {
      return false;
    }

    if (this.left && this.left === nodeToReplace) {
      this.left = replacementNode;
      return true;
    }

    if (this.right && this.right === nodeToReplace) {
      this.right = replacementNode;
      return true;
    }

    return false;
  }

  static copyNode<T>(
    sourceNode: BinaryTreeNode<T>,
    targetNode: BinaryTreeNode<T>
  ) {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  traverseInOrder(): (T | null)[] {
    let traverses: (T | null)[] = [];

    if (this.left) {
      traverses = traverses.concat(this.left.traverseInOrder());
    }

    traverses.push(this.value);

    if (this.right) {
      traverses = traverses.concat(this.right.traverseInOrder());
    }

    return traverses;
  }

  toString() {
    return this.traverseInOrder().toString();
  }
}
