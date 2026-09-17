import { useContext } from 'react';
import { CCard, CCardBody, CCardTitle, CCol, CRow } from '@coreui/react';
import { get, head } from 'lodash-es';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { BundleDetailContext } from 'Pages/BundleDetail/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { Link } from 'react-router-dom';

import BundleInfoParams from './Components/BundleInfoParams';
import BundleProducer from './Components/BundleProducer';

import './styles.css';

const BundleInfo = () => {
	const localizationContext = useContext(LocalizationContext);
	const { bundle } = useContext(BundleDetailContext);

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const { shortVariety: producerName, component: flag } = getFlagSpecification(
		bundle?.specificationDetails ?? []
	);

	return (
		<CRow>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardBody>
						<div className="bundle-container">
							<div className="heading-col">
								<CCardTitle className="pb-2">
									{t({ id: 'bundleDetail.bundle.details' })}
								</CCardTitle>
								<span className="note">
									{t({ id: 'bundleDetail.bundle.details.note' })}
								</span>
								<div className="row card-detail mt-4">
									<div className="vinisto-product-image">
										<div className="vinisto-card">
											<div className="position-relative w-100 text-center">
												<img
													className="vinisto-product-image__img card-height"
													src={get(
														head(bundle?.images ?? []),
														'domainUrls.original_png',
														''
													)}
													alt={`${t({ id: 'alt.bundleImage' })}`}
												/>
											</div>
										</div>
									</div>
									<div className="vinisto-product-info">
										<div className="vinisto-card vinisto-card--tablet-mobile-hide card-width">
											<div className="vinisto-mobile-card py-2">
												<p className="vinisto-wine__name j-align-unset desktop-only">
													<span
														dangerouslySetInnerHTML={{
															__html:
																getLocalizedValue(bundle?.name ?? []) ?? '-',
														}}
													></span>
												</p>
												<div className="vinisto-wine__split">
													<div className="vinisto-wine__split__left desktop-only">
														<div className="d-block">
															<p className="vinisto-wine__variety j-align-unset underline-effect underline-effect--vinisto">
																{
																	<BundleProducer
																		flag={flag}
																		name={producerName}
																	/>
																}
															</p>
														</div>
													</div>
												</div>
												<div
													className="vinisto-product-info__text"
													dangerouslySetInnerHTML={{
														__html: getLocalizedValue(
															bundle?.description ?? []
														),
													}}
												></div>
												<BundleInfoParams
													bundleParams={bundle?.specificationDetails ?? []}
												/>
											</div>
											<div className="mb-3">
												{bundle?.isSet && (
													<div className="d-flex gap-3 flex-column">
														{bundle.setBundles?.map((bundle) => (
															<div
																className="vinisto-card"
																key={bundle.id}
															>
																<Link to={`/bundle-detail/${bundle.id}`}>
																	{getLocalizedValue(bundle.name ?? [])}
																</Link>
															</div>
														))}
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default BundleInfo;
