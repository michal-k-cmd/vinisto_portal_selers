import { useContext } from 'react';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import ImageLocal from 'Components/View/ImageLocal';

import styles from './styles.module.css';

const SellerInfo = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div className={styles.beSellerInfoWrapper}>
			<ImageLocal
				fileName="prodavejte_u_nas.svg"
				alt=""
				className={styles.beSellerInfoWrapperSellerIcon}
				width={27}
				height={41.7}
			/>
			<div className={styles.beSellerInfoWrapperRight}>
				<div className={styles.beSellerInfoWrapperHeader}>
					{t({ id: 'productDetail.beSellerInfo.header' })}
				</div>
				<div className={styles.beSellerInfoWrapperContent}>
					{t(
						{ id: 'productDetail.beSellerInfo.content' },
						{
							value: (
								<span
									className={styles.beSellerInfoWrapperContentValue}
									key="bd-doNotRemoveNextjsDontLikeIt"
								>
									{t({ id: 'productDetail.beSellerInfo.content.value' })}
								</span>
							),
						}
					)}
				</div>
				<Link
					href={`/${t({ id: 'routes.becomeSupplier.route' })}`}
					className={styles.beSellerInfoWrapperLink}
				>
					{t({ id: 'productDetail.beSellerInfo.link' })}
				</Link>
			</div>
		</div>
	);
};
export default SellerInfo;
