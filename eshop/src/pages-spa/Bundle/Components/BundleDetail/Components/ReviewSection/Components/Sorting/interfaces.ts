import { ReviewSortingType } from '../../constants';

export interface ISortingProps {
	sorting: ReviewSortingType;
	handleChangeSorting: (newSorting: ReviewSortingType) => void;
}
