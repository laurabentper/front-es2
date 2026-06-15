import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UsuarioService } from '../../usuarios/services/usuario.service';
import { RegistrarMedicaoRequisicao } from '../models/registrar-medicao-requisicao.model';
import { MedicaoResposta } from '../models/medicao-resposta.model';

@Injectable({
  providedIn: 'root',
})
export class MedicaoService {
  private readonly apiUrl = `${environment.apiUrl}/medicoes`;

  constructor(
    private readonly http: HttpClient,
    private readonly usuarioService: UsuarioService
  ) {}

  registrar(dados: RegistrarMedicaoRequisicao): Observable<MedicaoResposta> {
    return this.http.post<MedicaoResposta>(this.apiUrl, dados, {
      headers: this.obterHeadersAutenticados(),
    });
  }

  private obterHeadersAutenticados(): HttpHeaders {
    const token = this.usuarioService.obterToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
