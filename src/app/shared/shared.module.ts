import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterTableComponent } from "./filter-table/filter-table.component";
import { DialogModule } from "primeng/dialog";
import { BaseModalComponent } from "./modal/base-modal.component";
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { CalendarModule } from "primeng/calendar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputNumberDirective } from "./directive/input-number.directive";
import { DropdownSelectComponent } from "./dropdown/dropdown.component";
import { DropdownModule } from "primeng/dropdown";
import {RadioButtonModule} from 'primeng/radiobutton';
import { PrintPreviewComponent } from "./print-preview/print-preview.component";

@NgModule({
  declarations: [
    FilterTableComponent,
    BaseModalComponent,
    DatepickerComponent,
    InputNumberDirective,
    DropdownSelectComponent,
    PrintPreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule
  ],
  exports: [
    FilterTableComponent,
    BaseModalComponent,
    DatepickerComponent,
    InputNumberDirective,
    DropdownSelectComponent,
    PrintPreviewComponent
  ],
  providers: []
})
export class SharedModule {}
