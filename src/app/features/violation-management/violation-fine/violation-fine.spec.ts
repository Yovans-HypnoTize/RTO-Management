import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationFine } from './violation-fine';

describe('ViolationFine', () => {
  let component: ViolationFine;
  let fixture: ComponentFixture<ViolationFine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViolationFine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViolationFine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
