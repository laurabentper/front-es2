import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { RelatorioService } from './relatorio.service';

describe('RelatorioService', () => {
  let service: RelatorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RelatorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
