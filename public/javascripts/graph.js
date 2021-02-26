class GraphNode {
    constructor() {
        this.adjacencyList = {};    // only store id
        this.nodesData     = {};    // store type and div attr
        this.costList      = {};    // to store nodes cost to use in a-star search problem
    }

    addVertex(node) {
        const idKey = node.id;
        if(!this.adjacencyList[idKey]) this.adjacencyList[idKey] = [];

        if(!this.nodesData[idKey]) this.nodesData[idKey] = [];
    }

    makeKey(node) {
        return JSON.stringify(node);
    }

    addEdge(startNode, endNode, weight, problem) {
        const startNodeIdKey = startNode.id;
        const   endNodeIdKey = endNode.id;

        if(problem === PROBLEM_TYPE.UNWEIGHTED_GRAPH) {
            this.adjacencyList[startNodeIdKey].push(endNodeIdKey);
            this.adjacencyList[endNodeIdKey].push(startNodeIdKey);

            const startNodeKey = this.makeKey(startNode);
            const   endNodeKey = this.makeKey(endNode);
            this.nodesData[startNodeKey].push(endNode);
            this.nodesData[endNodeKey].push(startNode);
            return;
        }
        
        // Djkstra, a-star
        // ignore if one of the nodes is a wall
        if(startNode.type === 'wall' || endNode.type === 'wall') {
            return;
        }
        this.adjacencyList[startNodeIdKey].push({id:endNodeIdKey, weight});
        this.adjacencyList[endNodeIdKey].push({id:startNodeIdKey, weight});
        this.nodesData[startNodeIdKey].push({id:endNodeIdKey, path:[], weight});
        this.nodesData[endNodeIdKey].push({id:startNodeIdKey, path:[], weight});
        this.costList[`${startNodeIdKey}&${endNodeIdKey}`] = weight;
    }

    isGoal(nodeId) {
        const nodeCors = extractId(nodeId);
        return (nodeCors[0] == END_POSITION_AT_ROW && nodeCors[1] == END_POSITION_AT_COL);
    }

    isEmpty() {
        return this.adjacencyList.length === 0;
    }

    dfs(startNodeId, startNode, endNode) {
        return this.genericGraphSearch(new Stack(), startNodeId, PROBLEM_TYPE.UNWEIGHTED_GRAPH, startNode, endNode);
    }

    bfs(startNodeId, startNode, endNode) {
        return this.genericGraphSearch(new Queue(), startNodeId, PROBLEM_TYPE.UNWEIGHTED_GRAPH, startNode, endNode);
    }

    Dijkstra(startNodeId, endNodeId) {
        let   priorityQueue = new PriorityQueue();
        let    exploredPath = [];
        const     distances = {};
        const      previous = {};
        let            path = [];
        let            done = false;
        let closestId;

        // setup initial state
        for(let nodeId in this.adjacencyList) {
            if(nodeId === startNodeId) {
                distances[nodeId] = 0;
                priorityQueue.push(nodeId, 0);
            } else {
                distances[nodeId] = Infinity;
                priorityQueue.push(nodeId, Infinity);
            }
            previous[nodeId] = null;
        }

        while(!done) {
            closestId = priorityQueue.pop().id;
            if(closestId === endNodeId) {
                while(previous[closestId]) {
                    path.push(closestId);
                    closestId = previous[closestId];
                }
                done = true;
                continue;
            }

            exploredPath.push(closestId);
            if(closestId || distances[closestId] !== Infinity) {
                for(let neighborId in this.adjacencyList[closestId]) {
                    let   nextNode = this.adjacencyList[closestId][neighborId];
                    let actualCost = distances[closestId] + nextNode.weight;
                    if(actualCost < distances[nextNode.id]) {
                        // update the cost to neightbor
                        distances[nextNode.id] = actualCost;
                        // update previous
                        previous[nextNode.id] = closestId;
                        // add the nextNode to the priority queue
                        priorityQueue.push(nextNode.id, actualCost);
                    }
                }
            }
        }
        const result = path.concat(closestId).reverse();
        console.log(result);
        return [exploredPath, result];
    }

    ucs(startNodeId, startNode, endNode) {
        return this.genericGraphSearch(new PriorityQueue(), startNodeId, PROBLEM_TYPE.UNIFORM, startNode, endNode);
    }

    heuristic(nodeId, endNode) {
        const nodeCors = extractId(nodeId);
        return manhatanDistance(endNode.x, endNode.y, nodeCors[0], nodeCors[1]) / 2;
    }

    getCost(nodeId, startNode) {
        const nodeCors = extractId(nodeId);
        return manhatanDistance(startNode.x, startNode.y, nodeCors[0], nodeCors[1]);
    }

    getPathFromExploredPath(startNode, endNode, exploredPath) {
        // calculate the dir of endNode from startNode
        const deltaX = startNode.x - endNode.x == 0 ? 0 : startNode.x - endNode.x > 0 ? -1 : 1;
        const deltaY = startNode.y - endNode.y == 0 ? 0 : startNode.y - endNode.y > 0 ? -1 : 1;
        let currentX = startNode.x;
        let currentY = startNode.y;
        let  isIncreaseY = false; // for making diagonal path
        let shortestPath = [];
        let currentNodeId;
        while(currentX !== endNode.x && currentY !== endNode.y) {
            currentNodeId = `${currentX}-${currentY}`;
            if(exploredPath.includes(currentNodeId)) shortestPath.push(currentNodeId);

            if(isIncreaseY) { currentY += deltaY }
            else { currentX += deltaX };
            isIncreaseY = !isIncreaseY;
        }
        while(currentX !== endNode.x) {
            currentNodeId = `${currentX}-${currentY}`;
            if(exploredPath.includes(currentNodeId)) shortestPath.push(currentNodeId);
            currentX += deltaX;
        }
        while(currentY !== endNode.y) {
            currentNodeId = `${currentX}-${currentY}`;
            if(exploredPath.includes(currentNodeId)) shortestPath.push(currentNodeId);
            currentY += deltaY;
        }

        shortestPath.push(currentY);
        return shortestPath;
    }

    aStar(startNodeId, startNode, endNode) {
        return this.genericGraphSearch(new PriorityQueue(), startNodeId, PROBLEM_TYPE.A_STAR, startNode, endNode, this.heuristic);
    }

    reconstructPath(exploredSet, currentNode) {
        let shortestPath = [currentNode];
        while(exploredSet[currentNode]) {
            currentNode = exploredSet[currentNode];
            shortestPath.push(currentNode);
        }
        return shortestPath.reverse();
    }

    genericGraphSearch(frontier, startNodeId, problem, startNode, endNode, heuristic = undefined) {
        const exploredPath = [];
        const  exploredSet = {};
        let           done = false;
        let    parentNodes = {};
        let         result = [];
        const INITIAL_PRIORITY = 0;
        let currentNode;

        if(problem === PROBLEM_TYPE.UNWEIGHTED_GRAPH) frontier.push(startNodeId)
        else frontier.push(startNodeId, INITIAL_PRIORITY)

        parentNodes[startNodeId] = null;

        while(!done) {
            currentNode = (frontier instanceof PriorityQueue) ? frontier.pop().id : frontier.pop();

            if (this.isGoal(currentNode)) {
                exploredPath.push(currentNode);
                result = this.reconstructPath(parentNodes, currentNode);
                done   = true;
                continue;
            }

            if (!exploredSet[currentNode]) {
                exploredSet[currentNode] = true;
                exploredPath.push(currentNode);
                for(let neighborNode of this.adjacencyList[currentNode]) {
                    if(!exploredSet[neighborNode.id]) { // if the exploredSet does not contain the neighborNode
                        parentNodes[neighborNode.id] = currentNode; // for finding shortest path
                        // the case where the problem is DFS & BFS
                        if(problem === PROBLEM_TYPE.UNWEIGHTED_GRAPH) {
                            frontier.push(neighborNode.id);
                        } else if(problem === PROBLEM_TYPE.A_STAR) {
                            // calculate cost
                            const backwardCost = this.getCost(neighborNode.id, startNode); // fix efficency
                            const    totalCost = backwardCost + heuristic(neighborNode.id, endNode);
                            frontier.push(neighborNode.id, totalCost);
                        }
                    } 
                }
            }
            done = this.isEmpty();
        }
    
        return [exploredPath, result];
    }
};

// addVertex(node) {
//     const idKey = node.id;
//     if(!this.adjacencyList[idKey]) this.adjacencyList[idKey] = [];

//     const nodeKey = this.makeKey(node);
//     if(!this.nodesData[nodeKey]) this.nodesData[nodeKey] = [];
// }