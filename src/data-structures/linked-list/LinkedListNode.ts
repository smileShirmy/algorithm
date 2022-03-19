export default class LinkedListNode {
  next: LinkedListNode | null = null;

  value = undefined;

  constructor(value: any, next: LinkedListNode | null = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback: Function) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
