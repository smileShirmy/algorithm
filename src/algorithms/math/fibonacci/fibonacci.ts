/**
 * 递归
 */
function fibonacci1(n: number): number {
  if (n <= 1) return 1;
  return fibonacci1(n - 1) + fibonacci1(n - 2);
}

/**
 * 递归
 *
 * 经测试，chrome 并不支持尾调用优化
 *
 * 尾调用优化，某个函数的最后一步是调用另一个函数
 */
function fibonacci2(n: number, ac1 = 1, ac2 = 1): number {
  if (n <= 1) return ac2;
  return fibonacci2(n - 1, ac2, ac1 + ac2);
}

/**
 * 循环
 */
function fibonacci3(n: number) {
  if (n === 1 || n === 2) {
    return 1;
  }
  let ac1 = 1;
  let ac2 = 1;
  for (let i = 2; i < n; i++) {
    [ac1, ac2] = [ac1, ac1 + ac2];
  }
  return ac2;
}

/**
 * 返回 fibonacci 数组
 */
function fibonacci4(n: number): number[] {
  const fibSequence = [1];

  let currentValue = 1;
  let previousValue = 0;

  if (n === 1) {
    return fibSequence;
  }

  let iterationsCounter = n - 1;

  while (iterationsCounter) {
    currentValue = currentValue += previousValue;
    previousValue = currentValue - previousValue;

    fibSequence.push(currentValue);
  }

  return fibSequence;
}
