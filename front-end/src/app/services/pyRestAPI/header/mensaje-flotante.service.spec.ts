import { TestBed } from '@angular/core/testing';

import { MensajeFlotanteService } from './mensaje-flotante.service';

describe('MensajeFlotanteService', () => {
  let service: MensajeFlotanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajeFlotanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
