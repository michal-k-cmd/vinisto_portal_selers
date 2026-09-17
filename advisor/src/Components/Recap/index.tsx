import { type SVGAttributes, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useWatch } from 'react-hook-form';
import { useSwipeable } from 'react-swipeable';
import {
	clearAllBodyScrollLocks,
	disableBodyScroll,
} from 'body-scroll-lock-upgrade';

import { dataKeys, formSteps } from '../Form/constants';
import { type TReadonlyOptions } from '../Form';
import { useStepContext } from '../../App/StepContext';
import { useLayoutContext } from '../../App/LayoutContext';

const {
	FOR_MYSELF_OR_PRESENT_TOGGLE,
	CHARACTER,
	PRESENT_RECIEVER,
	KIND,
	TYPE,
	COUNTRY_OF_ORIGIN,
} = dataKeys;

import styles from './style.module.css';

type TSvgProps = SVGAttributes<SVGAElement | SVGSVGElement>;

const ChevronDown = (props: TSvgProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		{...props}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M19.5 8.25l-7.5 7.5-7.5-7.5"
		/>
	</svg>
);

const Pencil = (props: TSvgProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 15 15"
		fill="currentColor"
		{...props}
	>
		<path d="m11.244 6.033.93.928c-.68.684-1.352 1.371-2.034 2.047-1.44 1.425-2.882 2.857-4.34 4.268a1.981 1.981 0 0 1-.769.454c-1.373.421-2.754.817-4.137 1.206-.735.207-1.037-.1-.83-.828q.614-2.175 1.257-4.334a.981.981 0 0 1 .234-.4q3.222-3.221 6.456-6.431a.506.506 0 0 1 .084-.055l.747.785c-.838.834-1.7 1.686-2.552 2.54Q4.45 8.051 2.616 9.895a1 1 0 0 0-.24.393c-.237.768-.44 1.546-.69 2.309-.1.309.135.4.265.56a.377.377 0 0 0 .465.158c.721-.232 1.455-.426 2.178-.654a1.089 1.089 0 0 0 .415-.272q3.023-3.011 6.035-6.035a1.684 1.684 0 0 0 .2-.32" />
		<path d="m9.448 4.452.931.975-6.361 6.472c-.1-.271-.12-.6-.3-.754s-.505-.151-.741-.21l6.471-6.483m.679-3.521c.448-.414.827-1.025 1.6-.918a1.58 1.58 0 0 1 .821.336c.732.676 1.43 1.39 2.119 2.11a1.309 1.309 0 0 1 .08 1.661c-.212.275-.462.521-.683.767L10.127.931M8.522 2.369l.84-.785 4.071 4.12-.816.774-4.1-4.109" />
	</svg>
);

