import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MathGeneratorService } from './math-generator.service';

describe('MathGeneratorService', () => {
  let service: MathGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HttpClient
      ]
    });
    service = TestBed.inject(MathGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
