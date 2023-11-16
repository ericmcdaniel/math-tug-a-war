import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from '../../app-routing.module';
import { ConfigureComponent } from './components/configure/configure.component';
import { MathGameComponent } from './components/math-game/math-game.component';
import { ResultsComponent } from './components/results/results.component';
import { ConfigurePage } from './pages/configure/configure.page';
import { PlayPage } from './pages/play/play.page';
import { ResultsPage } from './pages/results/results.page';
import { SinglePlayerPage } from './pages/single-player/single-player.page';

@NgModule({
  declarations: [
    ConfigureComponent,
    MathGameComponent,
    ResultsComponent,
    SinglePlayerPage,
    ConfigurePage,
    PlayPage,
    ResultsPage,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    MatButtonModule
  ]
})
export class GameModule { }
