import * as React from 'react';

import LoadingSpinner from './Components/LoadingSpinner';

import './styles.css';

const Preloader: React.FunctionComponent = () => {
	return (
		<div className="loading-overlay fade show">
			<LoadingSpinner />
		</div>
	);
};

export default Preloader;
