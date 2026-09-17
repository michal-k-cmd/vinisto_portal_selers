import { useNavigate } from 'react-router-dom';

const useGoBackInHistory = () => {
	const navigate = useNavigate();

	return (step: number = -1) =>
		() => {
			navigate(step);
		};
};

export default useGoBackInHistory;
