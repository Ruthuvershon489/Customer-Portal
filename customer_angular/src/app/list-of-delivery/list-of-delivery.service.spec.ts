import { TestBed } from '@angular/core/testing';

import { ListOfDeliveryService } from './list-of-delivery.service';

describe('ListOfDeliveryService', () => {
  let service: ListOfDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
