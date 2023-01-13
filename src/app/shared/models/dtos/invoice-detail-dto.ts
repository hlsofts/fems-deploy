import { BaseDto } from "@app/base/models/dtos/base-dto";
import { InvoiceStateEnum } from "../enums/invoice-state-enum.enums";

export class InvoiceDetailDto extends BaseDto {
    invoiceId: number;
    content: string;
    amount: number;
    state: InvoiceStateEnum;
}
