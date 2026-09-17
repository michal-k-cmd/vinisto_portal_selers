import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import SupplierService from 'Services/SupplierService/Supplier';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const SupplierDetail = ({ supplierId }: { supplierId: string }) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const supplierQuery = useQuery(
		['getSupplierById', supplierId],
		() => SupplierService.getById(supplierId, vinistoUser.loginHash),
		{
			enabled: !!supplierId,
		}
	);

	return (
		<div>
			{t({ id: 'admin.header.coupon.limitationType.supplier' })}:{' '}
			<Link to={`/supplier-detail/${supplierId}`}>
				{supplierQuery.data?.nameWeb || '-'}
			</Link>
		</div>
	);
};

export default SupplierDetail;
