import axios from 'axios';

import { useSelector } from 'react-redux';

import { SongCard } from '../songList.js';
import React, { useEffect, useState } from 'react';

import { PlaylistCard } from '../playlist/playlistMain.js';
import { POST, TOKEN, BASE_URL, DELETE } from '../../store/utility';

export default function ArtistProfile(props) {
	const follow = useSelector((state) => state.profile.user_info);

	const following = props.artist[0].user;
	const [followState, setFollowState] = useState(false);
	const [followData, setFollowData] = useState([]);

	const [countLoading, setCountLoading] = useState(true);
	const [followerCount, setFollowerCount] = useState(0);
	const [followingCount, setFollowingCount] = useState(0);

	const [loading, setLoading] = useState(true);

	const [playlist, setPlaylist] = useState([]);
	const [songs, setSongs] = useState([]);

	useEffect(() => {
		if (following) {
			axios
				.get(`${BASE_URL}/songs/playlist/api/userPlaylist/${following}/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					setPlaylist(res.data);
					axios
						.get(`${BASE_URL}/songs/api/userSongs/${following}/`, {
							headers: {
								authorization: 'Token ' + TOKEN,
							},
						})
						.then((res) => {
							setSongs(res.data);
							setLoading(false);
						})
						.catch((err) => {
							setLoading(false);
							window.location.replace('http://localhost:3000/500/');
						});
				})
				.catch((err) => {
					setLoading(false);
					window.location.replace('http://localhost:3000/500/');
				});
		}
	}, [following]);

	useEffect(() => {
		if (follow && following) {
			checkFollowState(follow.user, following);
		}
	}, [follow, following]);

	useEffect(() => {
		if (followData && followData.length > 0) {
			setFollowState(true);
		} else {
			setFollowState(false);
		}
	}, [followData]);

	useEffect(() => {
		if (following) {
			axios
				.get(`${BASE_URL}/interaction/follow/api/getFollowers/${following}/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					setFollowerCount(res.data.length);
					getFollowingCount(following);
				})
				.catch((err) => {
					getFollowingCount(following);
					setFollowerCount(0);
				});
		}
	}, [following]);

	const getFollowingCount = (user_id) => {
		axios
			.get(`${BASE_URL}/interaction/follow/api/getFollowing/${user_id}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				setFollowingCount(res.data.length);
				setCountLoading(false);
			})
			.catch((err) => {
				setFollowingCount(0);
				setCountLoading(false);
			});
	};

	const handleOnClick = (event, requestType) => {
		event.preventDefault();
		let formData = new FormData();

		formData.append('user', follow.user);
		formData.append('following', following);

		switch (requestType) {
			case POST:
				if (TOKEN) {
					axios
						.post(`${BASE_URL}/interaction/follow/api/create/`, formData, {
							headers: {
								authorization: 'Token ' + TOKEN,
							},
						})
						.then((res) => {
							window.location.reload();
						})
						.catch((err) => {
							window.location.replace('http://localhost:3000/500/');
						});
				}

			case DELETE:
				if (TOKEN) {
					axios
						.delete(`${BASE_URL}/interaction/follow/api/${followData[0].id}/delete/`, {
							headers: {
								authorization: 'Token ' + TOKEN,
							},
						})
						.then((res) => {
							window.location.reload();
						})
						.catch((err) => {
							window.location.replace('http://localhost:3000/500/');
						});
				}
		}
	};

	const checkFollowState = (user, following) => {
		axios
			.get(`${BASE_URL}/interaction/follow/api/checkFollow/${user}/${following}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				setFollowData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<div className='artistProfile-container'>
				<div className='artistProfile-container-header'>
					<div className='artistProfile-container-left'>
						<img src={props.artist[0].profile_picture} alt='Profile Picture' width='100%' />
					</div>

					<div className='artistProfile-container-right'>
						<div className='d-flex flex-column flex-md-row justify-content-evenly justify-content-between'>
							<h4 className='artist-name text-capitalize'>
								{props.artist[0].first_name} {props.artist[0].last_name}
							</h4>
							<div className='artist-follow'>
								{followState ? (
									<>
										<button className='btn btn-secondary' onClick={(event) => handleOnClick(event, DELETE)}>
											Following
										</button>
									</>
								) : (
									<>
										<button className='btn btn-secondary' onClick={(event) => handleOnClick(event, POST)}>
											Follow
										</button>
									</>
								)}
							</div>
						</div>
						<div className='artist-username'>
							<p>{props.artist[0].getUsername}</p>
						</div>

						<div className='artist-numbers d-flex justify-content-between'>
							{countLoading ? (
								<div className='spinner-border text-primary' role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							) : (
								<>
									<div>{followingCount} Followers</div>
									<div>{followerCount} Following</div>
									<div>{songs ? <>{songs.length}</> : <>0</>} Tracks</div>
								</>
							)}
						</div>

						<div className='artist-bio'>
							<h4>Bio </h4>
							<p> {props.artist[0].bio}</p>
						</div>
					</div>
				</div>

				<div className='artistProfile-playlist'>
					{loading ? (
						<div className='spinner-border text-primary' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					) : (
						<>
							<h3> Playlist </h3>
							<div className='playlist-main-container d-flex align-content-between justify-content-start flex-wrap'>
								{playlist.map((list) => (
									<PlaylistCard key={list.id} playlist={list} />
								))}
							</div>
						</>
					)}
				</div>

				<div className='artistProfile-songs'>
					{loading ? (
						<div className='spinner-border text-primary' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					) : (
						<>
							<h3> Songs </h3>
							<div className='d-flex flex-wrap'>
								{songs.map((song) => (
									<SongCard key={song.id} song={song} />
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
