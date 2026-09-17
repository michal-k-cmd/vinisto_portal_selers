import { get } from 'lodash-es';

import { IListProps } from './interfaces';
import '../../styles.css';
import FavoritesItem from './FavoritesItem';

const ListDesktop = (props: IListProps) => {
	const { favoritesData } = props;

	return (
		<div className="vinisto-user-favorites">
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

export default ListDesktop;
