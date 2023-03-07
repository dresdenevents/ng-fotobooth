import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';

import {WebcamModule} from 'ngx-webcam';
import { WebcamComponent } from './cheese/webcam/webcam.component';

import {ImageService} from './shared/image.service';
import { StartComponent } from './start/start.component';
import { CheeseComponent } from './cheese/cheese.component';
import { GalerieComponent } from './galerie/galerie.component';

@NgModule({
  declarations: [
    AppComponent,
    WebcamComponent,
    StartComponent,
    CheeseComponent,
    GalerieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    WebcamModule,
    HttpClientModule
  ],
  providers: [ImageService, WebcamComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
