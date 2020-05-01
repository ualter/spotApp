import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/initial',
    pathMatch: 'full'
  },
  {
    path: 'authorization',
    loadChildren: () => import('./pages/authorization/authorization.module').then( m => m.AuthorizationPageModule)
  },
  {
    path: 'initial',
    loadChildren: () => import('./pages/initial/initial.module').then( m => m.InitialPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
