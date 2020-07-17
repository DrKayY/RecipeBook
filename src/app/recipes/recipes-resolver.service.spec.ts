/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecipesResolverService } from './recipes-resolver.service';

describe('Service: RecipesResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipesResolverService]
    });
  });

  it('should ...', inject([RecipesResolverService], (service: RecipesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
