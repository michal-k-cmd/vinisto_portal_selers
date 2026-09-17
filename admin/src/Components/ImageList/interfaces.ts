import Image from '@/domain/image';

export interface ImageListProps {
	images?: Image[];
	handleOnDelete: (id: string) => () => void;
	handleOnSetMain: (id: string) => () => void;
}
