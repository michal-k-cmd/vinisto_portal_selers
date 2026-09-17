import * as React from 'react';
import { get } from 'lodash-es';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import { ICarouselTabProps } from './interfaces';

import './styles.css';

const CarouselTab: React.FC<ICarouselTabProps> = (
	props: ICarouselTabProps
): JSX.Element => {
	const handleOnSelectTab = props?.handleOnSelectTab || (() => () => {});
	const getLocalizedValue = useLocalizedValue();

	const name = props.data?.name;
	const isLoading = props?.isLoading ?? false;

	return (
		<button
			className={cx('nav-link btn-tab vinisto-carousel__tab-btn', {
				loading: isLoading,
			})}
			aria-current="page"
			onClick={handleOnSelectTab(props.data ?? {})}
			type="button"
		>
			{isLoading ? (
				<Skeleton width="80%" />
			) : typeof name === 'string' || React.isValidElement(name) ? (
				name
			) : (
				getLocalizedValue(get(props, 'data.name', []))
			)}
		</button>
	);
};

export default CarouselTab;
