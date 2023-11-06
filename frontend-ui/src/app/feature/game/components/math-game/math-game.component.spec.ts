import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { MessageService } from '../../../../core/services/message.service';
import { GameResults } from '../../models/game-results.model';
import { MathLogicService } from '../../services/math-logic.service';
import { MathGameComponent } from './math-game.component';

describe('MathGameComponent', () => {
  let component: MathGameComponent;
  let fixture: ComponentFixture<MathGameComponent>;
  let mockService: Partial<MathLogicService>;
  const MOCK_MATH_RESPONSE = { equation: "1 + 2", id: "1234" };
  const MOCK_MATH_VALIDATION = { message: "Correct answer" };

  beforeEach(() => {
    mockService = {
      generateExpression: jest.fn(() => of(MOCK_MATH_RESPONSE)),
      validateExpression: jest.fn(() => of(MOCK_MATH_VALIDATION)),
      initialize: jest.fn(() => { }),
      updateScore: jest.fn(() => { }),
      gameResults: jest.fn(() => new BehaviorSubject<GameResults>({ correct: 0, questions: [] }))
    };
    TestBed.configureTestingModule({
      declarations: [MathGameComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [
        { provide: MathLogicService, useValue: mockService },
        MessageService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MathGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a new math problem', () => {
    setTimeout(() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.new-problem').textContent).toContain('1 + 2');
    }, 10);
  });
});
