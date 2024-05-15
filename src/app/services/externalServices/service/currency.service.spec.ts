import { TestBed } from '@angular/core/testing';

import { ExtCurrencyService } from './ext-currency.service';

describe('CurrencyService', () => {
  let service: ExtCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
