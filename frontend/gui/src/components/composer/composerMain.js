import Loading from '../other/loading';
import React, { useState } from 'react';

export default function ComposerMain() {
	const [generated, setGenerated] = useState(false);
	const [loading, setLoading] = useState(false);

	const genertate = () => {
		setLoading(true);
		setGenerated(false);

		fetch('http://127.0.0.1:5000/generate')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setGenerated(true);
				setLoading(false);
			});
	};

	return (
		<>
			<div className='composer-container d-flex flex-column justify-content-around align-items-center'>
				<h3 className='composer-title'> Composer</h3>
				<div>
					<p className='composer-info text-center'> A Music Composer built using Artificial Inteligence. </p>
				</div>

				<div>
					<p className='composer-info text-center'>Click on Generate to Generate a Music Piece. </p>
				</div>

				{loading ? (
					<>
						<div className='composer-loading'>
							<Loading />
						</div>
						<p className='composer-loading-msg text-center'> Please Wait Music is Being Generated</p>
					</>
				) : (
					<>
						<button
							onClick={() => {
								genertate();
							}}
							className='btn btn-primary generate-btn'
						>
							Generate
						</button>
					</>
				)}

				{generated ? (
					<>
						<a href='http://127.0.0.1:5000/download' target='_blank' className='composer-download'>
							Download
						</a>

						<p className='composer-download-msg text-center'> You can click Download abovee to Generate a new Piece</p>

						<p className='composer-download-msg text-center'>
							On downloading you will get a text file. Copy the content of the text file and go to{' '}
							<a href='http://www.mandolintab.net/abcconverter.php' target='_blank'>
								mandolintab
							</a>{' '}
							to get a midi file. For more details click <a href='/composerDetails'>here</a> .
						</p>
					</>
				) : (
					<></>
				)}
			</div>
		</>
	);
}
