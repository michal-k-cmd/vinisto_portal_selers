import * as React from 'react';
import { map } from 'lodash-es';
import cx from 'classnames';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { LocalizationContext } from 'Services/LocalizationService';

import { ReviewSortingType, SORTING } from '../../constants';

import { ISortingProps } from './interfaces';

const SORTING_LABEL: { [k in ReviewSortingType]: string } = {
	NEWEST: 'productDetail.reviews.newest',
	HIGHEST_RATING: 'productDetail.reviews.highestRating',
	LOWEST_RATING: 'productDetail.reviews.lowestRating',
};
const SORTING_LABEL_DROPDOWN: { [k in ReviewSortingType]: string } = {
	NEWEST: 'productDetail.reviews.fromNewest',
	HIGHEST_RATING: 'productDetail.reviews.fromHighest',
	LOWEST_RATING: 'productDetail.reviews.fromLowest',
};

const Sorting = (props: ISortingProps) => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<>
			<div className="vinisto-wide-wine-tabs dynamic-width vinisto-wide-wine-tabs--category desktop-only">
				<nav className="navbar navbar-expand navbar-light p-0">
					<ul className="navbar-nav w-100 me-3">
						{map(SORTING, (_: any, key: ReviewSortingType) => (
							<li
								key={`bd-review-sorting-${key}`}
								className={cx(
									'nav-item',
									props.sorting === SORTING[key] ? 'active' : ''
								)}
							>
								<button
									className="nav-link"
									aria-current="page"
									onClick={() => props.handleChangeSorting(key)}
								>
									{t({ id: SORTING_LABEL[key] })}
								</button>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<div className="vinisto-wine__review-sort tablet-mobile-only w-100">
				<DropdownButton
					variant="outline-secondary"
					title={t({ id: SORTING_LABEL_DROPDOWN[props.sorting] })}
					id="vinisto-wine__review-sort__dropdown"
					className="vinisto-wine__review-sort__dropdown"
					align="start"
					onSelect={(eventKey: any) => props.handleChangeSorting(eventKey)}
				>
					{map(SORTING, (_: any, key: ReviewSortingType) => (
						<Dropdown.Item
							eventKey={key}
							key={`bd-review-sorting-mobile-${key}`}
						>
							{t({ id: SORTING_LABEL_DROPDOWN[key] })}
						</Dropdown.Item>
					))}
				</DropdownButton>
			</div>
		</>
	);
};

export default Sorting;
