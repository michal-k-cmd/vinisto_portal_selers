import { ReactNode, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { BiPlus } from 'react-icons/bi';
import SpecificationList from 'Components/SpecificationList';
import ActionButton from 'Components/AdminDetail/Components/ActionButton';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

interface SpecificationListViewProps {
	title: string;
	matchingCountLabel: string;
	matchingCount: number;
	onRecalculate: () => void;
	isRecalculating: boolean;
	specifications: any[];
	handleOnEdit: (specification: any) => () => void;
	handleOnRemove: (specificationId: string) => () => void;
	specificationValueMapper: (
		specification: any,
		yesLabel: ReactNode,
		noLabel: ReactNode
	) => string;
	onAddSpecification: () => void;
}

const SpecificationListView = ({
	title,
	matchingCountLabel,
	matchingCount,
	onRecalculate,
	isRecalculating,
	specifications,
	handleOnEdit,
	handleOnRemove,
	specificationValueMapper,
	onAddSpecification,
}: SpecificationListViewProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<div className={styles.heading}>{title}</div>
				<span>
					{matchingCountLabel}: {matchingCount}
				</span>
				<Button
					onClick={onRecalculate}
					disabled={isRecalculating}
				>
					{t({
						id: 'admin.category.specifications.matchingBundles.recalculate',
					})}
				</Button>
			</header>

			{specifications.length > 0 && (
				<SpecificationList
					specifications={specifications}
					handleOnEdit={handleOnEdit}
					handleOnRemove={handleOnRemove}
					specificationValueMapper={specificationValueMapper}
				/>
			)}

			<ActionButton
				onClick={onAddSpecification}
				label="admin.category.specifications.button.add"
				icon={BiPlus}
			/>
		</section>
	);
};

export default SpecificationListView;
