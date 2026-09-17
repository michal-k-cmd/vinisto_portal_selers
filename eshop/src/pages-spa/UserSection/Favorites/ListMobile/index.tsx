import { get } from 'lodash-es';

import { IListProps } from './interfaces';
import '../../styles.css';
import FavoritesItem from './FavoritesItem';

const ListMobile = (props: IListProps) => {
	const { favoritesData } = props;

	return (
		<div className="vinisto-user-orders__orders__order vinisto-user-favorites vinisto-user-favorites--mobile">
			{(favoritesData ?? []).map((favorite, key) => {
				return (
					<FavoritesItem
						key={`favorites-list-bundle-item-${get(favorite, 'ItemId', key)}`}
						favoriteData={favorite}
						isLoading={get(favorite, 'isLoading', false)}
						isRemoved={get(favorite, 'isTemp', false)}
						alwaysRedirectToDetail
					/>
				);
			})}
		</div>
	);
};

export default ListMobile;
