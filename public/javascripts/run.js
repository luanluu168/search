function run() {
    try {
        disableInputRowColAlert();
        // Dynamic change the position
        const START_POSITION_AT_ROW = parseInt(document.getElementById("startPositionRowIndex").value);
        const START_POSITION_AT_COL = parseInt(document.getElementById("startPositionColIndex").value);
        const  START_NODE = new Node(START_POSITION_AT_ROW, START_POSITION_AT_COL, undefined, "start-node");
        const    END_NODE = new Node(END_POSITION_AT_ROW, END_POSITION_AT_COL, undefined, "end-node");

        document.getElementById("runButton").disabled = true;
        let gridBoard = document.querySelector('div[id="grid-board"]');
        if(gridBoard) { clearDiv('grid-board') };
        const SELECTED_PROBLEM_TYPE = document.getElementById("selectProblem");
        const           problemType = SELECTED_PROBLEM_TYPE.value;
        grid(document.querySelector('section[name="grid-board"]'), problemType, START_POSITION_AT_ROW, START_POSITION_AT_COL, START_NODE);
        switch(problemType) {
            case PROBLEM_TYPE.A_STAR: {
                const [exploredPath, resultPath] = gn.aStar(START_NODE.id, START_NODE, END_NODE);
                animatePath(exploredPath, resultPath, problemType);
                break;
            }
            case PROBLEM_TYPE.DJKSTRA: {
                const [exploredPath, resultPath] = gn.Dijkstra(START_NODE.id, END_NODE.id);
                animatePath(exploredPath, resultPath, problemType);
                break;
            }
            case PROBLEM_TYPE.BFS: {
                const [exploredPath, resultPath] = gn.bfs(START_NODE.id, START_NODE, END_NODE);
                animatePath(exploredPath, resultPath, problemType);
                break;
            }
            default: { // DFS
                const [exploredPath, resultPath] = gn.dfs(START_NODE.id, START_NODE, END_NODE);
                animatePath(exploredPath, resultPath, problemType);
            }
        }
    } catch(err) {
        console.log(`Error: ${err}`);
    } finally {
        enableRunButton();
    }
};

window.onload = () => {
    run();
};