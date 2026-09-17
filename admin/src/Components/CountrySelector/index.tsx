import { TargetOptions } from './interfaces';
import styles from './styles.module.css';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/supplier-api';

interface CountrySelectorProps {
	sourceCountry: VinistoHelperDllEnumsCountryCode;
	setSourceCountry?: (country: VinistoHelperDllEnumsCountryCode) => void;
	targetCountry: VinistoHelperDllEnumsCountryCode;
	setTargetCountry: (country: VinistoHelperDllEnumsCountryCode) => void;
}

const CountrySelector = ({
	sourceCountry,
	setSourceCountry,
	targetCountry,
	setTargetCountry,
}: CountrySelectorProps) => {
	const countries: VinistoHelperDllEnumsCountryCode[] = [
		VinistoHelperDllEnumsCountryCode.CZ,
		VinistoHelperDllEnumsCountryCode.SK,
		VinistoHelperDllEnumsCountryCode.DE,
	];

	// @ts-expect-error we don't implement UK and PL yet
	const targetOptions: TargetOptions = {
		CZ: [
			VinistoHelperDllEnumsCountryCode.CZ,
			`${VinistoHelperDllEnumsCountryCode.CZ} → ${VinistoHelperDllEnumsCountryCode.SK}`,
			`${VinistoHelperDllEnumsCountryCode.CZ} → ${VinistoHelperDllEnumsCountryCode.DE}`,
		],
		SK: [
			VinistoHelperDllEnumsCountryCode.SK,
			`${VinistoHelperDllEnumsCountryCode.SK} → ${VinistoHelperDllEnumsCountryCode.DE}`,
			`${VinistoHelperDllEnumsCountryCode.SK} → ${VinistoHelperDllEnumsCountryCode.CZ}`,
		],
		DE: [
			VinistoHelperDllEnumsCountryCode.DE,
			`${VinistoHelperDllEnumsCountryCode.DE} → ${VinistoHelperDllEnumsCountryCode.CZ}`,
			`${VinistoHelperDllEnumsCountryCode.DE} → ${VinistoHelperDllEnumsCountryCode.SK}`,
		],
	};

	const handleSourceChange = (country: VinistoHelperDllEnumsCountryCode) => {
		setSourceCountry?.(country);
		setTargetCountry(
			targetOptions[country][0].includes(' → ')
				? (targetOptions[country][0].split(
						' → '
				  )[1] as VinistoHelperDllEnumsCountryCode)
				: (targetOptions[country][0] as VinistoHelperDllEnumsCountryCode)
		);
	};

	const handleTargetChange = (option: string) => {
		const target = option.includes(' → ') ? option.split(' → ')[1] : option;
		setTargetCountry(target as VinistoHelperDllEnumsCountryCode);
	};

	return (
		<div>
			{typeof setSourceCountry === 'function' && (
				<div className={styles.countrySelector}>
					{countries.map((country) => (
						<button
							key={country}
							className={`${
								sourceCountry === country
									? 'd-inline-flex btn btn-primary'
									: 'd-inline-flex btn btn-secondary'
							}`}
							onClick={() => handleSourceChange(country)}
						>
							{country}
						</button>
					))}
				</div>
			)}

			<div className={styles.countrySelector}>
				{targetOptions[sourceCountry].map((option) => (
					<button
						key={option}
						className={`${
							targetCountry ===
							(option.includes(' → ') ? option.split(' → ')[1] : option)
								? 'd-inline-flex btn btn-primary'
								: 'd-inline-flex btn btn-secondary'
						}`}
						onClick={() => handleTargetChange(option)}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
};

export default CountrySelector;
