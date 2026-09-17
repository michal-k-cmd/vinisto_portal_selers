import { Fragment } from 'react';
import { CNav } from '@coreui/react';
import cx from 'classnames';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { TopBarProps } from './interfaces';

import './styles.css';

const TopBar = ({ items, buttons, className }: TopBarProps) => {
	return (
		<CNav
			component="nav"
			className={cx('topbar', className)}
		>
			<dl className="topbar-list">
				{items.map(({ value, label, className }, key) => (
					<Fragment key={`topbar-item-${key}`}>
						<dt>{label}:</dt>
						<dd className={className}>{value}</dd>
					</Fragment>
				))}
			</dl>
			<div className="d-flex gap-2 justify-content-end align-items-center">
				{buttons.map(({ label, to, onClick, className }, index) =>
					to ? (
						<Link
							to={to}
							className={cx('btn btn-primary', className)}
							key={index}
						>
							{label}
						</Link>
					) : (
						<Button
							onClick={onClick}
							className={className}
							key={index}
						>
							{label}
						</Button>
					)
				)}
			</div>
		</CNav>
	);
};

export default TopBar;
