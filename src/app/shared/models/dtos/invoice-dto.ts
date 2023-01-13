import { StatusCodeEnums } from "@app/base/models/enums/status-code-enums.enums";
import { BaseDto } from "../../../base/models/dtos/base-dto";
import { InvoiceStateEnum } from "../enums/invoice-state-enum.enums";
import { InvoiceDetailDto } from "./invoice-detail-dto";

export class InvoiceDto extends BaseDto {
    codeDetailId: number;
    codeDetailName: string;
    code: string;
    name: string;
    sourceBankAccountId: number;
    sourceBankAccountName: string;
    destinationBankAccountId: number;
    destinationBankAccountName: string;
    totalAmount: number;
    invoiceDate: Date;
    note: string;
    state: number;
    stateName: string;
    listInvoiceDetailDto: InvoiceDetailDto[];

    constructor() {
        super();
        this.totalAmount = 0;
        this.state = InvoiceStateEnum.Draft;
        this.listInvoiceDetailDto = [];
    }
}