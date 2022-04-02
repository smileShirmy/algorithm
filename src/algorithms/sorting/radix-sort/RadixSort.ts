/**
 * 基数排序
 *
 * 基数排序对要排序的数据是有要求的，需要可以分割出独立的“位”来比较，而且位之间有递进的关系，如果 a 数据的高位比 b 数据大，那剩下的低位就不用比较了
 * 除此之外，每一位的数据范围不能太大，要可以用线性排序算法来排序，否则，基数排序的时间复杂度就无法做到 O(n) 了
 */

// Using charCode (a = 97, b = 98, etc), we can map characters to buckets from 0 - 25
const BASE_CHAR_CODE = 97;
const NUMBER_OF_POSSIBLE_DIGITS = 10;
const ENGLISH_ALPHABET_LENGTH = 26;

export default class RadixSort {
  sort(originalArray: Array<string | number>) {
    const isArrayOfNumbers = this.isArrayOfNumbers(originalArray);

    let sortedArray = [...originalArray];
    const numPasses = this.determineNumPasses(sortedArray);

    for (let currentIndex = 0; currentIndex < numPasses; currentIndex += 1) {
      const buckets: (string | number)[][] = isArrayOfNumbers
        ? this.placeElementsInNumberBuckets(
            sortedArray as number[],
            currentIndex
          )
        : this.placeElementsInCharacterBuckets(
            sortedArray as string[],
            currentIndex,
            numPasses
          );

      // Flatten buckets into sortedArray, and repeat at next index
      sortedArray = buckets.reduce((acc, val) => {
        return [...acc, ...val];
      }, []);
    }
  }

  determineNumPasses(array: Array<string | number>) {
    return this.getLengthOfLongestElement(array);
  }

  placeElementsInNumberBuckets(array: number[], index: number) {
    // ** 相当于 Math.pow()
    const modded = 10 ** (index + 1);
    const divided = 10 ** index;
    const buckets: number[][] = this.createBuckets(NUMBER_OF_POSSIBLE_DIGITS);

    array.forEach((element) => {
      if (element < divided) {
        buckets[0].push(element);
      } else {
        const currentDigit = Math.floor((element % modded) / divided);
        buckets[currentDigit].push(element);
      }
    });

    return buckets;
  }

  placeElementsInCharacterBuckets(
    array: string[],
    index: number,
    numPasses: number
  ) {
    const buckets: string[][] = this.createBuckets(ENGLISH_ALPHABET_LENGTH);

    array.forEach((element) => {
      const currentBucket = this.getCharCodeOfElementAtIndex(
        element,
        index,
        numPasses
      );
      buckets[currentBucket].push(element);
    });

    return buckets;
  }

  getCharCodeOfElementAtIndex(
    element: string,
    index: number,
    numPasses: number
  ) {
    if (numPasses - index > element.length) {
      return ENGLISH_ALPHABET_LENGTH;
    }

    const charPos = index > element.length - 1 ? 0 : element.length - index - 1;

    return element.toLowerCase().charCodeAt(charPos) - BASE_CHAR_CODE;
  }

  getLengthOfLongestElement(array: Array<string | number>) {
    if (this.isArrayOfNumbers(array)) {
      return Math.floor(Math.log10(Math.max(...array))) + 1;
    }

    return (array as string[]).reduce((acc, val) => {
      return val.length > acc ? val.length : acc;
    }, -Infinity);
  }

  isArrayOfNumbers(array: Array<string | number>): array is number[] {
    return this.isNumber(array[0]);
  }

  createBuckets(numBuckets: number) {
    return Array.from({ length: numBuckets }, () => []);
  }

  isNumber(element: string | number): boolean {
    return Number.isInteger(element);
  }
}
