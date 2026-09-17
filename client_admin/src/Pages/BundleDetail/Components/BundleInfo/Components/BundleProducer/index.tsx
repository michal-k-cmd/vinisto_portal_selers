import { TBundleProducerProps } from './interfaces';

const BundleProducer = ({ flag, name }: TBundleProducerProps) => {
	return (
		<>
			{flag}
			<span className="vinisto-wine__variety__text">{name}</span>
		</>
	);
};

export default BundleProducer;
