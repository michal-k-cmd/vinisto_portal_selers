import {
	createContext,
	type Dispatch,
	type ReactNode,
	type RefObject,
	type SetStateAction,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

type TLayoutContext = {
	headerRef: RefObject<HTMLElement>;
	footerRef: HTMLElement | null;
	setFooterRef: Dispatch<SetStateAction<HTMLElement | null>>;
	onResized: number;
};

const debounce = <T extends unknown[], U>(
	callback: (...args: T) => PromiseLike<U> | U,
	wait = 200
) => {
	let timer: ReturnType<typeof setTimeout>;

	return (...args: T): Promise<U> => {
		clearTimeout(timer);
		return new Promise((resolve) => {
			timer = setTimeout(() => resolve(callback(...args)), wait);
		});
	};
};

const LayoutContext = createContext<TLayoutContext>({} as TLayoutContext);

const LayoutProvider = ({ children }: { children: ReactNode }) => {
	const headerRef = useRef<HTMLElement | null>(null);
	const [footerRef, setFooterRef] = useState<HTMLElement | null>(null);
	const [onResized, updateOnResize] = useState(0);

	useEffect(() => {
		const debouncedHandleResize = debounce(() => {
			updateOnResize((prev) => prev + 1);
		});

		window.addEventListener('resize', debouncedHandleResize);

		return () => {
			window.removeEventListener('resize', debouncedHandleResize);
		};
	}, []);

	const MemoizedLayoutProvider = useMemo(() => {
		return (
			<LayoutContext.Provider
				value={{ headerRef, footerRef, setFooterRef, onResized }}
			>
				{children}
			</LayoutContext.Provider>
		);
	}, [headerRef, footerRef, setFooterRef, onResized, children]);

	return MemoizedLayoutProvider;
};

export const useLayoutContext = () => useContext(LayoutContext);

export default LayoutProvider;
