import Skeleton from 'react-loading-skeleton';
import Avatar from 'Components/Avatar';

import { IUserProps } from './interfaces';

const User = ({ nickname, isLoading = false }: IUserProps): JSX.Element => {
	return (
		<div className="vinisto-recension__user">
			<Avatar
				name={`${nickname ?? '-'}`}
				size="lg"
				isLoading={isLoading}
			/>
			{isLoading ? (
				<Skeleton
					containerClassName="vinisto-recension__user__username"
					width="120px"
					height="20px"
					count={1.75}
					style={{ marginLeft: '.125rem' }}
				/>
			) : (
				<div className="vinisto-recension__user__wrap">
					<p className="vinisto-recension__user__username">
						{nickname ?? 'Prezdivka_uzivatele'}
					</p>
				</div>
			)}
		</div>
	);
};

export default User;
