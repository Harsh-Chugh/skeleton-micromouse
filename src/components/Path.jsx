import React from "react";

function Path(props){

    var visited = new Array(props.numRows), parentX = new Array(props.numRows), parentY = newArray(props.numRows);
    for(var i=0;i<props.numRows;i++){
        visited[i] = new Array(props.numCols);
        parentX[i] = new Array(props.numCols);
        parentY[i] = new Array(props.Cols);
    }

    for(var i=0;i<props.numRows;i++){
        for(var j=0;j<numCols;j++){
            visited[i][j] = false;
        }
    }

    var queue = [];
    queue.push([props.sr, props.sc]);
    visited[props.sr][props.sc] = true;

    var dx = [1, -1, 0, 0];
    var dy = [0, 0, 1, -1];

    while(q.length > 0){
        var thisCell = queue.shift();

        var x = thisCell[0], y = thisCell[1];

        for(var i=0;i<4;i++){
            if(x + dx[i] >=0 && y + dy[i] >=0 && x+dx[i] < props.numRows 
                && y + dy[i] < props.numCols && !visited[x + dx[i]][y + dy[i]]){
                    queue.push([x + dx[i], y + dy[i]]);
                    visited[x + dx[i]][y + dy[i]] = true;
                    parentX[x + dx[i]][y + dy[i]] = x;
                    parentY[x + dx[i]][y + dy[i]] = y;
                }
        }

    }

    var path=[];
    var x = props.er, y = props.ec;
    while(!(x===props.sr && y===props.sc)){
        path.push([x, y]);
        var temp_x = x, temp_y = y;
        x = parentX[temp_x][temp_y], y = parentY[temp_x][temp_y];
    }

    path.reverse();

    return path;
}

export default Path;