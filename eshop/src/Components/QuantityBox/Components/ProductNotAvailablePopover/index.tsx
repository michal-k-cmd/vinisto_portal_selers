import useFormatMessage from 'Hooks/useFormatMessage';

const ProductNotAvailablePopover = () => {
	const t = useFormatMessage();

	return (
		<p
			className="mb-0"
			key="pnaproductNotAvailable"
		>
			{t(
				{ id: 'popover.productNotAvailable' },
				{
					currentlyStocking: (
						<span
							className="fw-bolder"
							key="pnadoNotRemoveThisKey"
						>
							{t({ id: 'popover.productNotAvailable.currentlyStocking' })}
						</span>
					),
				}
			)}
		</p>
	);
};

export default ProductNotAvailablePopover;
