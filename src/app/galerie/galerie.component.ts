import {Component} from '@angular/core';
import {ImageService} from "../shared/image.service";
import {CountChooserService} from "../shared/count-chooser.service";

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.scss']
})
export class GalerieComponent {

  webcamImages: Array<string | null | undefined> = []
  count: number = 0

  constructor(
    private imageService: ImageService,
    private counterService: CountChooserService
  ) {
  }

  ngOnInit() {
    this.count = this.counterService.getCounter()
    switch (this.count) {
      case 1:
        this.imageService.getImage(0).subscribe(next => {
          if (!this.webcamImages.includes(next)) this.webcamImages.push(next);
        });
        break;
      case 4:
        for (let index = 0; index < 4; index++) {
          this.imageService.getImage(index).subscribe(next => {
            if (!this.webcamImages.includes(next)) this.webcamImages.push(next);
          });
        }
        break;
      default:
        // todo handle other cases here
        break;
    }
  }

}
