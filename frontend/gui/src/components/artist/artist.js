import axios from 'axios';

import { useSelector } from 'react-redux';
import ArtistDetail from './artistDetail';

import React, { useEffect, useState } from 'react';
import { BASE_URL, TOKEN } from '../../store/utility';

export default function Artist() {
	const [allArtists, setAllArtists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState(false);
	const [searchArtists, setSearchArtists] = useState([]);
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
					let data = res.data;
					let filteredData = [];
					data.forEach((d) => {
						if (d.id !== userInfo.id) {
							filteredData.push(d);
						}
					});
					setAllArtists(filteredData);
					setLoading(false);
				})
				.catch((err) => {
					window.location.replace('http://localhost:3000/500/');
				});
		}
	}, [userInfo]);

	const [artistsPaginated, setArtistsPaginated] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [noOfPages, setNoOfPages] = useState(1);
	let noOfItem = 15;

	useEffect(() => {
		if (search) {
			let filterd = searchArtists.slice((currentPage - 1) * noOfItem, currentPage * noOfItem);
			setNoOfPages(Math.ceil(searchArtists.length / noOfItem));
			setArtistsPaginated(filterd);
		} else {
			let filterd = allArtists.slice((currentPage - 1) * noOfItem, currentPage * noOfItem);
			setNoOfPages(Math.ceil(allArtists.length / noOfItem));
			setArtistsPaginated(filterd);
		}
	}, [currentPage, allArtists, searchArtists, search]);

	const changePage = (direction) => {
		if (direction === 'prev') {
			if (currentPage !== 1) {
				setCurrentPage(currentPage - 1);
			} else {
				setCurrentPage(currentPage);
			}
		} else if (direction === 'next') {
			if (currentPage !== noOfPages) {
				setCurrentPage(currentPage + 1);
			} else {
				setCurrentPage(currentPage);
			}
		}
	};

	const handleSearch = (event) => {
		event.preventDefault();
		setLoading(true);

		let query = event.target.elements.search.value;

		if (query) {
			axios
				.get(`${BASE_URL}/userProfile/api/search/${query}`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					setLoading(false);
					setSearch(true);
					setSearchArtists(res.data);
				})
				.catch((err) => {
					setSearch(false);
					setLoading(false);
					setSearchArtists([]);
					window.location.replace('http://localhost:3000/500/');
				});
		} else {
			setSearch(false);
			setLoading(false);
			setSearchArtists([]);
		}
	};

	return (
		<>
			<form
				className='form-inline'
				onSubmit={(e) => {
					handleSearch(e);
				}}
			>
				<input className='form-control mr-2 ml-3 col-8' type='search' placeholder='Search' aria-label='Search' name='search' />
				{loading ? (
					<div className='pt-5 spinner-border text-primary' role='status'>
						<span className='sr-only'>Loading...</span>
					</div>
				) : (
					<button className='btn btn-outline-primary my-2 my-sm-0' type='submit'>
						Search
					</button>
				)}
			</form>

			{loading ? (
				<div className='pt-5 spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<>
					<div className='d-flex flex-wrap justify-content-center'>
						{artistsPaginated.map((artist) => (
							<ArtistDetail key={artist.id} artist={artist} user_id={userInfo.id} />
						))}
					</div>
				</>
			)}

			<ul className='pagination d-flex justify-content-center'>
				<li className='page-item'>
					<button
						className='page-link'
						onClick={(e) => {
							e.preventDefault();
							changePage('prev');
						}}
					>
						<span aria-hidden='true'>&laquo;</span>
					</button>
				</li>
				{[...Array(noOfPages)].map((e, i) => {
					return (
						<li className={i + 1 == currentPage ? 'page-item active' : 'page-item'} key={i}>
							<button
								className='page-link'
								onClick={(e) => {
									e.preventDefault();
									setCurrentPage(i + 1);
								}}
							>
								{i + 1}
							</button>
						</li>
					);
				})}

				<li className='page-item'>
					<button
						className='page-link'
						onClick={(e) => {
							e.preventDefault();
							changePage('next');
						}}
					>
						<span aria-hidden='true'>&raquo;</span>
					</button>
				</li>
			</ul>
		</>
	);
}
