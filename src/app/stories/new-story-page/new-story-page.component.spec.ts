import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStoryPageComponent } from './story-page.component';

describe('StoryPageComponent', () => {
  let component: NewStoryPageComponent;
  let fixture: ComponentFixture<NewStoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
