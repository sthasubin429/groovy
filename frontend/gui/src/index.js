import App from './App';
import React from 'react';

import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/configureStore';

import * as serviceWorker from './serviceWorker';

const app = (
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
