/**
 * 堆是一种完全二叉树
 *
 * 1. 堆排序数据访问的方式没有快速排序友好，不是局部顺序访问(1 2 4 8)，对 CPU 缓存不友好
 * 2. 同样的数据，在排序过程中，堆排序算法的树交换次数要多于快速排序
 *
 * Parent class for Min and Max Heaps.
 */
export default abstract class Heap<T> {
  heapContainer: T[] = [];

  constructor() {
    if (new.target === Heap) {
      throw new TypeError('Cannot construct Heap instance directly');
    }

    this.heapContainer = [];
  }

  getLeftChildIndex(parentIndex: number) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex: number) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(childIndex: number) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex: number) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex: number) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  leftChild(parentIndex: number) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex: number) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex: number) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(indexOne: number, indexTwo: number) {
    [this.heapContainer[indexOne], this.heapContainer[indexTwo]] = [
      this.heapContainer[indexTwo],
      this.heapContainer[indexOne]
    ];
  }

  // 查看首个元素，不会移除首个元素
  peek() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    return this.heapContainer[0];
  }

  // 将首个元素弹出
  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

    const item = this.heapContainer[0];

    this.heapContainer[0] = this.heapContainer.pop()!;
    this.heapifyDown();

    return item;
  }

  add(item: T) {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  remove(item: T) {
    const numberOfItemsToRemove = this.find(item).length;

    // 遍历找到的 itemIndex
    for (let i = 0; i < numberOfItemsToRemove; i += 1) {
      const indexToRemove = this.find(item).pop()!;

      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop()!;

        const parentItem = this.parent(indexToRemove);

        if (
          this.hasLeftChild(indexToRemove) &&
          (!parentItem ||
            this.pairIsInCorrectOrder(
              parentItem,
              this.heapContainer[indexToRemove]
            ))
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  find(item: T): number[] {
    const foundItemIndices: number[] = [];

    for (let i = 0; i < this.heapContainer.length; i += 1) {
      if (item === this.heapContainer[i]) {
        foundItemIndices.push(i);
      }
    }

    return foundItemIndices;
  }

  isEmpty() {
    return !this.heapContainer.length;
  }

  toString() {
    return this.heapContainer.toString();
  }

  heapifyUp(customStartIndex: number) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;
  }
}
