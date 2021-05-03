import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Loading from '../components/other/loading';
import { BASE_URL, TOKEN } from '../store/utility';

export const SongCard = (props) => {
	return (
		<>
			<div
				className='song-card'
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
	const [songsPaginated, setSongsPaginated] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [noOfPages, setNoOfPages] = useState(1);
	let noOfItem = 4;

	useEffect(() => {
		if (search) {
			let filterd = searchSongs.slice((currentPage - 1) * noOfItem, currentPage * noOfItem);
			setNoOfPages(Math.ceil(searchSongs.length / noOfItem));
			console.log(currentPage);
			setSongsPaginated(filterd);
		} else {
			let filterd = allSongs.slice((currentPage - 1) * noOfItem, currentPage * noOfItem);
			setNoOfPages(Math.ceil(allSongs.length / noOfItem));
			console.log(currentPage);
			setSongsPaginated(filterd);
		}
	}, [currentPage, allSongs, searchSongs, search]);

	const changePlaylist = (direction) => {
		if (direction === 'prev') {
			if (currentPage !== 1) {
				setCurrentPage(currentPage - 1);
			} else {
				setCurrentPage(currentPage);
			}
		} else if (direction === 'next') {
			if (currentPage !== noOfPages) {
				setCurrentPage(currentPage + 1);
			} else {
				setCurrentPage(currentPage);
			}
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
			{/* {search ? (
				<div className='d-flex flex-wrap'>
					{searchSongs.map((song) => (
						<SongCard key={song.id} song={song} />
					))}
				</div>
			) : (
				<> */}
			<div className='d-flex flex-wrap'>
				{songsPaginated.map((song) => (
					<SongCard key={song.id} song={song} />
				))}
			</div>

			<ul className='pagination d-flex justify-content-center'>
				<li className='page-item'>
					<button
						className='page-link'
						onClick={(e) => {
							e.preventDefault();
							changePlaylist('prev');
						}}
					>
						<span aria-hidden='true'>&laquo;</span>
					</button>
				</li>
				{[...Array(noOfPages)].map((e, i) => {
					return (
						<li className={i + 1 == currentPage ? 'page-item active' : 'page-item'} key={i}>
							<button
								className='page-link'
								onClick={(e) => {
									e.preventDefault();
									setCurrentPage(i + 1);
								}}
							>
								{i + 1}
							</button>
						</li>
					);
				})}

				<li className='page-item'>
					<button
						className='page-link'
						onClick={(e) => {
							e.preventDefault();
							changePlaylist('next');
						}}
					>
						<span aria-hidden='true'>&raquo;</span>
					</button>
				</li>
			</ul>
			{/* </>
			)} */}
			{/* <div className='d-flex flex-wrap'>
				{allSongs.map((song) => (
					<SongCard key={song.id} song={song} />
				))}
			</div> */}
		</>
	);
}

export default SongList;
