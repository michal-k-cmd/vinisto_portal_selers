import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { get } from 'lodash-es';
import Link from 'next/link';
import getBundleImage, { IMAGE_SIZE_THUMB_80x80 } from 'Helpers/getBundleImage';
import { LocalizationContext } from 'Services/LocalizationService';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import { ICategoryBoxProps } from './interfaces';
import styles from './styles.module.css';

const CategoryBox = (props: ICategoryBoxProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const isLoading = get(props, 'isLoading', false);

	if (isLoading)
		return (
			<Skeleton
				height={46}
				inline={true}
				width={217}
				count={6}
			/>
		);

	return (
		<Link
			href={`/${t({
				id: 'routes.category.route',
			})}/${getLocalizedValue(get(props, 'category.url', []))}`}
			className={styles.searchCategoryBox}
		>
			<img
				className={styles.searchCategoryBoxImage}
				src={getBundleImage(
					get(props, 'category.images', []),
					IMAGE_SIZE_THUMB_80x80
				)}
				alt={`${t({ id: 'alt.bundleImage' })}`}
			/>
			<span className={styles.searchCategoryBoxName}>
				{getLocalizedValue(get(props, 'category.name', [])) ?? '-'}
			</span>
		</Link>
	);
};

export default CategoryBox;
