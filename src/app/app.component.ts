import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'sample';
  @ViewChild('dots', {static: false}) canvas: ElementRef | undefined;

  context: CanvasRenderingContext2D | undefined;


  ngAfterViewInit() {
    if (this.canvas) {
      this.context = this.canvas.nativeElement.getContext('2d');
      var canvasWidth = this.canvas.nativeElement.scrollWidth;
      var canvasHeight = this.canvas.nativeElement.scrollHeight;
      this.canvas.nativeElement.setAttribute('height', canvasHeight);
      this.canvas.nativeElement.setAttribute('width', canvasWidth);

      var dotNumber = 900;

      for (var i = 0; i < dotNumber; ++i) {
        var min = 0.1;
        var max = 1.5;
        var dotRadius = Math.random() * (max - min) + min;

        var dotX = Math.random() * (canvasWidth - 8) + 8;
        var dotY = Math.random() * (canvasHeight - 8) + 8;

        var dot = {x: dotX, y: dotY, radius: dotRadius};
        this.drawDot(dot, this.context);
      }
    }
  }

  drawDot(dot: any, context: any) {
    context.beginPath();
    context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#FFFFFF'; //'#b2b2d8';
    context.fill();

  }
}
