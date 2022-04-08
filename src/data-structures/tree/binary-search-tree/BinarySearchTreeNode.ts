import BinaryTreeNode from '../BinaryTreeNode';

export default class BinarySearchTreeNode<T> extends BinaryTreeNode<T> {
  left: BinarySearchTreeNode<T> | null;

  right: BinarySearchTreeNode<T> | null;

  constructor(v: T | null = null) {
    super(v);
  }

  insert(value: T): BinarySearchTreeNode<T> {
    if (this.value === null) {
      this.value = null;

      return this;
    }

    if (value < this.value) {
      if (this.left) {
        return this.left.insert(value);
      }

      const newNode = new BinarySearchTreeNode(value);
      this.setLeft(newNode);

      return newNode;
    }

    if (value > this.value) {
      if (this.right) {
        return this.right.insert(value);
      }

      const newNode = new BinarySearchTreeNode(value);
      this.setRight(newNode);

      return newNode;
    }

    return this;
  }

  find(value: T): BinarySearchTreeNode<T> | null {
    if (this.value === value) {
      return this;
    }

    if (this.value && value < this.value && this.left) {
      return this.left.find(value);
    }

    if (this.value && value > this.value && this.right) {
      return this.right.find(value);
    }

    return null;
  }

  contains(value: T) {
    return !!this.find(value);
  }

  remove(value: T) {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error('Item not found in the tree');
    }

    const { parent } = nodeToRemove;

    // 节点是叶子节点
    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (parent) {
        parent.removeChild(nodeToRemove);
      } else {
        nodeToRemove.setValue(null);
      }
    }
    // 有两个子节点
    else if (nodeToRemove.left && nodeToRemove.right) {
      const nextBiggerNode = nodeToRemove.right.findMin();
      if (nextBiggerNode === nodeToRemove.right) {
        this.remove(nextBiggerNode.value!);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    }
    // 有一个子节点
    else {
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode);
      } else {
        BinaryTreeNode.copyNode(childNode!, nodeToRemove);
      }
    }

    nodeToRemove.parent = null;

    return true;
  }

  findMin(): BinarySearchTreeNode<T> {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }
}
