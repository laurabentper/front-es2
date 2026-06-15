import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
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

import { RelatorioService } from '../../../relatorios/services/relatorio.service';
import { MedicaoResposta } from '../../models/medicao-resposta.model';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
  standalone: true,
  imports: [
    DatePipe,
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
export class HistoricoPage implements OnInit {
  medicoes: MedicaoResposta[] = [];
  mensagemErro = '';

  constructor(private readonly relatorioService: RelatorioService) {}

  ngOnInit(): void {
    this.carregarHistorico();
  }

  carregarHistorico(): void {
    this.mensagemErro = '';

    this.relatorioService.obterHistorico().subscribe({
      next: (resposta) => {
        this.medicoes = resposta.medicoes ?? [];
      },
      error: () => {
        this.mensagemErro = 'Não foi possível carregar o histórico.';
      },
    });
  }
}
