import React, { useEffect, useState } from "react";
import "../index.css"

function Grid({ numRows, numCols, sr, sc, er, ec }) {
  // console.log("canada");
  
  const [grid, setGrid] = useState(() =>
  Array.from({ length: numRows }, () => new Array(numCols).fill(false))
  );
  
  const [grid2, setGrid2] = useState(() =>
  Array.from({ length: numRows }, () => new Array(numCols).fill(0))
  );
  
  var isReachable = 1;
  const [isMouseDown, setMouseDown] = useState(false);
  const [pathCells, setPathCells] = useState([]);
  const [coordinates, setCoordinates] = useState({
    x: -1,
    y: -1
  });

  const [idx, setIdx] = useState(-5);



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




  
const  Path = () =>{
// console.log('FSDF')
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

  var dx = [1, -1, 0, 0];
  var dy = [0, 0, 1, -1];
  var isDestination = false;


  function dfs(row, col)
  {
      visited[row][col] = true;
      
      var x = Number(row), y = Number(col);
      
      if(x === Number(er) && y === Number(ec)){
        isDestination = true;
      }
      // console.log("isD", isDestination);
      // console.log("x y er ec", x, y, er,ec );
      if(!isDestination){
      
      for(var i=0;i<4;i++){
          if(x + dx[i] >=0 && y + dy[i] >=0 && x+dx[i] < numRows 
              && y + dy[i] < numCols && !visited[x + dx[i]][y + dy[i]]
                  && !grid[x + dx[i]][y + dy[i]]){

                    if(!isDestination){
                      parentX[x + dx[i]][y + dy[i]] = x;
                      parentY[x + dx[i]][y + dy[i]] = y;
                      setTimeout(()=>{
                        const newGrid = [...grid2];
                        newGrid[x][y] = 1;
                        setGrid2(newGrid);
                      },10)
                      dfs(x + dx[i], y + dy[i]);
                    }
              }
      }

      }

  }


  dfs(sr, sc);

  
  for(var i=0;i<numRows;i++){
    for(var j=0;j<numCols;j++){
        visited[i][j] = false;
    }
}

    var queue = [];
    queue.push([sr, sc]);
    visited[sr][sc] = true;
    // console.log('dfs',sr,sc)



    while(queue.length > 0){
      var thisCell = queue.shift();
      var x = Number(thisCell[0]), y = Number(thisCell[1]);
      
      if(x === er && y === ec){
          isReachable =2;
      }
      
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
    // console.log('x',x,y)

    while(!(x===Number(sr) && y===Number(sc))){
        path.push([x, y]);
        // console.log('fsdf',x,y)
        var temp_x = Number(x) ,temp_y = Number(y);

        if(Number.isNaN(temp_x)){
            alert("Path Does Not Exist!!!"); 
            return;
        }

        // console.log('bfcdnsa',temp_x,temp_y);
        x = parentX[temp_x][temp_y];
        y = parentY[temp_x][temp_y];
    }

    if(isReachable===1){
      isReachable = 0;
    }

    path.push([Number(sr),Number(sc)]);
    path.reverse();

    // console.log("gggg", path);
    // console.log("size", path.length);
    path.pop();
    // console.log("path length", path.length);
    // if(path.length === 0) setIsReachable(false);

    setPathCells(path);


}

  // console.log("path", pathCells);

  function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return true;  
        }
    }
    return false;  
}

  useEffect(()=> {
    pathCells.length > 1 && pathCells.forEach((arr, index) =>{
    setTimeout(()=>{
      const newGrid = [...grid2];
      newGrid[arr[0]][arr[1]] = 2;
      setGrid2(newGrid);
    }, index * 20);
  })}  , [pathCells.length ]);

  const cellSize = Math.min(
    Math.floor((window.innerHeight - 10) / numRows),
    Math.floor((window.innerWidth - 10) / numCols)
  );


  return (
    <div style={{marginLeft:'40px', marginRight:'40px'}}>

    <div className="grid" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
     
      <button
style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginBottom: '2rem' }}
onClick={Path}> 

Let's Begin
  </button>
      {!isReachable && <h1>Path doesn't exist!!!</h1>}
      {isReachable && grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', borderRadius: '5px', padding: '2px',

                backgroundColor:   rowIndex== sr && colIndex== sc ? "red" : 
                    (rowIndex==er && colIndex==ec ? "green" : 
                    grid2[rowIndex][colIndex] === 1 ? "#C7E9B0" : 
                    grid2[rowIndex][colIndex] === 2 ? "#D9ACF5" :

                
                        (grid[rowIndex][colIndex] ? "black" : "white")),
                

                // backgroundColor:   rowIndex== sr && colIndex== sc ? "red" : 
                //     (rowIndex==er && colIndex==ec ? "green" : 
                //       isItemInArray(pathCells, [rowIndex, colIndex]) ? "yellow" :  
                //         (grid[rowIndex][colIndex] ? "black" : "white")),
                 
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

    
    </div>
  );
}

export default Grid;