class Graph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = {};
  }

  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList[node] = [];
  }

  addEdge(node1, node2, weight) {
    this.adjacencyList[node1].push({ node: node2, weight });
    this.adjacencyList[node2].push({ node: node1, weight });
  }

  dijkstra(startNode) {
    const distances = {};
    const visited = {};
    const previous = {};
    const queue = new PriorityQueue();

    // Initialize distances, visited, and previous
    this.nodes.forEach((node) => {
      distances[node] = node === startNode ? 0 : Infinity;
      previous[node] = null;
      queue.enqueue(node, distances[node]);
    });

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue().data;

      this.adjacencyList[currentNode].forEach((neighbor) => {
        const distance = distances[currentNode] + neighbor.weight;
        if (distance < distances[neighbor.node]) {
          distances[neighbor.node] = distance;
          previous[neighbor.node] = currentNode;
          queue.enqueue(neighbor.node, distance);
        }
      });

      visited[currentNode] = true;
    }

    return { distances, previous };
  }

  shortestPath(startNode, endNode) {
    const { distances, previous } = this.dijkstra(startNode);
    const path = [];
    let currentNode = endNode;

    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = previous[currentNode];
    }

    return { path, distance: distances[endNode] };
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(data, priority) {
    this.values.push({ data, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return this.values.length === 0;
  }
}

// Example usage:
const graph = new Graph();
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");
graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "E", 1);
graph.addEdge("D", "E", 5);

const { path, distance } = graph.shortestPath("A", "E");
console.log("Shortest path:", path); // Output: [ 'A', 'C', 'E' ]
... (2lignes restantes)