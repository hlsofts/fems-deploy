export class TableColumns {
    public field: string;
    public fieldDisplay?: string;
    public header?: string;
    public dataType: DataType;
    public matchMode?: MatchMode;
    public isFilter?: boolean;
    public isSort: boolean;
    public sortPriority: number;
    public width?: string;
    public isSetWidthAbsolute?: boolean; // set width
    public isSummary?: boolean;
    public isShow?: boolean;
    public exponent?: string; // Số thập phân sau dấu phẩy.
    public momentFormatInput?: string;
    public momentFormatOutput?: string;
    public class?: string;
    public isBold?: boolean;
    public fontSize?: number;
    public align?: string = 'left';

    render?: any;
    callBack?: any;
}

export enum MatchMode {
    startsWith = 'startsWith',
    contains = 'contains',
    endsWith = 'endsWith',
    equals = 'equals',
    notEquals = 'notEquals',
    in = 'in',
    lt = 'lt',
    lte = 'lte',
    gt = 'gt',
    gte = 'gte',
}

export enum DataType {
    number = 'number',
    text = 'text',
    boolean = 'boolean',
    date = 'date',
    datetime = 'datetime',
    render = 'render',
    action = 'action',
}
