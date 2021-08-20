import { TestBed } from '@angular/core/testing';

import { ValidCpfService } from './valid-cpf.service';

describe('ValidCpfService', () => {
  let service: ValidCpfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidCpfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
