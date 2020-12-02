import React, { useEffect } from 'react';
import axios from 'axios';

import CustomPlayer from "../components/customPlayer";

function Player(){
    const [playlist, setPlaylist] = React.useState([]);
    const [index, setIndex] = React.useState(0);
    const [nowPlaying, setNowPlaying] = React.useState([]);
    const [loading, setLoading ] = React.useState(true)

    useEffect(() => {
        setLoading(true)
        axios.get(`http://127.0.0.1:8000/songs/playlistDetail/api/1/`)
            .then(res => {
                setPlaylist(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err)
              });
    }, []);

    
    
    useEffect(()=> {
        if (!loading){       
            handleNowPlaying();
            handleChange("next");
        }
    },[loading]);
    
    
    const handleNowPlaying = () =>{
        const song_id = playlist[index].playlist_songs
        axios.get(`http://127.0.0.1:8000/songs/api/` + song_id + `/`)
        .then(res => {
            setNowPlaying(res.data)
        }).catch(err => {
            console.log(err)
          });
    }
    
    const handleChange = (changeValue) =>{
        console.log('old index ' + index)
        if(changeValue === "next"){
            if (index+1 < playlist.length){
                const newIndex  = index + 1
                setIndex(newIndex);
                console.log('inside if ' + index)           
            }
            else{
                setIndex(0)
                console.log('inside else ' + index)
            }
        }
        else if(changeValue === "prev"){
            if(index !== 0 && index > 0){
                const newIndex  = index - 1
                setIndex(newIndex);
            }
            else{
                setIndex(playlist.length-1);
            }
        }
        
        console.log('new index ' + index)
        handleNowPlaying();
    }

    return (
        <>
            Player
            <CustomPlayer song={nowPlaying} handleChange={handleChange}></CustomPlayer>
        </>
    );

}

export default Player;