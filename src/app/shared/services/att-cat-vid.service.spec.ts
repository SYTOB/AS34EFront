import { TestBed } from '@angular/core/testing';

import { AttCatVidService } from './att-cat-vid.service';

describe('AttCatVidService', () => {
  let service: AttCatVidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttCatVidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
