import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentMessageComponent } from './comment-message.component';

describe('CommentMessageComponent', () => {
  let component: CommentMessageComponent;
  let fixture: ComponentFixture<CommentMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
