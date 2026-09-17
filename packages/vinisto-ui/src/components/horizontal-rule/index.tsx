import cx from 'classnames';

import styles from './styles.module.css';

interface HorizontalRuleProps extends React.HTMLProps<HTMLHRElement> {}

const HorizontalRule = (props: HorizontalRuleProps) => {
	return (
		<hr
			{...props}
			className={cx(styles.component, props.className && props.className)}
		/>
	);
};

export default HorizontalRule;
