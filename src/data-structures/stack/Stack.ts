import LinkedList from '../linked-list/LinkedList';

export default class Stack {
  linkedList: LinkedList;

  constructor() {
    this.linkedList = new LinkedList();
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

  push(value: any) {
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

  toString(callback: Function) {
    return this.linkedList.toString(callback);
  }
}
