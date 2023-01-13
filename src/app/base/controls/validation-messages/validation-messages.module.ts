import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';

@NgModule({
    declarations: [
        ValidationMessagesComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        ValidationMessagesComponent
    ]
})
export class ValidationMessagesModule { }
