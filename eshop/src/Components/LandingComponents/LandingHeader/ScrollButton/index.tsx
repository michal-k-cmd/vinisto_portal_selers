'use client';

import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

const ScrollButton = () => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const scrollDown = () => {
		const headerElement = document.getElementById('landing-header');
		if (headerElement) {
			const headerHeight = headerElement.getBoundingClientRect().height;
			window.scrollTo({
				top: window.scrollY + headerHeight,
				behavior: 'smooth',
			});
		}
	};

	return (
		<button
			onClick={scrollDown}
			className={styles.scrollButton}
		>
			{t({ id: 'landing.scroll.interested' })} &gt;
		</button>
	);
};

export default ScrollButton;
