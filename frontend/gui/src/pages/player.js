import React, { Component } from 'react';
import axios from 'axios';

import CustomPlayer from "../components/customPlayer";
class Player extends Component {

    constructor(props){
        super(props);
        this.state = {
           songs: {}
        };
      }
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/songs/api/2`)
            .then(res => {
                this.setState({
                    songs: res.data
                });
            })
    }

    render() {
        
        return (
            <>
                <CustomPlayer songs={this.state.songs}></CustomPlayer>
            </>
        );
    }
}

export default Player;