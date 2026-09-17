import cx from 'classnames';

interface ServerSkeletonProps {
	height?: string;
	width?: string;
	cols?: number;
	className?: string;
}

const ServerSkeleton = ({
	height = 'auto',
	width,
	cols,
	className,
}: ServerSkeletonProps) => {
	return (
		<div className={cx('placeholder-glow', className)}>
			<div
				className={cx('placeholder', cols && `col-${cols}`)}
				style={{
					height: height,
					...(cols ? {} : { width: width }),
				}}
			></div>
		</div>
	);
};

export default ServerSkeleton;
