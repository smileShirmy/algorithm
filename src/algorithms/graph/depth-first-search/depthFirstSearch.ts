import Graph from 'src/data-structures/graph/Graph';
import GraphVertex from 'src/data-structures/graph/GraphVertex';

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

function initCallbacks(callbacks: Callbacks) {
  const initiatedCallback = callbacks || {};

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

function depthFirstSearchRecursive(
  graph: Graph<string>,
  currentVertex: GraphVertex<string>,
  previousVertex: GraphVertex<string> | null,
  callbacks: Callbacks
) {
  callbacks.enterVertex({ currentVertex, previousVertex });

  graph.getNeighbors(currentVertex).forEach((nextVertex) => {
    if (
      callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })
    ) {
      depthFirstSearchRecursive(graph, nextVertex, currentVertex, callbacks);
    }
  });

  callbacks.leaveVertex({ currentVertex, previousVertex });
}

export default function depthFirstSearch(
  graph: Graph<string>,
  startVertex: GraphVertex<string>,
  callbacks: Callbacks
) {
  const previousVertex: GraphVertex<string> | null = null;
  depthFirstSearchRecursive(
    graph,
    startVertex,
    previousVertex,
    initCallbacks(callbacks)
  );
}
