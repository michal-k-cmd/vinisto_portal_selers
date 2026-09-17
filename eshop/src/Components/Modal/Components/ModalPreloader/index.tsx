import * as React from 'react';
import LoadingSpinner from 'Components/Preloader/Components/LoadingSpinner';

import './styles.css';

/**
 * @category Component Modal Preloader
 */
const ModalPreloader: React.FC<Record<any, any>> = (): JSX.Element => (
	<div className="modal-preloader">
		<LoadingSpinner />
	</div>
);

export default ModalPreloader;
