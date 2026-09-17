import { FC } from 'react';
import cx from 'classnames';
import Highlighter from 'react-highlight-words';
import removeDiacritics from 'Helpers/removeDiacritics';
import Autocomplete from 'Components/Forms/Components/Autocomplete';

import { DefaultDropdownProps } from './interfaces';
import styles from './styles.module.css';

const DefaultDropdown: FC<DefaultDropdownProps> = ({ items, search }) => {
	return (
		<div className={styles.dropdown}>
			{items.map((item, index) => (
				<Autocomplete.Option
					as="div"
					key={`${item.text}-${index}`}
					value={item.value}
					className={({ active }) => cx(styles.item, active && styles.active)}
				>
					<Highlighter
						searchWords={search.split(' ')}
						textToHighlight={item.text}
						sanitize={removeDiacritics}
						highlightTag="strong"
						autoEscape
					/>
				</Autocomplete.Option>
			))}
		</div>
	);
};

export default DefaultDropdown;
