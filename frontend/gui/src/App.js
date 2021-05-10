import './scss/style.css';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Main from './pages/main';
import * as actions from './store/actions/auth';

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {
		return (
			<Router>
				<Main {...this.props}></Main>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token == null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
