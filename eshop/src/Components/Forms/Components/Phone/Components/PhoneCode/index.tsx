import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import useFormatMessage from 'Hooks/useFormatMessage';
import Flag from 'Components/Flag';
import { PHONE_CODES } from 'Components/Form/constants';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import Loader from 'Components/View/Loader';
const FilterDropdownArrowIcon = lazy(
	() => import('Components/Icons/FilterDropdownArrow')
);

import styles from './styles.module.css';

type TPhoneCode = {
	code: string;
	flag: string;
};

export const phoneCodes: TPhoneCode[] = [
	{
		code: String(PHONE_CODES.CZ),
		flag: 'cz',
	},
	{
		code: String(PHONE_CODES.SK),
		flag: 'svk',
	},
];

type TPhoneCodeProps = {
	className?: string;
	value?: string;
	onChange?: (_: string) => void;
};

const PhoneCode = ({ className, value, onChange }: TPhoneCodeProps) => {
	const t = useFormatMessage();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(
		value ? phoneCodes?.findIndex(({ code }) => code === value) : 0
	);
	const selectedOption = phoneCodes?.[selectedOptionIndex] ?? {
		flag: '',
		code: value,
	};
	const phoneCodeRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => setIsOpen((isOpen) => !isOpen);
	useOnClickOutside([phoneCodeRef], () => setIsOpen(false));

	useEffect(() => {
		if (typeof onChange === 'function') {
			onChange(selectedOption?.code);
		}
	}, [selectedOption]);

	return (
		<div
			ref={phoneCodeRef}
			className={cx(styles.wrapper, className)}
		>
			<div
				className={styles.btn}
				onClick={toggleOpen}
			>
				<Flag
					code={selectedOption?.flag}
					width={23}
					height={15}
					className="vinisto-flag"
				/>
				<span>{`+${selectedOption?.code}`}</span>
				<Suspense fallback={<Loader blank />}>
					<FilterDropdownArrowIcon
						alt={t({ id: 'alt.dropDown' })}
						title={``}
						className={`FilterDropdownArrowIcon`}
					/>
				</Suspense>
			</div>
			{isOpen && (
				<div className={styles.dropdown}>
					{phoneCodes
						?.filter(({ code }) => code !== selectedOption?.code)
						?.map(({ code, flag }, index) => (
							<div
								key={'ph' + index}
								className={cx(styles.dropdownBtn, 'underline-effect')}
								onClick={() => {
									setSelectedOptionIndex(
										phoneCodes?.findIndex(
											({ code: phoneCode }) => code === phoneCode
										)
									);
									setIsOpen(false);
								}}
							>
								<Flag
									code={flag}
									width={23}
									height={15}
									className="vinisto-flag"
								/>
								<span>{`+${code}`}</span>
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default PhoneCode;
