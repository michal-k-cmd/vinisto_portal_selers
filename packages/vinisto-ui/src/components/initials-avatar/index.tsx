import styles from './styles.module.css';

interface User {
	firstName: string;
	lastName: string;
	email: string;
}

interface Props {
	user: User;
	size?: string;
	fontSize?: string;
}

const map = (
	value: number,
	start1: number,
	stop1: number,
	start2: number,
	stop2: number
) => {
	return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

const getByteLength = (string: string = ' '): number => {
	return new TextEncoder().encode(string[0])[0];
};

const minCharByteValue: number = getByteLength('a');
const maxCharByteValue: number = getByteLength('z');

const minRange: number = minCharByteValue / maxCharByteValue;
const maxRange: number = 1;

const initials = (firstname: string, lastname: string) =>
	((firstname[0] ?? '') + (lastname[0] ?? '')).toUpperCase();

const colorByUser = ({ firstName, lastName, email }: User) => {
	const userValue =
		getByteLength(firstName[0]?.toLowerCase()) /
			getByteLength(lastName[0]?.toLowerCase()) +
		(getByteLength(email) ?? 0);

	return `hsl(${map(userValue, minRange, maxRange, 0, 360)}, 50%, 50%)`;
};

const InitialsAvatar = ({
	user: { firstName, lastName, email },
	size,
	fontSize,
}: Props) => {
	return (
		<div
			className={styles.avatar}
			style={{
				backgroundColor: colorByUser({ firstName, lastName, email }),
				'--size': size ?? '2.5rem',
				'--fontSize': fontSize ?? '1.25rem',
			}}
		>
			{initials(firstName, lastName)}
		</div>
	);
};

export default InitialsAvatar;
