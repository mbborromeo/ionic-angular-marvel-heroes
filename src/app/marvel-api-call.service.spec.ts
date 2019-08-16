import { TestBed } from '@angular/core/testing';

import { MarvelApiCallService } from './marvel-api-call.service';

describe('MarvelApiCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarvelApiCallService = TestBed.get(MarvelApiCallService);
    expect(service).toBeTruthy();
  });
});
