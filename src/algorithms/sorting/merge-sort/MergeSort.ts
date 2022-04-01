/**
 * 归并排序
 *
 * 分割：把未排序的列表划分为 n 个子列表，每个包含一个元素（只有一个元素的列表被认为是有序的）。
 * 合并：不停地合并子列表生成新的已排序列表，直到最后合并为一个已排序的列表。
 */
export default class MergeSort {
  sort(originalArray: number[]): number[] {
    if (originalArray.length <= 1) {
      return originalArray;
    }

    const middleIndex = Math.floor(originalArray.length / 2);
    const leftArray = originalArray.slice(0, middleIndex);
    const rightArray = originalArray.slice(middleIndex, originalArray.length);

    const leftSortedArray = this.sort(leftArray);
    const rightSortedArray = this.sort(rightArray);

    return this.mergeSortedArrays(leftSortedArray, rightSortedArray);
  }

  mergeSortedArrays(leftArray: number[], rightArray: number[]): number[] {
    const sortedArray: number[] = [];

    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      let minElement = null;

      if (leftArray[leftIndex] < rightArray[rightIndex]) {
        minElement = leftArray[leftIndex];
        leftIndex += 1;
      } else {
        minElement = rightArray[rightIndex];
        rightIndex += 1;
      }

      sortedArray.push(minElement);
    }

    return sortedArray
      .concat(leftArray.slice(leftIndex))
      .concat(rightArray.slice(rightIndex));
  }
}
