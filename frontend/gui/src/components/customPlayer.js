import React from 'react';

function CustomPlayer (props) {
    return (
        
        <>
            Player
            <audio autoPlay controls src={props.songs.song_audio} />

        </>
    );
}

export default CustomPlayer;