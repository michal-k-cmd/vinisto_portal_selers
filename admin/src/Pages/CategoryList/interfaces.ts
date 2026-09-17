import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { CategoryType } from 'Services/Category/interfaces';

export interface CategoryTableRow extends IPageListTableRow, CategoryType {}
