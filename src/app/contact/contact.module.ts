import { ContactRoutingModule } from './contact.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
