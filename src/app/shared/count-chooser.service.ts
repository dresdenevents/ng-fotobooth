import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ImageService} from "./image.service";

@Injectable({
  providedIn: 'root'
})
export class CountChooserService {

  counter: BehaviorSubject<1 | 4> = new BehaviorSubject<1 | 4>(1);

  constructor(
    private imageService: ImageService
  ) { }

  public setCounter(count: 1 | 4) {
    this.counter.next(count)
    this.imageService.image.next(null)
  }

  public getCounter() {
    return this.counter.value
  }
}
