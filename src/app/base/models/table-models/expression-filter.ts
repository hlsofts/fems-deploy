import { ModelFilter } from "./model-filter";

export class ExpressionFilter {
    modelFilter: ModelFilter;
    isOrClause: boolean | null;
    keyGroup: string;
}