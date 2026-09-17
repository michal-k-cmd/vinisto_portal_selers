import * as React from 'react';
import { get } from 'lodash-es';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LocalizationContext } from '../../../LocalizationService';
import { INavigateToPageProps } from '../../interfaces';

/**
 * Navigates to page without memoization for translated pages
 */
const NavigateToPage: React.FC<INavigateToPageProps> = (props): JSX.Element => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const to = get(props, 'to', '');
	const route = `${t({ id: get(to, 'id', '') })}`;
	const router = useRouter();

	useEffect(() => {
		router.replace(route);
	}, [route, router]);

	return <></>;
};

export default NavigateToPage;
