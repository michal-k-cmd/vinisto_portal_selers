import { FC, Fragment, useContext } from 'react';
import { CCardText } from '@coreui/react';
import { Link } from 'react-router-dom';
import { LocalizationContext } from 'Services/LocalizationService';

import { FieldListProps } from './interfaces';
import { getSettings } from './helpers';

import './styles.css';

const FieldList: FC<FieldListProps> = ({ steps, fieldKey }) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	const [title, titleClassName, redirectButtonLabel] = getSettings(fieldKey);

	return (
		<div className="mb-4">
			<CCardText className={titleClassName}>{t({ id: title })}</CCardText>
			{steps.map((step, index) => {
				const fieldMessages = step[fieldKey]; // pleasing TS
				return (
					<Fragment key={index}>
						{fieldMessages !== undefined && fieldMessages.length > 0 && (
							<>
								<p className="mb-0 fw-bolder">{t({ id: step.title })}</p>
								<dl className="field-list">
									{fieldMessages.map(
										(field: Record<string, any>, index: number) => (
											<Fragment key={field.fieldLabel ?? index}>
												<dt>{field.fieldLabel}</dt>
												<dd>{field.errorLabel}</dd>
											</Fragment>
										)
									)}
								</dl>
								<Link
									to={`/register/step/${step.order}`}
									className="btn color-primary underline-effect underline-effect--vinisto"
								>
									<span className="underline-item">
										{t(
											{ id: redirectButtonLabel },
											{ title: `${t({ id: step.title })}` }
										)}{' '}
										&gt;
									</span>
								</Link>
							</>
						)}
					</Fragment>
				);
			})}
		</div>
	);
};

export default FieldList;
