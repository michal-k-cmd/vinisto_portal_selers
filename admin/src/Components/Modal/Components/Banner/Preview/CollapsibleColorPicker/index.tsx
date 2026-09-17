import cx from 'classnames';
import { InputColor, Label } from 'Components/Form';
import { InputColorPickerProps } from 'Components/Form/Components/ColorPicker/interfaces';
import { useContext, useRef, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import { useForm } from 'react-final-form';
import { MdOutlineRestartAlt } from 'react-icons/md';

import styles from './styles.module.css';

const CollapsibleColorPicker = ({ name, label }: InputColorPickerProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const form = useForm();

	const [isExpanded, setIsExpanded] = useState(false);
	const colorPickerRef = useRef<HTMLDivElement>(null);

	useOnClickOutside<HTMLDivElement>([colorPickerRef], () =>
		setIsExpanded(false)
	);

	const fieldValue = form.getFieldState(name)?.value;

	return (
		<div className={cx('d-flex', 'align-items-center', 'mb-3')}>
			<Label className="mb-0 me-2">
				{typeof label === 'string' ? t({ id: label }) : ''}
			</Label>
			<div className={cx('d-flex', 'align-items-center')}>
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className={styles.swatch}
					aria-label="Pick color"
					type="button"
				>
					<div
						className={styles.color}
						style={{
							background: fieldValue
								? fieldValue
								: `linear-gradient(
                      150deg,
                      transparent,
                      transparent 48%,
                      rgb(242, 10, 10) 48%,
                      rgb(242, 10, 10) 52%,
                      transparent 52%,
                      transparent 100%
                  )`,
						}}
					></div>
				</button>

				<div className={cx(styles.popover, { invisible: !isExpanded })}>
					<div ref={colorPickerRef}>
						<InputColor
							name={name}
							onChange={(value) => form.change(name, value)}
						/>
					</div>
				</div>
			</div>
			{fieldValue ? (
				<button
					className={cx(styles.resetButton)}
					onClick={() => form.change(name, undefined)}
					type="button"
				>
					<MdOutlineRestartAlt />
				</button>
			) : null}
		</div>
	);
};

export default CollapsibleColorPicker;
