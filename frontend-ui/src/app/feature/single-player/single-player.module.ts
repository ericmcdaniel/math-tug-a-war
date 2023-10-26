import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePlayerPage } from './pages/single-player/single-player.page';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  declarations: [
    SinglePlayerPage
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class SinglePlayerModule { }
