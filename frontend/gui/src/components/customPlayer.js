import React from 'react';

function CustomPlayer (props) {
    return (
        
        <>
            Custom Player
            <button onClick={() => props.handleChange("prev")} > Previous</button>
            <audio autoPlay controls src={props.song.song_audio} />
            <button onClick={() => props.handleChange("next")} > Next</button>

        </>
    );
}

export default CustomPlayer;