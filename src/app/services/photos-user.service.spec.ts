import { TestBed } from '@angular/core/testing';

import { PhotosUserService } from './photos-user.service';

describe('PhotosUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotosUserService = TestBed.get(PhotosUserService);
    expect(service).toBeTruthy();
  });
});
