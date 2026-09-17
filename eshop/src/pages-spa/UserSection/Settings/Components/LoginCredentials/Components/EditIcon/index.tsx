import { FC, lazy, Suspense, useCallback, useContext, useMemo } from 'react';
import { get, uniqueId } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';
import Loader from 'Components/View/Loader';

import { IEditIconProps } from './interfaces';
const EditSmallBtnIcon = lazy(() => import('Components/Icons/EditSmallBtn'));

const EditIcon: FC<IEditIconProps> = (props): JSX.Element => {
	const iconId = useMemo(() => `user-settings-edit-icon-${uniqueId()}`, []);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnEditIconCLick = useCallback(() => {
		const onClick = get(props, 'onClick', () => {});
		onClick();
	}, []);

	return (
		<div
			onClick={handleOnEditIconCLick}
			className="vinisto-label-edit-wrap"
		>
			<Suspense fallback={<Loader blank />}>
				<EditSmallBtnIcon
					id={iconId}
					alt={t({ id: 'alt.edit' })}
					title={t({ id: 'alt.edit' })}
					className={`vinisto-label-edit`}
				/>
			</Suspense>
		</div>
	);
};

export default EditIcon;
