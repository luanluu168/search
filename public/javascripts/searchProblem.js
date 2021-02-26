var SearchProblem = (function () {
    let instance;
    let map;

    function setupMap() {
        map = {};
        map[PROBLEM_TYPE.A_STAR] = (gn, startNode, endNode) => {
            const [exploredPath, resultPath] = gn.aStar(startNode.id, startNode, endNode);
            animatePath(exploredPath, resultPath);
        };
        map[PROBLEM_TYPE.BFS] = (gn, startNode, endNode) => {
            const [exploredPath, resultPath] = gn.bfs(startNode.id, startNode, endNode);
            animatePath(exploredPath, resultPath);
        };
        map[PROBLEM_TYPE.DJKSTRA] = (gn, startNode, endNode) => {
            const [exploredPath, resultPath] = gn.Dijkstra(startNode.id, endNode.id);
            animatePath(exploredPath, resultPath);
        };
        map[PROBLEM_TYPE.DFS] = (gn, startNode, endNode) => {
            const [exploredPath, resultPath] = gn.dfs(startNode.id, startNode, endNode);
            animatePath(exploredPath, resultPath);
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = this;
                setupMap();
            }
            return instance;
        },
        execute: function(gn, problemType, startNode, endNode) {
            map[problemType](gn, startNode, endNode);
        }
    };
})();