import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

import { MedicaoService } from '../../services/medicao.service';
import { RegistrarMedicaoRequisicao } from '../../models/registrar-medicao-requisicao.model';

@Component({
  selector: 'app-medicao-form',
  templateUrl: './medicao-form.page.html',
  styleUrls: ['./medicao-form.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonCheckbox,
    IonButton,
    IonText,
  ],
})
export class MedicaoFormPage {
  mensagemErro = '';

  medicao: RegistrarMedicaoRequisicao = {
    pressaoSistolica: 120,
    pressaoDiastolica: 80,
    frequenciaCardiaca: 70,
    oxigenacaoSangue: 98,
    pesoCorporal: 70,
    faltaDeAr: false,
    dorNoPeito: false,
    tontura: false,
    registradaEm: null,
  };

  constructor(
    private readonly medicaoService: MedicaoService,
    private readonly router: Router
  ) {}

  registrar(): void {
    this.mensagemErro = '';

    this.medicaoService.registrar(this.medicao).subscribe({
      next: () => {
        this.router.navigate(['/historico']);
      },
      error: () => {
        this.mensagemErro = 'Não foi possível registrar a medição.';
      },
    });
  }
}
