import { lazy, Suspense, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import cx from 'classnames';
import { get, uniqueId } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';
const EditSmallIcon = lazy(() => import('Components/Icons/EditSmall'));
const DeleteBinSmallIcon = lazy(
	() => import('Components/Icons/DeleteBinSmall')
);
import Loader from 'Components/View/Loader';
import { VinistoHelperDllEnumsCountryCode } from 'vinisto_api_client/src/api-types/product-api';

import { IDeliveryAddressBoxProps } from './interfaces';

import './styles.css';

const DeliveryAddressBox = (props: IDeliveryAddressBoxProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const isSelected = get(props, 'isSelected', false);
	const isLoading = get(props, 'isLoading', false);
	const handleOnEdit = get(props, 'handleOnEdit', () => {});
	const handleOnSelect = isLoading
		? () => {}
		: get(props, 'handleOnSelect', () => {});

	const handleOnDelete = props?.handleOnDelete;

	return (
		<div
			className={cx('vinisto-address', {
				selected: isSelected && !isLoading,
			})}
			onClick={handleOnSelect}
		>
			<div
				className="vinisto-address__header"
				style={{ marginBottom: isLoading ? '.25rem' : '0.5rem' }}
			>
				<div className="vinisto-address__check-title-wrap">
					<div className="vinisto-shipping__item__radio-check">
						{isLoading ? (
							<Skeleton
								width="20px"
								height="20px"
								circle
							/>
						) : (
							<input
								className="vinisto-shipping__item__radio-check__radio"
								type="radio"
								checked={isSelected}
								readOnly
							/>
						)}
					</div>
					<div className="vinisto-address__title">
						{isLoading ? (
							<Skeleton
								width="120px"
								height="20px"
								style={{ margin: '0 .25rem' }}
							/>
						) : (
							get(props, 'data.title', '-')
						)}
					</div>
				</div>
				<div className="vinisto-address__edit-delete">
					{isLoading ? (
						<Skeleton
							width="20px"
							height="20px"
						/>
					) : (
						<div
							className="vinisto-btn vinisto-clear-btn vinisto-address__edit-delete__edit"
							onClick={handleOnEdit}
						>
							<Suspense fallback={<Loader blank />}>
								<EditSmallIcon
									id={uniqueId()}
									alt={t({ id: 'alt.edit' })}
									title={``}
									className={`EditSmallIcon`}
								/>
							</Suspense>
						</div>
					)}
					{isLoading ? (
						<Skeleton
							width="20px"
							height="20px"
						/>
					) : (
						<div
							className="vinisto-btn vinisto-clear-btn vinisto-address__edit-delete__delete"
							onClick={handleOnDelete}
						>
							<Suspense fallback={<Loader blank />}>
								<DeleteBinSmallIcon
									id={uniqueId()}
									alt={t({ id: 'alt.delete' })}
									title={``}
									className={`DeleteSmallIcon`}
								/>
							</Suspense>
						</div>
					)}
				</div>
			</div>
			{isLoading ? (
				<Skeleton count={5.4} />
			) : (
				<>
					{props?.data?.company && <div>{props?.data?.company}</div>}
					<div>{`${get(props, 'data.name', '-')} ${get(
						props,
						'data.surname',
						'-'
					)}`}</div>
					{props?.data?.email && (
						<div>
							<span>{`${props?.data?.email?.split('@')?.[0]}@`}</span>
							<span className="d-inline-block">{`${
								props?.data?.email?.split('@')?.[1]
							}`}</span>
						</div>
					)}
					<div>
						{get(props, 'data.phone', '-').replace(/(\+?\d{3})/g, '$1 ')}
					</div>
					<div>
						{get(props, 'data.street', '-')}
						<span>
							{' '}
							{get(props, 'data.houseNumber', '-')
								? get(props, 'data.landRegistryNumber', '-') +
								  '/' +
								  get(props, 'data.houseNumber', '-')
								: get(props, 'data.landRegistryNumber', '-')}
						</span>
					</div>
					<div>{get(props, 'data.city', '-')}</div>
					<div>{get(props, 'data.zip', '-')}</div>
					<div>
						{props?.data?.countryCode &&
						props.data.countryCode == VinistoHelperDllEnumsCountryCode.CZ
							? t({ id: 'addressForm.countryCode.CZ.label' })
							: t({ id: 'addressForm.countryCode.SK.label' })}
					</div>
				</>
			)}
		</div>
	);
};

export default DeliveryAddressBox;
