import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './Routes';
import Header from './components/Header';

import './global.css';

ReactDOM.render(
	<>
		<Header />
		<Routes />
	</>,
	document.getElementById('root')
);
