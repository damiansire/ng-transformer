import { TestBed } from '@angular/core/testing';

import { SyntaxTransformService } from './syntax-transform.service';

describe('SyntaxTransformService', () => {
  let service: SyntaxTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyntaxTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
