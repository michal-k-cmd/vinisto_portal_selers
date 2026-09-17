import { Link } from 'react-router-dom';

import './styles.css';

const NotFoundPage = () => {
	return (
		<div className="not-found-page">
			<div className="page-title">404 Not Found</div>
			<Link
				to="/"
				className="mt-2 btn btn-primary"
			>
				Go to Dashboard
			</Link>
		</div>
	);
};

export default NotFoundPage;
