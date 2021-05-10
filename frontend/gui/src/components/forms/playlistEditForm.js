import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL, POST, TOKEN } from '../../store/utility';
import Loading from '../other/loading';
import axios from 'axios';

export default function PlaylistEditForm(props) {
	let playlist_id = localStorage.getItem('current_playlist');

	// const playlist = useSelector((state) => state.player.playlist_song_details);
	// const user = useSelector((state) => state.profile.user_info);

	const [playlist, setPlaylist] = useState(props.playlist);
	const [playlistInfo, setPlaylistInfo] = useState(props.playlistInfo);
	const [user, setUser] = useState(props.user);
	const [imageFile, setImageFile] = useState();

	const [loading, setLoading] = useState(true);
	const [loadingPlaylistDetail, setLoadingPlaylistDetail] = useState(false);
	const songCover = useRef();

	useEffect(() => {
		setPlaylist(props.playlist);
		setPlaylistInfo(props.playlistInfo);
		setUser(props.user);
	}, [props.playlistInfo, props.playlist, props.user]);

	useEffect(() => {
		if (playlist && user && playlistInfo) {
			setLoading(false);
		}
	}, [playlist, user, playlistInfo]);

	const handleImageFile = (e) => {
		let image = e.target.files[0];
		songCover.current.src = URL.createObjectURL(image);
		setImageFile(image);
	};
	console.log(playlist, user, playlistInfo);

	const handleSubmit = (event, requestType) => {
		setLoadingPlaylistDetail(true);
		event.preventDefault();
		console.log(event.target.elements.playlistName.value);
		let formData = new FormData();
		formData.append('playlist_name', event.target.elements.playlistName.value);
		formData.append('created_by', user.user);
		setLoadingPlaylistDetail(false);
		if (imageFile) {
			formData.append('playlist_cover', imageFile);
		}

		switch (requestType) {
			case POST:
				if (TOKEN) {
					axios
						.put(`${BASE_URL}/songs/playlist/api/${playlist_id}/update/`, formData, {
							headers: {
								authorization: 'Token ' + TOKEN,
							},
						})
						.then((res) => {
							console.log(res.data);
							window.location.reload();
						})
						.catch((err) => {
							console.log(err);
						});
				}
		}
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<h4> Edit Playlist</h4>
					<form className='col-12 m-4' onSubmit={(event) => handleSubmit(event, POST)}>
						<div className='form-group row'>
							<label htmlFor='playlistName' className='col-12 col-md-2 col-form-label'>
								Name
							</label>

							<div className='col-12 col-md-10'>
								<input type='text' className='form-control' id='playlistName' defaultValue={playlistInfo.playlist_name} required />
							</div>

							<div className='form-group row col-12'>
								<div className='d-flex justify-content-start aligin-items-center flex-column flex-lg-row'>
									<img
										src={playlistInfo.playlist_cover}
										className='rounded mx-auto d-block'
										alt='Playlist Cover'
										width='240px'
										className='m-4'
										ref={songCover}
									/>
									<div className='custom-file m-4'>
										<input
											type='file'
											className=''
											name='profile-picture'
											id='profile-picture'
											accept='image/png, image/jpeg'
											onChange={(e) => {
												handleImageFile(e);
											}}
										/>

										<label className='custom-file-label' htmlFor='profile-picture'>
											Choose file...
										</label>
									</div>
								</div>
							</div>
						</div>

						{loadingPlaylistDetail ? <Loading /> : <input type='Submit' name='submit' className='btn btn-primary' />}
					</form>
				</>
			)}
		</>
	);
}
