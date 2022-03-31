export default class BubbleSort {
  sort(originalArray: number[]) {
    let swapped = false;

    const array = [...originalArray];

    for (let i = 1; i <= array.length; i += 1) {
      swapped = false;

      for (let j = 0; j <= array.length - i; j += 1) {
        if (array[j + 1] < array[j]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];

          swapped = true;
        }
      }

      // If there were no swaps then array is already sorted and there is
      // no need to proceed.
      if (!swapped) {
        return array;
      }
    }

    return array;
  }
}
