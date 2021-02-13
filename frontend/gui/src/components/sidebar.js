import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import * as actions from '../store/actions/auth';

class Sidebar extends Component {
	render() {
		return (
			<>
				<div className='sidebar-container'>
					<Link className='navbar-brand' to='/'>
						Groovy
					</Link>
					<ul className='navbar-nav ml-auto'>
						<li className='nav-item active'>
							<Link className='nav-link' to='/'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/player'>
								Music Player
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/'>
								About Us
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/'>
								Community
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/'>
								Help
							</Link>
						</li>

						<li className='nav-item' onClick={this.props.logout}>
							<Link className='nav-link'> Logout </Link>
						</li>
					</ul>
				</div>
			</>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(actions.logout()),
	};
};

export default connect(null, mapDispatchToProps)(Sidebar);
