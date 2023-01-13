import { BaseGetPagingFilter } from './../../../../base/models/filters/base-get-paging-filter';
export class InvoiceDetailFilter extends BaseGetPagingFilter {
    public invoiceId: number;
    constructor() {
        super();
        this.invoiceId = 0;
    }
}
