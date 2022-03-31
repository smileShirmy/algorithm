function sort(originalArray: number[]): number[] {
  const array = [...originalArray];

  for (let i = 0; i < array.length - 1; i += 1) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j += 1) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (i !== minIndex) {
      [array[minIndex], array[i]] = [array[i], array[minIndex]];
    }
  }

  return array;
}
