import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {CountChooserService} from "../shared/count-chooser.service";
import {WebcamComponent} from "./webcam/webcam.component";
import {interval, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cheese',
  templateUrl: './cheese.component.html',
  styleUrls: ['./cheese.component.scss']
})
export class CheeseComponent implements OnDestroy {

  count: number = 0
  repeatDelay = 5050;
  subscription: Subscription = Subscription.EMPTY

  @ViewChild('cont', {static: false}) cont: ElementRef | undefined
  @ViewChild('whiteFlash', {static: false}) whiteFlash: ElementRef | undefined
  @ViewChild(WebcamComponent)
  private webcamComponent: WebcamComponent | undefined;

  constructor(
    private counterService: CountChooserService,
    private router: Router
  ) {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  showWebcam(event: boolean) {
    if (event) {
      this.cont?.nativeElement.setAttribute('style', 'display: block')
      this.count = this.counterService.getCounter()

      this.subscription = interval(this.repeatDelay).subscribe(() => {
        if (this.count > 0) {
          this.whiteFlash?.nativeElement.classList.add('whiteFlash')
          this.webcamComponent?.triggerSnapshot();
          this.count--;
          setTimeout(() => {
            this.whiteFlash?.nativeElement.classList.remove('whiteFlash')
          }, 150)
          if (this.count == 0) this.router.navigate(['galerie'])
        } else {
          this.subscription.unsubscribe();
        }
      })
    }
  }
}
