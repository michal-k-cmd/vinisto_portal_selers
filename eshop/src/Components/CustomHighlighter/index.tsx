import Highlighter, { HighlighterProps } from 'react-highlight-words';

interface CustomHighlighterProps extends HighlighterProps {}

const highlightStyle = {
	backgroundColor: 'rgba(var(--vinisto-color-green), 0.15)',
	paddingInline: 0,
};

const CustomHighlighter = (props: CustomHighlighterProps) => {
	return (
		<Highlighter
			{...props}
			highlightStyle={highlightStyle}
		/>
	);
};

export default CustomHighlighter;
