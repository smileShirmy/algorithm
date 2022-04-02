/**
 * 计数排序
 *
 * 计数排序其实是桶排序的一种特殊情况
 *
 * 利用另外一个数组进行计数
 *
 * 计数排序只能用在数据范围不大的场景中，如果数据范围 k 比要排序的数据 n 大很多，就不适合用计数排序了
 * 而且，计数排序只能给非负整数排序，如果要排序的数据是其他类型的，要将其在不改变相对大小的情况下，转化为非负整数
 */
class CountingSort {
  sort(
    originalArray: number[],
    smallestElement = undefined,
    biggestElement = undefined
  ) {
    // Init biggest and smallest elements in array in order to build number bucket array later.
    let detectedSmallestElement = smallestElement || 0;
    let detectedBiggestElement = biggestElement || 0;

    if (smallestElement === undefined || biggestElement === undefined) {
      originalArray.forEach((element) => {
        if (element > detectedBiggestElement) {
          detectedBiggestElement = element;
        }

        if (element < detectedSmallestElement) {
          detectedSmallestElement = element;
        }
      });
    }

    // Init buckets array.
    const buckets = Array(
      detectedBiggestElement - detectedSmallestElement + 1
    ).fill(0);

    originalArray.forEach((element) => {
      buckets[element - detectedSmallestElement] += 1;
    });

    for (let bucketIndex = 1; bucketIndex < buckets.length; bucketIndex += 1) {
      buckets[bucketIndex] += buckets[bucketIndex - 1];
    }

    // Now let's shift frequencies to the right so that they show correct numbers.
    buckets.pop();
    buckets.unshift(0);

    const sortedArray = Array(originalArray.length).fill(null);
    for (
      let elementIndex = 0;
      elementIndex < originalArray.length;
      elementIndex += 1
    ) {
      const element = originalArray[elementIndex];

      const elementSortedPosition = buckets[element - detectedSmallestElement];

      sortedArray[elementSortedPosition] = element;

      buckets[element - detectedSmallestElement] += 1;
    }

    return sortedArray;
  }
}
