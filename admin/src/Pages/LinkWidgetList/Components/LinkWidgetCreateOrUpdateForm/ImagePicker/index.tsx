import { InputRadio } from 'Components/Form';
import { type Option } from 'Components/Form/Components/Radio';
import {
	BASE_FA_ICONS_URL,
	PATH_PREFIX_MAP,
} from 'vinisto_ui/src/components/Icon/constants';
import Icon from 'vinisto_ui/src/components/Icon';

import styles from './styles.module.css';

interface ImagePickerProps {
	name: string;
	options: Option[];
	onChange: (value: string) => void;
	defaultValue?: string;
}

const ImagePicker = ({
	name,
	options,
	defaultValue,
	onChange,
}: ImagePickerProps) => {
	const isIcon = (src: string = '') => /far|fas \w/.test(src);

	return (
		<InputRadio
			name={name}
			options={options}
			onChange={onChange}
			defaultValue={defaultValue}
			className={styles.component}
			renderLabel={({ option, index }) => (
				<label
					htmlFor={`${name}-${index}`}
					className={styles.label}
				>
					{isIcon(option.value) ? (
						<Icon
							baseUrl={`${BASE_FA_ICONS_URL}/${
								PATH_PREFIX_MAP[
									option.value.split(' ')[0] as keyof typeof PATH_PREFIX_MAP
								]
							}/`}
							name={option.value.split(' ')[1]}
							className={styles.icon}
						/>
					) : (
						<img
							className={styles.image}
							src={option.value}
							alt={option.label}
						/>
					)}
				</label>
			)}
		/>
	);
};

export default ImagePicker;
