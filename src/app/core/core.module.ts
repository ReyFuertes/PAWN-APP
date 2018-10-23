import { NgModule } from "@angular/core";
import { InputComponent } from "./page-components/input/input.component";
import { TextareaComponent } from "./page-components/textarea/textarea.component";
import { TableModule } from "primeng/table";
import { PaginatorModule } from "primeng/paginator";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [InputComponent, TextareaComponent],
  imports: [CommonModule, TableModule, PaginatorModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, TextareaComponent, TableModule, PaginatorModule],
  providers: []
})
export class CoreModule {}
