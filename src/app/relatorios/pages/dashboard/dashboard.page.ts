import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonText,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

import { RelatorioService } from '../../services/relatorio.service';
import { ResumoMedicoesResposta } from '../../models/resumo-medicoes-resposta.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    RouterLink,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonText,
  ],
})
export class DashboardPage implements OnInit {
  resumo: ResumoMedicoesResposta | null = null;
  mensagemErro = '';

  constructor(private readonly relatorioService: RelatorioService) { }

  ngOnInit(): void {
    this.carregarResumo();
  }

  carregarResumo(): void {
    this.mensagemErro = '';

    this.relatorioService.obterResumo().subscribe({
      next: (resposta) => {
        console.log('Resumo recebido:', resposta);
        this.resumo = resposta;
      },
      error: () => {
        this.mensagemErro = 'Não foi possível carregar o resumo.';
      },
    });
  }
}
