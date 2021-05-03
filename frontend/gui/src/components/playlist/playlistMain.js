import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { changePlaylist, playerUpdateLikeCount } from '../../store/actions/player';

export const PlaylistCard = (props) => {
	const dispatch = useDispatch();
	return (
		<>
			<div className='playlist-card'>
				<img src={props.playlist.playlist_cover} className='playlist-card-img' />

				<Link
					to='/player'
					onClick={() => {
						dispatch(changePlaylist(props.playlist.id));
					}}
				>
					<h4 className='text-center'>{props.playlist.playlist_name}</h4>
				</Link>

				<h6 className='text-center'> {props.playlist.getUsername}</h6>
			</div>
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
	let noOfPages = Math.ceil(playlist.length / noOfItem);

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
				{playlistPaginated.map((playlist) => (
					<PlaylistCard key={playlist.id} playlist={playlist} />
				))}
				{/* <PlaylistCard playlist={playlistPaginated} /> */}
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
