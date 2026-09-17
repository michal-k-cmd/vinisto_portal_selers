import CloseIcon from '../../../icons/Close';
import InputBare from '../../../form/tokens/input-bare';

import styles from './styles.module.css';

export interface SearchBoxProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	onChange: (search: string) => void;
}

const SearchBox = ({
	name,
	placeholder = '',
	onChange = () => undefined,
	...props
}: SearchBoxProps) => {
	return (
		<label className={styles.component}>
			<div className="visually-hidden">{placeholder}</div>
			<InputBare
				{...props}
				className={styles.input}
				name={`search-variety-${name}`}
				placeholder={placeholder}
				onChange={(e) => onChange(e.target.value)}
			/>
			<button
				type="button"
				className={styles.clearButton}
				onClick={() => {
					onChange('');
				}}
			>
				<CloseIcon width={9} />
			</button>
		</label>
	);
};

export default SearchBox;
