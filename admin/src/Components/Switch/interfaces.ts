interface SwitchProps {
	id?: string;
	onChange: (checked: boolean) => void;
	checked: boolean;
	className?: string;
}

export type { SwitchProps };
