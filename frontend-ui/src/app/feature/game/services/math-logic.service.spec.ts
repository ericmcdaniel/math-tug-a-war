import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { NetworkService } from '../../../core/services/network.service';
import { ValidatedResponse } from '../models/validation-response.model';
import { MathLogicService } from './math-logic.service';

describe('MathLogicService', () => {
  let service: MathLogicService;
  let networkMock: any;
  const MOCK_MATH_RESPONSE = { equation: "1 + 2", id: "1234" };
  const MOCK_MATH_VALIDATION: ValidatedResponse = { message: "correct", actual: 3, received: 3 };

  beforeEach(() => {
    networkMock = {
      generateExpression: jest.fn(() => of(MOCK_MATH_RESPONSE)),
      validateExpression: jest.fn(() => of(MOCK_MATH_VALIDATION))
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: NetworkService, useValue: networkMock }
      ]
    });
    service = TestBed.inject(MathLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a new expression', async () => {
    const spy = jest.spyOn(networkMock, 'generateExpression');
    const result = service.generateExpression();
    await expect(firstValueFrom(result)).resolves.toBeDefined();
    await expect(firstValueFrom(result)).resolves.toEqual(MOCK_MATH_RESPONSE);
    expect(spy).toBeCalledTimes(1);
  });

  it('should validate a user\'s expression', async () => {
    const spy = jest.spyOn(networkMock, 'validateExpression');
    const result = service.validateExpression("3");
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
