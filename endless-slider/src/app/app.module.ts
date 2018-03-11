import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EndlessSliderModule } from './slider/endless-slider.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    EndlessSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
