import { NgModule } from '@angular/core';
import { UiComponent } from './ui.component';
import { BannerComponent } from './banner/banner.component';
import {ButtonModule} from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';




@NgModule({
  declarations: [
    UiComponent,BannerComponent, GalleryComponent
  ],
  imports: [ ButtonModule,CommonModule],
  exports: [UiComponent,BannerComponent,GalleryComponent ]
})
export class UiModule { }
