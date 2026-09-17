'use client';

import { useContext } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import HexagonIcon from 'Components/Icons/Hexagon';
import ProductTag from 'vinisto_api_client/src/domain/tag';
import { VinistoProductDllModelsApiTagTag } from 'vinisto_api_client/src/api-types/product-api';

import styles from './styles.module.css';

interface BundleTagProps {
	tagDetail: ProductTag | VinistoProductDllModelsApiTagTag;
	isLink?: boolean;
	view?: string; // kept for compatibility with old code
	className?: string;
}

const BundleTag = ({ tagDetail, isLink = true, className }: BundleTagProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const tagName = tagDetail?.name ?? '';

	const tagUrl = 'url' in tagDetail ? tagDetail.url : '';

	const handleOnClick = (event: React.MouseEvent<HTMLAnchorElement>) =>
		event.stopPropagation();

	return isLink && tagUrl !== '' ? (
		<Link
			href={`/${t({ id: 'routes.tag.route' })}/${tagUrl}`}
			onClick={handleOnClick}
			className={cx(styles.bundleLabel, className)}
			style={{
				'--tag-color': tagDetail?.color ?? 'red',
			}}
		>
			<HexagonIcon className={styles.left} />
			<div>{tagName}</div>
			<HexagonIcon className={styles.right} />
		</Link>
	) : (
		<div
			className={styles.bundleLabel}
			style={{
				'--tag-color': tagDetail?.color ?? 'red',
			}}
		>
			<HexagonIcon className={styles.left} />
			<div>{tagName}</div>
			<HexagonIcon className={styles.right} />
		</div>
	);
};

export default BundleTag;
