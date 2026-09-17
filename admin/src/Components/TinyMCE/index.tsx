import { Editor as TinyMCEEditor } from 'tinymce';
import { useQuery } from '@tanstack/react-query';
import { Editor } from '@tinymce/tinymce-react';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import CmsImageTagService from 'Services/CmsService/ImageTag';
import CmsImageService from 'Services/CmsService/Image';
import { ModalContext } from 'Components/Modal/context';
import { CMS_IMAGE_LIST } from 'Components/Modal/constants';
import { CmsImageTag } from 'Services/CmsService/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';

import {
	tinymce_content_style as content_style,
	tinymce_plugins as plugins,
	tinymce_style_formats as style_formats,
	TINYMCE_API_KEY,
	tinymce_toolbar as toolbar,
} from './constants';
import { TinyMCEProps } from './interfaces';

//TODO: clean up this file, clean up data fetching - data fetching for ImageListModal could be done inside the modal itself. The logic in useEffect is duplicate of BlogArticleDetail/loader
const TinyMCE = forwardRef<TinyMCEEditor, TinyMCEProps>(
	({ onEditorChange, initialValue, myValue }, ref) => {
		const { loginHash } = useContext(AuthenticationContext).vinistoUser;
		const modalContext = useContext(ModalContext);
		const t = useContext(LocalizationContext).useFormatMessage();

		const params = [
			{
				key: 'UserLoginHash',
				value: loginHash,
			},
			{
				key: 'Limit',
				value: 0,
			},
		];

		const { data } = useQuery(['CmsImages', loginHash], () =>
			CmsImageService.getList(params)
		);

		const [cmsImageTags, setCmsImageTags] = useState<CmsImageTag[]>([]);

		useEffect(() => {
			const getCmsImageTagList = async (
				userLoginHash: string
			): Promise<CmsImageTag[]> => {
				const response = await CmsImageTagService.getList([
					{
						key: 'UserLoginHash',
						value: userLoginHash,
					},
					{
						key: 'Limit',
						value: 0,
					},
				]);
				return response ?? [];
			};

			getCmsImageTagList(loginHash).then((data) => {
				setCmsImageTags(data);
			});
		}, [loginHash]);

		const image_list = data?.images?.map((image) => {
			const imageUrl = image.urls?.thumb_1000;

			return {
				title: image.name,
				value: imageUrl,
			};
		});

		return (
			<Editor
				tinymceScriptSrc="/tinymce/tinymce.min.js"
				apiKey={TINYMCE_API_KEY}
				onInit={(_evt: any, editor: TinyMCEEditor | null) => {
					if (ref && 'current' in ref) {
						ref.current = editor;
					}
				}}
				onEditorChange={onEditorChange}
				initialValue={initialValue}
				value={myValue}
				init={{
					// @ts-ignore
					height: 500,
					menubar: true,
					plugins,
					toolbar,
					content_style,
					style_formats,
					image_list,
					paste_data_images: false,
					setup: (editor: TinyMCEEditor) => {
						editor.ui.registry.addButton('customInsertImage', {
							text: t({ id: 'cms.image.insert' })?.toString(),
							onAction: () => {
								modalContext.handleOpenModal(CMS_IMAGE_LIST, {
									cmsImageTags,
									onSelect: (
										imageUrl: string,
										imageDescription: string,
										imageAltText: string
									) => {
										editor.insertContent(
											`<figure><img src="${imageUrl}" alt="${
												imageAltText !== null ? imageAltText : ''
											}" /><figcaption>${
												imageDescription !== null ? imageDescription : ''
											}</figcaption></figure><br/>`
										);
									},
								});
							},
						});
					},
				}}
			/>
		);
	}
);

TinyMCE.displayName = 'TinyMCE';

export default TinyMCE;
