import clsx from 'classnames';
import { ComponentPropsWithoutRef, ReactNode, useCallback } from 'react';

interface RootBaseProps {
	children: ReactNode | ReactNode[];
	onChange?: () => void;
}

type RootProps = RootBaseProps &
	Omit<ComponentPropsWithoutRef<'div'>, keyof RootBaseProps>;

export const Root = ({ children, ...props }: RootProps) => {
	return <div {...props}>{children}</div>;
};

interface ToggleGroupButtonBaseProps {
	isPressed?: boolean;
	className?: string;
	activeClassName?: string;
	children: ReactNode;
}

type ToggleGroupButtonProps = ToggleGroupButtonBaseProps &
	Omit<ComponentPropsWithoutRef<'button'>, keyof ToggleGroupButtonBaseProps>;

export const Button = ({
	children,
	isPressed,
	className,
	activeClassName,
	...props
}: ToggleGroupButtonProps) => {
	const { onClick } = props;

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			onClick?.(e);
		},
		[onClick]
	);

	return (
		<button
			className={clsx(className, isPressed && activeClassName)}
			type="button"
			onClick={handleClick}
		>
			{children}
		</button>
	);
};
export const ToggleGroup = { Root, Button };
