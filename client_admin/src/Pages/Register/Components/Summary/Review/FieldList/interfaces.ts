import { StepSummary } from '../../interfaces';

export interface FieldListProps {
	steps: StepSummary[];
	fieldKey: keyof Pick<StepSummary, 'errors' | 'warnings'>;
}
