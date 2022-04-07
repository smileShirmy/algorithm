export default class DoublyLinkedListNode<T> {
  next: DoublyLinkedListNode<T> | null = null;

  previous: DoublyLinkedListNode<T> | null = null;

  value: T;

  constructor(
    value: T,
    next: DoublyLinkedListNode<T> | null = null,
    previous: DoublyLinkedListNode<T> | null = null
  ) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString(callback?: (nodeValue: T) => string) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
