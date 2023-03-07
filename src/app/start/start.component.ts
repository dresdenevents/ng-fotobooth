import {Component} from '@angular/core';
import {CountChooserService} from "../shared/count-chooser.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  constructor(
    private countChooserService: CountChooserService
  ) {
  }

  setImageIndex(index: number) {
    this.countChooserService.setCounter(index as (1 | 4))
  }
}
