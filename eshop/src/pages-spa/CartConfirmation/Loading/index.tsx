import Skeleton from 'react-loading-skeleton';

import styles from './styles.module.css';

const Loading = () => {
	return (
		<section id="content-wrapper">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className={styles.status}>
							<Skeleton
								width="100px"
								height="100px"
								count={1}
							/>
							<Skeleton
								width="330px"
								height="25px"
								count={1}
								className="vinisto-card__heading vinisto-card__heading--cart-confirmation vinisto-color-success"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-card">
							<div className="vinisto-confirmation__heading-wrap">
								<Skeleton
									width="300px"
									height="25px"
									count={1}
									className="vinisto-card__heading"
									style={{
										maxWidth: '100%',
									}}
								/>
								<div className="vinisto-confirmation__share desktop-only">
									<Skeleton
										width="230px"
										height="16px"
										count={1}
										className="vinisto-font-18"
										style={{
											maxWidth: '100%',
										}}
									/>
									<Skeleton
										width="20px"
										height="20px"
										count={1}
										className="vinisto-font-18"
										style={{
											maxWidth: '100%',
										}}
									/>
									<Skeleton
										width="20px"
										height="20px"
										count={1}
										className="vinisto-font-18"
										style={{
											maxWidth: '100%',
										}}
									/>
									<Skeleton
										width="20px"
										height="20px"
										count={1}
										className="vinisto-font-18"
										style={{
											maxWidth: '100%',
										}}
									/>
								</div>
							</div>
							<p className="mb-0 mt-2 vinisto-font-18">
								<Skeleton
									width="550px"
									height="16px"
									count={1}
									className="vinisto-font-18"
									style={{
										maxWidth: '100%',
									}}
								/>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-card">
							<Skeleton
								width="245px"
								height="25px"
								count={1}
								className="vinisto-card__heading"
								style={{
									maxWidth: '100%',
								}}
							/>
							<Skeleton
								width="490px"
								height="16px"
								count={1}
								className="mb-0 mt-2 vinisto-font-18"
								style={{
									maxWidth: '100%',
								}}
							/>
							<Skeleton
								width="400px"
								height="16px"
								count={1}
								className="mb-0 vinisto-font-18"
								style={{
									maxWidth: '100%',
								}}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-card">
							<Skeleton
								width="245px"
								height="25px"
								count={1}
								className="vinisto-card__heading"
								style={{
									maxWidth: '100%',
								}}
							/>
							<Skeleton
								width="950px"
								height="16px"
								count={1}
								className="mb-0 mt-2 vinisto-font-18"
								style={{
									maxWidth: '100%',
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Loading;
