import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResumoMedicoesResposta } from '../models/resumo-medicoes-resposta.model';
import { environment } from '../../../environments/environment';
import { HistoricoMedicoesResposta } from '../models/historico-medicoes-resposta.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  private readonly apiUrl = `${environment.apiUrl}/relatorios`;

  constructor(private readonly http: HttpClient) {}

  obterHistorico(): Observable<HistoricoMedicoesResposta> {
    return this.http.get<HistoricoMedicoesResposta>(`${this.apiUrl}/historico`);
  }

  obterResumo(): Observable<ResumoMedicoesResposta> {
    return this.http.get<ResumoMedicoesResposta>(`${this.apiUrl}/resumo`);
  }
}