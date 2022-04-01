/**
 * 快速排序
 *
 * 不稳定
 *
 * 选择 p 到 r 之间的任意一个数据作为 pivot（分区点）
 * 遍历 p 到 r 之间的数据，将小于 pivot 的放到左边，将大于 pivot 的放到右边，将 pivot 放到中间
 */
export default class QuickSort {
  sort(originalArray: number[]): number[] {
    const array = [...originalArray];

    if (array.length <= 1) {
      return array;
    }

    const leftArray: number[] = [];
    const rightArray: number[] = [];

    const pivotElement = array.shift();
    const centerArray: number[] = [pivotElement!];

    while (array.length) {
      const currentElement = array.shift();

      if (currentElement === pivotElement) {
        centerArray.push(currentElement!);
      } else if (currentElement! < pivotElement!) {
        leftArray.push(currentElement!);
      } else {
        rightArray.push(currentElement!);
      }
    }

    const leftArraySorted = this.sort(leftArray);
    const rightArraySorted = this.sort(rightArray);

    return leftArraySorted.concat(centerArray, rightArraySorted);
  }
}
