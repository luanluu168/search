const MapData = (function () {
    let instance;
    let map;
    let keys;

    function setupKeys() {
        keys = {};
        keys['L_MAP']     = MAP.L_MAP;
        keys['MAZE_MAP']  = MAP.MAZE_MAP;
        keys['EMPTY_MAP'] = MAP.EMPTY_MAP;
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = this;
                setupKeys();
            }
            return instance;
        },
        isWall: function(row, column) {
            return map[row][column] === 'w';
        },
        change: function(newMap) {
            if(newMap) map = keys[newMap]
            else map = keys['L_MAP'];
        }
    };
})();