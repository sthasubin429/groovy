import React from 'react';
import { useSelector } from 'react-redux';

export default function UserDetails() {
	const userDetails = useSelector((state) => state.profile.user_details);
	const userInfo = useSelector((state) => state.profile.user_info);
	const loading = useSelector((state) => state.profile.loading);

	return (
		<>
			{loading ? (
				<div className='pt-5 spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<div class='container-fluid profile-header pt-5 '>
					<div className='row'>
						<div className='col-12 col-sm-4'>
							<div className='d-flex  justify-content-center align-items-center'>
								<img src={userInfo.profile_picture} class='rounded p-2' alt='Profile Picture' width='100%' />
							</div>
						</div>
						<div className='col-12 col-sm-8'>
							<div className='container-fluid'>
								<div className='row'>
									<div className='col-sm-7'>
										<h3 className='profile-name text-capitalize'>
											{userInfo.first_name} {userInfo.last_name}
										</h3>
									</div>

									<div className='col-sm-5'>
										<button className='btn btn-secondary mx-2'> Follow </button>
										<button className='btn btn-secondary mx-2'> Share </button>
									</div>
								</div>

								<div className='row'>
									<div className='col-12'>
										<p className='profile-username'>{userDetails.username}</p>
									</div>
								</div>

								<div className='row my-3'>
									<div className='col'>526 Followers</div>
									<div className='col'>562 Following</div>
									<div className='col'>15 Tracks</div>
								</div>

								<div className='row my-4'>
									<div className='col-12'>
										<h4>Bio </h4>
										<p> {userInfo.bio}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
