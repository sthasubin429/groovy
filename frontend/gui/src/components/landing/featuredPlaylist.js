import axios from 'axios';
import Loading from '../other/loading';

import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { BASE_URL, TOKEN } from '../../store/utility';
import { PlaylistCard } from '../playlist/playlistMain';

export default function FeaturedPlaylist() {
	const [allPlaylist, setAllPlaylist] = useState([]);
	const [loading, setLoading] = useState(true);
	const userInfo = useSelector((state) => state.profile.user_info);

	useEffect(() => {
		if (userInfo) {
			axios
				.get(`${BASE_URL}/songs/playlist/api/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					let data = res.data;
					setAllPlaylist(data.sort(() => Math.random() - Math.random()).slice(0, 18));
					setLoading(false);
				})
				.catch((err) => {
					window.location.replace('http://localhost:3000/500/');
				});
		}
	}, [userInfo]);

	return (
		<>
			<div className='featured-playlist'>
				{loading ? (
					<Loading />
				) : (
					<>
						<div className='carousel-container'>
							<div id='carouselExampleIndicators2' className='carousel slide' data-ride='carousel2'>
								<h4> Featured Playlist</h4>
								<div className='carousel-inner'>
									<div className='carousel-item active'>
										<div className='playlist-main-container d-flex align-content-between justify-content-start flex-wrap'>
											{allPlaylist.slice(0, 4).map((playlist) => (
												<PlaylistCard key={playlist.id} playlist={playlist} />
											))}
										</div>
									</div>
									<div className='carousel-item'>
										<div className='playlist-main-container d-flex align-content-between justify-content-start flex-wrap'>
											{allPlaylist.slice(4, 8).map((playlist) => (
												<PlaylistCard key={playlist.id} playlist={playlist} />
											))}
										</div>
									</div>
									<div className='carousel-item '>
										<div className='playlist-main-container d-flex align-content-between justify-content-start flex-wrap'>
											{allPlaylist.slice(8, 12).map((playlist) => (
												<PlaylistCard key={playlist.id} playlist={playlist} />
											))}
										</div>
									</div>
								</div>
								<a className='carousel-control-prev ' href='#carouselExampleIndicators2' role='button' data-slide='prev'>
									<span className='carousel-control-prev-icon' aria-hidden='true'></span>
								</a>
								<a className='carousel-control-next' href='#carouselExampleIndicators2' role='button' data-slide='next'>
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
