import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart, faShare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as frHeart } from '@fortawesome/free-regular-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

import { toggleLike } from '../../store/actions/player';

export default function InteractionBar() {
	const likeCount = useSelector((state) => state.player.likeCount);
	const like = useSelector((state) => state.player.like);
	const dispatch = useDispatch();

	return (
		<>
			<div className='col-8'>
				<button
					className='float-left'
					onClick={(event) => {
						event.preventDefault();
						dispatch(toggleLike());
					}}
				>
					<FontAwesomeIcon icon={like ? faHeart : frHeart} />
					<span>Favourite </span>
				</button>
				<button className='float-left'>
					<FontAwesomeIcon icon={faShare} />
					<span>Share</span>
				</button>
				<button className='float-left'>
					<FontAwesomeIcon icon={faPlus} />
					<span>Add To</span>
				</button>

				<div className='float-right'>
					{likeCount} <span> Favourites </span>
				</div>
			</div>
		</>
	);
}
