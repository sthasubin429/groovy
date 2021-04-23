import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Comment from './comment';

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
			<div className='col-8'>
				{commentState ? (
					<>
						{commentsList.map((comment) => (
							<Comment key={comment.id} comment={comment} />
						))}
					</>
				) : (
					<div>
						<h5> No Comments on this Song</h5>
					</div>
				)}
			</div>
		</>
	);
}
