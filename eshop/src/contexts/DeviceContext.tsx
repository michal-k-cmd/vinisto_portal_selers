import { createContext, ReactNode, useEffect, useState } from 'react';

interface DeviceContextType {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
}

export const DeviceContext = createContext<DeviceContextType>({
	isMobile: false,
	isTablet: false,
	isDesktop: true, // Default to desktop for SSR
});

interface DeviceProviderProps {
	children: ReactNode;
}

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const [isDesktop, setIsDesktop] = useState(true);

	useEffect(() => {
		const updateDeviceValues = () => {
			const width = window.innerWidth;
			setIsMobile(width < 768);
			setIsTablet(width >= 768 && width < 1024);
			setIsDesktop(width >= 1024);
		};

		// Initial check
		updateDeviceValues();

		// Add resize listener
		window.addEventListener('resize', updateDeviceValues);

		// Cleanup
		return () => window.removeEventListener('resize', updateDeviceValues);
	}, []);

	return (
		<DeviceContext.Provider value={{ isMobile, isTablet, isDesktop }}>
			{children}
		</DeviceContext.Provider>
	);
};
