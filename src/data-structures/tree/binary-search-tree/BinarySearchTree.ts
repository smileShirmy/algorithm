import BinarySearchTreeNode from './BinarySearchTreeNode';

export default class BinarySearchTree<T> {
  root: BinarySearchTreeNode<T>;

  constructor() {
    this.root = new BinarySearchTreeNode<T>(null);
  }

  insert(value: T): BinarySearchTreeNode<T> {
    return this.root.insert(value);
  }

  contains(value: T): boolean {
    return this.root.contains(value);
  }

  remove(value: T): boolean {
    return this.root.remove(value);
  }

  toString(): string {
    return this.root.toString();
  }
}
