import { useContext } from 'react';
import useFormatMessage from 'Hooks/useFormatMessage';
import { ProducersPageContext } from 'pages-spa/Producers/context';

import LetterBox from './Components/LetterBox';
import styles from './styles.module.css';

const Header = () => {
	const t = useFormatMessage();
	const { producers, producersData } = useContext(ProducersPageContext);

	const letters = Object.keys(producers ?? {});
	const normalized = letters.map((l) => (/^\d/.test(l) ? '#' : l));
	const uniqueLetters = [...new Set(normalized)];

	return (
		<>
			<h1 className={styles.title}>{t({ id: 'producers.title' })}</h1>
			<div className={styles.lettersContainer}>
				{uniqueLetters.map((letter, index) => (
					<LetterBox
						key={letter ?? 'header' + index}
						href={`#${letter}`}
						isLoading={producersData.isLoading}
					>
						{letter}
					</LetterBox>
				))}
			</div>
		</>
	);
};

export default Header;
