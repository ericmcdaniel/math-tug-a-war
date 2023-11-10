import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { LandingPage } from './pages/landing/landing.page';
import { NotFoundPage } from './pages/not-found/not-found.page';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LandingPage,
    NotFoundPage,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule
  ]
})
export class CoreModule { }
