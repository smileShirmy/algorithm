import LinkedList from '../linked-list/LinkedList';

/**
 * 散列表（链表法）
 *
 * 散列冲突（1. 开放寻址法（线性探测、二次探测、双重散列） 2. 链表法）
 *
 * 链表法：在散列表中，每个“桶（bucket）”或者“槽（slot）”会对应一条链表，所有散列值相同的元素我们都放到相同槽位对应的链表中
 */
const DEFAULT_HASH_TABLE_SIZE = 32;

interface NodeValue {
  key: string;
  value: string;
}

export default class HashTable {
  buckets: LinkedList<NodeValue>[] = [];

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

  set(key: string, value: string) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      callback: (nodeValue: any) => nodeValue.key === key
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
      callback: (nodeValue: any) => nodeValue.key === key
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
    return this.buckets.reduce<string[]>((values, bucket) => {
      const bucketValues = bucket
        .toArray()
        .map((linkedListNode) => linkedListNode.value.value);
      return values.concat(bucketValues);
    }, []);
  }
}
