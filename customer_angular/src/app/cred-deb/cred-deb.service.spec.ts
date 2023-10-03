import { TestBed } from '@angular/core/testing';

import { CredDebService } from './cred-deb.service';

describe('CredDebService', () => {
  let service: CredDebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredDebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
