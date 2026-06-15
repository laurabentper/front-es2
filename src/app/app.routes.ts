import { Routes } from '@angular/router';

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
    path: 'dashboard',
    loadComponent: () =>
      import('./relatorios/pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'historico',
    loadComponent: () =>
      import('./medicoes/pages/historico/historico.page').then((m) => m.HistoricoPage),
  },
  {
    path: 'medicao-form',
    loadComponent: () =>
      import('./medicoes/pages/medicao-form/medicao-form.page').then((m) => m.MedicaoFormPage),
  },
  {
    path: 'integrantes',
    loadComponent: () =>
      import('./sobre/pages/integrantes/integrantes.page').then((m) => m.IntegrantesPage),
  },
];