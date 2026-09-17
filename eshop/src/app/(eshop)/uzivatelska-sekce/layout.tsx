import React from 'react';

const UserSectionLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<section id="content-wrapper">
			<div className="container mt-0">{children}</div>
		</section>
	);
};

export default UserSectionLayout;
