import LinkWidgetList from 'Components/link-widget';
import useSectionLinkWidgetsQuery from 'Hooks/use-section-link-widgets-query';
import { Allowed_Sections } from 'vinisto_api_client/src/domain/link-widget/enums';

interface LinkWidgetProps {
	className?: string;
	itemClassName?: string;
	section: Allowed_Sections;
	widgetLimit?: number;
	container?: boolean;
}

const LinkWidget = ({
	section,
	className,
	itemClassName,
	widgetLimit,
}: LinkWidgetProps) => {
	const { query, filteredLinks } = useSectionLinkWidgetsQuery(
		section,
		undefined,
		widgetLimit
	);

	return (
		<LinkWidgetList
			className={className}
			itemClassName={itemClassName}
			isLoading={query.isLoading}
			linkWidgets={filteredLinks?.map((link) => ({
				id: link.id,
				name: link.name,
				imageLocator: link.imageLocator,
				to: link.url,
				type: link.type,
			}))}
		/>
	);
};

export default LinkWidget;
