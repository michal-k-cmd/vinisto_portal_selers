import Skeleton from 'react-loading-skeleton';
import cx from 'classnames';
import getBundleImage, {
	IMAGE_SIZE_THUMB_208x240,
} from 'Helpers/getBundleImage';
import { useBundleMeta } from 'pages-spa/Bundle/hooks/use-bundle-detail';
import removeDiacritics from 'Helpers/removeDiacritics';
import CustomHighlighter from 'Components/CustomHighlighter';

import { ProductTitleAndImageProps } from './interfaces';
import styles from './styles.module.css';

const ProductTitleAndImage = ({
	bundle,
	search,
	isLoading = false,
	isInViewport,
}: ProductTitleAndImageProps) => {
	const { bundleName } = useBundleMeta(bundle);
	const images = bundle?.images ?? [];

	return (
		<>
			<div className="vinisto-wine__img-wrap">
				{isLoading ? (
					<Skeleton
						className={cx('vinisto-wine__img', {
							'vinisto-wine__img--loading': isLoading,
						})}
						width="75%"
						inline
					/>
				) : (
					<img
						src={getBundleImage(images, IMAGE_SIZE_THUMB_208x240)}
						alt={bundleName || '-'}
						className="vinisto-wine__img"
						{...(isInViewport ? {} : { loading: 'lazy' })}
					/>
				)}
			</div>

			<div className="vinisto-wine__info-wrap">
				<div className={styles.name}>
					{isLoading ? (
						<Skeleton
							containerClassName="w-100"
							width="100%"
							inline
						/>
					) : bundleName ? (
						<CustomHighlighter
							searchWords={search}
							textToHighlight={bundleName}
							sanitize={removeDiacritics}
							autoEscape
						/>
					) : (
						'-'
					)}
				</div>
			</div>
		</>
	);
};

export default ProductTitleAndImage;
