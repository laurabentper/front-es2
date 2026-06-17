import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;

  function criarToken(expiracaoEmSegundos: number): string {
    const cabecalho = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const cargaUtil = btoa(JSON.stringify({ exp: expiracaoEmSegundos }));

    return `${cabecalho}.${cargaUtil}.assinatura`;
  }

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve considerar autenticado quando o token ainda for valido', () => {
    const exp = Math.floor(Date.now() / 1000) + 60;

    service.salvarToken(criarToken(exp));

    expect(service.estaAutenticado()).toBeTrue();
  });

  it('deve remover token expirado e considerar usuario deslogado', () => {
    const exp = Math.floor(Date.now() / 1000) - 60;

    service.salvarToken(criarToken(exp));

    expect(service.estaAutenticado()).toBeFalse();
    expect(service.obterToken()).toBeNull();
  });
});
