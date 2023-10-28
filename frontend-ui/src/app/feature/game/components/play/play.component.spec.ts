import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathGameComponent } from './play.component';

describe('GameComponent', () => {
  let component: MathGameComponent;
  let fixture: ComponentFixture<MathGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MathGameComponent]
    });
    fixture = TestBed.createComponent(MathGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
