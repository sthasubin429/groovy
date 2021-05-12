import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleLike } from '../../store/actions/player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart as frHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faShare, faPlus } from '@fortawesome/free-solid-svg-icons';

export const HeartFilled = () => {
	return (
		<>
			<FontAwesomeIcon size='1x' icon={faHeart} />
		</>
	);
};

export const HeartNotFilled = () => {
	return (
		<>
			<FontAwesomeIcon size='1x' icon={frHeart} />
		</>
	);
};

export default function InteractionBar() {
	const likeCount = useSelector((state) => state.player.likeCount);
	const like = useSelector((state) => state.player.like);

	const dispatch = useDispatch();

	return (
		<>
			<div className='d-flex justify-content-center col-12 px-0'>
				<div className='interaction-bar flex-fill'>
					<div className='d-inline'>
						<button
							onClick={(event) => {
								event.preventDefault();
								dispatch(toggleLike());
							}}
							className='interaction-bar-like '
						>
							{like ? <HeartFilled /> : <HeartNotFilled />}
						</button>
						<span className='interaction-bar-likeCount '> {likeCount} </span>
					</div>

					<button className='intraction-bar-btn float-right'>
						<FontAwesomeIcon className='icon' icon={faShare} />
						<span>Share</span>
					</button>
					<button className='intraction-bar-btn float-right'>
						<FontAwesomeIcon icon={faPlus} />
						<span>Add To</span>
					</button>
					<div className='float-right'></div>
				</div>
			</div>
		</>
	);
}
