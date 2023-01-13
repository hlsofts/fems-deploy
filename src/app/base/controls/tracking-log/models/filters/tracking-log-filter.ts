import { BaseGetPagingFilter } from "../../../../models/filters/base-get-paging-filter";

export class TrackingLogFilter extends BaseGetPagingFilter {
    referenceId: number;
    moduleType: string;
}