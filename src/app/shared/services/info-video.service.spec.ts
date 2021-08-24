import { TestBed } from '@angular/core/testing';

import { InfoVideoService } from './info-video.service';

describe('InfoVideoService', () => {
  let service: InfoVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
