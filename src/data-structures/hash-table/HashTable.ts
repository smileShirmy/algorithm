import LinkedList from '../linked-list/LinkedList';

/**
 * 散列表（链表法）
 *
 * 散列冲突（1. 开放寻址法（线性探测、二次探测、双重散列） 2. 链表法）
 *
 * 链表法：在散列表中，每个“桶（bucket）”或者“槽（slot）”会对应一条链表，所有散列值相同的元素我们都放到相同槽位对应的链表中
 *
 *
 * 哈希算法的一你公用：
 * 1. 哈希加密（MD5、SHA、DES、AES）
 * 2. 唯一标识（标识唯一图片判断是否存在图库中）
 * 3. 数据校验（对下载的文件取文件快哈希后校验）
 * 4. 散列函数（哈希算法的一种应用，散列冲突可以用开放寻址法或链表法解决）
 * 5. 负载均衡（对 IP 或 ID 计算哈希值，与服务器列表的大小进行取模运算，最终得到的值就是因该路由到的服务器编号）
 * 6. 数据分片
 *  6.1 统计“搜索关键词”的出现次数
 *  6.2 判断图片是否在图库种
 * 7. 分布式存储（一致性哈希算法避免雪崩效应）
 */
const DEFAULT_HASH_TABLE_SIZE = 32;

interface NodeValue<T> {
  key: string;
  value: T;
}

export default class HashTable<T> {
  buckets: LinkedList<NodeValue<T>>[] = [];

  keys: Record<string, number>;

  constructor(hashTableSize = DEFAULT_HASH_TABLE_SIZE) {
    this.buckets = Array.from(
      { length: hashTableSize },
      () => new LinkedList()
    );

    // Just to keep track of all actual keys in a fast way.
    this.keys = {};
  }

  /**
   * Coverts key string to hash number.
   */
  hash(key: string): number {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    );

    return hash % this.buckets.length;
  }

  set(key: string, value: T) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key
    });

    if (node) {
      node.value.value = value;
    } else {
      bucketLinkedList.append({ key, value });
    }
  }

  delete(key: string) {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key
    });

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  get(key: string) {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key
    });

    return node ? node.value.value : undefined;
  }

  has(key: string) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys() {
    return Object.keys(this.keys);
  }

  getValues() {
    return this.buckets.reduce<T[]>((values, bucket) => {
      const bucketValues = bucket
        .toArray()
        .map((linkedListNode) => linkedListNode.value.value);
      return values.concat(bucketValues);
    }, []);
  }
}
