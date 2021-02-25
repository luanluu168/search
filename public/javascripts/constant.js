const      TOTAL_BOX_IN_ROW = 20;
const              MAX_ROWS = 20;
const              MAX_COLS = 20;
const   END_POSITION_AT_ROW = 5;
const   END_POSITION_AT_COL = 17;
const        DEFAULT_WEIGHT = 1;
const            WALL_COLOR = "rgb(210,105,30)";
const  START_POSITION_COLOR = "rgb(255,128,128)";
const    END_POSITION_COLOR = "rgb(255, 0, 0)";

const DIRECTION = [[-1,0], [1,0], [0,1], [0,-1]];

const PROBLEM_TYPE = {
    UNWEIGHTED_GRAPH: "Unweighted_graph",
    DFS: "Depth_first_search",
    BFS: "Breadth_first_search",
    DJKSTRA: "Djkstra",
    A_STAR: "A_star"
};
