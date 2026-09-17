import { YoutubeVideoProps } from './interfaces';
import styles from './styles.module.css';

const YoutubeVideo = ({ url }: YoutubeVideoProps) => {
	const transformUrl = (url: string) => {
		if (url.includes('youtube.com/watch?v=')) {
			let videoId = url.split('v=')[1];
			const ampersandPosition = videoId.indexOf('&');
			if (ampersandPosition !== -1) {
				videoId = videoId.substring(0, ampersandPosition);
			}
			return `https://www.youtube.com/embed/${videoId}`;
		} else if (url.includes('youtu.be/')) {
			const videoId = url.split('youtu.be/')[1];
			return `https://www.youtube.com/embed/${videoId}`;
		} else if (url.includes('youtube.com/embed/')) {
			return url;
		}
		return '';
	};

	const transformedUrl = transformUrl(url);
	return (
		<iframe
			width="700"
			height="400"
			src={transformedUrl}
			title="YouTube video player"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerPolicy="strict-origin-when-cross-origin"
			allowFullScreen
			className={styles.youtubeVideo}
		></iframe>
	);
};

export default YoutubeVideo;
