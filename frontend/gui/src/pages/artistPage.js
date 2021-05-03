import axios from 'axios';

import { useSelector } from 'react-redux';
import { BASE_URL, TOKEN } from '../store/utility';

import React, { useEffect, useState } from 'react';
import ArtistProfile from '../components/artist/artistProfile';

export default function ArtistPage(props) {
	const artistId = localStorage.getItem('profile_view');
	const [artist, setArtist] = useState([]);
	const [loading, setLoading] = useState(true);

	// console.log(artistId);

	useEffect(() => {
		if (artistId) {
			axios
				.get(`${BASE_URL}/userProfile/api/${artistId}`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					// console.log(res.data);
					setArtist(res.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [artistId]);
	return (
		<>
			{loading ? (
				<div className='pt-5 spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<ArtistProfile artist={artist} />
			)}
		</>
	);
}
