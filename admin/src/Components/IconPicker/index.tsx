import cx from 'classnames';

import Icon from './Components/Icon';
import {
	availableFaIcons,
	BASE_FA_ICONS_URL,
} from './Components/Icon/constants';
import styles from './styles.module.css';

interface IconPickerProps {
	onChange: (icon: string) => void;
	activeIcon?: string;
}

const IconPicker = ({ activeIcon, onChange }: IconPickerProps) => {
	return (
		<div className={styles.component}>
			{availableFaIcons.map(({ icons, prefix, pathPrefix }) =>
				Array.from(icons).map((icon) => (
					<button
						key={`${prefix} ${icon}`}
						className={cx(styles.picker, {
							[styles.selected]: `${prefix} ${icon}` === activeIcon,
						})}
						onClick={() => onChange(`${prefix} ${icon}`)}
					>
						<Icon
							baseUrl={`${BASE_FA_ICONS_URL}/${pathPrefix}/`}
							prefix={prefix}
							name={icon}
							className={styles.icon}
						/>
					</button>
				))
			)}
		</div>
	);
};

export default IconPicker;
