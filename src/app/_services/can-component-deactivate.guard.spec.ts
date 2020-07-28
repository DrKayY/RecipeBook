import { TestBed } from '@angular/core/testing';

import { CanComponentDeactivateGuard } from './can-component-deactivate.guard';

describe('CanComponentDeactivateGuard', () => {
  let guard: CanComponentDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanComponentDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
