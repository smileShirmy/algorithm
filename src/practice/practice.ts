import LinkedList from 'src/data-structures/linked-list/LinkedList';

const DEFAULT_HASH_TABLE_SIZE = 32;

interface NodeValue {
  key: string;
  value: string;
}

class HashTable {
  buckets: LinkedList<NodeValue>[] = [];

  keys: Record<string, number> = {};

  constructor(hashTableSize = DEFAULT_HASH_TABLE_SIZE) {
    this.buckets = Array.from({ length: hashTableSize }).map(
      () => new LinkedList()
    );

    this.keys = {};
  }

  hash(key: string): number {
    const hash = Array.from(key).reduce(
      (acc, cur) => acc + cur.charCodeAt(0),
      0
    );

    return hash % this.buckets.length;
  }

  set(key: string, value: string) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key
    });

    if (node) {
      node.value.value = value;
    } else {
      bucketLinkedList.append({
        key,
        value
      });
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
    const keyHash = this.hash(key);
    const bucketLinkedList = this.buckets[keyHash];
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
