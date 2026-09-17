import useFormatMessage from 'Hooks/useFormatMessage';

export const getHoursRange = (
	config: (string | number)[],
	t: ReturnType<typeof useFormatMessage>
) => {
	const [openingHoursStart, openingHoursEnd] = config;
	return (
		<>
			{t(
				{ id: 'footer.hoursRange' },
				{
					0: openingHoursStart,
					1: openingHoursEnd,
				}
			)}
		</>
	);
};

export const getDaysRange = (
	config: string[],
	t: ReturnType<typeof useFormatMessage>
) => {
	const [openingDaysStart, openingDaysEnd] = config;
	return (
		<>
			{t(
				{ id: 'footer.daysRange' },
				{
					0: <>{t({ id: openingDaysStart })}</>,
					1: <>{t({ id: openingDaysEnd })}</>,
				}
			)}
		</>
	);
};
