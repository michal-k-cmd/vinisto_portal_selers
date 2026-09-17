import { useContext, useEffect, useState } from 'react';
import { dayjsInstance } from 'Services/Date';
import { Button } from 'react-bootstrap';
import { LocalizationContext } from 'Services/LocalizationService';
import { Dayjs } from 'dayjs';
import LeftArrowIcon from 'Components/Icons/LeftArrow';

import styles from './styles.module.css';

interface CalendarControlsProps {
	timeFrom: number;
	timeTo: number;
	onDateChange: (timeFrom: number, timeTo: number) => void;
}

const CalendarControls = ({
	onDateChange,
	timeFrom,
	timeTo,
}: CalendarControlsProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const [isYearSelected, setIsYearSelected] = useState(false);
	const [selectedDate, setSelectedDate] = useState(dayjsInstance());

	useEffect(() => {
		let timeFrom, timeTo;
		if (isYearSelected) {
			timeFrom = selectedDate.startOf('year').unix();
			timeTo = selectedDate.endOf('year').unix();
		} else {
			timeFrom = selectedDate.startOf('month').unix();
			timeTo = selectedDate.endOf('month').unix();
		}
		onDateChange(timeFrom, timeTo);
	}, [selectedDate, onDateChange, isYearSelected]);

	const handlePrevMonth = () => {
		setSelectedDate((prev) => prev.subtract(1, 'month'));
		setIsYearSelected(false);
	};

	const handleNextMonth = () => {
		setSelectedDate((prev) => prev.add(1, 'month'));
		setIsYearSelected(false);
	};

	const handleThisYear = () => {
		const startOfYear = dayjsInstance().startOf('year');
		const endOfYear = dayjsInstance().endOf('year');

		setSelectedDate(startOfYear);
		onDateChange(startOfYear.unix(), endOfYear.unix());
		setIsYearSelected(true);
	};

	const handleThisMonth = () => {
		setSelectedDate(dayjsInstance());
		setIsYearSelected(false);
	};

	return (
		<div className={styles.calendar}>
			<div className={styles.monthControls}>
				<Button onClick={handlePrevMonth}>
					<LeftArrowIcon className={styles.leftArrow} />
				</Button>
				<Button
					disabled
					className={styles.monthButton}
				>
					{isWholeYearSelected(timeFrom, timeTo)
						? selectedDate.format('YYYY')
						: selectedDate.format('MMMM YYYY')}
				</Button>
				<Button
					onClick={handleNextMonth}
					disabled={isNextMonthDisabled(selectedDate)}
				>
					<LeftArrowIcon className={styles.rightArrow} />
				</Button>
			</div>
			<Button onClick={handleThisYear}>
				{t({ id: 'dashboard.DashBoardSales.thisYear' })}
			</Button>
			<Button onClick={handleThisMonth}>
				{t({ id: 'dashboard.DashBoardSales.thisMonth' })}
			</Button>
		</div>
	);
};

export default CalendarControls;

const isWholeYearSelected = (timeFrom: number, timeTo: number) => {
	const currentDate = dayjsInstance();
	const startOfYear = currentDate.startOf('year');
	const endOfYear = currentDate.endOf('year');

	return timeFrom === startOfYear.unix() && timeTo === endOfYear.unix();
};

const isNextMonthDisabled = (selectedDate: Dayjs) => {
	const now = dayjsInstance();
	const endOfCurrentMonth = now.endOf('month');

	return selectedDate.isSame(now, 'month') && now.isBefore(endOfCurrentMonth);
};
