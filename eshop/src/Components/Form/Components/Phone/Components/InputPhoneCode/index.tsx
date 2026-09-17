import {
	FC,
	lazy,
	Suspense,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
} from 'react';
import { defaultTo, filter, find, first, get, map, uniqueId } from 'lodash-es';
import Flag from 'Components/Flag';
import { DEFAULT_PHONE_CODE } from 'Components/Form/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import Loader from 'Components/View/Loader';

import { IInputPhoneCodeProps, IPhoneCode } from './interfaces';
const FilterDropdownArrowIcon = lazy(
	() => import('Components/Icons/FilterDropdownArrow')
);

import './styles.css';

const InputPhoneCode: FC<IInputPhoneCodeProps> = (props) => {
	const phoneCodes = get(props, 'phoneCodes', []);
	const onChange = get(props, 'onChange', () => {});
	const value = get(
		props,
		'value',
		get(first(phoneCodes), 'code', DEFAULT_PHONE_CODE)
	);

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const selectedItem: IPhoneCode = useMemo(
		() =>
			defaultTo(find(phoneCodes, { code: value }), {
				flag: 'cz',
				code: DEFAULT_PHONE_CODE,
			}),
		[value]
	);
	const dropdownItems: IPhoneCode[] = useMemo(
		() =>
			filter(
				phoneCodes,
				(item) => get(item, 'code', DEFAULT_PHONE_CODE) !== value
			),
		[value]
	);
	const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
	const phoneCodeRef = useRef<HTMLDivElement>(null);

	const handleToggleDropdownMenu = useCallback(() => {
		setShowDropdownMenu((showDropdownMenu) => !showDropdownMenu);
	}, []);

	const handleCloseDropdownMenu = useCallback(() => {
		setShowDropdownMenu(false);
	}, []);

	const handleOnSelectCode = useCallback(
		(code: number) => () => {
			handleCloseDropdownMenu();
			onChange(code);
		},
		[onChange]
	);

	useOnClickOutside([phoneCodeRef], handleCloseDropdownMenu);

	return (
		<div
			ref={phoneCodeRef}
			className="vinisto-code user-select-none"
		>
			<div
				className="vinisto-code__filter-btn"
				onClick={handleToggleDropdownMenu}
			>
				<Flag
					code={get(selectedItem, 'flag', '')}
					width={23}
					height={15}
					className="vinisto-flag"
				/>
				<span className="vinisto-font-18">{`+${get(
					selectedItem,
					'code',
					''
				)}`}</span>
				<Suspense fallback={<Loader blank />}>
					<FilterDropdownArrowIcon
						id={uniqueId()}
						alt={t({ id: 'alt.dropDown' })}
						title={``}
						className={`FilterDropdownArrowIcon`}
					/>
				</Suspense>
			</div>
			{showDropdownMenu && (
				<div className="vinisto-code__filter-list">
					{map(dropdownItems, (dropdownItem, index) => (
						<div
							key={get(dropdownItem, 'code', index) || 'pcode'}
							className="vinisto-code__filter-list__item"
							onClick={handleOnSelectCode(
								get(dropdownItem, 'code', DEFAULT_PHONE_CODE)
							)}
						>
							<Flag
								code={get(dropdownItem, 'flag', '')}
								width={23}
								height={15}
								className="vinisto-flag"
							/>
							<span className="vinisto-font-18">{`+${get(
								dropdownItem,
								'code',
								''
							)}`}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default InputPhoneCode;
