import React from 'react';

function CustomPlayer (props) {
    return (
        
        <>
            Custom Player
            <audio autoPlay controls src={props.song.song_audio} />
            <button onClick={() => props.handleNext()} > Next</button>

        </>
    );
}

export default CustomPlayer;