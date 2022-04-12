import Graph from 'src/data-structures/graph/Graph';
import GraphVertex from 'src/data-structures/graph/GraphVertex';
import Queue from '../../../data-structures/queue/Queue';

interface Callbacks {
  allowTraversal: (obj: {
    previousVertex: GraphVertex<string> | null;
    currentVertex: GraphVertex<string> | null;
    nextVertex: GraphVertex<string> | null;
  }) => boolean;
  enterVertex: (obj: {
    currentVertex: GraphVertex<string>;
    previousVertex: GraphVertex<string> | null;
  }) => void;
  leaveVertex: (obj: {
    currentVertex: GraphVertex<string>;
    previousVertex: GraphVertex<string> | null;
  }) => void;
}

/**
 * Queue 队列用来存储已经被访问、但相连的顶点还没有被访问的顶点
 */
function initCallbacks(callbacks: Callbacks | Record<string, never> = {}) {
  const initiatedCallback = callbacks;

  const stubCallback = () => {};

  const allowTraversalCallback = (() => {
    const seen: Record<string, boolean> = {};
    return ({ nextVertex }: { nextVertex: GraphVertex<string> }) => {
      if (!seen[nextVertex.getKey()]) {
        seen[nextVertex.getKey()] = true;
        return true;
      }
      return false;
    };
  })();

  initiatedCallback.allowTraversal =
    callbacks.allowTraversal || allowTraversalCallback;
  initiatedCallback.enterVertex = callbacks.enterVertex || stubCallback;
  initiatedCallback.leaveVertex = callbacks.leaveVertex || stubCallback;

  return initiatedCallback;
}

export default function breadthFirstSearch(
  graph: Graph<string>,
  startVertex: GraphVertex<string>,
  originalCallbacks: Callbacks
) {
  const callbacks = initCallbacks(originalCallbacks);
  const vertexQueue = new Queue<GraphVertex<string>>();

  vertexQueue.enqueue(startVertex);

  let previousVertex: GraphVertex<string> | null = null;

  // Traverse all vertices from the queue.
  while (!vertexQueue.isEmpty()) {
    const currentVertex = vertexQueue.dequeue()!;
    callbacks.enterVertex({ currentVertex, previousVertex });

    // Add all neighbors to the queue for future traversals.
    graph.getNeighbors(currentVertex).forEach((nextVertex) => {
      if (
        callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })
      ) {
        vertexQueue.enqueue(nextVertex);
      }
    });

    callbacks.leaveVertex({ currentVertex, previousVertex });

    // Memorize current vertex before next loop.
    previousVertex = currentVertex;
  }
}
