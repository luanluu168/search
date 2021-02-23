function extractId(nodeId) {
    const result = nodeId.split('-');
    return result;
};

function manhatanDistance(x1, y1, x2, y2) {
    return Math.abs(x1-x2) + Math.abs(y1-y2);
};

function clearDiv(elementID) { 
    let div = document.getElementById(elementID); 
      
    while(div.firstChild) { 
        div.removeChild(div.firstChild); 
    } 
}; 

function getBoxWidth(totalBoxInRow) {
    return parseInt(screen.width / totalBoxInRow);
};

/* Creating a grid board */
function grid(element, problem, startPositionAtRow, startPositionAtCol, startNode) {
    let isStartRow, isEndRow, row, previousColGrid, previousRowGrid = [];
    let container = document.createElement("div");
    container.id  = "grid-board";
    container.className = "container";
    let isDisplayCost = document.getElementById("selectDisplayCost").value == 'yes' ? true : false;

    const BOX_SIZE = screen.width <= 544 ? getBoxWidth(TOTAL_BOX_IN_ROW) : 32;
    // Create a n * m grid and initialize graph data
    for (let i=0; i<MAX_ROWS; i++) {
        row = document.createElement("div");
        row.className = "d-flex justify-content-center align-items-center";
        row.style = `height:${BOX_SIZE}px;line-height:${BOX_SIZE}px;`;
        row.id = `r-${i}`;
        isStartRow = i === startPositionAtRow;
        isEndRow   = i === END_POSITION_AT_ROW;
      
        for (let j=0; j<MAX_COLS; j++) {
            let grid = document.createElement("div"); 
            grid.className = "d-inline-block border border-secondary";
            grid.style = `width:${BOX_SIZE}px;height:${BOX_SIZE}px;box-sizing:border-box;`;
            grid.id = `${i}-${j}`;

            if(isStartRow && j === startPositionAtCol)  { grid.innerHTML = "&#9992;", grid.style.backgroundColor = "rgb(255,128,128)" }
            else if(isEndRow && j === END_POSITION_AT_COL) { grid.innerHTML = "&#127937", grid.style.backgroundColor = "rgb(255, 0, 0)" }
            else grid.style.backgroundColor = "lightgrey"

            row.appendChild(grid);

            // add grid to graph
            const gridNode = new Node(i, j, grid);
            gn.addVertex(gridNode);
            const     cost = manhatanDistance(startNode.x, startNode.y, i, j);

            if(isDisplayCost) grid.innerHTML = cost;

            // add edge to each element in the row
            // A0 -- B0
            if (j > 0) { gn.addEdge(previousColGrid, gridNode, cost, problem) }; 

            // add edge to each element in the column
            // A0
            // |
            // A1
            if (i > 0) { gn.addEdge(previousRowGrid[j], gridNode, cost, problem) }; 
            
            // for horizontal edge linking
            previousColGrid = gridNode;

            // for vertical edge linking
            previousRowGrid[j % MAX_COLS] = gridNode;
        };
      
        container.appendChild(row);
    };

    element.appendChild(container);
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.color = "blue";
};

function animatePath(exploredPath, resultPath, problem) {
    function cb(path = resultPath) {
        for(let i=1; i<path.length-1; i++) {
            setTimeout(() => {
                document.getElementById(path[i]).style.backgroundColor = `rgba(200, 200, 0, ${opacity})`;
                opacity += 0.017;

                if(i == path.length - 2) { enableRunButton() }
            }, i * delayInMilliseconds);
        }
    }

    const actualAnimatedLength = exploredPath.length-2;
    let opacity = 1.0 / actualAnimatedLength;
    const delayInMilliseconds = 10;
    for(let i=1; i<exploredPath.length-1; i++) {
        setTimeout(() => {
            document.getElementById(exploredPath[i]).style.backgroundColor = `rgba(192, 192, 192, 1)`;
            // opacity += 0.017;

            // the case of DFS
            if((problem === PROBLEM_TYPE.DFS) && (i == exploredPath.length - 2)) { cb(exploredPath) }
            else if(i == exploredPath.length - 2) { cb() }
        }, i * delayInMilliseconds);
    }
};

function openSideMenu() {
    document.getElementById("sideMenu").style.width = "15rem";
};
  
function closeSideMenu() {
    document.getElementById("sideMenu").style.width = "0";
};

function disableInputRowColAlert() {
    inputRowAlert.addClass("d-none");
    inputColAlert.addClass("d-none");
};

function enableRunButton() {
    document.getElementById("runButton").disabled = false;
};