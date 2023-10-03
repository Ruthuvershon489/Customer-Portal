import { TestBed } from '@angular/core/testing';

import { PayageService } from './payage.service';

describe('PayageService', () => {
  let service: PayageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
