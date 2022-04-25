import React from 'react';
import "./WordGrid.css"

function WordGrid( {handleSubmit, handleInputChange, input} ) {
  
  return <div>
    <form onSubmit={handleSubmit}>
        <input className="input" type="text" value={input} onChange={handleInputChange} />
    </form>
  </div>;
}

export default WordGrid;