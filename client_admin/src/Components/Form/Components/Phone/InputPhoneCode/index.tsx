import { FC, useCallback, useContext, useMemo, useRef, useState } from 'react';
import cx from 'classnames';
import { filter, find, get, map } from 'lodash-es';
import Flag from 'Components/Flag';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import { LocalizationContext } from 'Services/LocalizationService';
import { FilterDropdownArrowIcon } from 'Components/Icons';

import { FALLBACK_PHONE_CODE, PHONE_PREFIX } from '../constants';

import { FLAG_HEIGHT, FLAG_WIDTH } from './constants';
import { IInputPhoneCodeProps, IPhoneCode } from './interfaces';

import './styles.css';

const InputPhoneCode: FC<IInputPhoneCodeProps> = ({
	phoneCodes,
	onChange = () => {},
	value = FALLBACK_PHONE_CODE,
	disabled = false,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const selectedItem: IPhoneCode = useMemo(() => {
		const found = find(phoneCodes, { code: value });
		return found ?? phoneCodes[0];
	}, [value, phoneCodes]);
	const dropdownItems: IPhoneCode[] = useMemo(
		() =>
			filter(
				phoneCodes,
				(item) => get(item, 'code', FALLBACK_PHONE_CODE) !== value
			),
		[value, phoneCodes]
	);
	const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
	const phoneCodeRef = useRef<HTMLDivElement>(null);

	const handleToggleDropdownMenu = useCallback(() => {
		setShowDropdownMenu(
			(currentShowDropdownMenu) => !disabled && !currentShowDropdownMenu
		);
	}, [disabled]);

	const handleCloseDropdownMenu = useCallback(() => {
		setShowDropdownMenu(false);
	}, []);

	const handleOnSelectCode = useCallback(
		(code: number) => () => {
			handleCloseDropdownMenu();
			onChange(code);
		},
		[onChange, handleCloseDropdownMenu]
	);

	useOnClickOutside([phoneCodeRef], handleCloseDropdownMenu);

	return (
		<div
			ref={phoneCodeRef}
			className="vinisto-code user-select-none"
		>
			<div
				className={cx(
					'vinisto-user-orders__mobile-filter__btn',
					'vinisto-code__filter-btn',
					{
						'is-disabled': disabled,
					}
				)}
				onClick={handleToggleDropdownMenu}
			>
				{selectedItem && (
					<Flag
						code={selectedItem.flag}
						width={FLAG_WIDTH}
						height={FLAG_HEIGHT}
						className="vinisto-flag"
					/>
				)}
				<span className="vinisto-font-18">{`+${
					selectedItem?.code ?? ''
				}`}</span>
				<FilterDropdownArrowIcon alt={t({ id: 'alt.dropDown' })} />
			</div>
			{showDropdownMenu && (
				<div className="position-relative">
					<div className="vinisto-user-orders__mobile-filter__list vinisto-code__filter-list d-block">
						{map(dropdownItems, (dropdownItem, index) => (
							<div
								key={get(dropdownItem, 'code', index)}
								className="vinisto-user-orders__mobile-filter__list__item"
								onClick={handleOnSelectCode(
									get(dropdownItem, 'code', FALLBACK_PHONE_CODE)
								)}
							>
								<Flag
									code={get(dropdownItem, 'flag', '')}
									width={FLAG_WIDTH}
									height={FLAG_HEIGHT}
									className="vinisto-flag"
								/>
								<span className="vinisto-font-18">{`${PHONE_PREFIX}${get(
									dropdownItem,
									'code',
									''
								)}`}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default InputPhoneCode;
