/**
 * 选择排序
 *
 * 不是一个稳定的排序算法
 *
 * 在未排序区找到一个最小的放到已排序区的末尾
 */
export default class SelectionSort {
  sort(originalArray: number[]) {
    const array = [...originalArray];

    for (let i = 0; i < array.length - 1; i += 1) {
      let minIndex = i;

      for (let j = i + 1; j < array.length; j += 1) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
    }

    return array;
  }
}
