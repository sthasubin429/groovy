import axios from 'axios';

import { useSelector } from 'react-redux';
import Loading from '../components/other/loading';

import { BASE_URL, TOKEN } from '../store/utility';
import React, { useState, useEffect } from 'react';

export const SongCard = (props) => {
	const user = useSelector((state) => state.profile.user_info);
	const [allowEdit, setAllowEdit] = useState(false);
	useEffect(() => {
		if (user && props.song) {
			if (user.user === props.song.username) {
				setAllowEdit(true);
			} else {
				setAllowEdit(false);
			}
		} else {
			setAllowEdit(false);
		}
	}, [user, props.song]);

	const handleDelete = (event) => {
		event.preventDefault();
		if (window.confirm('Are you sure you wish to delete Your Song? \nYou cannot undo this action.')) {
			if (TOKEN) {
				axios
					.delete(`${BASE_URL}/songs/api/${props.song.id}/delete/`, {
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

	return (
		<>
			<div className='song-card'>
				{allowEdit ? (
					<>
						<button
							type='button'
							className='song-dropdown btn btn-secondary dropdown-toggle '
							data-toggle='dropdown'
							aria-haspopup='true'
							aria-expanded='false'
						></button>
						<div className='dropdown-menu dropdown-menu-right'>
							<button
								className='dropdown-item btn-danger'
								type='button'
								onClick={(event) => {
									handleDelete(event);
								}}
							>
								Delete
							</button>
						</div>
					</>
				) : (
					<></>
				)}
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

function SongList(props) {
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
					window.location.replace('http://localhost:3000/500/');
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
	let noOfItem = 18;

	useEffect(() => {
		if (search) {
			let filterd = searchSongs.slice((currentPage - 1) * noOfItem, currentPage * noOfItem);
			setNoOfPages(Math.ceil(searchSongs.length / noOfItem));
			setSongsPaginated(filterd);
		} else {
			let filterd = allSongs.slice((currentPage - 1) * noOfItem, currentPage * noOfItem);
			setNoOfPages(Math.ceil(allSongs.length / noOfItem));
			setSongsPaginated(filterd);
		}
	}, [currentPage, allSongs, searchSongs, search]);

	const changePage = (direction) => {
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

			<div className='d-flex flex-wrap justify-content-center'>
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
							changePage('prev');
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
							changePage('next');
						}}
					>
						<span aria-hidden='true'>&raquo;</span>
					</button>
				</li>
			</ul>
		</>
	);
}

export default SongList;
