export class BaseDto {
    id: number;
    tenantId: number;
    isDeleted: boolean;
    constructor() {
        this.id = 0;
        this.isDeleted = false;
    }
}
