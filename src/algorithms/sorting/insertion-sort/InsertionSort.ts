/**
 * 插入排序
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
