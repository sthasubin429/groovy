import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { changePlaylist, playerUpdateLikeCount } from '../../store/actions/player';
import { useDispatch } from 'react-redux';

export const PlaylistCard = (props) => {
	const dispatch = useDispatch();
	return (
		<>
			{props.playlist.map((list) => (
				<>
					<div className='playlist-card'>
						<img src={list.playlist_cover} width='155' height='140' />

						<Link
							to='/player'
							onClick={() => {
								dispatch(changePlaylist(list.id));
							}}
						>
							<h4 className='text-center'>{list.playlist_name}</h4>
						</Link>

						<h6 className='text-center'> {list.getUsername}</h6>
					</div>
				</>
			))}
		</>
	);
};

// const RenderPaginaiton = (props) => {
// 	return (

// 	);
// };

export default function PlaylistMain(props) {
	const [playlist, setPlaylist] = useState(props.playlist);
	// const dispatch = useDispatch();
	const [playlistPaginated, setPlaylistPaginated] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	let noOfItem = 4;
	let noOfPages = parseInt(Math.floor(playlist.length / noOfItem) + 1);

	// console.log(noOfPages);

	useEffect(() => {
		setPlaylist(props.playlist);
	}, [props.playlist]);

	useEffect(() => {
		let filterd = playlist.slice((currentPage - 1) * noOfItem, currentPage * noOfItem);
		console.log(currentPage);
		setPlaylistPaginated(filterd);
	}, [currentPage, playlist]);

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
			<div className='playlist-main-container d-flex align-content-between justify-content-start flex-wrap'>
				<PlaylistCard playlist={playlistPaginated} />
			</div>

			{/* <RenderPaginaiton numPages={noOfPages} /> */}
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
			<ul className='d-flex justify-content-center'></ul>
		</>
	);
}
