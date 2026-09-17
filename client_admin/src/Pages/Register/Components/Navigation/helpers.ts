import {
	RegistrationStep,
	RegistrationStepProgress,
} from 'Pages/Register/interfaces';
import { STEP_STATUS } from 'Pages/Register/constants';

export const hasCardStatusIcon = (status: string) => {
	switch (status) {
		case STEP_STATUS.SUCCESS:
		case STEP_STATUS.WARNING:
		case STEP_STATUS.ERROR:
			return true;
		default:
			return false;
	}
};

export const getStepStatus = (
	step: RegistrationStepProgress,
	activeStepNumber: RegistrationStep['order']
) => {
	if (step.order === activeStepNumber) {
		return STEP_STATUS.ACTIVE;
	}
	if (step.valid) {
		return STEP_STATUS.SUCCESS;
	}
	if (step.errors.length > 0) {
		return STEP_STATUS.ERROR;
	}
	if (step.warnings.length > 0) {
		return STEP_STATUS.WARNING;
	}
	return STEP_STATUS.DISABLED;
};
