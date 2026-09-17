import { BlogArticle } from 'Services/CmsService/Blog/interfaces';
import { MouseEventHandler } from 'react';

export interface BlogArticleButtonsProps {
	article: BlogArticle | null;
	onDiscard: MouseEventHandler;
	onToggleState: () => void;
	className?: string;
}
