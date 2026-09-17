import { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

interface DetailTextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: ReactNode;
	value: string | undefined;
	onSave: (value: string) => void;
}

const DetailTextarea = ({
	label,
	onSave,
	value: propValue,
	...rest
}: DetailTextareaProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const [value, setValue] = useState<string>(
		propValue ? String(propValue) : ''
	);
	const [isEditMode, setEditMode] = useState<boolean>(false);

	useEffect(() => {
		if (!isEditMode && propValue !== undefined && propValue !== value) {
			setValue(String(propValue));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [propValue]);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
	};

	const handleSave = () => {
		onSave(value);
		setEditMode(false);
	};

	const handleDiscard = () => {
		setValue(String(propValue));
		setEditMode(false);
	};

	return (
		<div
			className={`${styles.container} ${
				isEditMode ? styles.editMode : styles.readMode
			}`}
		>
			<div className={styles.heading}>
				{label && <label className={styles.label}>{label}</label>}
				<div
					className={styles.controls}
					style={{
						justifyContent: isEditMode ? 'flex-end' : 'flex-start',
					}}
				>
					{isEditMode ? (
						<>
							<button
								className={styles.button}
								onClick={handleSave}
							>
								{t({ id: 'save' })}
							</button>
							<button
								className={styles.button}
								onClick={handleDiscard}
							>
								{t({ id: 'discard' })}
							</button>
						</>
					) : (
						<button
							className={styles.icon}
							onClick={() => setEditMode(true)}
						>
							<FaEdit />
						</button>
					)}
				</div>
			</div>
			<textarea
				className={styles.textarea}
				rows={5}
				style={{
					cursor: isEditMode ? 'auto' : 'default',
				}}
				cols={50}
				value={value}
				{...rest}
				onChange={handleChange}
				readOnly={!isEditMode}
			/>
		</div>
	);
};

export default DetailTextarea;
