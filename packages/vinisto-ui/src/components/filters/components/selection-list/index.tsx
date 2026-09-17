import { HTMLAttributes, type ReactNode } from 'react';
import cx from 'classnames';

import CloseIcon from '../../../icons/Close';

import styles from './styles.module.css';

export interface SelectionListProps<
	T extends Record<PropertyKey, any> = Record<PropertyKey, never>
> {
	label: ReactNode;
	items: T[];
	accessorFn?: (item: T) => ReactNode;
	className?: string;
	labelClassName?: string;
	listClassName?: string;
	listItemClassName?: string;
	itemClassName?: string;
	renderLabel?: ({ className, label }: RenderLabelArgs) => ReactNode;
	renderItem?: <
		T extends Record<PropertyKey, any> = Record<PropertyKey, never>
	>({
		onClick,
		item,
		accessorFn,
		className,
		listItemClassName,
	}: RenderItemArgs<T>) => ReactNode;
	onItemClick?: (item: T) => void;
	props?: any;
}

interface RenderLabelArgs {
	className?: string;
	label: ReactNode;
}

interface RenderItemArgs<T extends Record<PropertyKey, any>>
	extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
	onClick?: (item: T) => void;
	item: T;
	accessorFn: (item: T) => ReactNode;
	className?: string;
	listItemClassName?: string;
}

const SelectionListLabel = ({ className, label }: RenderLabelArgs) => {
	return <div className={cx(styles.label, className)}>{label}</div>;
};

const SelectionListItem = <T extends Record<PropertyKey, any>>({
	item,
	accessorFn,
	onClick,
	className,
}: RenderItemArgs<T>) => {
	return (
		<span className={cx(styles.item, className)}>
			{accessorFn(item)}
			<button
				className={styles.button}
				onClick={() => onClick?.(item)}
			>
				<CloseIcon className={styles.closeIcon} />
			</button>
		</span>
	);
};

const SelectionList = <T extends Record<PropertyKey, any>>({
	className,
	labelClassName,
	listClassName,
	listItemClassName,
	itemClassName,
	label,
	items,
	accessorFn = (item: T) => String(item),
	renderLabel = SelectionListLabel,
	renderItem = SelectionListItem,
	onItemClick = () => undefined,
	props,
}: SelectionListProps<T>) => {
	return (
		<div className={cx(styles.wrapper, className)}>
			{renderLabel({ className: labelClassName, label })}

			<ul className={cx(styles.list, listClassName)}>
				{items.map((item, index) => (
					<li
						className={cx(styles.listItem, listItemClassName)}
						key={index}
					>
						{renderItem({
							...props,
							onClick: onItemClick,
							item,
							accessorFn,
							className: itemClassName,
							listItemClassName,
						})}
					</li>
				))}
			</ul>
		</div>
	);
};

export { SelectionListLabel, SelectionListItem };
export default SelectionList;
