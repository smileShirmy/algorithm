import LinkedList from '../linked-list/LinkedList';
import LinkedListNode from '../linked-list/LinkedListNode';
import GraphEdge from './GraphEdge';

export default class GraphVertex<T> {
  value: T;

  edges: LinkedList<GraphEdge<T>>;

  constructor(value: T) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value');
    }

    const edgeComparator = (edgeA: GraphEdge<T>, edgeB: GraphEdge<T>) => {
      if (edgeA.getKey() === edgeB.getKey()) {
        return 0;
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
    };

    this.value = value;
    this.edges = new LinkedList<GraphEdge<T>>(edgeComparator);
  }

  addEdge(edge: GraphEdge<T>): GraphVertex<T> {
    this.edges.append(edge);

    return this;
  }

  deleteEdge(edge: GraphEdge<T>) {
    this.edges.delete(edge);
  }

  getNeighbors() {
    const edges = this.edges.toArray();

    const neighborsConverter = (node: LinkedListNode<GraphEdge<T>>) => {
      return node.value.startVertex === this
        ? node.value.endVertex
        : node.value.startVertex;
    };

    return edges.map(neighborsConverter);
  }

  getEdges(): GraphEdge<T>[] {
    return this.edges.toArray().map((linkedListNode) => linkedListNode.value);
  }

  getDegree(): number {
    return this.edges.toArray().length;
  }

  hasEdge(requiredEdge: GraphEdge<T>) {
    const edgeNode = this.edges.find({
      callback: (edge) => edge === requiredEdge
    });

    return !!edgeNode;
  }

  hasNeighbor(vertex: GraphVertex<T>): boolean {
    const vertexNode = this.edges.find({
      callback: (edge) =>
        edge.startVertex === vertex || edge.endVertex === vertex
    });

    return !!vertexNode;
  }

  findEdge(vertex: GraphVertex<T>): GraphEdge<T> | null {
    const edgeFinder = (edge: GraphEdge<T>) =>
      edge.startVertex === vertex || edge.endVertex === vertex;

    const edge = this.edges.find({ callback: edgeFinder });

    return edge ? edge.value : null;
  }

  getKey() {
    return this.value;
  }

  deleteAllEdge() {
    this.getEdges().forEach((edge) => this.deleteEdge(edge));

    return this;
  }

  toString(callback?: (value: T) => string) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
