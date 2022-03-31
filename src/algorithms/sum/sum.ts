function sort(originalArray: number[]): number[] {
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

      currentIndex -= i;
    }
  }

  return array;
}
