import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByLabelComponent } from './search-by-label.component';

describe('SearchByLabelComponent', () => {
  let component: SearchByLabelComponent;
  let fixture: ComponentFixture<SearchByLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
