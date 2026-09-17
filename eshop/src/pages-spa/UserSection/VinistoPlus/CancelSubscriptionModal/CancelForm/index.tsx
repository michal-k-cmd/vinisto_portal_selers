import { useContext, useEffect, useMemo, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Checkbox from 'Components/Forms/Components/Checkbox';

import styles from './styles.module.css';

interface CancelFormProps {
	setEmailBody: (body: string) => void;
}

type ReasonKey =
	| 'underused'
	| 'noPartnerDiscounts'
	| 'notAttractivePrices'
	| 'tooExpensive'
	| 'noGifts'
	| 'noTastings';

const escapeHtml = (input: string) =>
	input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const CancelForm = ({ setEmailBody }: CancelFormProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const REASONS = useMemo<{ key: ReasonKey; label: string }[]>(
		() => [
			{
				key: 'underused',
				label: `${t({ id: 'modal.cancelVinistoPlus.reason1' })}`,
			},
			{
				key: 'noPartnerDiscounts',
				label: `${t({ id: 'modal.cancelVinistoPlus.reason2' })}`,
			},
			{
				key: 'notAttractivePrices',
				label: `${t({ id: 'modal.cancelVinistoPlus.reason3' })}`,
			},
			{
				key: 'tooExpensive',
				label: `${t({ id: 'modal.cancelVinistoPlus.reason4' })}`,
			},
			{
				key: 'noGifts',
				label: `${t({ id: 'modal.cancelVinistoPlus.reason5' })}`,
			},
			{
				key: 'noTastings',
				label: `${t({ id: 'modal.cancelVinistoPlus.reason6' })}`,
			},
		],
		[t]
	);

	const [checked, setChecked] = useState<Record<ReasonKey, boolean>>({
		underused: false,
		noPartnerDiscounts: false,
		notAttractivePrices: false,
		tooExpensive: false,
		noGifts: false,
		noTastings: false,
	});

	const [comment, setComment] = useState<string>('');

	const handleToggle =
		(key: ReasonKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setChecked((prev) => ({ ...prev, [key]: e.target.checked }));
		};

	useEffect(() => {
		const selected = REASONS.filter((r) => checked[r.key]).map((r) => r.label);
		const trimmedComment = comment.trim();
		const hasAny = selected.length > 0 || trimmedComment.length > 0;

		if (!hasAny) {
			setEmailBody('');
			return;
		}

		const htmlParts: string[] = [];

		if (selected.length > 0) {
			const items = selected
				.map((label) => `<li>${escapeHtml(label)}</li>`)
				.join('');
			htmlParts.push('<h2>Důvody zrušení:</h2>');
			htmlParts.push(`<ul>${items}</ul>`);
		}

		if (trimmedComment) {
			htmlParts.push('<p><strong>Komentář:</strong></p>');
			htmlParts.push(
				`<p>${escapeHtml(trimmedComment).replace(/\n/g, '<br />')}</p>`
			);
		}

		setEmailBody(htmlParts.join(''));
	}, [REASONS, checked, comment, setEmailBody]);

	return (
		<div className={styles.form}>
			{REASONS.map((r) => (
				<div key={r.key}>
					<Checkbox
						type="checkbox"
						id={`reason-${r.key}`}
						checked={checked[r.key]}
						onChange={handleToggle(r.key)}
						className={styles.checkbox}
					>
						<span className={styles.label}>{r.label}</span>
					</Checkbox>
				</div>
			))}

			<label
				htmlFor="cancel-comment"
				className={styles.commentLabel}
			>
				{t({ id: 'modal.cancelVinistoPlus.comment' })}
			</label>
			<textarea
				id="cancel-comment"
				rows={4}
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				className={styles.comment}
			/>
		</div>
	);
};

export default CancelForm;
