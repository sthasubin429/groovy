import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

class Login extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onAuth(event.target.loginUsername.value, event.target.loginPassword.value);
		this.props.history.push('/');
	}

	render() {
		let errorMessage = null;
		if (this.props.error) {
			errorMessage = <p>{this.props.error.message}</p>;
		}
		return (
			<>
				<div className='container'>
					{errorMessage}

					{this.props.loading ? (
						<div className='spinner-border text-primary' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					) : (
						<form onSubmit={this.handleSubmit}>
							<div className='form-group'>
								<label for='loginUsername'>Username</label>
								<input type='text' className='form-control' name='loginUsername' placeholder='Username' />
							</div>
							<div className='form-group'>
								<label for='loginPassword'>Password</label>
								<input type='password' className='form-control' name='loginPassword' placeholder='Password' />
							</div>

							<button type='submit' className='btn btn-primary'>
								Submit
							</button>
						</form>
					)}
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		error: state.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
