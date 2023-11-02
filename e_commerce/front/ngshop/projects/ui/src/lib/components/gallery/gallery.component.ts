import { Component ,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {

  selectedImageUrl: string ;

  @Input() images: string[];
  constructor(){}

  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImageUrl = this.images[0];
    }
  }

  changeSelectedImage(image: string) {
    this.selectedImageUrl = image;
  }

  get hasImages() {
    return this.images?.length > 0;
  }
}
