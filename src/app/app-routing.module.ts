import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from './start/start.component';
import {CheeseComponent} from './cheese/cheese.component';
import {GalerieComponent} from "./galerie/galerie.component";

const routes: Routes = [
  {path: "", component: StartComponent},
  {path: "cheese", component: CheeseComponent},
  {path: "galerie", component: GalerieComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
