import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { PostCodeListProps } from './interfaces';
import styles from './styles.module.css';

const PostCodeList = ({ servingZipCodes }: PostCodeListProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div className="product-detail-category-list">
			<div className="detail-category-list-title">
				{t({ id: 'admin.bundleDetail.postcode' })}
			</div>
			{(servingZipCodes || []).map(
				(item) =>
					item !== '' && (
						<div
							className={styles.postcode_inline}
							key={item}
						>
							<span className={styles.delivery_detail_postcode}>{item}</span>
						</div>
					)
			)}
		</div>
	);
};

export default PostCodeList;
