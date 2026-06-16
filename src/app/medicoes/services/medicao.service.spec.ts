import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MedicaoService } from './medicao.service';

describe('MedicaoService', () => {
  let service: MedicaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(MedicaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
