import { useContext } from 'react';
import cx from 'classnames';
import { ModalContext } from 'Components/Modal/context';
import ImageLocal from 'Components/View/ImageLocal';
import { LocalizationContext } from 'Services/LocalizationService';
import NextLink from 'next/link';
import { LOGIN_MODAL, SAFE_REOPEN_TIMEOUT } from 'Components/Modal/constants';
import { useRouter } from 'next/navigation';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import styles from './styles.module.css';

const JoinVinistoPlusModal = () => {
	const { handleOpenModal, handleCloseModal } = useContext(ModalContext);
	const { isLoggedIn } = useContext(AuthenticationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const router = useRouter();

	const handleLoginOrRegister = () => {
		router.push(
			`/${t({ id: 'routes.user-section.route' })}/${t({
				id: 'routes.user-section.vinistoplus.route',
			})}`
		);
	};

	return (
		<>
			<div className={styles.imgWrap}>
				<ImageLocal fileName={'vinisto_plus.svg'} />
			</div>
			<div className={styles.heading}>
				{t({ id: 'vinistoPlus.join.heading' })}
			</div>
			<ol className={styles.steps}>
				<li>
					<span className={styles.stepNumber}>1</span>
					<span className={cx(styles.stepText, styles.bold)}>
						{t(
							{ id: 'vinistoPlus.join.step1' },
							{
								vinisto: (
									<span
										key="vinisto"
										className={styles.green}
									>
										vinisto
									</span>
								),
							}
						)}
					</span>
				</li>
				<li>
					<span className={styles.stepNumber}>2</span>
					<span className={styles.stepText}>
						{t(
							{ id: 'vinistoPlus.join.step2' },
							{
								activate: (
									<span
										className={styles.bold}
										key="activate"
									>
										{t({ id: 'vinistoPlus.join.step2.activate' })}
									</span>
								),
								vinistoplus: (
									<span
										className={styles.wine}
										key="vinistoplus"
									>
										{t({ id: 'vinistoPlus.join.vinistoplus' })}
									</span>
								),
							}
						)}
					</span>
				</li>
				<li>
					<span className={styles.stepNumber}>3</span>
					<span className={styles.stepText}>
						{t(
							{ id: 'vinistoPlus.join.step3' },
							{
								done: (
									<span className={styles.bold}>
										{t({ id: 'vinistoPlus.join.step3.done' })}
									</span>
								),
								vinistoplus: (
									<span className={styles.wine}>
										{t({ id: 'vinistoPlus.join.vinistoplus' })}
									</span>
								),
							}
						)}
					</span>
				</li>
			</ol>
			<div className={styles.buttons}>
				<button
					className={styles.buttonClose}
					onClick={() => handleCloseModal()}
				>
					{t({ id: 'vinistoPlus.join.close' })}
				</button>
				{isLoggedIn ? (
					<NextLink
						className={styles.buttonLogin}
						href={`/${t({
							id: 'routes.user-section.route',
						})}/${t({
							id: 'routes.user-section.vinistoplus.route',
						})}`}
						onClick={() => handleCloseModal()}
					>
						{t({ id: 'vinistoPlus.join.becomeMember' })}
					</NextLink>
				) : (
					<button
						className={styles.buttonLogin}
						onClick={() =>
							setTimeout(
								() =>
									handleOpenModal(LOGIN_MODAL, {
										onLogin: handleLoginOrRegister,
										onRegister: handleLoginOrRegister,
									}),
								SAFE_REOPEN_TIMEOUT
							)
						}
					>
						{t({ id: 'vinistoPlus.join.login' })}
					</button>
				)}
			</div>
			<NextLink
				className={styles.detailsLink}
				href={'/vinistoplus'}
				onClick={() => handleCloseModal()}
			>
				{t({ id: 'vinistoPlus.join.details' })}
			</NextLink>
		</>
	);
};

export default JoinVinistoPlusModal;
