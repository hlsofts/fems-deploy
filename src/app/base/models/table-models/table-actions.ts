import { TemplateRef } from "@angular/core";

export class TableActions {
    name?: string;
    iconTemplateRef?: TemplateRef<any>;
    callBack?: any;
    isShow?: boolean;
    buttonType?: 'primary' | 'default' | 'dashed' | 'danger' | 'link';
    type?: 'single' | 'multiple';
    subActions?: TableActions[];
}
