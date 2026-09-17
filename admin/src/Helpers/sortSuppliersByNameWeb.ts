const sortSuppliersByNameWeb = (
	a: { nameWeb: string },
	b: { nameWeb: string }
) => {
	const nameA = a.nameWeb.toUpperCase();
	const nameB = b.nameWeb.toUpperCase();

	return nameA.localeCompare(nameB);
};

export default sortSuppliersByNameWeb;
