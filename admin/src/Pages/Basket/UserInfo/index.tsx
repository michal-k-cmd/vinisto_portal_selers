import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import InitialsAvatar from 'vinisto_ui/src/components/initials-avatar';
import { UserService } from 'Services/UserService/User';

interface Props {
	userId: string;
	userLoginHash: string;
}

const { getUserById } = UserService;

const UserInfo = ({ userId, userLoginHash }: Props) => {
	const userQueryKey = ['user', userId];

	const { data: userData } = useQuery(
		userQueryKey,
		async () =>
			await getUserById(userId, {
				userId,
				UserLoginHash: userLoginHash,
			})
	);

	const user = userData?.user;

	const firstName =
		user && 'firstname' in user && user.firstname ? `${user.firstname}` : '';
	const surname =
		user && 'surname' in user && user.surname ? `${user.surname}` : '';
	const email = user?.email ?? '';

	const avatarProps = useMemo(() => {
		if (!user) return null;
		return {
			firstName: firstName || email,
			lastName: surname || email,
			email: email || '',
		};
	}, [email, firstName, surname, user]);

	if (!avatarProps) return null;

	return (
		<div className="d-flex gap-3 align-items-center">
			<InitialsAvatar user={avatarProps} />
			<div className="lh-1">
				<div>
					{(firstName || surname) && (
						<strong>{`${firstName} ${surname}`}</strong>
					)}
				</div>
				<small>{email}</small>
			</div>
		</div>
	);
};

export default UserInfo;
