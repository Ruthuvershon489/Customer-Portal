import { TestBed } from '@angular/core/testing';

import { SalesOrderDataService } from './sales-order-data.service';

describe('SalesOrderDataService', () => {
  let service: SalesOrderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesOrderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
