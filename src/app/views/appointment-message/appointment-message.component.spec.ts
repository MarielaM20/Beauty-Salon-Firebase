import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentMessageComponent } from './appointment-message.component';

describe('AppointmentMessageComponent', () => {
  let component: AppointmentMessageComponent;
  let fixture: ComponentFixture<AppointmentMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
