import { Button } from 'react-bootstrap';
import { BiCheck } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { useB2bBasketContext } from '../context';

export const SetToWaitingToApprovalButton = () => {
	const { handleSetToWaitingForApproval } = useB2bBasketContext();

	return (
		<Button
			className="d-flex align-items-center justify-content-center gap-1 flex-grow-1"
			onClick={handleSetToWaitingForApproval}
		>
			<BiCheck />
			Odeslat ke schválení
		</Button>
	);
};

export const SetToWaitingToDirectorApprovalButton = () => {
	const { handleSetToWaitingForDirectorApproval } = useB2bBasketContext();

	return (
		<Button
			className="d-flex align-items-center justify-content-center gap-1 flex-grow-1"
			onClick={handleSetToWaitingForDirectorApproval}
		>
			<BiCheck />
			Odeslat ke schválení CSO
		</Button>
	);
};

export const ApproveButton = () => {
	const { handleClickApproveButton } = useB2bBasketContext();

	return (
		<Button
			className="d-flex align-items-center justify-content-center gap-1 flex-grow-1"
			onClick={handleClickApproveButton}
		>
			<BiCheck />
			Schválit
		</Button>
	);
};

export const ApproveConceptButton = () => {
	const { handleClickApproveConceptButton } = useB2bBasketContext();

	return (
		<Button
			className="d-flex align-items-center justify-content-center gap-1 flex-grow-1"
			onClick={handleClickApproveConceptButton}
		>
			<BiCheck />
			Schválit
		</Button>
	);
};

export const ApproveAndTakeOwnershipButton = () => {
	const { handleClickApproveAndTakeOwnershipButton } = useB2bBasketContext();

	return (
		<Button
			className="d-flex align-items-center justify-content-center gap-1 flex-grow-1"
			onClick={handleClickApproveAndTakeOwnershipButton}
		>
			<BiCheck />
			Schválit a převzít
		</Button>
	);
};

export const PreApproveButton = () => {
	const { handleClickPreApproveButton } = useB2bBasketContext();

	return (
		<Button
			variant="outline-primary"
			className="d-flex align-items-center justify-content-center gap-1 flex-grow-1"
			onClick={handleClickPreApproveButton}
		>
			<BiCheck />
			Předschválit
		</Button>
	);
};

export const PreApproveAndTakeOwnershipButton = () => {
	const { handleClickPreApproveAndTakeOwnershipButton } = useB2bBasketContext();

	return (
		<Button
			className="d-flex align-items-center justify-content-center gap-1 flex-grow-1"
			onClick={handleClickPreApproveAndTakeOwnershipButton}
		>
			<BiCheck />
			Předschválit a převzít
		</Button>
	);
};

export const RejectButton = () => {
	const { handleClickRejectButton } = useB2bBasketContext();

	return (
		<Button
			variant="outline-danger"
			onClick={handleClickRejectButton}
		>
			× Zamítnout
		</Button>
	);
};

export const FinishOrderButton = () => {
	const { basket, b2bCustomer } = useB2bBasketContext();

	return (
		<Link
			className="btn btn-primary"
			to={`/basket?requestedBasketId=${basket?.id}&customerId=${
				b2bCustomer?.id ?? null
			}`}
		>
			Dokončit objednávku →
		</Link>
	);
};

export const TakeOwnershipButton = () => {
	const { handleChangeOwnership } = useB2bBasketContext();

	return <Button onClick={handleChangeOwnership}>Převzít</Button>;
};

export const ReopenRejectedButton = () => {
	const { handleClickReopenButton } = useB2bBasketContext();
	return <Button onClick={handleClickReopenButton}>Znovu otevřít</Button>;
};

export const DetailLink = () => {
	const { basket, b2bCustomer } = useB2bBasketContext();

	return (
		<Link
			className="btn btn-outline-secondary"
			to={`/basket?requestedBasketId=${basket?.id}&customerId=${
				b2bCustomer?.id ?? null
			}`}
		>
			Detail →
		</Link>
	);
};
