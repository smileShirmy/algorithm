import LinkedListNode from './LinkedListNode';

/**
 * prepend(value)
 * append(value)
 * insert(value, rawIndex)
 * delete(value)
 * find({ value, callback })
 * deleteTail()
 * deleteHead()
 * fromArray(values)
 * toArray()
 * toString()
 * reverse()
 */
export default class LinkedList<T> {
  head: LinkedListNode<T> | null = null;

  tail: LinkedListNode<T> | null = null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value: T) {
    const newNode = new LinkedListNode<T>(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: T) {
    const newNode = new LinkedListNode<T>(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail!.next = newNode;
    this.tail = newNode;

    return this;
  }

  insert(value: T, rawIndex: number) {
    const index = rawIndex < 0 ? 0 : rawIndex;
    if (index === 0) {
      this.prepend(value);
    } else {
      let currentNode = this.head;
      let newNode = new LinkedListNode<T>(value);
      let count = 1;

      while (currentNode) {
        if (index === count) break;
        currentNode = currentNode.next;
        count += 1;
      }

      if (currentNode) {
        newNode.next = currentNode.next;
        currentNode.next = newNode;
      } else {
        if (this.tail) {
          this.tail.next = newNode;
          this.tail = newNode;
        } else {
          this.head = newNode;
          this.tail = newNode;
        }
      }
    }

    return this;
  }

  delete(value: T) {
    if (!this.head) return null;

    let deletedNode = null;

    if (this.head && this.head.value === value) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.tail!.value === value) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  find({
    value,
    callback
  }: {
    value?: T;
    callback?: (nodeValue: T) => boolean;
  }) {
    if (!this.head) return null;

    let currentNode: LinkedListNode<T> | null = this.head;

    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      if (value !== undefined && currentNode.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail() {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode = this.head!;

    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  deleteHead() {
    if (!this.head) return null;

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  fromArray(values: T[]) {
    values.forEach((value) => this.append(value));

    return this;
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback: (nodeValue: T) => string) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next;

      currNode.next = prevNode;

      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
