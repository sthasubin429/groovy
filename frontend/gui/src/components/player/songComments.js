import Comment from './comment';

import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

export default function SongComments() {
	const commentsList = useSelector((state) => state.player.comments);
	// console.log(commentsList);
	const [commentState, setCommentState] = useState(false);

	useEffect(() => {
		if (commentsList && commentsList.length > 0) {
			setCommentState(true);
		} else {
			setCommentState(false);
		}
	}, [commentsList]);

	return (
		<>
			<div className='col-12 song-comments'>
				<h4 className='song-comments-title'> Comments</h4>
				{commentState ? (
					<>
						{commentsList.map((comment) => (
							<Comment key={comment.id} comment={comment} />
						))}
					</>
				) : (
					<div className='song-no-comments'>
						<h5> No Comments on this Song</h5>
					</div>
				)}
			</div>
		</>
	);
}
