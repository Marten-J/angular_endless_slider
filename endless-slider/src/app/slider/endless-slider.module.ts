import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndlessSliderDirective } from './endless-slider.directive';
import { EndlessSliderItemDirective } from './endless-slider-item.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    EndlessSliderDirective,
    EndlessSliderItemDirective
  ],
  exports: [
    EndlessSliderDirective,
    EndlessSliderItemDirective
  ]
})
export class EndlessSliderModule { }