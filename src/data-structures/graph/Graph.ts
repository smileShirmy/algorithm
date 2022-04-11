import GraphEdge from './GraphEdge';
import GraphVertex from './GraphVertex';

export default class Graph<T extends string> {
  isDirected: boolean;

  vertices: Record<string, GraphVertex<T>>;

  edges: Record<string, GraphEdge<T>>;

  constructor(isDirected = false) {
    this.vertices = {};
    this.edges = {};
    this.isDirected = isDirected;
  }

  addVertex(newVertex: GraphVertex<T>) {
    this.vertices[newVertex.getKey()] = newVertex;
  }

  getVertexByKey(vertexKey: string) {
    return this.vertices[vertexKey];
  }

  getNeighbors(vertex: GraphVertex<T>): GraphVertex<T>[] {
    return vertex.getNeighbors();
  }

  getAllVertices(): GraphVertex<T>[] {
    return Object.values(this.vertices);
  }

  getAllEdges(): GraphEdge<T>[] {
    return Object.values(this.edges);
  }

  addEdge(edge: GraphEdge<T>): Graph<T> {
    let startVertex = this.getVertexByKey(edge.startVertex.getKey());
    let endVertex = this.getVertexByKey(edge.endVertex.getKey());

    if (!startVertex) {
      this.addVertex(edge.startVertex);
      startVertex = this.getVertexByKey(edge.startVertex.getKey());
    }

    if (!endVertex) {
      this.addVertex(edge.endVertex);
      endVertex = this.getVertexByKey(edge.endVertex.getKey());
    }

    if (this.edges[edge.getKey()]) {
      throw new Error('Edge has already been added before');
    } else {
      this.edges[edge.getKey()] = edge;
    }

    if (this.isDirected) {
      startVertex.addEdge(edge);
    } else {
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }

    return this;
  }

  deleteEdge(edge: GraphEdge<T>) {
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()];
    } else {
      throw new Error('Edge not found in graph');
    }

    const startVertex = this.getVertexByKey(edge.startVertex.getKey());
    const endVertex = this.getVertexByKey(edge.endVertex.getKey());

    startVertex.deleteEdge(edge);
    endVertex.deleteEdge(edge);
  }

  findEdge(startVertex: GraphVertex<T>, endVertex: GraphVertex<T>) {
    const vertex = this.getVertexByKey(startVertex.getKey());

    if (!vertex) {
      return null;
    }

    return vertex.findEdge(endVertex);
  }

  getWeight() {
    return this.getAllEdges().reduce(
      (weight, graphEdge) => weight + graphEdge.weight,
      0
    );
  }

  reverse() {
    this.getAllEdges().forEach((edge) => {
      this.deleteEdge(edge);

      edge.reverse();

      this.addEdge(edge);
    });

    return this;
  }

  getVerticesIndices() {
    const verticesIndices: Record<string, number> = {};
    this.getAllVertices().forEach((vertex, index) => {
      verticesIndices[vertex.getKey()] = index;
    });

    return verticesIndices;
  }

  getAdjacencyMatrix() {
    const vertices = this.getAllVertices();
    const verticesIndices = this.getVerticesIndices();

    const adjacencyMatrix = Array.from({ length: vertices.length }, () =>
      Array(vertices.length).fill(Infinity)
    );

    vertices.forEach((vertex, vertexIndex) => {
      vertex.getNeighbors().forEach((neighbor) => {
        const neighborIndex = verticesIndices[neighbor.getKey()];
        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(
          vertex,
          neighbor
        )!.weight;
      });
    });

    return adjacencyMatrix;
  }

  toString() {
    return Object.keys(this.vertices).toString();
  }
}
