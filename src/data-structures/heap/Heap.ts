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

      // 如果要移除的是最后一个子节点，直接 pop()
      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        // 转变一下思路，为了避免数组空洞，把要移除的 item 和 最后一个 item 交换位置
        // 即是先保证完整性，再保证有序性
        this.heapContainer[indexToRemove] = this.heapContainer.pop()!;

        const parentItem = this.parent(indexToRemove);

        // 如果没有父节点或者顺序是正确的则向下堆化，否则向上堆化
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

  // 从下往上堆化
  heapifyUp(customStartIndex?: number) {
    // 如果没有指定取最后一个元素（数组中的最后一个或树的右下角）
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(
        this.parent(currentIndex),
        this.heapContainer[currentIndex]
      )
    ) {
      // 和父节点反复比对，并且让索引往上移
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  // 从上往下堆化
  heapifyDown(customStartIndex = 0) {
    let currentIndx = customStartIndex;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndx)) {
      if (
        this.hasRightChild(currentIndx) &&
        this.pairIsInCorrectOrder(
          this.rightChild(currentIndx),
          this.leftChild(currentIndx)
        )
      ) {
        nextIndex = this.getRightChildIndex(currentIndx);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndx);
      }

      if (
        this.pairIsInCorrectOrder(
          this.heapContainer[currentIndx],
          this.heapContainer[nextIndex]
        )
      ) {
        break;
      }

      this.swap(currentIndx, nextIndex);
      currentIndx = nextIndex;
    }
  }

  /**
   * throw new Error(
   *  `You have to implement heap pair comparison method for ${firstElement} and ${secondElement} values.`
   * );
   */
  abstract pairIsInCorrectOrder(firstElement: T, secondElement: T): boolean;
}
