import useFormatMessage from 'Hooks/useFormatMessage';
import BundleOrderLimitation from 'vinisto_api_client/src/domain/bundle/order-limitation';

const OrderLimitReachedPopover = ({
	orderLimitation,
}: {
	orderLimitation?: BundleOrderLimitation | null;
}) => {
	const t = useFormatMessage();

	return (
		<p className="mb-0">
			{t(
				{ id: 'popover.orderLimitReached' },
				{
					limit: (
						<span className="fw-bolder">
							{t({ id: 'basket.pcs' }, { count: orderLimitation?.limit })}
						</span>
					),
				}
			)}
		</p>
	);
};

export default OrderLimitReachedPopover;
