import { FC, useCallback, useContext, useMemo, useState } from 'react';
import cx from 'classnames';
import { AuthenticationAction } from 'Services/AuthenticationService/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { ArrowDown } from 'Components/Icons';

import styles from './styles.module.css';

const SupplierSwitch: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const authenticationContext = useContext(AuthenticationContext);

	const t = localizationContext.useFormatMessage();

	const suppliers = useMemo(() => {
		if (
			authenticationContext.vinistoUser === null ||
			Array.isArray(authenticationContext.vinistoUser.suppliers) === false
		) {
			return [];
		}
		return authenticationContext.vinistoUser.suppliers!.map((supplier) => ({
			label: supplier.nameBilling!,
			value: supplier.id!,
		}));
	}, [authenticationContext.vinistoUser]);

	const [isOpen, setIsOpen] = useState(false);

	const handleOnChange = useCallback(
		(selectedSupplier: string) => () => {
			authenticationContext.dispatch({
				type: AuthenticationAction.setActiveSupplier,
				payload: selectedSupplier,
			});

			setIsOpen(false);
		},
		[authenticationContext]
	);

	const handleSwitchToggle = useCallback(() => {
		setIsOpen((oldOpen) => !oldOpen);
	}, []);

	if (suppliers.length === 1) {
		return (
			<span className={`${styles.singleSupplierTitle} max-lines--2`}>
				{suppliers[0].label}
			</span>
		);
	}

	return (
		<div className={cx(styles.container, { [styles.open]: isOpen })}>
			<button
				className={styles.toggleButton}
				onClick={handleSwitchToggle}
				type="button"
			>
				<span className="pe-2 max-lines--2">
					{
						suppliers.find(
							(supplier) =>
								supplier.value === authenticationContext.activeSupplierId
						)?.label
					}
				</span>
				<ArrowDown />
			</button>
			<div className={styles.dropdown}>
				<div className={styles.manageItem}>
					{t({ id: 'admin.sideBar.manageSupplier' })}
				</div>
				<ul>
					{suppliers.map((supplier) => (
						<li
							key={supplier.value}
							className={styles.supplierItem}
							onClick={handleOnChange(supplier.value)}
						>
							{supplier.label}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SupplierSwitch;
