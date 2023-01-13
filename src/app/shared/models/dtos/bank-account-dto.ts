import { BaseDto } from "@app/base/models/dtos/base-dto";

export class BankAccountDto extends BaseDto {
    bankId: number;
    name: string;
    code: string;
    number: string;
    branch: string;
    balance: string;
    holders: string;

    constructor() {
        super();
    }
}