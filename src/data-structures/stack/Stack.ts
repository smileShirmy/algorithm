import LinkedList from '../linked-list/LinkedList';

export default class Stack<T> {
  linkedList: LinkedList<T>;

  constructor() {
    this.linkedList = new LinkedList<T>();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.head!.value;
  }

  push(value: T) {
    this.linkedList.prepend(value);
  }

  pop() {
    const removeHead = this.linkedList.deleteHead();
    return removeHead ? removeHead.value : null;
  }

  toArray() {
    return this.linkedList
      .toArray()
      .map((linkedListNode) => linkedListNode.value);
  }

  toString(callback: (nodeValue: T) => string) {
    return this.linkedList.toString(callback);
  }
}
