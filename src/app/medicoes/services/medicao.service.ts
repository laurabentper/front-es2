import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { RegistrarMedicaoRequisicao } from '../models/registrar-medicao-requisicao.model';
import { MedicaoResposta } from '../models/medicao-resposta.model';

@Injectable({
  providedIn: 'root',
})
export class MedicaoService {
  private readonly apiUrl = `${environment.apiUrl}/medicoes`;

  constructor(private readonly http: HttpClient) {}

  registrar(dados: RegistrarMedicaoRequisicao): Observable<MedicaoResposta> {
    return this.http.post<MedicaoResposta>(this.apiUrl, dados);
  }
}
