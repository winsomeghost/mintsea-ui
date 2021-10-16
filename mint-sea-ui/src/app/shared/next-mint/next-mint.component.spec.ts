import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextMintComponent } from './next-mint.component';

describe('NextMintComponent', () => {
  let component: NextMintComponent;
  let fixture: ComponentFixture<NextMintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextMintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextMintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
