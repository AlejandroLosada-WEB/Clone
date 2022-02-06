import { TestBed } from '@angular/core/testing';

import { PhotosCommentsService } from './photos-comments.service';

describe('PhotosCommentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotosCommentsService = TestBed.get(PhotosCommentsService);
    expect(service).toBeTruthy();
  });
});
