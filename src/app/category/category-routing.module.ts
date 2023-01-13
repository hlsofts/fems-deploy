import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BankAccountComponent } from './bank-account/bank-account.component';
import { BankComponent } from './bank/bank.component';
import { CodeDetailComponent } from './code-detail/code-detail.component';

const routes: Routes = [
    {
        path: 'bank',
        component: BankComponent,
    },
    {
        path: 'bank-account',
        component: BankAccountComponent,
    },
    {
        path: 'code-detail',
        component: CodeDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }
