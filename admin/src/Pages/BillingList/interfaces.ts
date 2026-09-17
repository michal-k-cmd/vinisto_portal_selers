import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { Billing } from 'Services/OrderService/interfaces';

export interface BillingListTableRow extends IPageListTableRow, Billing {}
