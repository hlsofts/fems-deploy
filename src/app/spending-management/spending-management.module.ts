import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpendingManagementRoutingModule } from './spending-management-routing.module';
import { SpendingComponent } from './spending/spending.component';


@NgModule({
  declarations: [
    SpendingComponent
  ],
  imports: [
    CommonModule,
    SpendingManagementRoutingModule
  ]
})
export class SpendingManagementModule { }
