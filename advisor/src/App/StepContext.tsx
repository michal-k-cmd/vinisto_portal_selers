import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useCallback,
	useContext,
	useState,
} from 'react';

import { PRODUCT_LISTING_STEP } from './constants';

type TStepContext = {
	step: number;
	setStep: Dispatch<SetStateAction<number>>;
	incrementStep: () => void;
	decrementStep: () => void;
};

const StepContext = createContext<TStepContext>({
	step: 0,
	setStep: () => {
		return;
	},
	incrementStep: () => {
		return;
	},
	decrementStep: () => {
		return;
	},
});

const StepProvider = ({ children }: { children: ReactNode }) => {
	const [step, setStep] = useState(0);

	const incrementStep = useCallback(() => {
		setStep(Math.min(step + 1, PRODUCT_LISTING_STEP));
	}, [step]);

	const decrementStep = useCallback(() => {
		setStep(Math.max(step - 1, 0));
	}, [step]);

	return (
		<StepContext.Provider
			value={{ step, setStep, incrementStep, decrementStep }}
		>
			{children}
		</StepContext.Provider>
	);
};

export const useStepContext = () => useContext(StepContext);

export default StepProvider;
