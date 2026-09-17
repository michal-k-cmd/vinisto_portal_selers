import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useContext } from 'react';

import { ItemSupplierConditionResponse } from '@/api-types/addons-api';
import api from '@/api';
import { SupplierApi } from '@/api-types/supplier-api';

type Props = {
	condition: ItemSupplierConditionResponse;
};

const SpecificationRow = (props: Props) => {
	const { condition } = props;

	const authenticationContext = useContext(AuthenticationContext);

	const { data: supplier } = useQuery({
		queryKey: ['supplier', condition.itemSupplierId],
		queryFn: () => {
			return api.get<
				SupplierApi.SuppliersDetail.ResponseBody,
				SupplierApi.SuppliersDetail.RequestQuery
			>(`supplier-api/suppliers/${condition.itemSupplierId}`, {
				UserLoginHash: authenticationContext.vinistoUser.loginHash,
			});
		},
		enabled: !!condition.itemSupplierId,
	});

	return <div>Prodejce: {supplier?.supplier?.nameWeb}</div>;
};

export default SpecificationRow;
