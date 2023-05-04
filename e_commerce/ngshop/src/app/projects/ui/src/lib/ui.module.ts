import { NgModule } from '@angular/core';
import { UiComponent } from './ui.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';



@NgModule({
  declarations: [
    UiComponent,
    BannerComponent,
    SliderComponent
  ],
  imports: [CommonModule, RouterModule
  ],
  exports: [
    UiComponent,
    BannerComponent,
    SliderComponent
  ]
})
export class UiModule { }
