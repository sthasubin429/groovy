import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL, TOKEN } from '../../store/utility';
import axios from 'axios';
import Loading from '../other/loading';

export default function FeaturedSongs() {
	const [allSongs, setAllSongs] = useState([]);
	const [loading, setLoading] = useState(true);
	const userInfo = useSelector((state) => state.profile.user_info);

	useEffect(() => {
		if (userInfo) {
			axios
				.get(`${BASE_URL}/songs/api/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					let data = res.data;
					setAllSongs(data.sort(() => Math.random() - Math.random()).slice(0, 18));
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [userInfo]);

	console.log(allSongs);

	return (
		<>
			<div className='featured-artist'>
				{loading ? (
					<Loading />
				) : (
					<>
						<div className='carousel-container'>
							<div id='carouselExampleIndicators3' className='carousel slide' data-ride='carousel2'>
								<h4> Featured Songs</h4>
								<div className='carousel-inner'>
									<div className='carousel-item active'>
										<div className='d-flex flex-wrap justify-content-center'>
											{allSongs.slice(0, 6).map((song) => (
												<SongCard key={song.id} song={song} />
											))}
										</div>
									</div>
									<div className='carousel-item '>
										<div className='d-flex flex-wrap justify-content-center'>
											{allSongs.slice(6, 12).map((song) => (
												<SongCard key={song.id} song={song} />
											))}
										</div>
									</div>
									<div className='carousel-item '>
										<div className='d-flex flex-wrap justify-content-center'>
											{allSongs.slice(12, 18).map((song) => (
												<SongCard key={song.id} song={song} />
											))}
										</div>
									</div>
								</div>

								<a className='carousel-control-prev ' href='#carouselExampleIndicators3' role='button' data-slide='prev'>
									<span className='carousel-control-prev-icon' aria-hidden='true'></span>
								</a>
								<a className='carousel-control-next' href='#carouselExampleIndicators3' role='button' data-slide='next'>
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

export const SongCard = (props) => {
	return (
		<>
			<div className='song-card'>
				<div
					onClick={() => {
						window.location.replace('http://localhost:3000/listen');
						localStorage.setItem('listen', props.song.id);
					}}
				>
					<img src={props.song.song_photo} className='songList-songImg text-center' alt='Song' />

					<div className='songList-songDetail'>
						<div className='text-capitalize text-center'>{props.song.song_name}</div>
						<div className='text-center'>{props.song.getUsername}</div>
					</div>
				</div>
			</div>
		</>
	);
};
