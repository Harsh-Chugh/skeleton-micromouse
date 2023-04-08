import React, { useState } from "react";
import Grid from "./Grid";
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

        <input onChange={handleChange} type="number" name = "sr" placeholder="Starting Cell row-index"/>
        <input onChange={handleChange} type="number" name = "sc" placeholder="Starting Cell col-index"/>
        <input onChange={handleChange} type="number" name = "er" placeholder="Ending Cell row-index"/>
        <input onChange={handleChange} type="number" name = "ec" placeholder="Ending Cell col-index"/>
        <Grid numRows={30} numCols={30} sr={coordinates.sr} sc={coordinates.sc} er={coordinates.er} ec={coordinates.ec}/>
        </div>
      );
    }
    
    export default App;