import React from 'react';
import Edit from '../components/profile/edit';

import { POST } from '../store/utility';

export default function ProfileEdit() {
	return (
		<>
			<Edit requestType={POST} />
		</>
	);
}
