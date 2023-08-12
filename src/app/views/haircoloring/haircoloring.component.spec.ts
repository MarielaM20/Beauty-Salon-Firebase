import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaircoloringComponent } from './haircoloring.component';

describe('HaircoloringComponent', () => {
  let component: HaircoloringComponent;
  let fixture: ComponentFixture<HaircoloringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaircoloringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HaircoloringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
