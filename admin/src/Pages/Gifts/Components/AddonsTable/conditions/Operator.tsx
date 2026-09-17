import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { Operator as OperatorType } from '@/api-types/addons-api';

const Operator = ({ operator }: { operator: OperatorType | undefined }) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	return (
		<span>
			{operator === 'And' ? (
				<em> {t({ id: 'admin.and' })} </em>
			) : (
				<em> {t({ id: 'admin.or' })} </em>
			)}
		</span>
	);
};

export default Operator;
