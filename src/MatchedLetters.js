import React from 'react';
import "./MatchedLetters.css";

function MatchedLetters( {matchedLetters} ) {
  return matchedLetters.length > 0 ? 
    <div>
      Matched Letters:
      <div className="matchedLetters">{matchedLetters}</div> 
    </div>
    : <div></div>
}

export default MatchedLetters;
