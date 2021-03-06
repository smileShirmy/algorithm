import TrieNode from './TrieNode';

const HEAD_CHARACTER = '*';

export default class Trie {
  head: TrieNode;

  constructor() {
    this.head = new TrieNode(HEAD_CHARACTER);
  }

  addWord(word: string) {
    const characters = Array.from(word);
    let currentNode = this.head;

    for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
      const isComplete = charIndex === characters.length - 1;
      currentNode = currentNode.addChild(characters[charIndex], isComplete);
    }

    return this;
  }

  deleteWord(word: string) {
    const depthFirstDelete = (currentNode: TrieNode, charIndex = 0) => {
      if (charIndex >= word.length) return;

      const character = word[charIndex];
      const nextNode = currentNode.getChild(character);

      if (!nextNode) return;

      depthFirstDelete(nextNode, charIndex + 1);

      if (charIndex === word.length - 1) {
        nextNode.isCompleteWord = false;
      }

      currentNode.removeChild(character);
    };

    depthFirstDelete(this.head);

    return this;
  }

  suggestNextCharacters(word: string) {
    const lastCharacter = this.getLastCharacterNode(word);

    if (!lastCharacter) return null;

    return lastCharacter.suggestionChildren();
  }

  doesWordExist(word: string) {
    const lastCharacter = this.getLastCharacterNode(word);

    return !!lastCharacter && lastCharacter.isCompleteWord;
  }

  getLastCharacterNode(word: string) {
    const characters = Array.from(word);
    let currentNode = this.head;

    for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
      if (!currentNode.hasChild(characters[charIndex])) {
        return null;
      }

      currentNode = currentNode.getChild(characters[charIndex])!;
    }

    return currentNode;
  }
}
