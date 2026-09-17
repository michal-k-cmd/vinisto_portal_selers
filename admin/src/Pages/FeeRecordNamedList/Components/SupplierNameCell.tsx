import { FC, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import SupplierService from 'Services/SupplierService/Supplier';

interface SupplierNameCellProps {
	id: string;
}

/**
 * Resolves a supplierId to its name via React Query (deduped/cached by id).
 * Renders the supplier name, or the raw id while loading / on error.
 *
 * NOTE: resolving names on the FE is a stopgap — the systematic fix is a backend
 * endpoint that returns fee-records already with names. See
 * docs/backend-fee-records-named-endpoint.md.
 */
const SupplierNameCell: FC<SupplierNameCellProps> = ({ id }) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const loginHash = vinistoUser?.loginHash;

	const { data: supplierName } = useQuery({
		queryKey: ['feeRecordNamed', 'supplierName', id],
		queryFn: () => SupplierService.getById(id, loginHash ?? ''),
		enabled: Boolean(id) && Boolean(loginHash),
		staleTime: Infinity,
		retry: false,
		select: (supplier) => supplier?.nameWeb || id,
	});

	return <span>{supplierName ?? id}</span>;
};

export default SupplierNameCell;
