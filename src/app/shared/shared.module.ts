import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterTableComponent } from "./filter-table/filter-table.component";
import {DialogModule} from 'primeng/dialog';
import { BaseModalComponent } from "./modal/base-modal.component";
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { CalendarModule } from "primeng/calendar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    FilterTableComponent, 
    BaseModalComponent,
    DatepickerComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CalendarModule, DialogModule],
  exports: [
    FilterTableComponent,
    BaseModalComponent,
    DatepickerComponent
  ],
  providers: []
})
export class SharedModule {}
