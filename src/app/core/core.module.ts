import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InputComponent } from './page-components/input/input.component';
import { TextareaComponent } from './page-components/textarea/textarea.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    InputComponent,
    TextareaComponent,
  ],
  imports: [
    BrowserModule,
    TableModule,
    PaginatorModule,
  ],
  exports: [ InputComponent, TextareaComponent, TableModule, PaginatorModule ],
  providers: []
})
export class CoreModule { }
