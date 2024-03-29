import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ErrorPage } from './core/pages/error/error.page';
import { LandingPage } from './core/pages/landing/landing.page';
import { NotFoundPage } from './core/pages/not-found/not-found.page';
import { ConfigurePage } from './feature/game/pages/configure/configure.page';
import { PlayPage } from './feature/game/pages/play/play.page';
import { ResultsPage } from './feature/game/pages/results/results.page';
import { SinglePlayerPage } from './feature/game/pages/single-player/single-player.page';

const routes: Routes = [
  { path: '', component: LandingPage, title: 'Math Tug-a-War' },
  {
    path: 'single-player', component: SinglePlayerPage, children: [
      { path: '', component: ConfigurePage, title: 'Math Tug-a-War | Single Player Game' },
      { path: 'play', canActivate: [AuthGuard], component: PlayPage, title: 'Math Tug-a-War | Single Player Game' },
      { path: 'results', canActivate: [AuthGuard], component: ResultsPage, title: 'Math Tug-a-War | Results' },
    ]
  },
  { path: 'error', component: ErrorPage, title: 'Math Tug-a-War | Error' },
  { path: '**', pathMatch: 'full', component: NotFoundPage, title: 'Math Tug-a-War | Page Not Found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
