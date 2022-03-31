/**
 * 插入排序
 *
 * 分为已排序区间和未排序区间，未排序区间的跟排序区间的进行比较然后插入
 */
export default class InsertionSort {
  sort(originalArray: number[]) {
    const array = [...originalArray];

    for (let i = 1; i < array.length; i += 1) {
      let currentIndex = i;

      while (
        array[currentIndex - 1] !== undefined &&
        array[currentIndex] < array[currentIndex - 1]
      ) {
        [array[currentIndex - 1], array[currentIndex]] = [
          array[currentIndex],
          array[currentIndex - 1]
        ];

        currentIndex -= 1;
      }
    }

    return array;
  }
}
