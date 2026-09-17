import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useMutation } from '@tanstack/react-query';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import InfoBox from 'Components/InfoBox';
import cx from 'classnames';
import { BundleDetailContext } from 'Pages/BundleDetail/context';
import { BundleDetailAction } from 'Pages/BundleDetail/constants';

import { BundleState as BundleStateEnum, getBundleState } from './helpers';
import styles from './styles.module.css';

import {
	ProductApi,
	VinistoProductDllModelsApiBundleBundle,
} from '@/api-types/product-api';
import api from '@/api';

const BundleState = ({
	bundle,
}: {
	bundle: VinistoProductDllModelsApiBundleBundle;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { vinistoUser } = useContext(AuthenticationContext);
	const UserLoginHash = vinistoUser?.loginHash;
	const bundleId = bundle?.id;

	const { dispatch } = useContext(BundleDetailContext);

	const setIsClearanceSaleMutation = useMutation({
		mutationFn: () => {
			return api.put<
				ProductApi.BundlesSetIsClearanceSaleUpdate.ResponseBody,
				ProductApi.BundlesSetIsClearanceSaleUpdate.RequestQuery,
				ProductApi.BundlesSetIsClearanceSaleUpdate.RequestBody
			>(`product-api/bundles/${bundleId}/set-is-clearance-sale`, undefined, {
				isClearanceSale: true,
				userLoginHash: UserLoginHash,
			});
		},
		onSuccess: (data) => {
			if (data.bundle) {
				dispatch([BundleDetailAction.setBundleData, data.bundle]);
			}
		},
	});

	const state = getBundleState(bundle);

	return (
		<CRow>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardBody className="d-flex gap-4">
						<div className="d-flex gap-2 justify-content-between flex-column ps-2">
							<div className="d-flex gap-2 align-items-center">
								<div className="d-flex gap-1 align-items-center">
									{t({ id: 'bundle.state.title' })}:
									<InfoBox
										content={<BundleStateInfoBox />}
										className="position-relative"
										style={{ top: '-0.5rem' }}
									/>
								</div>
								<span
									className={cx({
										[styles.textSuccess]: state === BundleStateEnum.AVAILABLE,
										[styles.textWarn]: state === BundleStateEnum.CLEARANCE_SALE,
										[styles.textDanger]:
											state === BundleStateEnum.TEMPORARY_UNAVAILABLE ||
											state === BundleStateEnum.SALE_OVER,
									})}
								>
									{t({ id: `bundle.state.${state}.title` })}
								</span>
							</div>
							<span>
								<BundleStateMessage
									state={state}
									extendedDescription
								/>
							</span>
						</div>

						{state === BundleStateEnum.AVAILABLE && (
							<div className="d-flex gap-2 flex-column ps-2">
								<div className="d-flex gap-3 align-items-center">
									<div className="d-flex gap-1 align-items-center">
										{t({ id: 'bundle.state.changeStateTo' })}:
										<button
											className={cx('btn btn-sm', styles.buttonWarning)}
											onClick={() => {
												setIsClearanceSaleMutation.mutate();
											}}
										>
											{t({ id: 'bundle.state.CLEARANCE_SALE.title' })}
										</button>
									</div>
								</div>
								<BundleStateMessage state={BundleStateEnum.CLEARANCE_SALE} />
							</div>
						)}
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default BundleState;

const BundleStateMessage = ({
	state,
	className,
	extendedDescription = false,
}: {
	state: BundleStateEnum | null;
	className?: string;
	extendedDescription?: boolean;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	switch (state) {
		case BundleStateEnum.TEMPORARY_UNAVAILABLE:
			return (
				<span className={cx(className)}>
					<span className={styles.textDanger}>
						{t({ id: `bundle.state.${state}.title` })}:{' '}
					</span>
					{extendedDescription ? (
						<em>{t({ id: `bundle.state.${state}.description.extended` })}</em>
					) : (
						<em>{t({ id: `bundle.state.${state}.description` })}</em>
					)}
				</span>
			);
		case BundleStateEnum.CLEARANCE_SALE:
			return (
				<span className={cx(className)}>
					<span className={styles.textWarn}>
						{t({ id: `bundle.state.${state}.title` })}:{' '}
					</span>
					<em>
						{t(
							{ id: `bundle.state.${state}.description` },
							{
								vinisto: (
									<strong className={styles.textSuccess}>vinisto</strong>
								),
							}
						)}
					</em>
				</span>
			);
		case BundleStateEnum.SALE_OVER:
			return (
				<span className={cx(className)}>
					<span className={styles.textDanger}>
						{t({ id: `bundle.state.${state}.title` })}:{' '}
					</span>
					<em>{t({ id: `bundle.state.${state}.description` })}</em>
				</span>
			);
	}

	return (
		<span className={cx(className)}>
			<span className={styles.textSuccess}>
				{t({ id: `bundle.state.${state}.title` })}:{' '}
			</span>
			<em>{t({ id: `bundle.state.${state}.description` })}</em>
		</span>
	);
};

const BundleStateInfoBox = () => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div className={styles.infoBox}>
			<em className={cx(styles.textSuccess, styles.infoBoxHeading)}>
				{t({ id: 'bundle.state.infoBox.heading' })}:
			</em>
			<BundleStateMessage state={BundleStateEnum.AVAILABLE} />
			<BundleStateMessage state={BundleStateEnum.CLEARANCE_SALE} />
			<BundleStateMessage state={BundleStateEnum.TEMPORARY_UNAVAILABLE} />
			<BundleStateMessage state={BundleStateEnum.SALE_OVER} />
		</div>
	);
};
