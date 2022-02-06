import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosCommentComponent } from './photos-comment.component';

describe('PhotosCommentComponent', () => {
  let component: PhotosCommentComponent;
  let fixture: ComponentFixture<PhotosCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
