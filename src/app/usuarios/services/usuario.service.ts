import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AutenticacaoResposta } from '../models/autenticacao-resposta.model';
import { AutenticarUsuarioRequisicao } from '../models/autenticar-usuario-requisicao.model';
import { CadastrarUsuarioRequisicao } from '../models/cadastrar-usuario-requisicao.model';
import { UsuarioResposta } from '../models/usuario-resposta.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly apiUrl = `${environment.apiUrl}/usuarios`;
  private readonly tokenKey = 'cardiotrack_token';

  constructor(private readonly http: HttpClient) {}

  cadastrar(dados: CadastrarUsuarioRequisicao): Observable<UsuarioResposta> {
    return this.http.post<UsuarioResposta>(this.apiUrl, dados);
  }

  login(dados: AutenticarUsuarioRequisicao): Observable<AutenticacaoResposta> {
    return this.http.post<AutenticacaoResposta>(`${this.apiUrl}/login`, dados);
  }

  salvarToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  obterToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);

    if (!token) {
      return null;
    }

    if (this.tokenExpirou(token)) {
      this.logout();
      return null;
    }

    return token;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  estaAutenticado(): boolean {
    return this.obterToken() !== null;
  }

  private tokenExpirou(token: string): boolean {
    const exp = this.obterExpiracaoToken(token);

    if (!exp) {
      return true;
    }

    return Date.now() >= exp.getTime();
  }

  private obterExpiracaoToken(token: string): Date | null {
    try {
      const partes = token.split('.');

      if (partes.length !== 3) {
        return null;
      }

      const cargaUtil = JSON.parse(atob(partes[1].replace(/-/g, '+').replace(/_/g, '/'))) as {
        exp?: number;
      };

      if (!cargaUtil.exp) {
        return null;
      }

      return new Date(cargaUtil.exp * 1000);
    } catch {
      return null;
    }
  }
}
