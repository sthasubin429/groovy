import React, { useEffect, useRef, useState } from 'react';
import { BASE_URL, DELETE, PUT, TOKEN } from '../../store/utility';
import Loading from '../other/loading';
import axios from 'axios';

export default function PlaylistEditForm(props) {
	let playlist_id = localStorage.getItem('current_playlist');

	const [playlist, setPlaylist] = useState(props.playlist);
	const [playlistInfo, setPlaylistInfo] = useState(props.playlistInfo);
	const [playlistDetail, setPlaylistDetail] = useState(props.playlistDetail);
	const [user, setUser] = useState(props.user);
	const [imageFile, setImageFile] = useState();

	const [loading, setLoading] = useState(true);
	const [loadingPlaylistDetail, setLoadingPlaylistDetail] = useState(false);
	const songCover = useRef();

	useEffect(() => {
		setPlaylist(props.playlist);
		setPlaylistInfo(props.playlistInfo);
		setUser(props.user);
		setPlaylistDetail(props.playlistDetail);
	}, [props.playlistInfo, props.playlist, props.user, props.playlistDetail]);

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
	console.log(playlist, user, playlistInfo, playlistDetail);

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
			case PUT:
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
					<form className='col-12 m-4' onSubmit={(event) => handleSubmit(event, PUT)}>
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

					<form>
						{playlist.map((playlist, i) => (
							<EditPlaylistOldSongs key={playlist.id} playlist={playlist} playlistDetail={playlistDetail[i]} />
						))}
					</form>
				</>
			)}
		</>
	);
}

export function EditPlaylistOldSongs(props) {
	console.log(props.playlist);
	console.log(props.playlistDetail);

	const handleRemoveOldSong = (event, requestType, id) => {
		event.preventDefault();
		switch (requestType) {
			case DELETE:
				if (TOKEN) {
					axios
						.delete(`${BASE_URL}/songs/playlistDetail/api/${id}/delete/`, {
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
			<div className='form-group row'>
				<div className='col-12 col-sm-8'>
					<input className='form-control' defaultValue={props.playlist.song_name} disabled />
				</div>

				<div className='col-12 col-sm-4'>
					<button
						className='btn btn-danger'
						onClick={(event) => {
							handleRemoveOldSong(event, DELETE, props.playlistDetail.id);
						}}
					>
						Remove
					</button>
				</div>
			</div>
		</>
	);
}
