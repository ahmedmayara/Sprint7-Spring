import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLabelsComponent } from './liste-labels.component';

describe('ListeLabelsComponent', () => {
  let component: ListeLabelsComponent;
  let fixture: ComponentFixture<ListeLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeLabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
