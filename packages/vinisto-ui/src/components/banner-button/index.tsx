import cx from 'classnames';
import { VinistoHelperDllEnumsSliderCarouselButtonStyle } from 'vinisto_api_client/src/api-types/cms-api';

import styles from './styles.module.css';

interface BannerButtonProps {
	className?: string;
	buttonText?: string | null;
	buttonStyle: VinistoHelperDllEnumsSliderCarouselButtonStyle | null;
	isHovered?: boolean;
}

const BannerButton = ({
	className,
	buttonText,
	buttonStyle,
	isHovered = false,
}: BannerButtonProps) => {
	if (!buttonText) return null;

	return (
		<span
			className={cx(
				styles.cta,
				styles[
					buttonStyle ?? VinistoHelperDllEnumsSliderCarouselButtonStyle.Green
				],
				{
					[styles.hovered]: isHovered,
				},
				className
			)}
		>
			{buttonText}
		</span>
	);
};

export default BannerButton;
