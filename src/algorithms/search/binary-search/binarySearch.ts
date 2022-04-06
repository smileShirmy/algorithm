export default function binarySearch(
  sortedArray: number[],
  seekElement: number
): number {
  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  while (startIndex <= endIndex) {
    // const middleIndex = startIndex + Math.floor((startIndex + endIndex) >> 1);
    // >> 运算符可以防止两个数太大而溢出
    const middleIndex = startIndex + Math.floor((startIndex + endIndex) / 2);

    if (sortedArray[middleIndex] === seekElement) {
      return middleIndex;
    }

    if (sortedArray[middleIndex] < seekElement) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }

  return -1;
}
