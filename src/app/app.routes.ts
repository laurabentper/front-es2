import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./usuarios/pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./usuarios/pages/cadastro/cadastro.page').then((m) => m.CadastroPage),
  },
  {
    path: 'integrantes',
    loadComponent: () =>
      import('./sobre/pages/integrantes/integrantes.page').then((m) => m.IntegrantesPage),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./relatorios/pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'historico',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./medicoes/pages/historico/historico.page').then((m) => m.HistoricoPage),
  },
  {
    path: 'medicao-form',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./medicoes/pages/medicao-form/medicao-form.page').then((m) => m.MedicaoFormPage),
  },
];