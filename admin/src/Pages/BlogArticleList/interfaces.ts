import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { BlogArticle } from 'Services/CmsService/Blog/interfaces';

export interface ArticleListTableRow extends IPageListTableRow, BlogArticle {}
