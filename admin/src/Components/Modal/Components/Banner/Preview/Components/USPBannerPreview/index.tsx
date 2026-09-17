import { LocalizationContext } from 'Services/LocalizationService';
import { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { POSITION } from 'Services/Banner/constants';

import { BannerFormValues } from '../../../interfaces';

import styles from './styles.module.css';

const USPBannerPreview = ({
	imageObject,
	values,
	position,
}: {
	imageObject: string | null;
	values: BannerFormValues;
	position: POSITION;
}) => {
	const localitionContext = useContext(LocalizationContext);
	const t = localitionContext.useFormatMessage();

	const ParentComponent = ({
		children,
		...props
	}: {
		children: ReactNode;
		className?: string;
		props?: any;
	}) => {
		if (!values.url) return <div {...props}>{children}</div>;
		if (values.url?.match(/^https?:\/\//) === null)
			return (
				<Link
					to={values.url}
					className={styles.link}
					{...props}
				>
					{children}
				</Link>
			);
		return (
			<a
				href={values.url}
				{...props}
			>
				{children}
			</a>
		);
	};

	return (
		<ParentComponent
			className={cx(styles.container, {
				[styles.productDetailUspBanner]:
					position === POSITION.PRODUCT_DETAIL_USP,
			})}
		>
			{imageObject !== null ? (
				<div className={styles.imageWrap}>
					<img
						src={imageObject}
						className={styles.image}
					/>
				</div>
			) : (
				<div className={styles.image}></div>
			)}

			<span
				className={styles.title}
				style={{ color: values.titleColor }}
			>
				{values?.title || t({ id: 'admin.modal.banner.title.label' })}
			</span>
			<span
				className={styles.subtitle}
				style={{ color: values.subtitleColor }}
			>
				{values?.subtitle || t({ id: 'admin.modal.banner.subtitle.label' })}
			</span>
		</ParentComponent>
	);
};

export default USPBannerPreview;
