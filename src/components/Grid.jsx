import React, { useState } from "react";
import "../index.css"

function Grid({ numRows, numCols, sr, sc, er, ec }) {
  console.log("canada");
  const [grid, setGrid] = useState(() =>
    Array.from({ length: numRows }, () => new Array(numCols).fill(false))
  );
  const [isMouseDown, setMouseDown] = useState(false);
  const [pathCells, setPathCells] = useState([]);

  const toggleCell = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
  };

  const handleClickedHover = (row, col) =>{
    const newGrid = [...grid];
    newGrid[row][col] =  (isMouseDown ? true : newGrid[row][col]);
    setGrid(newGrid);
  }



  console.log(sr, sc, er, ec);



  
const  Path = () =>{
console.log('FSDF')
  var visited = new Array(numRows), parentX = new Array(numRows), parentY = new Array(numRows);
  for(var i=0;i<numRows;i++){
      visited[i] = new Array(numCols);
      parentX[i] = new Array(numCols);
      parentY[i] = new Array(numCols);
  }

  for(var i=0;i<numRows;i++){
      for(var j=0;j<numCols;j++){
          visited[i][j] = false;
      }
  }
  
  var queue = [];
  queue.push([sr, sc]);
  visited[sr][sc] = true;
  console.log('dfs',sr,sc)

  var dx = [1, -1, 0, 0];
  var dy = [0, 0, 1, -1];

  while(queue.length > 0){
    var thisCell = queue.shift();
    var x = Number(thisCell[0]), y = Number(thisCell[1]);
      for(var i=0;i<4;i++){
          if(x + dx[i] >=0 && y + dy[i] >=0 && x+dx[i] < numRows 
              && y + dy[i] < numCols && !visited[x + dx[i]][y + dy[i]]
                  && !grid[x + dx[i]][y + dy[i]]){
                  queue.push([x + dx[i], y + dy[i]]);
                  visited[x + dx[i]][y + dy[i]] = true;
                  parentX[x + dx[i]][y + dy[i]] = x;
                  parentY[x + dx[i]][y + dy[i]] = y;
              }
      }

  }

  var path=[[]];
  var x = Number(er), y = Number(ec);
  console.log('x',x,y)

  while(!(x===Number(sr) && y===Number(sc))){
      path.push([x, y]);
      console.log('fsdf',x,y)
      var temp_x = Number(x) ,temp_y = Number(y);
      console.log('bfcdnsa',temp_x,temp_y);
      x = parentX[temp_x][temp_y];
      y = parentY[temp_x][temp_y];
  }

  path.push([Number(sr),Number(sc)]);
  path.reverse();

  console.log(path);
  console.log("size", path.length);

  setPathCells(path);
  // for(var index=0; index < path.length -1; index++)
  // { 
  //     setX(path[index][0]);
  //     setY(path[index][1]);

  //     console.log("x y", x, y);
      // setTimeout(setCoordinates(prevCoordinates=>{
      //   return {
      //     ...prevCoordinates,
      //     x: path[index][0],
      //     y: path[index][1]
      //   }
      // }), 1000);

      // setCoordinates(prevCoordinates=>{
      //   return {
      //     ...prevCoordinates,
      //     x:path[index][0],
      //     y:path[index][1]
      //   }
      // });

      // const obj = {
      //   x:path[index][0],
      //   y:path[index][1]
      // }
      // setCoordinates(obj);

      // setTimeout(()=>{
      //   console.log("hello");
      // },1000);

      // console.log("ccc", coordinates,index, path[index][0], path[index][1] );
  // }

  // return path;
}

  console.log("path", pathCells);

  function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return true;  
        }
    }
    return false;  
}

  return (
    <div className="grid">
      <button onClick={Path}>Call Path Now</button>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: "20px",
                height: "20px",

                

                backgroundColor:   rowIndex== sr && colIndex== sc ? "red" : 
                    (rowIndex==er && colIndex==ec ? "green" : 
                      isItemInArray(pathCells, [rowIndex, colIndex]) ? "yellow" :  
                        (grid[rowIndex][colIndex] ? "black" : "white")),
                 
                border: "1px solid gray",
              }}
              onClick={() => toggleCell(rowIndex, colIndex)}
              onMouseDown={()=>{setMouseDown(true)}}
              onMouseUp={()=>{setMouseDown(false)}}
              onMouseEnter={() => handleClickedHover(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;