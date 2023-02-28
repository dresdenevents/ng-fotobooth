import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cheese',
  templateUrl: './cheese.component.html',
  styleUrls: ['./cheese.component.scss']
})
export class CheeseComponent {

  test: boolean = false
  photoTimer: boolean = false
  @ViewChild('cont', {static: false}) cont: ElementRef | undefined

  showWebcam(event: boolean) {
    this.test = event
    if (event) {
      this.cont?.nativeElement.setAttribute('style', 'display: block')
      setTimeout(() => {
        this.photoTimer = true
      }, 5500)
    }
  }
}
