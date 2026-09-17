import NextLink from 'next/link';

import { ParametersProps } from './interfaces';
import styles from './styles.module.css';

const Parameters = ({ heading, params }: ParametersProps) => {
	return (
		<div>
			{heading && <p className={styles.heading}>{heading}</p>}
			<div>
				{params.map((param, index) => (
					<div
						key={'laparm' + index}
						className={styles.param}
					>
						<span className={styles.paramName}>{param.name}</span>
						{param.valueLink ? (
							<NextLink
								href={param.valueLink}
								className={styles.paramValueLink}
							>
								{param.value}
							</NextLink>
						) : (
							<span className={styles.paramValue}>{param.value}</span>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Parameters;
