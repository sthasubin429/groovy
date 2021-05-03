import axios from 'axios';

import { useSelector } from 'react-redux';
import ArtistDetail from './artistDetail';

import React, { useEffect, useState } from 'react';
import { BASE_URL, TOKEN } from '../../store/utility';

export default function Artist() {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);
	const userInfo = useSelector((state) => state.profile.user_info);

	useEffect(() => {
		if (userInfo) {
			axios
				.get(`${BASE_URL}/userProfile/api/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					// console.log(res.data);
					setArtists(res.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [userInfo]);

	return (
		<>
			{loading ? (
				<div className='pt-5 spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<>
					{artists.map((artist) => (
						<ArtistDetail key={artist.id} artist={artist} user_id={userInfo.id} />
					))}
				</>
			)}
		</>
	);
}
