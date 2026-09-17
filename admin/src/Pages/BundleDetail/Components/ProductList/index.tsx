import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LocalizationContext } from 'Services/LocalizationService';
import { MdCategory } from 'react-icons/md';
import { BiLink } from 'react-icons/bi';

import './styles.css';
import { Bundle } from '@/domain/bundle';

const AlternativeBundlesList = ({
	bundle,
}: {
	bundle: Bundle | undefined;
}): JSX.Element => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const navigate = useNavigate();

	const handleOnClickRedirect = useCallback(
		(productId: string) => () => {
			navigate(`/product-detail/${productId}`);
		},
		[navigate]
	);

	return (
		<div className="product-detail-category-list">
			<div className="detail-category-list-title">
				{t({ id: 'admin.bundleDetail.products' })}
			</div>
			{(bundle?.products ?? []).map((product, i) => {
				const productName = getLocalizedValue(product?.name ?? []);
				const productAmount =
					bundle?.items.find(
						(item) => (item?.productId ?? '-') === (product?.id ?? '?')
					)?.amount ?? '-';

				return (
					<div
						key={`product-category-${i}`}
						className="product-category w-auto"
					>
						<MdCategory className="product-category-icon" />
						<div className="product-category-label flex-column">
							{productName}
							<div className="product-category-sublabel">
								{`(${t(
									{ id: 'admin.bundleDetail.itemAmount' },
									{ value: productAmount }
								)}, ${t(
									{ id: 'admin.bundleDetail.id' },
									{ value: product.id }
								)})`}
							</div>
						</div>
						<BiLink
							onClick={handleOnClickRedirect(product.id)}
							className="product-category-icon pointer"
						/>
					</div>
				);
			})}
		</div>
	);
};

export default AlternativeBundlesList;
