import { useContext } from 'react';
import { CCard, CCardBody, CRow } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';
import CurrentOrderStatusCard from 'Pages/Overview/Components/CurrentOrderStatusCard';
import TopSellingProductsCard from 'Pages/Overview/Components/TopSellingProductsCard';
import Heading from 'Pages/Overview/Components/Heading';
import StatsCard from 'Pages/Overview/Components/StatsCard';
import { Form, Input } from 'Components/Form';

import OverviewCard from './Components/OverviewCard';

import './styles.css';

const OverviewPage: React.FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div className="overview">
			<CRow>
				<CRow>
					<CCard>
						<CRow>
							<CCard className="col">
								<CCardBody>
									<CurrentOrderStatusCard />
								</CCardBody>
							</CCard>
							<CCard className="col-lg-4">
								<CCardBody>
									<TopSellingProductsCard />
								</CCardBody>
							</CCard>
						</CRow>
					</CCard>
				</CRow>

				<CRow>
					<CCard className="col-sm me-3 mt-3 vinisto-card__overview">
						<CCardBody className="h-100">
							<OverviewCard
								title={t({ id: 'overview.restockRequest.title' })}
								data={t({ id: 'overview.restockRequest.noItems' })}
							/>
						</CCardBody>
					</CCard>
					<CCard className="col-sm me-3 mt-3">
						<CCardBody>
							<OverviewCard
								title={t({ id: 'overview.currentDiscounts.title' })}
								data={t({ id: 'overview.currentDiscounts.noItems' })}
							/>
						</CCardBody>
					</CCard>
					<CCard className="col-sm mt-3">
						<CCardBody>
							<OverviewCard
								title={t({ id: 'overview.restockRequest.title' })}
								data={t({ id: 'overview.restockRequest.noItems' })}
							/>
						</CCardBody>
					</CCard>
				</CRow>

				<CRow className="mt-3">
					<CCard className="col-sm pb-3">
						<CCardBody>
							<div className="d-flex flex-row overflow-visible my-2">
								<Heading
									size={2}
									className="vinisto-card__heading"
									title={t({ id: 'overview.stats.title' })}
								/>
								<Form className="d-flex vinisto-form__stats">
									<Input
										type="date"
										name="startDate"
										identifier="startDate"
										label="overview.stats.form.startDate"
										placeholder="overview.stats.form.startDate"
									/>
									<Input
										type="date"
										name="endDate"
										identifier="endDate"
										label="overview.stats.form.endDate"
										placeholder="overview.stats.form.endDate"
									/>
								</Form>
							</div>

							<CRow>
								<CCard className="col-sm mt-3">
									<CCardBody className="p-0">
										<StatsCard
											title={t({ id: 'overview.stats.turnover.title' })}
										/>
									</CCardBody>
								</CCard>
								<CCard className="col-sm mt-3">
									<CCardBody className="p-0">
										<StatsCard
											title={t({
												id: 'overview.stats.soldProductsCount.title',
											})}
										/>
									</CCardBody>
								</CCard>
								<CCard className="col-sm mt-3">
									<CCardBody className="p-0">
										<StatsCard
											title={t({ id: 'overview.stats.ordersCount.title' })}
										/>
									</CCardBody>
								</CCard>
								<CCard className="col-sm mt-3">
									<CCardBody className="p-0">
										<StatsCard
											title={t({
												id: 'overview.stats.topSellingProducts.title',
											})}
										/>
									</CCardBody>
								</CCard>
							</CRow>
						</CCardBody>
					</CCard>
				</CRow>
			</CRow>
		</div>
	);
};

export default OverviewPage;
