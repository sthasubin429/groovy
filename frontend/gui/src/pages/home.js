import React from 'react';
import FeaturedArtist from '../components/landing/featuredArtist';
import FeaturedPlaylist from '../components/landing/featuredPlaylist';
import FeaturedSongs from '../components/landing/featuredSongs';

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
