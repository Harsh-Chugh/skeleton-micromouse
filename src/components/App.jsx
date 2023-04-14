import React, { useState } from "react";
import Grid from "./Grid";

const r = Number(prompt("No. of Rows in grid "));
const c = Number(prompt("No. of columns in grid"));

function App(){

    const [coordinates, setCoordinates] = useState({
      sr : 0,
      sc : 0,
      er : 1,
      ec : 1
    });

    function handleChange(event){

      const {name,value} = event.target;

      setCoordinates((prevCoordinates)=>{
        return ({
          ...prevCoordinates,
          [name] : value
        });
      });
      
    }


    return (
      <div>

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <input 
    onChange={handleChange} 
    type="number" 
    min={0} 
    
    name="sr" 
    placeholder="Starting Cell row-index"
    style={{ 
      padding: '10px', 
      margin: '10px', 
      border: '2px solid #4CAF50', 
      borderRadius: '4px', 
      fontSize: '16px',
      fontWeight: 'bold'
    }}
  />
  <input 
    onChange={handleChange} 
    type="number" 
    min={0} 
    
    name="sc" 
    placeholder="Starting Cell col-index"
    style={{ 
      padding: '10px', 
      margin: '10px', 
      border: '2px solid #4CAF50', 
      borderRadius: '4px', 
      fontSize: '16px',
      fontWeight: 'bold'
    }}
  />
  <input 
    onChange={handleChange} 
    type="number" 
    min={0} 
    
    name="er" 
    placeholder="Ending Cell row-index"
    style={{ 
      padding: '10px', 
      margin: '10px', 
      border: '2px solid #4CAF50', 
      borderRadius: '4px', 
      fontSize: '16px',
      fontWeight: 'bold'
    }}
  />
  <input 
    onChange={handleChange} 
    type="number" 
    min={0} 
  
    name="ec" 
    placeholder="Ending Cell col-index"
    style={{ 
      padding: '10px', 
      margin: '10px', 
      border: '2px solid #4CAF50', 
      borderRadius: '4px', 
      fontSize: '16px',
      fontWeight: 'bold'
    }}
  />
</div>


        <Grid numRows={r} numCols={c} sr={coordinates.sr} sc={coordinates.sc} er={coordinates.er} ec={coordinates.ec}/>
        </div>
      );
    }
    
    export default App;