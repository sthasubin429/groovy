import React from 'react';

import FeaturedSongs from '../components/landing/featuredSongs';
import FeaturedArtist from '../components/landing/featuredArtist';
import FeaturedPlaylist from '../components/landing/featuredPlaylist';

export default function HomePage() {
	return (
		<>
			<div className='home-container'>
				<FeaturedArtist />

				<FeaturedPlaylist />
				<FeaturedSongs />
			</div>
		</>
	);
}
