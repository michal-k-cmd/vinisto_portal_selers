import { lazy, Suspense, useMemo, useRef, useState } from 'react';
import cx from 'classnames';
import useFormatMessage from 'Hooks/useFormatMessage';
import Flag from 'Components/Flag';
import Loader from 'Components/View/Loader';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import Form from 'Components/Forms';
import { VinistoHelperDllEnumsCountryCode } from 'vinisto_api_client/src/api-types/product-api';

import styles from './styles.module.css';

const FilterDropdownArrowIcon = lazy(
	() => import('Components/Icons/FilterDropdownArrow')
);

type TCountryCode = {
	code: VinistoHelperDllEnumsCountryCode;
	flag: string;
	value: string;
};

type TCountryCodeProps = {
	label: string;
	className?: string;
	value?: VinistoHelperDllEnumsCountryCode;
	name: string;
	onChange?: (_: VinistoHelperDllEnumsCountryCode) => void;
	readonly?: boolean;
};

const CountryCode = ({
	className,
	value,
	label,
	onChange,
	readonly,
}: TCountryCodeProps) => {
	const t = useFormatMessage();
	const countryCodes: TCountryCode[] = useMemo(
		() => [
			{
				code: VinistoHelperDllEnumsCountryCode.CZ,
				flag: 'cz',
				value: `${t({ id: 'addressForm.countryCode.CZ.label' })}`,
			},
			{
				code: VinistoHelperDllEnumsCountryCode.SK,
				flag: 'svk',
				value: `${t({ id: 'addressForm.countryCode.SK.label' })}`,
			},
		],
		[t]
	);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(
		value ? countryCodes?.findIndex(({ code }) => code === value) : 0
	);
	const selectedOption = useMemo(
		() =>
			countryCodes?.[selectedOptionIndex] ?? {
				flag: '',
				code: value,
			},
		[countryCodes, selectedOptionIndex, value]
	);
	const countryCodeRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => {
		if (readonly) return;
		setIsOpen((isOpen) => !isOpen);
	};
	useOnClickOutside([countryCodeRef], () => setIsOpen(false));

	return (
		<div
			ref={countryCodeRef}
			className={cx(styles.wrapper, className)}
		>
			<Form.Label>{label}</Form.Label>
			<div
				className={cx(styles.btn, {
					[styles.readonly]: readonly,
				})}
				onClick={toggleOpen}
			>
				<div
					className={cx(styles.dropdownBtn, {
						[styles.readonly]: readonly,
					})}
				>
					<Flag
						code={selectedOption?.flag}
						width={23}
						height={15}
						className="vinisto-flag"
					/>
					<span>{selectedOption?.value}</span>
				</div>
				{!readonly && (
					<Suspense fallback={<Loader blank />}>
						<FilterDropdownArrowIcon
							alt={t({ id: 'alt.dropDown' })}
							title={``}
							className={`FilterDropdownArrowIcon`}
						/>
					</Suspense>
				)}
			</div>
			{isOpen && (
				<div className={styles.dropdown}>
					{countryCodes
						?.filter(({ code }) => code !== selectedOption?.code)
						?.map(({ code, flag, value }, index) => (
							<div
								key={'c' + index}
								className={styles.dropdownBtn}
								onClick={() => {
									setSelectedOptionIndex(
										countryCodes?.findIndex(
											({ code: countryCode }) => code === countryCode
										)
									);
									onChange?.(code);
									setIsOpen(false);
								}}
							>
								<Flag
									code={flag}
									width={23}
									height={15}
									className="vinisto-flag"
								/>
								<span>{value}</span>
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default CountryCode;
