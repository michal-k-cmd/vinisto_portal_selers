import styles from './styles.module.css';

type AdminBarProps = {
	templates: string[];
	selected: string | null;
	onChange: (file: string) => void;
	onCopyHtml: () => void;
};

const AdminBar = ({
	templates,
	selected,
	onChange,
	onCopyHtml,
}: AdminBarProps) => {
	return (
		<div className={styles.adminBar}>
			<span className={styles.title}>Emailové udělátko</span>

			<label className={styles.label}>
				<span className={styles.labelText}>Šablona:</span>
				<select
					className={styles.select}
					value={selected ?? ''}
					onChange={(e) => onChange(e.target.value)}
				>
					<option
						value=""
						disabled
					>
						Vyber šablonu...
					</option>
					{templates.map((t) => (
						<option
							key={t}
							value={t}
						>
							{t}
						</option>
					))}
				</select>
			</label>

			<button
				type="button"
				className={styles.copyButton}
				onClick={onCopyHtml}
			>
				Kopírovat HTML
			</button>

			<span className={styles.hint}>
				Úprava .template souboru v /dll/... způsobí automatický reload náhledu.
			</span>
		</div>
	);
};

export default AdminBar;
