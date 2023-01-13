import { BaseFilter } from "./base-filter";
import { TableColumns } from "../table-models/table-columns";
import { ExpressionFilter } from "../table-models/expression-filter";

export class BaseGetPagingFilter extends BaseFilter {
    maxResultCount: number;
    skipCount: number;
    sorting: string[];
    tableColumns: TableColumns[];
    filters: ExpressionFilter[];
    textSearch: string;
}
