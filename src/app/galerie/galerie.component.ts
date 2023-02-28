import { Component } from '@angular/core';
import {ImageService} from "../shared/image.service";

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.scss']
})
export class GalerieComponent {

  webcamImage: any

  constructor(
    private imageService: ImageService
  ) {
  }

  ngOnInit() {
    this.imageService.getImage()

    this.imageService.$latestImage.subscribe(next => {
      console.log(next)
      if (next) {
        console.log(next)
        const reader = new FileReader();
        reader.readAsDataURL(next);
        reader.onloadend = () => {
          this.webcamImage = reader.result as string
        }
      }
      console.log(this.webcamImage)
    })


  }

}
