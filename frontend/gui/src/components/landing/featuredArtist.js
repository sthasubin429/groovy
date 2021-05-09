import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL, TOKEN } from '../../store/utility';
import axios from 'axios';
import Loading from '../other/loading';

export default function FeaturedArtist() {
	const [allArtists, setAllArtists] = useState([]);
	const [loading, setLoading] = useState(true);
	const userInfo = useSelector((state) => state.profile.user_info);

	useEffect(() => {
		if (userInfo) {
			axios
				.get(`${BASE_URL}/userProfile/api/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					let data = res.data;
					let filteredData = [];
					data.forEach((d) => {
						if (d.id !== userInfo.id) {
							filteredData.push(d);
						}
					});
					setAllArtists(filteredData.sort(() => Math.random() - Math.random()).slice(0, 3));

					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [userInfo]);

	return (
		<>
			<div className='featured-artist'>
				{loading ? (
					<Loading />
				) : (
					<>
						<div className='carousel-container'>
							<div id='carouselExampleIndicators' className='carousel slide' data-ride='carousel'>
								<h4> Featured Artists</h4>
								<div className='carousel-inner'>
									<div className='carousel-item active'>
										<div className='d-flex justify-content-start'>
											<div className='carousel-card-text'>
												<div className='text-capitalize text-name'>
													{allArtists[0].first_name} {allArtists[0].last_name}
												</div>
												<p className='text-username'> {allArtists[0].getUsername}</p>
											</div>
											<div className='carousel-card-img '>
												<img src={allArtists[0].profile_picture} alt='...' width='300' height='250' />
											</div>
										</div>
									</div>
									<div className='carousel-item'>
										<div className='d-flex justify-content-start'>
											<div className='carousel-card-text'>
												<div className='text-capitalize text-name'>
													{allArtists[1].first_name} {allArtists[1].last_name}
												</div>
												<p className='text-username'> {allArtists[1].getUsername}</p>
											</div>
											<div className='carousel-card-img '>
												<img src={allArtists[1].profile_picture} alt='...' width='300' height='250' />
											</div>
										</div>
									</div>
									<div className='carousel-item'>
										<div className='d-flex justify-content-start'>
											<div className='carousel-card-text'>
												<div className='text-capitalize text-name'>
													{allArtists[2].first_name} {allArtists[2].last_name}
												</div>
												<p className='text-username'> {allArtists[2].getUsername}</p>
											</div>
											<div className='carousel-card-img '>
												<img src={allArtists[2].profile_picture} alt='...' width='300' height='250' />
											</div>
										</div>
									</div>
								</div>

								<a className='carousel-control-prev ' href='#carouselExampleIndicators' role='button' data-slide='prev'>
									<span className='carousel-control-prev-icon' aria-hidden='true'></span>
								</a>
								<a className='carousel-control-next' href='#carouselExampleIndicators' role='button' data-slide='next'>
									<span className='carousel-control-next-icon' aria-hidden='true'></span>
								</a>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}
