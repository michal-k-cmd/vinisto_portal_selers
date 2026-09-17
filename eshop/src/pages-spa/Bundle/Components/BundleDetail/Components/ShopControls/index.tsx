import BundleItem from './Components/BundleItem';
import { BundleItemVariants } from './Components/BundleItem/constants';
import { ShopControlsProps } from './interfaces';

const ShopControls = ({
	variant = BundleItemVariants.STANDARD,
	isLoading = false,
	bundlesToShow,
	quantityBox,
}: ShopControlsProps) => {
	const bundlesAsArray = Array.isArray(bundlesToShow)
		? bundlesToShow
		: [bundlesToShow];

	return (
		<>
			{bundlesAsArray.map((bundle, index) => (
				<BundleItem
					key={bundle?.id ?? 'bdsc' + index}
					bundle={bundle}
					variant={variant}
					isLoading={isLoading}
					quantityBox={quantityBox}
				/>
			))}
		</>
	);
};

export default ShopControls;
