import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { LandingPage } from './pages/landing/landing.page';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    LandingPage,
    NotFoundPage,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class CoreModule { }
