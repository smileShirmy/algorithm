import PolynomialHash from '../../cryptography/polynomial-hash/PolynomialHash';

export default function rabinKarp(text: string, word: string) {
  const hash = new PolynomialHash();

  const wordHash = hash.hash(word);

  let prevFrame: string | null = null;
  let currentFrameHash = null;

  // n 表示可能需要搜索的文本 text 的长度
  // m 表示需要被搜寻的字符串的长度
  // 在 n - m + 1 中搜索
  // 把 n - m + 1 个字串按顺序转为 hash 然后和 wordHash(需要匹配的字符串 hash) 进行比对
  for (
    let charIndex = 0;
    charIndex <= text.length - word.length;
    charIndex += 1
  ) {
    const currentFrame = text.substring(charIndex, charIndex + word.length);

    if (currentFrameHash === null) {
      currentFrameHash = hash.hash(currentFrame);
    } else {
      // 滚动哈希算法
      currentFrameHash = hash.roll(currentFrameHash, prevFrame!, currentFrame);
    }

    prevFrame = currentFrame;

    if (
      wordHash === currentFrameHash &&
      text.substring(charIndex, charIndex + word.length) === word
    ) {
      return charIndex;
    }
  }

  return -1;
}
