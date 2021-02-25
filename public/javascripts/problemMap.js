class ProblemMap {
    static instance;
    static map;

    static #setup() {
        this.map = {};
        this.map[PROBLEM_TYPE.A_STAR] = (startNode, endNode) => {
            const [exploredPath, resultPath] = gn.aStar(startNode.id, startNode, endNode);
            animatePath(exploredPath, resultPath);
        };
        this.map[PROBLEM_TYPE.BFS] = (startNode, endNode) => {
            const [exploredPath, resultPath] = gn.bfs(startNode.id, startNode, endNode);
            animatePath(exploredPath, resultPath);
        };
        this.map[PROBLEM_TYPE.DJKSTRA] = (startNode, endNode) => {
            const [exploredPath, resultPath] = gn.Dijkstra(startNode.id, endNode.id);
            animatePath(exploredPath, resultPath);
        };
        this.map[PROBLEM_TYPE.DFS] = (startNode, endNode) => {
            const [exploredPath, resultPath] = gn.dfs(startNode.id, startNode, endNode);
            animatePath(exploredPath, resultPath);
        };
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = this;
        ProblemMap.#setup();
        return this.instance;
    }

    static execute(problemType, startNode, endNode) {
        this.map[problemType](startNode, endNode);
    }
}