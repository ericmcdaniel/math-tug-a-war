import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from '../../../../core/services/message.service';
import { MathGeneratorService } from '../../services/math-generator.service';
import { MathGameComponent } from './math-game.component';

describe('MathGameComponent', () => {
  let component: MathGameComponent;
  let fixture: ComponentFixture<MathGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MathGameComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [
        MathGeneratorService,
        MessageService
      ]
    });
    fixture = TestBed.createComponent(MathGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
