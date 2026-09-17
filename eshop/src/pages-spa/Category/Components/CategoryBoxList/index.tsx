import { get, map, uniqueId } from 'lodash-es';

import { TCategoryBoxListProps } from './interfaces';
import CategoryBox from './CategoryBox';
import styles from './styles.module.css';

const CategoryBoxList = (props: TCategoryBoxListProps) => {
	return (
		<div className={styles.categorySearchWrap}>
			{map(get(props, 'categories', []), (category: Record<any, any>) => (
				<CategoryBox
					key={`category-box-list-${get(category, 'id') ?? uniqueId()}-element`}
					category={category}
					isLoading={get(category, 'isLoading', false)}
				/>
			))}
		</div>
	);
};

export default CategoryBoxList;
