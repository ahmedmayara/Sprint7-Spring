import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAlbumComponent } from './update-album.component';

describe('UpdateAlbumComponent', () => {
  let component: UpdateAlbumComponent;
  let fixture: ComponentFixture<UpdateAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
