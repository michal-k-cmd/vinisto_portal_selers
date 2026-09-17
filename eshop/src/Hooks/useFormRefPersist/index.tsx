import { useEffect } from 'react';

/**
 * Hook for saving react form hook values to given ref
 */
const useFormRefStore = (
	ref: Record<string, any>,
	{ watch }: { watch: () => any }
) => {
	const formValues = watch();
	useEffect(() => {
		ref.current = formValues;
	}, [JSON.stringify(formValues)]);
};

export default useFormRefStore;
