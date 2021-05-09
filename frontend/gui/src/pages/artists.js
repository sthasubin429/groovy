import React from 'react';

import Artist from '../components/artist/artist';

export default function Artists() {
	return (
		<>
			<div className='artist-container'>
				<h2 className='artist-title'> Artists </h2>
				<Artist />
			</div>
		</>
	);
}
