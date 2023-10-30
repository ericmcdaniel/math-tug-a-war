import { TestBed } from '@angular/core/testing';

import { MathGeneratorService } from './math-generator.service';

describe('MathGeneratorService', () => {
  let service: MathGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
