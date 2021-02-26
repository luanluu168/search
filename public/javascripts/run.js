async function run() {
    try {
        let          gn = new GraphNode();
        // setup map data
        let     mapData = MapData.getInstance();
        mapData.change(document.getElementById("selectMap").value);

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
        grid(document.querySelector('section[name="grid-board"]'), problemType, START_POSITION_AT_ROW, START_POSITION_AT_COL, START_NODE, mapData, gn);
        // use search problem's instance to execute the problem types
        SearchProblem.getInstance().execute(gn, problemType, START_NODE, END_NODE);
    } catch(err) {
        console.log(`Error: ${err}`);
    } finally {
        enableRunButton();
    }
};

window.onload = () => {
    run();
};