const Recap = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [expandedHeight, setIsExpandedHeight] = useState<number>();
	const allFields = useWatch();
	const { setStep } = useStepContext();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const { headerRef, onResized } = useLayoutContext();

	useEffect(() => {
		const header = headerRef?.current;
		if (header) {
			setIsExpandedHeight(window.innerHeight - header.clientHeight);
		}
	}, [headerRef, onResized]);

	useEffect(() => {
		if (isExpanded) {
			disableBodyScroll(document.body);
		}
		return () => {
			clearAllBodyScrollLocks();
		};
	}, [isExpanded]);

	const handlers = useSwipeable({
		onSwipedUp: () => {
			setIsExpanded(false);
		},
		onSwipedDown: () => {
			setIsExpanded(true);
		},
	});

	const findDisplayValue = (field: keyof typeof formSteps) => {
		if (!Array.isArray(allFields[field])) {
			const needle = (formSteps[field].options as TReadonlyOptions).find(
				(option) => option.value === allFields[field]
			);

			if (needle) return needle.title;
		}

		if (allFields[field]) {
			const needles = (formSteps[field].options as TReadonlyOptions).filter(
				(option) => allFields[field].includes(option.value)
			);
			if (needles) return needles.map((needle) => needle.title).join(', ');
		}

		return null;
	};

	const findImage = (field: keyof typeof formSteps) => {
		if (!Array.isArray(allFields[field])) {
			const needle = (formSteps[field].options as TReadonlyOptions).find(
				(option) => option.value === allFields[field]
			);
			if (needle) return needle.image;
			return null;
		}

		if (allFields[field].length !== 1) return formSteps[field].multiValueImage;

		const needle = (formSteps[field].options as TReadonlyOptions).find(
			(option) => option.value === allFields[field][0]
		);

		if (needle) return needle.image;
		return null;
	};

	const handleExpand = () => {
		if (!(containerRef.current instanceof HTMLElement)) return;
		containerRef.current.style.height = `${
			(expandedHeight || 0) + window.scrollY
		}px`;
	};

	useEffect(() => {
		handleExpand();
	}, [onResized, expandedHeight]);

	return (
		<div
			className={classNames(styles.wrapper, {
				[styles.expanded]: isExpanded,
			})}
			style={{
				top: window.innerHeight - (expandedHeight || 0),
			}}
			{...handlers}
			ref={containerRef}
		>
			<ol
				onClick={(event) => {
					const listItem = (event.target as HTMLElement).closest('li');
					if (!listItem) return;
					setStep(Number(listItem.getAttribute('data-step')));
				}}
			>
				<li
					data-step={0}
					style={{
						backgroundImage: `url("${findImage(
							FOR_MYSELF_OR_PRESENT_TOGGLE
						)}")`,
						backgroundSize: '33%',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center right',
					}}
				>
					<div className={styles.question_answer_wrapper}>
						<span className={styles.question}>
							Hledám …<Pencil className={styles.pencil} />
						</span>
						<span className={styles.answer}>
							{findDisplayValue(FOR_MYSELF_OR_PRESENT_TOGGLE)?.slice(1)}
						</span>
					</div>
				</li>
				{allFields[FOR_MYSELF_OR_PRESENT_TOGGLE] === 'forMyself' && (
					<li
						data-step={1}
						style={{
							backgroundImage: `url("${findImage(CHARACTER)}")`,
							backgroundSize: '33%',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center right',
						}}
					>
						<div className={styles.question_answer_wrapper}>
							<span className={styles.question}>
								Jaký charakter vína hledáte?
								<Pencil className={styles.pencil} />
							</span>
							<span className={styles.answer}>
								{findDisplayValue(CHARACTER)}
							</span>
						</div>
					</li>
				)}
				{allFields[FOR_MYSELF_OR_PRESENT_TOGGLE] === 'present' && (
					<li
						data-step={1}
						style={{
							backgroundImage: `url("${findImage(PRESENT_RECIEVER)}")`,
							backgroundSize: '33%',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center right',
						}}
					>
						<div className={styles.question_answer_wrapper}>
							<span className={styles.question}>
								Jaký charakter vína hledáte?
								<Pencil className={styles.pencil} />
							</span>
							<span className={styles.answer}>
								{findDisplayValue(PRESENT_RECIEVER)}
							</span>
						</div>
					</li>
				)}

				<li
					data-step={2}
					style={{
						backgroundImage: `url("${findImage(KIND)}")`,
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center right',
					}}
				>
					<div className={styles.question_answer_wrapper}>
						<span className={styles.question}>
							Jaký druh vína máte nejraději?
							<Pencil className={styles.pencil} />
						</span>
						<span className={styles.answer}>
							{findDisplayValue(KIND) || (
								<span className={styles.placeholder_text}>(…)</span>
							)}
						</span>
					</div>
				</li>
				<li
					data-step={3}
					style={{
						backgroundImage: `url("${findImage(TYPE)}")`,
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center right',
					}}
				>
					<div className={styles.question_answer_wrapper}>
						<span className={styles.question}>
							Dáváte přednost sušší, nebo sladší chuti?
							<Pencil className={styles.pencil} />
						</span>

						<span className={styles.answer}>
							{findDisplayValue(TYPE) || (
								<span className={styles.placeholder_text}>(…)</span>
							)}
						</span>
					</div>
				</li>
				<li
					data-step={4}
					style={{
						backgroundImage: `url("${findImage(COUNTRY_OF_ORIGIN)}")`,
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center right',
					}}
				>
					<div className={styles.question_answer_wrapper}>
						<span className={styles.question}>
							Preferujete česká, nebo zahraniční?
							<Pencil className={styles.pencil} />
						</span>
						<span className={styles.answer}>
							{findDisplayValue(COUNTRY_OF_ORIGIN) || (
								<span className={styles.placeholder_text}>(…)</span>
							)}
						</span>
					</div>
				</li>
			</ol>
			<button
				className={styles.expander}
				onClick={() => {
					handleExpand();
					setIsExpanded(!isExpanded);
				}}
			>
				Upravit konfiguraci
				<ChevronDown className={styles.chevron} />
			</button>
		</div>
	);
};

export default Recap;
