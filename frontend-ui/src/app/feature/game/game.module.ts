import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../../app-routing.module';
import { ConfigureComponent } from './components/configure/configure.component';
import { MathGameComponent } from './components/play/play.component';
import { ConfigurePage } from './pages/configure/configure.page';
import { PlayPage } from './pages/play/play.page';
import { SinglePlayerPage } from './pages/single-player/single-player.page';

@NgModule({
  declarations: [
    ConfigureComponent,
    MathGameComponent,
    SinglePlayerPage,
    ConfigurePage,
    PlayPage
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ]
})
export class GameModule { }
