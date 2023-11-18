import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigureComponent } from './configure.component';

describe('ConfigureComponent', () => {
  let component: ConfigureComponent;
  let fixture: ComponentFixture<ConfigureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigureComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        FormsModule,
        HttpClientTestingModule,
        MatRadioModule,
        MatProgressBarModule
      ],
      providers: [
        HttpClient
      ]
    });
    fixture = TestBed.createComponent(ConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
