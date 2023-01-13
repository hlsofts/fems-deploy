export const UrlApiConfig = {
    Category: {
        Bank: {
            GetPaging: '/api/services/app/Bank/GetPaging',
            GetById: '/api/services/app/Bank/GetById?id=',
            Upsert: '/api/services/app/Bank/Upsert',
            Delete: '/api/services/app/Bank/Delete',
            ChangeActive: '/api/services/app/Bank/ChangeActive?active=',
        },
        BankAccount: {
            GetPaging: '/api/services/app/BankAccount/GetPaging',
            GetById: '/api/services/app/BankAccount/GetById?id=',
            Upsert: '/api/services/app/BankAccount/Upsert',
            Delete: '/api/services/app/BankAccount/Delete',
            ChangeActive: '/api/services/app/BankAccount/ChangeActive?active=',
        },
        CodeDetail: {
            GetPaging: '/api/services/app/CodeDetail/GetPaging',
            GetById: '/api/services/app/CodeDetail/GetById?id=',
            Upsert: '/api/services/app/CodeDetail/Upsert',
            Delete: '/api/services/app/CodeDetail/Delete',
            ChangeActive: '/api/services/app/CodeDetail/ChangeActive?active=',
            GetTypePaging: '/api/services/app/CodeDetail/GetTypePaging',
        },
    },
    Accountant: {
        Invoice: {
            GetGroupPaging: '/api/services/app/Invoice/GetGroupPaging',
        }
    }
}
