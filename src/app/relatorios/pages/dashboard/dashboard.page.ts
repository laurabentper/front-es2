import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from '@ionic/angular/standalone';

import { RelatorioService } from '../../services/relatorio.service';
import { UsuarioService } from '../../../usuarios/services/usuario.service';
import { ResumoMedicoesResposta } from '../../models/resumo-medicoes-resposta.model';
import { PageShellComponent } from '../../../shared/components/page-shell/page-shell.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    RouterLink,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonText,
    PageShellComponent,
  ],
})
export class DashboardPage implements OnInit {
  resumo: ResumoMedicoesResposta | null = null;
  mensagemErro = '';

  constructor(
    private readonly relatorioService: RelatorioService,
    private readonly usuarioService: UsuarioService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.carregarResumo();
  }

  carregarResumo(): void {
    this.mensagemErro = '';

    this.relatorioService.obterResumo().subscribe({
      next: (resposta) => {
        this.resumo = resposta;
      },
      error: () => {
        this.mensagemErro = 'Nao foi possivel carregar o resumo.';
      },
    });
  }

  sair(): void {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}
