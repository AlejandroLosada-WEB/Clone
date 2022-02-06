import { TestBed } from '@angular/core/testing';

import { PhotosUserServiceService } from './photos-user-service.service';

describe('PhotosUserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotosUserServiceService = TestBed.get(PhotosUserServiceService);
    expect(service).toBeTruthy();
  });
});
