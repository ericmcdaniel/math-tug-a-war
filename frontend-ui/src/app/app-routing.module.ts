import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './core/pages/landing/landing.page';
import { NotFoundPage } from './core/pages/not-found/not-found.page';
import { SinglePlayerPage } from './feature/single-player/pages/single-player/single-player.page';

const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'single-player-game', component: SinglePlayerPage },
  { path: '**', pathMatch: 'full', component: NotFoundPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
