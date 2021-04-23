import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../store/utility';
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
			<h2> Artist Page</h2>
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
