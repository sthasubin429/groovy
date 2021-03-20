import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

class Register extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		const email = event.target.registerEmail.value;
		const username = event.target.registerUsername.value;
		const password1 = event.target.registerPassword1.value;
		const password2 = event.target.registerPassword2.value;

		let firstName = event.target.registerFirstName.value;
		firstName = firstName.replace(/[^a-zA-Z]/g, '');

		let lastName = event.target.registerLastName.value;
		lastName = lastName.replace(/[^a-zA-Z]/g, '');

		console.log(firstName, lastName);

		this.props.onAuth(username, email, password1, password2);
		event.preventDefault();
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
							<div className=' form-group form-row'>
								<div className='col'>
									<label htmlFor='registerFirstName'>First Name</label>
									<input type='text' className='form-control' placeholder='First name' name='registerFirstName' />
								</div>
								<div className='col'>
									<label htmlFor='registerLastName'>Last Name</label>
									<input type='text' className='form-control' placeholder='Last name' name='registerLastName' />
								</div>
							</div>

							<div className='form-group'>
								<label htmlFor='registerEmail'>Email Address</label>
								<input type='text' className='form-control' name='registerEmail' placeholder='Enter Your Email Address here' />
							</div>

							<div className='form-group'>
								<label htmlFor='registerUsername'>Username</label>
								<input type='text' className='form-control' name='registerUsername' placeholder='Enter Your Username Here' />
							</div>

							<div className='form-group'>
								<label htmlFor='registerPassword1'>Password</label>
								<input type='password' className='form-control' name='registerPassword1' placeholder='Enter your Passowrd here' />
							</div>

							<div className='form-group'>
								<label htmlFor='registerPassword2'>Confirm Password</label>
								<input type='password' className='form-control' name='registerPassword2' placeholder='Confirm your Passowrd' />
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
		onAuth: (username, email, password1, password2) => dispatch(actions.authRegister(username, email, password1, password2)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
