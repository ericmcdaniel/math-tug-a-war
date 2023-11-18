import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { MathLogicService } from './math-logic.service';

describe('MathLogicService', () => {
  let service: MathLogicService;
  let httpMock: any;
  const MOCK_MATH_RESPONSE = { equation: "1 + 2", id: "1234" };
  const MOCK_MATH_VALIDATION = { message: "Correct answer" };

  beforeEach(() => {
    httpMock = {
      get: jest.fn(() => of(MOCK_MATH_RESPONSE)),
      post: jest.fn(() => of(MOCK_MATH_VALIDATION))
    };
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HttpClient, useValue: httpMock }
      ]
    });
    service = TestBed.inject(MathLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a new expression', async () => {
    const spy = jest.spyOn(httpMock, 'get');
    const result = service.generateExpression();
    await expect(firstValueFrom(result)).resolves.toBeDefined();
    await expect(firstValueFrom(result)).resolves.toEqual(MOCK_MATH_RESPONSE);
    expect(spy).toBeCalledTimes(1);
  });

  it('should validate a user\'s expression', async () => {
    const spy = jest.spyOn(httpMock, 'post');
    const result = service.validateExpression({ id: "123", answer: "4" });
    await expect(firstValueFrom(result)).resolves.toBeDefined();
    await expect(firstValueFrom(result)).resolves.toEqual(MOCK_MATH_VALIDATION);
    expect(spy).toBeCalledTimes(1);
  });

  it('should update the score', async () => {
    const previousScore = (await firstValueFrom(service.score));
    service.setScore();
    expect(previousScore + 1).toEqual((await firstValueFrom(service.score)));
  });
});
