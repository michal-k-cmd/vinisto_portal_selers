'use client';

import React, { useState } from 'react';
import GreenCheckbox from 'pages-spa/Basket/Components/BasketItem/GreenCheckbox';

import styles from './styles.module.css';
import RadioOption from './RadioItem';

const dateOptions = [
	{ value: '12.5.2025', label: '12. 5. 2025' },
	{ value: '13.5.2025', label: '13. 5. 2025' },
	{ value: '14.5.2025', label: '14. 5. 2025' },
	{ value: '15.5.2025', label: '15. 5. 2025' },
	{ value: '16.5.2025', label: '16. 5. 2025' },
	{ value: '17.5.2025', label: '17. 5. 2025' },
	{ value: '18.5.2025', label: '18. 5. 2025' },
];

const ChangeDeliveryDay = () => {
	const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
	const [selectedDate, setSelectedDate] = useState(dateOptions[0].value);

	return (
		<div className={styles.wrapper}>
			<button
				className={styles.checkboxWrapper}
				onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
			>
				<GreenCheckbox
					checked={showDeliveryOptions}
					setChecked={setShowDeliveryOptions}
				/>
				<span className={styles.checkboxText}>
					Chci doručit zboží v jiný den
				</span>
			</button>

			{showDeliveryOptions && (
				// <RadioGroup
				// 	options={dateOptions}
				// 	defaultValue="12.5.2025"
				// 	name="delivery-date"
				// />
				<div className={styles.radioOptions}>
					{dateOptions.map((option) => (
						<RadioOption
							groupName="delivery-date"
							checked={selectedDate === option.value}
							onChange={() => setSelectedDate(option.value)}
							title={option.label}
							key={option.value}
							{...option}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ChangeDeliveryDay;
