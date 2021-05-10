import axios from 'axios';
import Loading from '../other/loading';

import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { BASE_URL, TOKEN } from '../../store/utility';
import { useDispatch, useSelector } from 'react-redux';

import { changePlaylist } from '../../store/actions/player';

export default function FeaturedArtist() {
	const [artist, setArtists] = useState([]);
	const [playlist, setPlaylist] = useState();
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
					let fd = filteredData[Math.floor(Math.random() * filteredData.length)];
					console.log(fd);

					axios
						.get(`${BASE_URL}/songs/playlist/api/userPlaylist/${fd.user}/`, {
							headers: {
								authorization: 'Token ' + TOKEN,
							},
						})
						.then((res) => {
							if (res.data.length < 2) {
								setPlaylist(res.data);
							} else {
								setPlaylist(res.data.sort(() => Math.random() - Math.random()).slice(0, 2));
							}
							setLoading(false);
						})
						.catch((err) => {
							console.log(err);
							setLoading(false);
						});
					setArtists(fd);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		}
	}, [userInfo]);
	console.log(artist, playlist);

	return (
		<>
			<div className='featured-artist'>
				{loading ? (
					<Loading />
				) : (
					<>
						<h4> Featured Artist</h4>
						<div className='fArtist-card'>
							<div className='fArtist-card-left'>
								<div className='text-capitalize text-name'>
									<Link
										to='/artistDetail'
										onClick={() => {
											localStorage.setItem('profile_view', artist.user);
										}}
									>
										{artist.first_name} {artist.last_name}
									</Link>
								</div>
								<p className='text-username'>
									<Link
										to='/artistDetail'
										onClick={() => {
											localStorage.setItem('profile_view', artist.user);
										}}
									>
										{artist.getUsername}
									</Link>{' '}
								</p>
								<div className='fArtist-playlist-card d-flex align-content-between justify-content-start flex-wrap'>
									{playlist.map((playlist) => (
										<PlaylistCard key={playlist.id} playlist={playlist} />
									))}
								</div>
							</div>
							<div className='fArtist-card-img'>
								<img src={artist.profile_picture} alt='...' width='100%' />
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export const PlaylistCard = (props) => {
	const dispatch = useDispatch();
	return (
		<>
			<div className='playlist-card'>
				<img src={props.playlist.playlist_cover} className='playlist-card-img' width='120' height='120' />

				<Link
					to='/playlistDetail'
					onClick={() => {
						dispatch(changePlaylist(props.playlist.id));
					}}
				>
					<h6 className='text-center'>{props.playlist.playlist_name}</h6>
				</Link>
			</div>
		</>
	);
};
