import { FC, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { OrderService } from 'vinisto_api_client';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

interface OrderNumberCellProps {
	/** Cleaned order id ('' when the fee record has no order). */
	id: string;
	externalOrderId?: string;
}

/**
 * Resolves an orderId to its human order number via React Query (deduped/cached
 * by id). Renders the order number (or raw id while loading / on error) and
 * appends the external order number when present.
 *
 * NOTE: FE-side resolution is a stopgap — see
 * docs/backend-fee-records-named-endpoint.md.
 */
const OrderNumberCell: FC<OrderNumberCellProps> = ({ id, externalOrderId }) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const loginHash = vinistoUser?.loginHash;

	const { data: resolvedOrderNumber } = useQuery({
		queryKey: ['feeRecordNamed', 'orderNumber', id],
		queryFn: () => OrderService.getOrderById(id, loginHash ?? undefined),
		enabled: Boolean(id),
		staleTime: Infinity,
		retry: false,
		select: (order) => order?.orderNumber || id,
	});

	const orderNumber = id ? resolvedOrderNumber ?? id : '';
	const externalOrderNumber = externalOrderId
		? `${externalOrderId} (externí č. o.)`
		: '';
	const displayValue = [orderNumber, externalOrderNumber]
		.filter(Boolean)
		.join(', ');

	return <div>{displayValue}</div>;
};

export default OrderNumberCell;
