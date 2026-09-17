import styles from "./styles.module.css";

interface ChipProps {
  label: string;
  variant: "green" | "gray";
}

const Chip = ({ label, variant }: ChipProps) => {
  return (
    <span className={`${styles.label} ${styles[variant]}`}>{label}</span>
  );
};

export default Chip;
