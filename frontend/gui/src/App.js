import React, { Component } from 'react';
import './scss/style.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';



import * as actions from './store/actions/auth';
import Main from './pages/main';

class App extends Component {

	componentDidMount () {
    	this.props.onTryAutoSignup();
	}

	render() {
		return (
			<Router>
				<Main {...this.props}>         
				</Main>
			</Router>
		);
  }
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.token == null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
