import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { includes, isNumber, toNumber } from 'lodash-es';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { storageServiceInstance } from 'Services/StorageService';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import { IRegisterPageContextValue } from './interfaces';
import { registrationSteps } from './constants';

const defaultContextValues: IRegisterPageContextValue = {
	steps: registrationSteps,
	activeStep: 1,
	latestVisitedStep: 1,
	navigateToStep: () => {},
};

export const RegisterPageContext =
	createContext<IRegisterPageContextValue>(defaultContextValues);

const RegisterPageContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const authenticationContext = useContext(AuthenticationContext);

	const navigate = useNavigate();
	const location = useLocation();
	const { step } = useParams();
	const [latestVisitedStep, setLatestVisitedStep] = useState(
		toNumber(step) || 1
	);

	const navigateToStep = useCallback(
		(stepNumber: number) => {
			if (stepNumber <= latestVisitedStep) {
				navigate(`/register/step/${stepNumber}`);
			}
		},
		[latestVisitedStep, navigate]
	);

	useEffect(() => {
		if (isNumber(toNumber(step)) && toNumber(step) > latestVisitedStep) {
			setLatestVisitedStep(toNumber(step));
		}
	}, [step, latestVisitedStep]);

	useEffect(() => {
		if (
			!includes(location.pathname, 'register') ||
			authenticationContext.isLoggedIn
		) {
			storageServiceInstance.removeItem(LocalStorageKeys.REGISTER_VALUES);
		}
	}, [location, authenticationContext.isLoggedIn]);

	return (
		<RegisterPageContext.Provider
			value={{
				steps: [],
				activeStep: toNumber(step ?? '1'),
				latestVisitedStep,
				navigateToStep,
			}}
		>
			{children}
		</RegisterPageContext.Provider>
	);
};

export const useRegisterPageContext = () => useContext(RegisterPageContext);

export const useStoredRegisterData = () => {
	const storedValues = useRef(
		storageServiceInstance.getStorageItem(LocalStorageKeys.REGISTER_VALUES) ||
			{}
	);
	return storedValues.current as Record<any, any>;
};

export default RegisterPageContextProvider;
