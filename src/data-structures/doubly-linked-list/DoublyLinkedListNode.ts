export default class DoublyLinkedListNode {
  next: DoublyLinkedListNode | null = null;

  previous: DoublyLinkedListNode | null = null;

  value = undefined;

  constructor(
    value: any,
    next: DoublyLinkedListNode | null = null,
    previous: DoublyLinkedListNode | null = null
  ) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString(callback: Function) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
