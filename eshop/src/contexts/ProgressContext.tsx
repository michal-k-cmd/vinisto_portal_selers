'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './styles.module.css';

type Timeout = ReturnType<typeof setTimeout>;

const ProgressContext = createContext({
	start: () => {},
	done: () => {},
});

export function useProgress() {
	return useContext(ProgressContext);
}

export const ProgressProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const timeoutRef = useRef<Timeout>();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const routeChangingRef = useRef(false);

	const start = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setIsLoading(true);
		timeoutRef.current = setTimeout(() => setIsLoading(false), 10000);
	};

	const done = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setIsLoading(false);
		routeChangingRef.current = false;
	};

	useEffect(() => {
		routeChangingRef.current = true;
		start();

		const timer = setTimeout(() => {
			if (routeChangingRef.current) {
				done();
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [pathname, searchParams]);

	useEffect(() => {
		const handleLoad = () => {
			if (routeChangingRef.current) {
				done();
			}
		};

		window.addEventListener('load', handleLoad);
		return () => window.removeEventListener('load', handleLoad);
	}, []);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	return (
		<ProgressContext.Provider value={{ start, done }}>
			{isLoading && (
				<div className={styles.progressBarWrap}>
					<div className={styles.progressBar} />
				</div>
			)}
			{children}
		</ProgressContext.Provider>
	);
};
