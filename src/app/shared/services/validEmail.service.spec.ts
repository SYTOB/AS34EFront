/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValidEmailService } from './validEmail.service';

describe('Service: ValidEmail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidEmailService]
    });
  });

  it('should ...', inject([ValidEmailService], (service: ValidEmailService) => {
    expect(service).toBeTruthy();
  }));
});
