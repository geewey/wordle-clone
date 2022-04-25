import React from 'react'


function Guesses( {guesses} ) {
    
    return (<div>
        {guesses.map((guess) => {
            return <p className="guess" key={100000000 * Math.random()}>{`${guess}`}</p>;
        })}
    </div>)
}

export default Guesses