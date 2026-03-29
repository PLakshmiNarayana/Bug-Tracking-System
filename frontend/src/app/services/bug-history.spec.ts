import { TestBed } from '@angular/core/testing';

import { BugHistory } from './bug-history.service';

describe('BugHistory', () => {
  let service: BugHistory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BugHistory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
