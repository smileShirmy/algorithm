export default class LinkedListNode<T> {
  next: LinkedListNode<T> | null = null;

  value: T;

  constructor(value: any, next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback?: (nodeValue: T) => string) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
