import useFormatMessage from 'Hooks/useFormatMessage';

const MaximumQuantityReachedPopover = ({
	availableCount,
}: {
	availableCount: number;
}) => {
	const t = useFormatMessage();

	return (
		<p className="mb-0">
			{t(
				{ id: 'popover.maximumQuantityReached' },
				{
					quantityWithStock: (
						<span
							key="popover.maximumQuantityReached.quantityWithStock"
							className="fw-bolder"
						>
							{t({ id: 'basket.pcs' }, { count: availableCount })}
						</span>
					),
				}
			)}
		</p>
	);
};

export default MaximumQuantityReachedPopover;
