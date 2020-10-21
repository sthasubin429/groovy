import React, { Component } from 'react';
import Header from '../components/header';
import Footer from "../components/footer";
import Landing from "../components/landing";

class Home extends Component {

    render() {
        return (
            <>
                <Header/>
                <Landing/>
                <Footer/>
            </>
        );
    }
}

export default Home;