import React, { useState, useEffect } from 'react';
import Loading from '../components/other/loading';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../store/utility';

const SongCard = (props) => {
	return (
		<>
			<div className='song-card'>
				<img src={props.song.song_photo} className='songList-songImg text-center' alt='Song' />

				<div className='songList-songDetail'>
					<div className='text-capitalize text-center'>{props.song.song_name}</div>
					<div className='text-center'>{props.song.getUsername}</div>
				</div>
			</div>
		</>
	);
};

function SongList(props) {
	// console.log(props.songs);
	const [allSongs, setAllSongs] = useState(props.songs);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState(false);
	const [searchSongs, setSearchSongs] = useState([]);

	useEffect(() => {
		setAllSongs(props.songs);
	}, [props.songs]);

	const handleSearch = (event) => {
		event.preventDefault();
		setLoading(true);

		let query = event.target.elements.search.value;
		console.log(query);
		if (query) {
			axios
				.get(`${BASE_URL}/songs/api/search/${query}`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					setLoading(false);
					setSearch(true);
					setSearchSongs(res.data);
				})
				.catch((err) => {
					setSearch(false);
					setLoading(false);
					setSearchSongs([]);
					// console.log(err);
				});
		} else {
			setSearch(false);
			setLoading(false);
			setSearchSongs([]);
		}
	};

	return (
		<>
			<form
				class='form-inline'
				onSubmit={(e) => {
					handleSearch(e);
				}}
			>
				<input class='form-control mr-2 ml-3 col-8' type='search' placeholder='Search' aria-label='Search' name='search' />
				{loading ? (
					<Loading />
				) : (
					<button class='btn btn-outline-primary my-2 my-sm-0' type='submit'>
						Search
					</button>
				)}
			</form>
			{search ? (
				<div className='d-flex flex-wrap'>
					{searchSongs.map((song) => (
						<SongCard key={song.id} song={song} />
					))}
				</div>
			) : (
				<div className='d-flex flex-wrap'>
					{allSongs.map((song) => (
						<SongCard key={song.id} song={song} />
					))}
				</div>
			)}
			{/* <div className='d-flex flex-wrap'>
				{allSongs.map((song) => (
					<SongCard key={song.id} song={song} />
				))}
			</div> */}
		</>
	);
}

export default SongList;
