import { TestBed } from '@angular/core/testing';

import { ZeroCodeService } from './zero-code.service';

describe('ZeroCodeService', () => {
  let service: ZeroCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZeroCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
