'use client';

import { useContext } from 'react';
import NextLink from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import { FavoriteCount } from 'Components/Favorite';

import styles from './styles.module.css';

const Favorites = () => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<NextLink
			className={styles.favorites}
			href={`/${t({ id: 'routes.user-section.route' })}/${t({
				id: 'routes.user-section.favorites.route',
			})}`}
		>
			<FavoriteCount />
		</NextLink>
	);
};

export default Favorites;
