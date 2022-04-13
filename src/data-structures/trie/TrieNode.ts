import HashTable from '../hash-table/HashTable';

export default class TrieNode {
  character: string;

  isCompleteWord: boolean;

  children: HashTable<TrieNode>;

  constructor(character: string, isCompleteWord: boolean = false) {
    this.character = character;
    this.isCompleteWord = isCompleteWord;
    this.children = new HashTable<TrieNode>();
  }

  getChild(character: string) {
    return this.children.get(character);
  }

  addChild(character: string, isCompleteWord = false): TrieNode {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord));
    }

    const childNode = this.children.get(character)!;

    childNode.isCompleteWord = childNode?.isCompleteWord || isCompleteWord;

    return childNode;
  }

  removeChild(character: string) {
    const childNode = this.getChild(character);

    if (childNode && !childNode.isCompleteWord && !childNode.hasChildren()) {
      this.children.delete(character);
    }

    return this;
  }

  hasChild(character: string) {
    return this.children.has(character);
  }

  hasChildren() {
    return this.children.getKeys().length !== 0;
  }

  suggestionChildren() {
    return [...this.children.getKeys()];
  }

  toString() {
    let childrenAsString = this.suggestionChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
    const isCompleteString = this.isCompleteWord ? '*' : '';

    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}
