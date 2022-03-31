import LinkedList from '../linked-list/LinkedList';

/**
 * 队列
 *
 * 对于大部分资源有限的场景，当没有空闲资源时，基本上都可以通过“队列”这种数据结构来实现请求排队。
 *
 * 阻塞队列/并发队列
 */
export default class Queue {
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

  enqueue(value: any) {
    this.linkedList.append(value);
  }

  dequeue() {
    const removeHead = this.linkedList.deleteHead();
    return removeHead ? removeHead.value : null;
  }

  toString(callback: Function) {
    return this.linkedList.toString(callback);
  }
}
