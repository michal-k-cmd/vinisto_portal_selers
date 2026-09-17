import { useContext } from 'react';
import cx from 'classnames';
import { ProducersPageContext } from 'pages-spa/Producers/context';
import Skeleton from 'react-loading-skeleton';
import VinistoLink from 'Components/VinistoLink';
import removeDiacritics from 'Helpers/removeDiacritics';
import { LocalizationContext } from 'Services/LocalizationService';
import { Producers } from 'pages-spa/Producers/interfaces';

import styles from './styles.module.css';

const List = () => {
	const { producers, producersData } = useContext(ProducersPageContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const groupedProducers = Object.entries(producers ?? {}).reduce<Producers>(
		(acc, [rawLetter, values]) => {
			const letter = /^\d/.test(rawLetter) ? '#' : rawLetter;
			acc[letter] = (acc[letter] ?? []).concat(values ?? []);
			return acc;
		},
		{} as Producers
	);

	const letters = Object.keys(producers ?? {});
	const normalized = letters.map((l) => (/^\d/.test(l) ? '#' : l));
	const uniqueLetters = [...new Set(normalized)];

	const isLoading = producersData.isLoading;

	return uniqueLetters.map((letter, index) => {
		const values = groupedProducers[letter];

		return (
			<div
				className={styles.letterWrapper}
				key={letter ?? 'producerslist' + index}
			>
				<h2
					className={styles.title}
					id={letter ?? undefined}
				>
					{isLoading ? <Skeleton width="2rem" /> : letter}
				</h2>

				<div className={styles.valuesList}>
					{values?.map((value, vIndex) =>
						isLoading ? (
							<Skeleton
								key={'columnproducersload' + vIndex}
								className={cx(styles.value, styles.skeleton)}
							/>
						) : (
							<VinistoLink
								to={`/${t({
									id: 'routes.products.route',
								})}/Vyrobce/${removeDiacritics(`${value.url}`)?.replace(
									/\s/g,
									'+'
								)}`}
								key={'columnproducers' + vIndex}
								className={styles.value}
							>
								{value.value}
							</VinistoLink>
						)
					)}
				</div>
			</div>
		);
	});
};

export default List;
