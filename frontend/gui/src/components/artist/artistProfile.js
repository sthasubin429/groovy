import React from 'react';
import { Link } from 'react-router-dom';

export default function ArtistProfile(props) {
	return (
		<>
			<h2> Artist Profile</h2>
			<div className='container-fluid profile-header pt-5 '>
				<div className='row'>
					<div className='col-12 col-sm-4'>
						<div className='d-flex  justify-content-center align-items-center'>
							<img src={props.artist[0].profile_picture} class='rounded p-2' alt='Profile Picture' width='100%' />
						</div>
					</div>
					<div className='col-12 col-sm-8'>
						<div className='container-fluid'>
							<div className='row'>
								<div className='col-sm-7'>
									<h3 className='profile-name text-capitalize'>
										{props.artist[0].first_name} {props.artist[0].last_name}
									</h3>
								</div>

								<div className='col-sm-5'>
									<button className='btn btn-secondary mx-2'> Follow </button>
									<button className='btn btn-secondary mx-2'> Share </button>
								</div>
							</div>

							<div className='row'>
								<div className='col-12'>
									<p className='profile-username'>{props.artist[0].username}</p>
								</div>
							</div>

							<div className='row my-3'>
								<div className='col pt-2'>526 Followers</div>
								<div className='col pt-2'>562 Following</div>
								<div className='col pt-2'>15 Tracks</div>

								<div className='col'>
									<Link to='/profileEdit'>
										<button className='btn btn-secondary'> Edit </button>
									</Link>
								</div>
							</div>

							<div className='row my-4'>
								<div className='col-12'>
									<h4>Bio </h4>
									<p> {props.artist[0].bio}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
