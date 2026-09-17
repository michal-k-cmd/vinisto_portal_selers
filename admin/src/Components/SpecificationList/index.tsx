import { FC, useContext } from 'react';
import cx from 'classnames';
import { useNavigate } from 'react-router-dom';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LocalizationContext } from 'Services/LocalizationService';
import DeleteIcon from 'Components/Icons/Delete';
import EditIcon from 'Components/Icons/Edit';
import { BiLink } from 'react-icons/bi';
import { MdInfo } from 'react-icons/md';

import { getSpecificationValue } from './helpers';
import { SpecificationListProps } from './interfaces';

import './styles.css';

const SpecificationList: FC<SpecificationListProps> = ({
	title,
	specifications,
	handleOnEdit,
	handleOnRemove,
	specificationValueMapper,
	className,
	showDetailInNewWindow = false,
}) => {
	const { useFormatMessage, activeLanguageKey } =
		useContext(LocalizationContext);

	const t = useFormatMessage();
	const navigate = useNavigate();
	const getLocalizedValue = useLocalizedValue();

	const handleOnClickDetail = (specificationId: string) => () => {
		const url = `/specification-detail/${specificationId}`;
		if (showDetailInNewWindow) {
			return window.open(url);
		}
		navigate(url);
	};

	return (
		<section className={cx('specifications-list', className)}>
			{title !== undefined && (
				<h2 className="specifications-list__heading">{t({ id: title })}</h2>
			)}
			{specifications.length > 0 && (
				<ul className="specifications-list__list list-unstyled">
					{specifications.map((specification) => {
						return (
							<li
								key={specification.definition.id}
								className="specification"
							>
								<MdInfo className="specification__icon" />
								<div className="specification__label">
									{getLocalizedValue(specification.definition.name)}
								</div>
								<div className="specification__label specification__value">
									{(specificationValueMapper ?? getSpecificationValue)(
										// @ts-expect-error different type of argument
										specification,
										t({ id: 'admin.yes' }),
										t({ id: 'admin.no' }),
										activeLanguageKey
									)}
								</div>
								<ul className="d-flex gap-2 list-unstyled">
									<li>
										<BiLink
											onClick={handleOnClickDetail(specification.definition.id)}
											className="specification__icon pointer"
										/>
									</li>
									<li>
										<EditIcon
											className="specification__icon pointer"
											onClick={handleOnEdit(specification)}
										/>
									</li>
									<li>
										<DeleteIcon
											onClick={handleOnRemove(specification.definition.id)}
											className="specification__icon pointer"
										/>
									</li>
								</ul>
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
};

export default SpecificationList;
