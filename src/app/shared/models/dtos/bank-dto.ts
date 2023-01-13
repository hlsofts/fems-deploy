import { BaseDto } from "@app/base/models/dtos/base-dto";

export class BankDto extends BaseDto {
    id: number;
    code: string;
    name: string;

    constructor() {
        super();
    }
}
