import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import NextLink from 'next/link';

import styles from './styles.module.css';
import PriceGuaranteeBundleInfo from './PriceGuaranteeBundleInfo';
import GuaranteeForm from './GuaranteeForm';

const GuaranteePriceModal = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { modalData, handleCloseModal } = useContext(ModalContext);

	const { bundle } = modalData || {};

	return (
		<div className={styles.modal}>
			<div className={styles.wrap}>
				<p className={styles.heading}>
					{t({ id: 'bundle.priceGuarantee.guaranteeHeading' })}
				</p>
				<p className={styles.text}>
					{t(
						{
							id: 'bundle.priceGuarantee.guaranteeText',
						},
						{
							subtext: (
								<strong key="subtext">
									{t({
										id: 'bundle.priceGuarantee.guaranteeText.subtext',
									})}
								</strong>
							),
						}
					)}
				</p>
				<PriceGuaranteeBundleInfo bundle={bundle} />
			</div>
			<div className={styles.formWrap}>
				<p className={cx(styles.heading, styles.green)}>
					{t({ id: 'bundle.priceGuarantee.betterPriceHeading' })}
				</p>
				<p className={styles.text}>
					{t(
						{
							id: 'bundle.priceGuarantee.betterPriceText',
						},
						{
							link: (
								<NextLink
									href="/garance-nejlepsi-ceny"
									className={styles.moreLink}
									onClick={() => handleCloseModal()}
									key="link"
								>
									{t({
										id: 'bundle.priceGuarantee.betterPriceText.link',
									})}
								</NextLink>
							),
						}
					)}
				</p>
				<GuaranteeForm bundle={bundle} />
			</div>
		</div>
	);
};

export default GuaranteePriceModal;
