import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchNewCollectionComponent } from './launch-new-collection.component';

describe('LaunchNewCollectionComponent', () => {
  let component: LaunchNewCollectionComponent;
  let fixture: ComponentFixture<LaunchNewCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaunchNewCollectionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchNewCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
