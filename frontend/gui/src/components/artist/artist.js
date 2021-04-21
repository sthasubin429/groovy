import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../../store/utility';
import ArtistDetail from './artistDetail';

export default function Artist() {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/userProfile/api/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				console.log(res.data);
				setArtists(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			{loading ? (
				<div className='pt-5 spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<>
					{artists.map((artist) => (
						<ArtistDetail key={artist.id} artist={artist} />
					))}
				</>
			)}
		</>
	);
}
