import linkWidgetApi from 'vinisto_api_client/src/link-widget-service';
import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { useNavigate } from 'react-router-dom';
import LinkWidgetPreview from 'Components/LinkWidgetPreview';
import { BiPlus } from 'react-icons/bi';
import ActionButton from 'Components/AdminDetail/Components/ActionButton';

import LinkWidgetAdapter from '@/domain/link-widget/adapter';

const LinkWidgetList = ({ categoryUrl }: { categoryUrl: string }) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const navigate = useNavigate();

	const { fromApi } = useMemo(() => new LinkWidgetAdapter(), []);

	const linkWidgetListQuery = useQuery(
		['linkWidgetList', `/kategorie/${categoryUrl}|CATEGORY`],
		() =>
			linkWidgetApi
				.linksList({ PathId: `/kategorie/${categoryUrl}|CATEGORY` })
				.then((response) => response.data.map(fromApi))
	);

	return (
		<div className="py-3">
			<h2 className="category-detail__heading">
				{t({ id: 'admin.sideBar.linkWidgetList' })}
			</h2>

			<LinkWidgetPreview data={linkWidgetListQuery.data} />
			<ActionButton
				onClick={() =>
					navigate(`/link-widget-detail${`/kategorie/${categoryUrl}|CATEGORY`}`)
				}
				label={'admin.linkWidget.create.title'}
				icon={BiPlus}
			/>
		</div>
	);
};

export default LinkWidgetList;
