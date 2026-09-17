import { Specification } from './schema';

import { specificationAdapter } from '../../index';

class DomainSpecification {
	private baseData: any;
	private domainData: Specification;

	constructor(data: any) {
		this.baseData = data;
		this.domainData = specificationAdapter.fromApi(data);
	}
}

export type { DomainSpecification };

export default DomainSpecification;
