import DoublyLinkedListNode from './DoublyLinkedListNode';

/**
 * prepend(value)
 * append(value)
 * delete(value)
 * find({ value, callback })
 * deleteTail()
 * deleteHead()
 * fromArray(values)
 * toArray()
 * toString()
 * reverse()
 */
export default class DoublyLinkedList {
  head: DoublyLinkedListNode | null = null;

  tail: DoublyLinkedListNode | null = null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value: any) {
    const newNode = new DoublyLinkedListNode(value, this.head);

    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: any) {
    const newNode = new DoublyLinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail!.next = newNode;

    newNode.previous = this.tail;

    this.tail = newNode;

    return this;
  }

  delete(value: any) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    let currentNode: DoublyLinkedListNode | null = this.head;

    while (currentNode) {
      if (currentNode.value === value) {
        deletedNode = currentNode;

        if (deletedNode === this.head) {
          this.head = deletedNode.next;

          if (this.head) {
            this.head.previous = null;
          }

          if (deletedNode === this.tail) {
            this.tail = null;
          }
        } else if (deletedNode === this.tail) {
          this.tail = currentNode.previous;
          this.tail!.next = null;
        } else {
          const previousNode = deletedNode.previous;
          const nextNode = deletedNode.next;

          previousNode!.next = nextNode;
          nextNode!.previous = previousNode;
        }
      }

      currentNode = currentNode.next;
    }

    return deletedNode;
  }

  find({
    value = undefined,
    callback = undefined
  }: {
    value?: any;
    callback?: Function;
  }) {
    if (!this.head) {
      return null;
    }

    let currentNode: DoublyLinkedListNode | null = this.head;

    while (currentNode) {
      if (typeof callback === 'function' && callback(currentNode.value)) {
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
    if (!this.tail) return null;

    if (this.head === this.tail) {
      const deletedTail = this.tail;
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    const deletedTail = this.tail;

    this.tail = this.tail.previous;
    this.tail!.next = null;

    return deletedTail;
  }

  deleteHead() {
    if (!this.head) return null;

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
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

  fromArray(values: any[]) {
    values.forEach((value) => this.append(value));

    return this;
  }

  toString(callback: Function) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  reverse() {
    let currNode = this.head;
    let pervNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next;
      pervNode = currNode.previous;

      currNode.next = pervNode;
      pervNode!.previous = nextNode;

      pervNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = pervNode;

    return this;
  }
}
