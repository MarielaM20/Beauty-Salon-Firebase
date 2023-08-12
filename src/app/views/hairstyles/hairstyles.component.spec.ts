import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairstylesComponent } from './hairstyles.component';

describe('HairstylesComponent', () => {
  let component: HairstylesComponent;
  let fixture: ComponentFixture<HairstylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HairstylesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HairstylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
