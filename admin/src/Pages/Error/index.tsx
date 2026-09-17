import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalizationContext } from 'Services/LocalizationService';
import { Button } from 'react-bootstrap';

import styles from './styles.module.css';

const ErrorPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const navigate = useNavigate();

	return (
		<div className={styles.errorView}>
			<h2>{t({ id: 'errorView.message' })}</h2>
			<div className={styles.errorViewButtons}>
				<Button onClick={() => navigate('/')}>
					{t({ id: 'errorView.goHome' })}
				</Button>
				<Button onClick={() => navigate(-1)}>
					{t({ id: 'admin.btn.back' })}
				</Button>
			</div>
			<div className={styles.videoContainer}>
				<iframe
					width="720"
					height="480"
					src="https://www.youtube.com/embed/dUmWMSSzbuw"
					title="Wine fail"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
		</div>
	);
};

export default ErrorPage;
