function sort(originalArray: number[]): number[] {
  const array: number[] = [...originalArray];

  if (array.length <= 1) {
    return array;
  }

  const leftArray: number[] = [];
  const rightArray: number[] = [];

  const pivotElement = array.shift()!;
  const centerArray: number[] = [pivotElement];

  while (array.length) {
    const currentElement = array.shift()!;

    if (currentElement === pivotElement) {
      centerArray.push(currentElement);
    } else if (currentElement < pivotElement) {
      leftArray.push(currentElement);
    } else {
      rightArray.push(currentElement);
    }
  }

  const leftArraySorted = sort(leftArray);
  const rightArraySorted = sort(rightArray);

  return leftArraySorted.concat(centerArray, rightArraySorted);
}
