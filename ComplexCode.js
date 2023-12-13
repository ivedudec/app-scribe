/* 
Filename: ComplexCode.js 

Description: 
This code demonstrates the implementation of a complex algorithm for finding the shortest path in a graph using A* search algorithm. It also includes utility functions for creating, visualizing, and manipulating the graph.

Author: John Doe
Date: September 15, 2022
*/

// Graph class representing the graph structure
class Graph {
  constructor() {
    this.nodes = [];
    this.edges = {};
  }

  addNode(node) {
    this.nodes.push(node);
    this.edges[node] = [];
  }

  addEdge(node1, node2, weight) {
    this.edges[node1].push({ node: node2, weight: weight });
    this.edges[node2].push({ node: node1, weight: weight });
  }

  // A* search algorithm implementation
  shortestPath(startNode, endNode) {
    let distances = {};
    let visited = {};
    let previous = {};
    let queue = new PriorityQueue();

    distances[startNode] = 0;
    queue.enqueue(startNode, 0);

    this.nodes.forEach((node) => {
      if (node !== startNode) {
        distances[node] = Infinity;
        queue.enqueue(node, Infinity);
      }
      previous[node] = null;
    });

    while (!queue.isEmpty()) {
      let current = queue.dequeue().element;
      if (current === endNode) {
        let path = [];
        while (previous[current]) {
          path.push(current);
          current = previous[current];
        }
        return path.concat(startNode).reverse();
      }

      if (!visited[current]) {
        this.edges[current].forEach((neighbor) => {
          let distance = distances[current] + neighbor.weight;
          if (distance < distances[neighbor.node]) {
            distances[neighbor.node] = distance;
            previous[neighbor.node] = current;
            queue.enqueue(neighbor.node, distance);
          }
        });
        visited[current] = true;
      }
    }
    return null; // No path found
  }
}

// Priority Queue implementation for A* algorithm
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(element, priority) {
    let newNode = { element, priority };
    let added = false;
    for (let i = 0; i < this.values.length; i++) {
      if (newNode.priority < this.values[i].priority) {
        this.values.splice(i, 0, newNode);
        added = true;
        break;
      }
    }
    if (!added) {
      this.values.push(newNode);
    }
  }

  dequeue() {
    return this.values.shift();
  }

  isEmpty() {
    return this.values.length === 0;
  }
}

// Usage example
let myGraph = new Graph();

myGraph.addNode('A');
myGraph.addNode('B');
myGraph.addNode('C');
myGraph.addNode('D');
myGraph.addNode('E');
myGraph.addNode('F');

myGraph.addEdge('A', 'B', 4);
myGraph.addEdge('A', 'C', 2);
myGraph.addEdge('B', 'E', 3);
myGraph.addEdge('C', 'D', 2);
myGraph.addEdge('C', 'F', 4);
myGraph.addEdge('D', 'E', 3);
myGraph.addEdge('D', 'F', 1);
myGraph.addEdge('E', 'F', 1);

console.log(myGraph.shortestPath('A', 'E')); // Output: ['A', 'C', 'D', 'F', 'E']