import React, { Component } from 'react';
import Header from '../components/header';
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";

import BaseRouter from "../routes";

class Main extends Component {

    render() {
        return (
            <>
                {
                    this.props.isAuthenticated ?
                    <Header/>
                    :
                    <Sidebar/>
                }
                    <BaseRouter />
                <Footer/>
            </>
        );
    }
}

export default Main;