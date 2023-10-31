import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from '../../../core/services/message.service';
import { MathGeneratorService } from './math-generator.service';

describe('MathGeneratorService', () => {
  let service: MathGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MessageService,
        HttpClient
      ]
    });
    service = TestBed.inject(MathGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
