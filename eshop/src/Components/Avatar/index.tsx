import { Suspense, useContext } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import VinistoEmblemIcon from 'Components/Icons/VinistoEmblem';
import Loader from 'Components/View/Loader';
import { useIsB2b } from 'Services/PlatformService';

import { MAX_NAME_LENGTH } from './constants';
import styles from './styles.module.css';

type TAvatarProps = {
	name: string;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	fw?: 'light' | 'normal' | 'bolder' | 'bold';
	className?: string;
	isLoading?: boolean;
	inverted?: boolean;
	hasActiveVinistoPlus?: boolean;
	hasActiveVinistoPlusEmblem?: boolean;
};

const Avatar = ({
	name,
	size = 'md',
	fw = 'bolder',
	className = '',
	isLoading = false,
	inverted = false,
}: TAvatarProps) => {
	const truncatedName = name?.slice(0, MAX_NAME_LENGTH)?.toUpperCase();

	const classNames = cx(
		styles.wrapper,
		`fw-${fw}`,
		{
			[styles.sizeXs]: size === 'xs',
			[styles.sizeSm]: size === 'sm',
			[styles.sizeMd]: size === 'md',
			[styles.sizeLg]: size === 'lg',
			[styles.sizeXl]: size === 'xl',
			[styles.inverted]: inverted,
		},
		className
	);

	if (isLoading) {
		return (
			<Skeleton
				className={classNames}
				circle
			/>
		);
	}

	return <div className={classNames}>{truncatedName}</div>;
};

type TUserAvatarProps = Omit<TAvatarProps, 'name'>;

export const UserAvatar = (props: TUserAvatarProps) => {
	const isB2b = useIsB2b();
	const { vinistoUser } = useContext(AuthenticationContext);
	const name = vinistoUser?.nickname ?? vinistoUser?.email ?? '';
	const hasActiveVinistoPlus = !isB2b && props.hasActiveVinistoPlus;
	const hasActiveVinistoPlusEmblem = !isB2b && props.hasActiveVinistoPlusEmblem;

	if (hasActiveVinistoPlus) {
		return (
			<div className={styles.vipAvatarWrapper}>
				<Avatar
					name={name}
					isLoading={!name}
					{...props}
				/>
				<div className={styles.vipBadge}>
					<Suspense fallback={<Loader blank />}>
						<VinistoEmblemIcon />
					</Suspense>
					PLUS+
				</div>
			</div>
		);
	}

	if (hasActiveVinistoPlusEmblem) {
		return (
			<div className={styles.vipAvatarWrapper}>
				<Avatar
					name={name}
					isLoading={!name}
					{...props}
				/>
				<div className={styles.vipEmblemBadge}>
					<span className={styles.plus}>+</span>
				</div>
			</div>
		);
	}

	return (
		<Avatar
			name={name}
			isLoading={!name}
			{...props}
		/>
	);
};

export default Avatar;
