'use client';

import { useContext } from 'react';
import { Accordion } from 'react-bootstrap';
import { DeviceServiceContext } from 'Services/DeviceService';
import type { FooterInfoColumn } from 'Components/Footer/interfaces';

import InfoColumn from './Components/InfoColumn';

const InfoColumns = ({ columns }: { columns: FooterInfoColumn[] }) => {
	const deviceContext = useContext(DeviceServiceContext);

	return (
		<div className="row footer-nav footer-accordions px-md-0 mt-0">
			{columns.map(({ id, title, links }, index) => (
				<div
					key={id}
					className="col-md-3 px-md-3 col-12 px-0"
				>
					{deviceContext.isMobile ? (
						<Accordion defaultActiveKey={[index == 2 ? '0' : '1']}>
							<Accordion.Item eventKey="0">
								<Accordion.Header>{title}</Accordion.Header>
								<Accordion.Body>
									<InfoColumn links={links} />
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
					) : (
						<>
							<h5>{title}</h5>
							<InfoColumn links={links} />
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default InfoColumns;
