import React from 'react';
import Header from '../components/header';
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";

import {BaseRouter, LoggedInRoute} from "../routes";

function Main(props) {

        return (
            <>
                {
                    props.isAuthenticated ?
                    <>
                        <Header/>
                            <BaseRouter  />
                        <Footer/>
                    </>
                    :
                    <>
                        <Sidebar/>
                            <LoggedInRoute />
                        
                    </>
                    
                }
                    
            </>
        );

}

export default Main;