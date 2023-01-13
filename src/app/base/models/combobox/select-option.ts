export interface ISelectOption<T = any> {
    value: any;
    displayText: string;
    description?: string;
    data?: T;
}

export class SelectOption<T = any> implements ISelectOption {
    value: any;
    displayText: string;
    description?: string;
    data?: T;

    constructor(value: any, displayText: string, description: string, data: T) {
        this.value = value;
        this.displayText = displayText;
        this.description = description;
        this.data = data;
    }
}
