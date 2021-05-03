import React from 'react';

import { POST } from '../store/utility.js';
import SongForm from '../components/forms/songForm.js';

function UploadMusic() {
	return (
		<>
			<SongForm requestType={POST} />
		</>
	);
}

export default UploadMusic;
