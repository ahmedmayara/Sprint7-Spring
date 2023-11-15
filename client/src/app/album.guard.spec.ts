import { TestBed } from '@angular/core/testing';

import { AlbumGuard } from './album.guard';

describe('AlbumGuard', () => {
  let guard: AlbumGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlbumGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
