import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import * as actions from '../store/actions/auth';

class Sidebar extends Component {

    render() {
        return (
            <>
                <nav className="main-nav navbar navbar-expand-lg navbar-light bg-light mb-3"> 
                    <div className="container d-flex justify-content-around">
                        <Link className="navbar-brand" to="/"> Groovy </Link>

                        <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="navbar-expand-sm collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/"> Home </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/player"> Music Player</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/"> About Us </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/"> Community </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/"> Help </Link>
                                </li>

                                <li className="nav-item" onClick={this.props.logout}>
                                    <Link className="nav-link"> Logout </Link>
                                </li>

                                
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.logout())
	};
};

export default connect(null, mapDispatchToProps)(Sidebar);