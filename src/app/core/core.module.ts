import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InputComponent } from './page-components/input/input.component';
import { TextareaComponent } from './page-components/textarea/textarea.component';

@NgModule({
  declarations: [
    InputComponent,
    TextareaComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [ InputComponent, TextareaComponent ],
  providers: []
})
export class CoreModule { }
