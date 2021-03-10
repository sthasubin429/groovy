import React from 'react';
import SongForm from '../components/forms/songForm.js';
import { POST } from '../store/utility.js';

function UploadMusic() {
	return (
		<>
			<p> Upload Music</p>
			<SongForm requestType={POST} />
		</>
	);
}

export default UploadMusic;
