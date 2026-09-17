'use client';

import { useEffect, useMemo, useState } from 'react';

import PlatformToggle from '../platform-toggle';

import { AdmintoolsFab } from './fab';
import styles from './styles.module.css';

export type AdmintoolsProps = {
	productDetailId?: string;
	className?: string;
	platformToggleProps: {
		isB2b: boolean;
		prefix: (itemName: string) => string;
		storageKeys: {
			readonly LOGIN_REDIRECT_PATH: 'LOGIN_REDIRECT_PATH';
			readonly ACTIVE_CURRENCY: 'ACTIVE_CURRENCY';
			readonly USER_PRICE_LEVEL: 'USER_PRICE_LEVEL';
			readonly ACTIVE_PLATFORM: 'ACTIVE_PLATFORM';
		};
	};
};

const Admintools = ({
	productDetailId,
	className,
	platformToggleProps,
}: AdmintoolsProps) => {
	const { isOpen, toggle, setOpen } = useAdmintoolsToggle();
	const { isFabVisible } = useFabVisibilityHotkey();

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [setOpen]);

	const adminBundleDetailHref = useMemo(() => {
		if (!productDetailId) return undefined;
		if (typeof window === 'undefined') return undefined;

		const { hostname, protocol } = window.location;
		const baseHost = hostname.replace(/^www\./i, '');
		const adminHost = /^admin\./i.test(baseHost)
			? baseHost
			: `admin.${baseHost}`;

		return `${protocol}//${adminHost}/bundle-detail/${encodeURIComponent(
			productDetailId
		)}`;
	}, [productDetailId]);

	return (
		isFabVisible && (
			<div className={[styles.stack, className].filter(Boolean).join(' ')}>
				<AdmintoolsFab
					isOpen={isOpen}
					onClick={toggle}
					className={styles.fabOverride}
					title="Admin tools"
					position="bottom-right"
				/>

				{isOpen && (
					<div className={styles.actions}>
						{adminBundleDetailHref ? (
							<a
								href={adminBundleDetailHref}
								target="_blank"
								rel="noreferrer"
								className={styles.miniBtn}
								aria-label="Bundle detail"
							>
								<span className={styles.miniIcon}>🔗</span>
								<span className={styles.label}>Bundle detail</span>
							</a>
						) : (
							<button
								type="button"
								className={[styles.miniBtn, styles.disabled].join(' ')}
								aria-disabled="true"
							>
								<span className={styles.miniIcon}>!</span>
								<span className={styles.label}>Missing ID</span>
							</button>
						)}
						<div className={styles.miniBtn}>
							<PlatformToggle {...platformToggleProps} />
							<span className={styles.label}>Změnit platformu</span>
						</div>
					</div>
				)}
			</div>
		)
	);
};

function useAdmintoolsToggle() {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen((prev) => !prev);
	const setOpen = (open: boolean) => setIsOpen(open);
	return { isOpen, toggle, setOpen };
}

function useFabVisibilityHotkey() {
	const [isFabVisible, setIsFabVisible] = useState(true);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const onKey = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === 'a') {
				e.preventDefault();
				setIsFabVisible((v) => !v);
			}
		};

		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	return { isFabVisible };
}

export default Admintools;
